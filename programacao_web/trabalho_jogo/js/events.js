// Motor de encontros narrativos (não persiste nem toca no DOM).
window.Game = window.Game || {};

(function (Game) {
  Game.Events = {
    start(eventId, locationId) {
      const state = Game.State.get();
      const def = Game.Data.eventsById[eventId];
      if (!state || !def) return;

      state.activeEvent = {
        eventId: def.id,
        locationId,
        resolved: false,
        resultLines: [],
        gainedItems: []
      };
      state.currentView = 'event';
    },

    canChoose(choice) {
      const state = Game.State.get();
      if (!state || !choice) return false;
      if (choice.costMeat && state.meat < choice.costMeat) return false;
      if (choice.requiresItem && Game.Inventory.count(choice.requiresItem) < 1) return false;
      return true;
    },

    choose(choiceIndex) {
      const state = Game.State.get();
      const active = state?.activeEvent;
      if (!active || active.resolved) return null;

      const def = Game.Data.eventsById[active.eventId];
      const choice = def?.choices?.[choiceIndex];
      if (!choice) return null;

      if (!this.canChoose(choice)) {
        return { ok: false, message: 'Requisitos insuficientes para esta escolha.' };
      }

      if (choice.costMeat) state.meat -= choice.costMeat;

      const out = choice.outcomes || {};
      const lines = [];
      const gainedItems = [];
      const stats = Game.State.getComputedStats();

      if (out.text) lines.push(out.text);

      if (out.hpDelta) {
        state.hp = Math.max(0, Math.min(stats.maxHp, state.hp + out.hpDelta));
        lines.push(out.hpDelta > 0 ? `Você ganhou ${out.hpDelta} HP.` : `Você perdeu ${Math.abs(out.hpDelta)} HP.`);
      }

      if (out.mpDelta) {
        state.mp = Math.max(0, Math.min(stats.maxMp, state.mp + out.mpDelta));
        lines.push(out.mpDelta > 0 ? `Você ganhou ${out.mpDelta} MP.` : `Você perdeu ${Math.abs(out.mpDelta)} MP.`);
      }

      if (out.meatDelta) {
        state.meat = Math.max(0, state.meat + out.meatDelta);
        lines.push(out.meatDelta > 0 ? `Você ganhou ${out.meatDelta} Meat.` : `Você perdeu ${Math.abs(out.meatDelta)} Meat.`);
      }

      for (const itemId of out.giveItems || []) {
        if (Game.Inventory.add(itemId, 1)) {
          gainedItems.push(itemId);
        }
      }

      if (out.statGain) {
        lines.push(...Game.State.addSubstats(out.statGain));
      }

      state.eventsResolved += 1;
      active.resolved = true;
      active.resultLines = lines;
      active.gainedItems = gainedItems;

      if (state.hp <= 0) {
        Game.State.triggerEndgame(
          'defeat',
          'Derrota por Acidente!',
          `Seu HP chegou a 0 durante "${def.title}".`
        );
      } else if (out.triggerEndgame) {
        Game.State.triggerEndgame(
          out.triggerEndgame,
          out.endgameTitle || 'Fim de Jogo',
          out.text || 'A jornada chegou ao fim.'
        );
      }

      return { ok: true };
    },

    finish() {
      const state = Game.State.get();
      if (!state) return;
      state.activeEvent = null;
      state.currentView = 'map';
    }
  };
})(window.Game);
