// Estado global, cálculo de atributos, nível, pontuação e persistência em localStorage.
window.Game = window.Game || {};

(function (Game) {
  const STORAGE_KEY = 'kol_uem_save_v2';
  const INITIAL_ADVENTURES = 30;
  const INITIAL_MEAT = 50;

  const CLASSES = {
    seal_clubber: {
      id: 'seal_clubber',
      name: 'Domador de Focas',
      primaryStat: 'muscle',
      skillName: 'Pancada Sísmica',
      description: 'Força bruta, HP elevado e golpes pesados.',
      baseStats: { muscle: 8, mysticality: 5, moxie: 6 },
      starterEquipment: { weapon: 'wooden_club' },
      starterInventory: { meat_paste_snack: 2 }
    },
    pastamancer: {
      id: 'pastamancer',
      name: 'Pastamancer',
      primaryStat: 'mysticality',
      skillName: 'Lança de Ravióli',
      description: 'Artes culinárias arcanas, alto MP e feitiços.',
      baseStats: { muscle: 5, mysticality: 8, moxie: 6 },
      starterEquipment: { hat: 'colander_hat' },
      starterInventory: { espresso_shot: 2, raw_noodles: 1 }
    },
    disco_bandit: {
      id: 'disco_bandit',
      name: 'Bandido do Disco',
      primaryStat: 'moxie',
      skillName: 'Piruetas Cortantes',
      description: 'Esquiva alta, agilidade e facilidade para fugir.',
      baseStats: { muscle: 6, mysticality: 5, moxie: 8 },
      starterEquipment: { pants: 'cargo_pants' },
      starterInventory: { meat_paste_snack: 1, espresso_shot: 1 }
    }
  };

  let current = null;

  function computeStats(state) {
    if (!state) {
      return {
        muscle: 0, mysticality: 0, moxie: 0,
        baseMuscle: 0, baseMysticality: 0, baseMoxie: 0,
        maxHp: 10, maxMp: 6, attack: 0, defense: 0
      };
    }

    const b = { muscle: 0, mysticality: 0, moxie: 0, attack: 0, defense: 0, maxHp: 0, maxMp: 0 };
    for (const slot of Object.keys(state.equipment)) {
      const item = Game.Data.itemsById[state.equipment[slot]];
      if (!item || !item.bonuses) continue;
      for (const k of Object.keys(b)) {
        b[k] += item.bonuses[k] || 0;
      }
    }

    const muscle = state.stats.muscle + b.muscle;
    const mysticality = state.stats.mysticality + b.mysticality;
    const moxie = state.stats.moxie + b.moxie;

    return {
      muscle,
      mysticality,
      moxie,
      baseMuscle: state.stats.muscle,
      baseMysticality: state.stats.mysticality,
      baseMoxie: state.stats.moxie,
      maxHp: 10 + muscle * 2 + b.maxHp,
      maxMp: 6 + mysticality * 2 + b.maxMp,
      attack: muscle + b.attack,
      defense: moxie + b.defense
    };
  }

  function substatThreshold(baseValue) {
    return Math.max(4, baseValue * 2);
  }

  Game.State = {
    CLASSES,
    INITIAL_ADVENTURES,

    get: () => current,
    getComputedStats: () => computeStats(current),
    getSubstatThreshold: substatThreshold,

    createNewGame(playerName, classId) {
      const cls = CLASSES[classId] || CLASSES.seal_clubber;
      const state = {
        started: true,
        name: (playerName || '').trim() || 'Aventureiro',
        classId: cls.id,
        className: cls.name,
        level: 1,
        stats: { ...cls.baseStats },
        substats: { muscle: 0, mysticality: 0, moxie: 0 },
        hp: 0,
        mp: 0,
        meat: INITIAL_MEAT,
        adventures: INITIAL_ADVENTURES,
        equipment: { hat: null, weapon: null, armor: null, pants: null, accessory: null, ...cls.starterEquipment },
        inventory: { ...cls.starterInventory },
        monstersDefeated: 0,
        eventsResolved: 0,
        questText: 'Derrotar o Barão do Espaguete Supremo no Pico do Boss',
        lastAdventureId: null,
        currentView: 'map',
        activeCombat: null,
        activeEvent: null,
        endgame: null
      };

      const stats = computeStats(state);
      state.hp = stats.maxHp;
      state.mp = stats.maxMp;
      current = state;
      return current;
    },

    clampVitals() {
      if (!current) return;
      const stats = computeStats(current);
      current.hp = Math.max(0, Math.min(current.hp, stats.maxHp));
      current.mp = Math.max(0, Math.min(current.mp, stats.maxMp));
    },

    addSubstats(gain) {
      if (!current || !gain) return [];
      const msgs = [];

      for (const stat of ['muscle', 'mysticality', 'moxie']) {
        const amount = gain[stat] || 0;
        if (amount <= 0) continue;
        current.substats[stat] += amount;

        while (current.substats[stat] >= substatThreshold(current.stats[stat])) {
          current.substats[stat] -= substatThreshold(current.stats[stat]);
          current.stats[stat] += 1;
          msgs.push(`Você ganhou um ponto de ${stat} (${current.stats[stat]}).`);
        }
      }

      const totalBase = current.stats.muscle + current.stats.mysticality + current.stats.moxie;
      const newLevel = 1 + Math.floor(Math.max(0, totalBase - 19) / 4);
      if (newLevel > current.level) {
        current.level = newLevel;
        const stats = computeStats(current);
        current.hp = Math.min(stats.maxHp, current.hp + 6);
        current.mp = Math.min(stats.maxMp, current.mp + 4);
        msgs.push(`Você subiu para o Level ${newLevel}! (+6 HP, +4 MP)`);
      }

      this.clampVitals();
      return msgs;
    },

    getScoreBreakdown() {
      if (!current) {
        return { meat: 0, adventuresBonus: 0, combatBonus: 0, outcomeBonus: 0, total: 0 };
      }
      const meat = current.meat;
      const adventuresBonus = current.adventures * 50;
      const combatBonus = current.monstersDefeated * 100;
      let outcomeBonus = 0;
      if (current.endgame?.result === 'victory') outcomeBonus = 500;
      else if (current.endgame?.result === 'draw') outcomeBonus = 200;

      return {
        meat,
        adventuresBonus,
        combatBonus,
        outcomeBonus,
        total: meat + adventuresBonus + combatBonus + outcomeBonus
      };
    },

    setView(viewName) {
      if (current) current.currentView = viewName;
    },

    triggerEndgame(result, title, reason) {
      if (!current) return;
      current.endgame = { result, title, reason };
      current.activeCombat = null;
      current.activeEvent = null;
      current.currentView = 'endgame';

      if (result === 'victory') current.questText = 'Missão cumprida! O Reino foi salvo.';
      else if (result === 'draw') current.questText = 'Campanha encerrada em empate histórico.';
      else current.questText = 'Aventura encerrada em derrota.';
    },

    checkOutOfAdventures() {
      if (!current || current.endgame || current.adventures > 0) return false;
      const busy =
        (current.activeCombat && !current.activeCombat.resolved) ||
        (current.activeEvent && !current.activeEvent.resolved);
      if (busy) return false;

      this.triggerEndgame(
        'defeat',
        'Fim das Aventuras!',
        'Suas Adventures chegaram a 0 antes de resolver a missão do Barão do Espaguete.'
      );
      return true;
    },

    save() {
      if (!current) return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
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
        current = parsed;
        return current;
      } catch (err) {
        return null;
      }
    },

    hasSavedGame() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        return Boolean(parsed && parsed.started);
      } catch (err) {
        return false;
      }
    },

    clearSave() {
      current = null;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.warn('Erro ao limpar localStorage:', err);
      }
    }
  };
})(window.Game);
