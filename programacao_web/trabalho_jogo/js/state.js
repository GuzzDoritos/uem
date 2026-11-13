/**
 * js/state.js
 * Gerencia o estado global da partida, classes iniciais, cálculo de atributos
 * efetivos (stats + equipamentos), progressão de nível, pontuação e localStorage.
 */

window.Game = window.Game || {};

(function (Game) {
  'use strict';

  const STORAGE_KEY = 'kol_uem_save_v1';
  const INITIAL_ADVENTURES = 30;
  const INITIAL_MEAT = 50;

  const CLASSES = {
    seal_clubber: {
      id: 'seal_clubber',
      name: 'Domador de Focas',
      primaryStat: 'muscle',
      skillName: 'Pancada Sísmica',
      skillDesc: 'Ataque físico pesado impulsionado por Muscle (4 MP).',
      description: 'Especialista em força bruta, HP elevado e ataques corpo-a-corpo.',
      baseStats: { muscle: 8, mysticality: 5, moxie: 6 },
      starterEquipment: { weapon: 'wooden_club' },
      starterInventory: { meat_paste_snack: 2 }
    },
    pastamancer: {
      id: 'pastamancer',
      name: 'Pastamancer',
      primaryStat: 'mysticality',
      skillName: 'Lança de Ravióli',
      skillDesc: 'Rajada arcana de massa escaldante baseada em Mysticality (4 MP).',
      description: 'Mestre das artes culinárias arcanas, alto MP e habilidades mágicas.',
      baseStats: { muscle: 5, mysticality: 8, moxie: 6 },
      starterEquipment: { hat: 'colander_hat' },
      starterInventory: { espresso_shot: 2, raw_noodles: 1 }
    },
    disco_bandit: {
      id: 'disco_bandit',
      name: 'Bandido do Disco',
      primaryStat: 'moxie',
      skillName: 'Piruetas Cortantes',
      skillDesc: 'Golpe acrobático ágil escalado com Moxie + Mysticality (4 MP).',
      description: 'Ágil e estiloso, com ótima defesa/esquiva e facilidade para fugir.',
      baseStats: { muscle: 6, mysticality: 5, moxie: 8 },
      starterEquipment: { pants: 'cargo_pants' },
      starterInventory: { meat_paste_snack: 1, espresso_shot: 1 }
    }
  };

  let currentState = null;

  function createEmptyEquipment() {
    return {
      hat: null,
      weapon: null,
      armor: null,
      pants: null,
      accessory: null
    };
  }

  function computeStatsFrom(state) {
    if (!state) {
      return {
        muscle: 0,
        mysticality: 0,
        moxie: 0,
        baseMuscle: 0,
        baseMysticality: 0,
        baseMoxie: 0,
        maxHp: 10,
        maxMp: 6,
        attack: 0,
        defense: 0
      };
    }

    const bonuses = {
      muscle: 0,
      mysticality: 0,
      moxie: 0,
      attack: 0,
      defense: 0,
      maxHp: 0,
      maxMp: 0
    };

    const slots = Object.keys(state.equipment);
    slots.forEach(function (slot) {
      const itemId = state.equipment[slot];
      if (!itemId) return;
      const item = Game.Data.itemsById[itemId];
      if (!item || !item.bonuses) return;
      Object.keys(bonuses).forEach(function (key) {
        if (typeof item.bonuses[key] === 'number') {
          bonuses[key] += item.bonuses[key];
        }
      });
    });

    const muscle = state.stats.muscle + bonuses.muscle;
    const mysticality = state.stats.mysticality + bonuses.mysticality;
    const moxie = state.stats.moxie + bonuses.moxie;

    return {
      muscle: muscle,
      mysticality: mysticality,
      moxie: moxie,
      baseMuscle: state.stats.muscle,
      baseMysticality: state.stats.mysticality,
      baseMoxie: state.stats.moxie,
      maxHp: 10 + muscle * 2 + bonuses.maxHp,
      maxMp: 6 + mysticality * 2 + bonuses.maxMp,
      attack: muscle + bonuses.attack,
      defense: moxie + bonuses.defense
    };
  }

  function getSubstatThreshold(baseValue) {
    return Math.max(4, baseValue * 2);
  }

  Game.State = {
    CLASSES: CLASSES,
    INITIAL_ADVENTURES: INITIAL_ADVENTURES,

    get() {
      return currentState;
    },

    createNewGame(playerName, classId) {
      const cls = CLASSES[classId] || CLASSES.seal_clubber;
      const cleanName = (playerName || '').trim() || 'Aventureiro Palito';

      const state = {
        started: true,
        name: cleanName,
        classId: cls.id,
        className: cls.name,
        level: 1,
        stats: {
          muscle: cls.baseStats.muscle,
          mysticality: cls.baseStats.mysticality,
          moxie: cls.baseStats.moxie
        },
        substats: {
          muscle: 0,
          mysticality: 0,
          moxie: 0
        },
        hp: 0,
        mp: 0,
        meat: INITIAL_MEAT,
        adventures: INITIAL_ADVENTURES,
        equipment: Object.assign(createEmptyEquipment(), cls.starterEquipment),
        inventory: Object.assign({}, cls.starterInventory),
        monstersDefeated: 0,
        eventsResolved: 0,
        questText: 'Derrotar o Barão do Espaguete Supremo no Pico do Boss',
        lastAdventureId: null,
        currentView: 'map',
        activeCombat: null,
        activeEvent: null,
        endgame: null
      };

      const computed = computeStatsFrom(state);
      state.hp = computed.maxHp;
      state.mp = computed.maxMp;

      currentState = state;
      this.save();
      return currentState;
    },

    getComputedStats() {
      return computeStatsFrom(currentState);
    },

    getSubstatThreshold: getSubstatThreshold,

    clampVitals() {
      if (!currentState) return;
      const computed = computeStatsFrom(currentState);
      currentState.hp = Math.max(0, Math.min(currentState.hp, computed.maxHp));
      currentState.mp = Math.max(0, Math.min(currentState.mp, computed.maxMp));
    },

    addSubstats(gain) {
      if (!currentState || !gain) return [];
      const messages = [];
      const keys = ['muscle', 'mysticality', 'moxie'];

      keys.forEach(function (stat) {
        const amount = gain[stat] || 0;
        if (amount <= 0) return;
        currentState.substats[stat] += amount;

        while (currentState.substats[stat] >= getSubstatThreshold(currentState.stats[stat])) {
          currentState.substats[stat] -= getSubstatThreshold(currentState.stats[stat]);
          currentState.stats[stat] += 1;
          messages.push('Seu atributo ' + stat + ' subiu para ' + currentState.stats[stat] + '!');
        }
      });

      const totalBase =
        currentState.stats.muscle +
        currentState.stats.mysticality +
        currentState.stats.moxie;
      const newLevel = 1 + Math.floor(Math.max(0, totalBase - 19) / 4);

      if (newLevel > currentState.level) {
        currentState.level = newLevel;
        const computed = computeStatsFrom(currentState);
        currentState.hp = Math.min(computed.maxHp, currentState.hp + 6);
        currentState.mp = Math.min(computed.maxMp, currentState.mp + 4);
        messages.push('LEVEL UP! Você alcançou o Nível ' + newLevel + ' (+6 HP, +4 MP)!');
      }

      this.clampVitals();
      return messages;
    },

    getScoreBreakdown() {
      if (!currentState) {
        return { meat: 0, adventuresBonus: 0, combatBonus: 0, outcomeBonus: 0, total: 0 };
      }

      const meatScore = currentState.meat;
      const adventuresBonus = currentState.adventures * 50;
      const combatBonus = currentState.monstersDefeated * 100;
      let outcomeBonus = 0;

      if (currentState.endgame) {
        if (currentState.endgame.result === 'victory') outcomeBonus = 500;
        else if (currentState.endgame.result === 'draw') outcomeBonus = 200;
      }

      return {
        meat: meatScore,
        adventuresBonus: adventuresBonus,
        combatBonus: combatBonus,
        outcomeBonus: outcomeBonus,
        total: meatScore + adventuresBonus + combatBonus + outcomeBonus
      };
    },

    setView(viewName) {
      if (!currentState) return;
      currentState.currentView = viewName;
      this.save();
    },

    triggerEndgame(result, title, reason) {
      if (!currentState) return;
      currentState.endgame = {
        result: result, // 'victory' | 'draw' | 'defeat'
        title: title,
        reason: reason
      };
      currentState.activeCombat = null;
      currentState.activeEvent = null;
      currentState.currentView = 'endgame';

      if (result === 'victory') {
        currentState.questText = 'Missão cumprida! O Reino foi salvo.';
      } else if (result === 'draw') {
        currentState.questText = 'Campanha encerrada em empate histórico.';
      } else {
        currentState.questText = 'Aventura encerrada em derrota.';
      }

      this.save();
    },

    save() {
      if (!currentState) return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
      } catch (err) {
        console.warn('Erro ao salvar no localStorage:', err);
      }
    },

    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.started) return null;
        currentState = parsed;
        return currentState;
      } catch (err) {
        console.warn('Erro ao carregar save do localStorage:', err);
        return null;
      }
    },

    hasSavedGame() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const parsed = JSON.parse(raw);
        return Boolean(parsed && parsed.started);
      } catch (err) {
        return false;
      }
    },

    clearSave() {
      currentState = null;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.warn('Erro ao limpar localStorage:', err);
      }
    }
  };
})(window.Game);
