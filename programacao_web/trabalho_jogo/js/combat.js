// Motor de combate em turnos (não persiste nem toca no DOM).
window.Game = window.Game || {};

(function (Game) {
  const SKILL_MP_COST = 4;

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function hasPeaceMedallion() {
    const state = Game.State.get();
    return Boolean(
      state &&
        (state.equipment.accessory === 'peace_medallion' || Game.Inventory.count('peace_medallion') > 0)
    );
  }

  function monsterTurn() {
    const state = Game.State.get();
    const combat = state.activeCombat;
    const monster = Game.Data.monstersById[combat.monsterId];
    const stats = Game.State.getComputedStats();

    const dodgeChance = Math.min(0.35, Math.max(0.05, (stats.moxie - monster.attack) * 0.03 + 0.08));
    if (Math.random() < dodgeChance) {
      combat.log.push(`${monster.attackText} Você se esquivou!`);
    } else {
      const damage = Math.max(1, monster.attack + randomInt(-1, 2) - Math.floor(stats.defense * 0.55));
      state.hp = Math.max(0, state.hp - damage);
      combat.log.push(`${monster.attackText} Você perdeu ${damage} HP.`);
    }

    if (state.hp <= 0) {
      combat.resolved = true;
      combat.outcome = 'defeat';
      Game.State.triggerEndgame(
        'defeat',
        'Derrota em Combate!',
        `Você chegou a 0 HP enfrentando ${monster.name}.`
      );
      return;
    }

    combat.round += 1;
  }

  function resolveVictory() {
    const state = Game.State.get();
    const combat = state.activeCombat;
    const monster = Game.Data.monstersById[combat.monsterId];

    combat.log.push(monster.defeatText);

    // Dano de explosão/contra-ataque ao morrer permite empate por nocaute mútuo no Boss
    if (monster.specialOnZeroHp?.recoilDamage > 0) {
      state.hp = Math.max(0, state.hp - monster.specialOnZeroHp.recoilDamage);
      combat.log.push(monster.specialOnZeroHp.text);
    }

    state.monstersDefeated += 1;
    const meatWon = randomInt(monster.meatDrop[0], monster.meatDrop[1]);
    state.meat += meatWon;
    const levelMsgs = Game.State.addSubstats(monster.statGain);

    if (monster.isBoss) {
      combat.resolved = true;
      if (state.hp <= 0) {
        combat.outcome = 'draw';
        Game.State.triggerEndgame(
          'draw',
          'Nocaute Mútuo!',
          `Você derrotou o ${monster.name}, mas o golpe final dele reduziu seu HP a 0 no mesmo turno.`
        );
      } else {
        combat.outcome = 'victory';
        Game.State.triggerEndgame(
          'victory',
          'Vitória no Reino de Loathing!',
          `Você derrotou o ${monster.name} com ${state.hp} HP restantes e salvou o reino.`
        );
      }
      return;
    }

    combat.log.push('Você venceu a luta!');
    combat.log.push(`Você ganhou ${meatWon} Meat.`);

    for (const drop of monster.drops || []) {
      if (Math.random() <= drop.chance && Game.Inventory.add(drop.itemId, 1)) {
        const item = Game.Data.itemsById[drop.itemId];
        if (item) combat.log.push(`Você recebeu um item: ${item.name}`);
      }
    }
    for (const msg of levelMsgs) {
      combat.log.push(msg);
    }

    combat.resolved = true;
    combat.outcome = 'win';
  }

  Game.Combat = {
    SKILL_MP_COST,

    start(monsterId, locationId) {
      const state = Game.State.get();
      const monster = Game.Data.monstersById[monsterId];
      if (!state || !monster) return;

      state.activeCombat = {
        monsterId: monster.id,
        locationId,
        monsterHp: monster.hp,
        monsterMaxHp: monster.hp,
        round: 1,
        resolved: false,
        outcome: null,
        log: [monster.introText]
      };
      state.currentView = 'combat';
    },

    attack() {
      const state = Game.State.get();
      const combat = state?.activeCombat;
      if (!combat || combat.resolved) return;

      const monster = Game.Data.monstersById[combat.monsterId];
      const stats = Game.State.getComputedStats();
      const damage = Math.max(2, stats.attack - monster.defense + randomInt(0, 3));

      combat.monsterHp = Math.max(0, combat.monsterHp - damage);
      combat.log.push(`Você ataca ${monster.name} causando ${damage} de dano.`);

      if (combat.monsterHp <= 0) resolveVictory();
      else monsterTurn();
    },

    skill() {
      const state = Game.State.get();
      const combat = state?.activeCombat;
      if (!combat || combat.resolved) return;

      const monster = Game.Data.monstersById[combat.monsterId];
      const stats = Game.State.getComputedStats();
      const cls = Game.State.CLASSES[state.classId] || Game.State.CLASSES.seal_clubber;

      if (state.mp < SKILL_MP_COST) {
        combat.log.push(`MP insuficiente para ${cls.skillName} (precisa de ${SKILL_MP_COST} MP).`);
        return;
      }

      state.mp -= SKILL_MP_COST;
      const raw = Math.floor(stats.mysticality * 1.1 + (stats[cls.primaryStat] || 0) * 0.7) + randomInt(2, 5);
      const damage = Math.max(5, raw - Math.floor(monster.defense * 0.5));

      combat.monsterHp = Math.max(0, combat.monsterHp - damage);
      combat.log.push(`Você usa ${cls.skillName} (-${SKILL_MP_COST} MP) causando ${damage} de dano.`);

      if (combat.monsterHp <= 0) resolveVictory();
      else monsterTurn();
    },

    useItem(itemId) {
      const state = Game.State.get();
      const combat = state?.activeCombat;
      if (!combat || combat.resolved) return;

      const res = Game.Inventory.use(itemId);
      combat.log.push(res.message);
      if (res.ok) monsterTurn();
    },

    flee() {
      const state = Game.State.get();
      const combat = state?.activeCombat;
      if (!combat || combat.resolved) return null;

      const monster = Game.Data.monstersById[combat.monsterId];
      const stats = Game.State.getComputedStats();
      const base = monster.isBoss ? 0.55 : 0.7;
      const chance = Math.min(0.95, Math.max(0.4, base + (stats.moxie - monster.attack) * 0.04));

      if (Math.random() <= chance) {
        state.activeCombat = null;
        state.currentView = 'map';
        return { fled: true, message: `Você fugiu de ${monster.name}.` };
      }

      combat.log.push('Você tentou fugir, mas tropeçou na própria capa!');
      monsterTurn();
      return { fled: false };
    },

    canTruce() {
      const state = Game.State.get();
      const combat = state?.activeCombat;
      if (!combat || combat.resolved) return null;
      const monster = Game.Data.monstersById[combat.monsterId];
      if (!monster?.isBoss) return null;

      const medallion = hasPeaceMedallion();
      const weakened = combat.monsterHp <= Math.ceil(combat.monsterMaxHp * 0.5);
      const canPayFeast = state.meat >= 50;
      return {
        medallion,
        weakened,
        canPayFeast,
        available: medallion || weakened || canPayFeast
      };
    },

    truce() {
      const state = Game.State.get();
      const check = this.canTruce();
      if (!check) return;

      const combat = state.activeCombat;
      if (!check.available) {
        combat.log.push(
          'O Barão recusa a trégua! Enfraqueça-o até 50% de HP, traga o Medalhão da Diplomacia ou tenha 50 Meat.'
        );
        return;
      }

      let reason;
      if (check.medallion) {
        reason = 'Você ergueu o Medalhão da Diplomacia e selou um acordo de paz com o Barão do Espaguete.';
      } else if (check.weakened) {
        reason = 'Enfraquecido pela luta, o Barão abaixou o garfo gigante e aceitou uma trégua mútua.';
      } else {
        state.meat -= 50;
        reason = 'Você ofereceu 50 Meat para um banquete conjunto de espaguete e assinaram a trégua.';
      }

      combat.resolved = true;
      combat.outcome = 'draw';
      Game.State.triggerEndgame('draw', 'Empate por Trégua Mútua!', reason);
    },

    finish() {
      const state = Game.State.get();
      if (!state) return;
      state.activeCombat = null;
      state.currentView = 'map';
    }
  };
})(window.Game);
