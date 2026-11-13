/**
 * js/events.js
 * Motor de encontros narrativos (não-combate) carregados de events.json.
 */

window.Game = window.Game || {};

(function (Game) {
  'use strict';

  Game.Events = {
    startEvent(eventId, locationId) {
      const state = Game.State.get();
      const eventDef = Game.Data.eventsById[eventId];
      if (!state || !eventDef) return;

      state.activeEvent = {
        eventId: eventDef.id,
        locationId: locationId,
        resolved: false,
        resultLines: []
      };
      state.currentView = 'event';
      Game.State.save();
    },

    canSelectChoice(choice) {
      const state = Game.State.get();
      if (!state || !choice) return false;
      if (choice.costMeat && state.meat < choice.costMeat) return false;
      if (choice.requiresItem && Game.Inventory.getItemCount(choice.requiresItem) < 1) {
        return false;
      }
      return true;
    },

    chooseOption(choiceIndex) {
      const state = Game.State.get();
      if (!state || !state.activeEvent || state.activeEvent.resolved) return;

      const eventDef = Game.Data.eventsById[state.activeEvent.eventId];
      const choice = eventDef && eventDef.choices[choiceIndex];
      if (!choice) return;

      if (!this.canSelectChoice(choice)) {
        return { ok: false, message: 'Você não atende aos requisitos para esta escolha.' };
      }

      if (choice.costMeat) {
        state.meat -= choice.costMeat;
      }

      const out = choice.outcomes || {};
      const lines = [];
      if (out.text) lines.push(out.text);

      const computed = Game.State.getComputedStats();

      if (typeof out.hpDelta === 'number' && out.hpDelta !== 0) {
        state.hp = Math.max(0, Math.min(computed.maxHp, state.hp + out.hpDelta));
        lines.push((out.hpDelta > 0 ? '+' : '') + out.hpDelta + ' HP.');
      }

      if (typeof out.mpDelta === 'number' && out.mpDelta !== 0) {
        state.mp = Math.max(0, Math.min(computed.maxMp, state.mp + out.mpDelta));
        lines.push((out.mpDelta > 0 ? '+' : '') + out.mpDelta + ' MP.');
      }

      if (typeof out.meatDelta === 'number' && out.meatDelta !== 0) {
        state.meat = Math.max(0, state.meat + out.meatDelta);
        lines.push((out.meatDelta > 0 ? '+' : '') + out.meatDelta + ' Meat.');
      }

      if (Array.isArray(out.giveItems)) {
        out.giveItems.forEach(function (itemId) {
          if (Game.Inventory.addItem(itemId, 1)) {
            const item = Game.Data.itemsById[itemId];
            lines.push('Item obtido: ' + (item ? item.name : itemId) + '.');
          }
        });
      } else if (out.giveItem) {
        if (Game.Inventory.addItem(out.giveItem, 1)) {
          const item = Game.Data.itemsById[out.giveItem];
          lines.push('Item obtido: ' + (item ? item.name : out.giveItem) + '.');
        }
      }

      if (out.statGain) {
        const levelMsgs = Game.State.addSubstats(out.statGain);
        levelMsgs.forEach(function (msg) {
          lines.push(msg);
        });
      }

      state.eventsResolved += 1;
      state.activeEvent.resolved = true;
      state.activeEvent.resultLines = lines;

      if (state.hp <= 0) {
        Game.State.triggerEndgame(
          'defeat',
          'Derrota por Acidente!',
          'Seu HP chegou a 0 durante o evento "' + eventDef.title + '".'
        );
        return { ok: true };
      }

      if (out.triggerEndgame) {
        Game.State.triggerEndgame(
          out.triggerEndgame,
          out.endgameTitle || 'Fim de Jogo',
          out.text || 'A jornada chegou ao fim.'
        );
        return { ok: true };
      }

      Game.State.save();
      return { ok: true };
    },

    finishResolvedEvent() {
      const state = Game.State.get();
      if (!state) return;

      state.activeEvent = null;

      if (state.adventures <= 0 && !state.endgame) {
        Game.State.triggerEndgame(
          'defeat',
          'Fim das Aventuras (Derrota)!',
          'Suas Adventures terminaram antes de derrotar o Barão do Espaguete Supremo.'
        );
        return;
      }

      state.currentView = 'map';
      Game.State.save();
    }
  };
})(window.Game);
