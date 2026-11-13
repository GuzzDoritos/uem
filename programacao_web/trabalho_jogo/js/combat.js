/**
 * js/combat.js
 * Motor de combate em turnos inspirado em Kingdom of Loathing.
 * Suporta ataque físico, habilidade de classe (MP), uso de consumível,
 * fuga, trégua diplomática contra o Boss e checagem de Vitória / Empate / Derrota.
 */

window.Game = window.Game || {};

(function (Game) {
  'use strict';

  const SKILL_MP_COST = 4;

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function hasPeaceMedallion() {
    const state = Game.State.get();
    if (!state) return false;
    return (
      state.equipment.accessory === 'peace_medallion' ||
      Game.Inventory.getItemCount('peace_medallion') > 0
    );
  }

  function runMonsterTurn() {
    const state = Game.State.get();
    const combat = state.activeCombat;
    const monster = Game.Data.monstersById[combat.monsterId];
    const stats = Game.State.getComputedStats();

    // Esquiva parcial baseada em Moxie vs Ataque do monstro
    const dodgeChance = Math.min(0.35, Math.max(0.05, (stats.moxie - monster.attack) * 0.03 + 0.08));
    if (Math.random() < dodgeChance) {
      combat.log.push(monster.attackText + ' Mas você se esquiva agilmente (0 de dano)!');
    } else {
      const mitigation = Math.floor(stats.defense * 0.55);
      const raw = monster.attack + randomInt(-1, 2);
      const damage = Math.max(1, raw - mitigation);
      state.hp = Math.max(0, state.hp - damage);
      combat.log.push(monster.attackText + ' Você sofre ' + damage + ' de dano!');
    }

    if (state.hp <= 0) {
      combat.resolved = true;
      combat.outcome = 'defeat';
      combat.log.push('Você caiu inconsciente a 0 HP!');
      Game.State.triggerEndgame(
        'defeat',
        'Derrota em Combate!',
        'Você chegou a 0 HP enfrentando ' + monster.name + '.'
      );
      return;
    }

    combat.round += 1;
    Game.State.save();
  }

  function resolveMonsterDefeated() {
    const state = Game.State.get();
    const combat = state.activeCombat;
    const monster = Game.Data.monstersById[combat.monsterId];

    combat.log.push(monster.defeatText);

    // Contra-ataque / explosão final especial (ex.: Boss Final para suportar empate)
    if (monster.specialOnZeroHp && monster.specialOnZeroHp.recoilDamage > 0) {
      const recoil = monster.specialOnZeroHp.recoilDamage;
      state.hp = Math.max(0, state.hp - recoil);
      combat.log.push(monster.specialOnZeroHp.text);
    }

    state.monstersDefeated += 1;

    // Caso especial: Boss Final
    if (monster.isBoss) {
      const meatWon = randomInt(monster.meatDrop[0], monster.meatDrop[1]);
      state.meat += meatWon;
      Game.State.addSubstats(monster.statGain);

      if (state.hp <= 0) {
        combat.resolved = true;
        combat.outcome = 'draw';
        Game.State.triggerEndgame(
          'draw',
          'Empate Épico (Nocaute Mútuo)!',
          'Você derrotou o ' +
            monster.name +
            ', mas o ataque final dele reduziu seu HP a 0 no mesmo instante!'
        );
      } else {
        combat.resolved = true;
        combat.outcome = 'victory';
        Game.State.triggerEndgame(
          'victory',
          'Vitória no Reino de Loathing!',
          'Você derrotou o ' +
            monster.name +
            ' mantendo ' +
            state.hp +
            ' HP e salvou o reino!'
        );
      }
      return;
    }

    // Monstro comum derrotado
    const meatWon = randomInt(monster.meatDrop[0], monster.meatDrop[1]);
    state.meat += meatWon;
    combat.log.push('Você ganhou ' + meatWon + ' Meat.');

    const levelMessages = Game.State.addSubstats(monster.statGain);
    levelMessages.forEach(function (msg) {
      combat.log.push(msg);
    });

    if (Array.isArray(monster.drops)) {
      monster.drops.forEach(function (drop) {
        if (Math.random() <= drop.chance) {
          Game.Inventory.addItem(drop.itemId, 1);
          const item = Game.Data.itemsById[drop.itemId];
          if (item) {
            combat.log.push('Item obtido: ' + item.name + '!');
          }
        }
      });
    }

    combat.resolved = true;
    combat.outcome = 'win';
    Game.State.save();
  }

  Game.Combat = {
    SKILL_MP_COST: SKILL_MP_COST,

    startCombat(monsterId, locationId) {
      const state = Game.State.get();
      const monster = Game.Data.monstersById[monsterId];
      if (!state || !monster) return;

      state.activeCombat = {
        monsterId: monster.id,
        locationId: locationId,
        monsterHp: monster.hp,
        monsterMaxHp: monster.hp,
        round: 1,
        resolved: false,
        outcome: null,
        showItemPicker: false,
        log: [monster.introText]
      };
      state.currentView = 'combat';
      Game.State.save();
    },

    playerAttack() {
      const state = Game.State.get();
      if (!state || !state.activeCombat || state.activeCombat.resolved) return;

      const combat = state.activeCombat;
      const monster = Game.Data.monstersById[combat.monsterId];
      const stats = Game.State.getComputedStats();

      combat.showItemPicker = false;
      const damage = Math.max(2, stats.attack - monster.defense + randomInt(0, 3));
      combat.monsterHp = Math.max(0, combat.monsterHp - damage);
      combat.log.push('Turno ' + combat.round + ': Você ataca ' + monster.name + ' causando ' + damage + ' de dano!');

      if (combat.monsterHp <= 0) {
        resolveMonsterDefeated();
        return;
      }

      runMonsterTurn();
    },

    playerSkill() {
      const state = Game.State.get();
      if (!state || !state.activeCombat || state.activeCombat.resolved) return;

      const combat = state.activeCombat;
      const monster = Game.Data.monstersById[combat.monsterId];
      const stats = Game.State.getComputedStats();
      const cls = Game.State.CLASSES[state.classId] || Game.State.CLASSES.seal_clubber;

      combat.showItemPicker = false;

      if (state.mp < SKILL_MP_COST) {
        combat.log.push('MP insuficiente para usar ' + cls.skillName + ' (precisa de ' + SKILL_MP_COST + ' MP).');
        Game.State.save();
        return;
      }

      state.mp -= SKILL_MP_COST;
      const primaryBonus = stats[cls.primaryStat] || 0;
      const rawSkillDamage = Math.floor(stats.mysticality * 1.1 + primaryBonus * 0.7) + randomInt(2, 5);
      const damage = Math.max(5, rawSkillDamage - Math.floor(monster.defense * 0.5));

      combat.monsterHp = Math.max(0, combat.monsterHp - damage);
      combat.log.push(
        'Turno ' +
          combat.round +
          ': Você usa ' +
          cls.skillName +
          ' (-' +
          SKILL_MP_COST +
          ' MP) e causa ' +
          damage +
          ' de dano!'
      );

      if (combat.monsterHp <= 0) {
        resolveMonsterDefeated();
        return;
      }

      runMonsterTurn();
    },

    toggleItemPicker() {
      const state = Game.State.get();
      if (!state || !state.activeCombat || state.activeCombat.resolved) return;
      state.activeCombat.showItemPicker = !state.activeCombat.showItemPicker;
      Game.State.save();
    },

    playerUseItem(itemId) {
      const state = Game.State.get();
      if (!state || !state.activeCombat || state.activeCombat.resolved) return;

      const combat = state.activeCombat;
      const result = Game.Inventory.useConsumable(itemId);
      combat.showItemPicker = false;

      if (!result.ok) {
        combat.log.push(result.message);
        Game.State.save();
        return;
      }

      combat.log.push('Turno ' + combat.round + ': ' + result.message);
      runMonsterTurn();
    },

    playerFlee() {
      const state = Game.State.get();
      if (!state || !state.activeCombat || state.activeCombat.resolved) return;

      const combat = state.activeCombat;
      const monster = Game.Data.monstersById[combat.monsterId];
      const stats = Game.State.getComputedStats();

      combat.showItemPicker = false;
      const baseChance = monster.isBoss ? 0.55 : 0.7;
      const fleeChance = Math.min(0.95, Math.max(0.4, baseChance + (stats.moxie - monster.attack) * 0.04));

      if (Math.random() <= fleeChance) {
        state.activeCombat = null;
        state.currentView = 'map';
        Game.State.save();
        return { fled: true, message: 'Você fugiu em segurança de ' + monster.name + '.' };
      }

      combat.log.push('Você tentou fugir, mas tropeçou na própria capa!');
      runMonsterTurn();
      return { fled: false };
    },

    canProposeTruce() {
      const state = Game.State.get();
      if (!state || !state.activeCombat || state.activeCombat.resolved) return null;
      const combat = state.activeCombat;
      const monster = Game.Data.monstersById[combat.monsterId];
      if (!monster || !monster.isBoss) return null;

      const medallion = hasPeaceMedallion();
      const weakened = combat.monsterHp <= Math.ceil(combat.monsterMaxHp * 0.5);
      const canPayFeast = state.meat >= 50;

      return {
        medallion: medallion,
        weakened: weakened,
        canPayFeast: canPayFeast,
        available: medallion || weakened || canPayFeast
      };
    },

    playerProposeTruce() {
      const state = Game.State.get();
      const check = this.canProposeTruce();
      if (!check) return;

      const combat = state.activeCombat;
      if (!check.available) {
        combat.log.push(
          'O Barão recusa a trégua agora! Enfraqueça-o até 50% de HP, traga o Medalhão da Diplomacia ou tenha 50 Meat para oferecer um banquete.'
        );
        Game.State.save();
        return;
      }

      let reason = '';
      if (check.medallion) {
        reason =
          'Você ergue o Medalhão da Diplomacia! O Barão do Espaguete reconhece o símbolo antigo e aceita dividir o Reino em paz (Empate Diplomático).';
      } else if (check.weakened) {
        reason =
          'Exausto e respeitando sua força, o Barão do Espaguete abaixa o garfo gigante e propõe um tratado de paz mútuo (Empate Diplomático).';
      } else {
        state.meat -= 50;
        reason =
          'Você oferece 50 Meat para um banquete conjunto de espaguete! Vocês assinam uma trégua cordial (Empate Diplomático).';
      }

      combat.resolved = true;
      combat.outcome = 'draw';
      Game.State.triggerEndgame('draw', 'Empate por Trégua Mútua!', reason);
    },

    finishResolvedCombat() {
      const state = Game.State.get();
      if (!state) return;

      state.activeCombat = null;

      if (state.adventures <= 0 && !state.endgame) {
        Game.State.triggerEndgame(
          'defeat',
          'Fim das Aventuras (Derrota)!',
          'Suas Adventures chegaram a 0 antes de concluir a missão contra o Barão do Espaguete.'
        );
        return;
      }

      state.currentView = 'map';
      Game.State.save();
    }
  };
})(window.Game);
