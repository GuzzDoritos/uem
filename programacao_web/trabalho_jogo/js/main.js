/**
 * js/main.js
 * Ponto de entrada da aplicação: inicializa os dados JSON, conecta eventos de
 * mouse e atalhos de teclado e coordena a navegação entre telas.
 */

window.Game = window.Game || {};

(function (Game) {
  'use strict';

  let selectedClassId = 'seal_clubber';
  let transientView = null; // Usado para 'help' sem perder o estado da view atual

  function pickWeightedEncounter(encounters) {
    if (!Array.isArray(encounters) || encounters.length === 0) return null;
    const totalWeight = encounters.reduce(function (acc, item) {
      return acc + (item.weight || 1);
    }, 0);
    let roll = Math.random() * totalWeight;
    for (let i = 0; i < encounters.length; i += 1) {
      roll -= encounters[i].weight || 1;
      if (roll <= 0) return encounters[i];
    }
    return encounters[0];
  }

  function exploreLocation(locationId) {
    const state = Game.State.get();
    const loc = Game.Data.locationsById[locationId];
    if (!state || !loc || state.endgame) return;

    if (state.adventures <= 0) {
      Game.State.triggerEndgame(
        'defeat',
        'Fim das Aventuras (Derrota)!',
        'Você ficou sem Adventures antes de concluir a missão principal.'
      );
      Game.UI.render();
      return;
    }

    Game.UI.showToast('');
    state.adventures -= 1;
    state.lastAdventureId = loc.id;

    const encounter = pickWeightedEncounter(loc.encounters);
    if (!encounter) {
      Game.State.save();
      Game.UI.showToast('Você explorou ' + loc.shortLabel + ', mas não encontrou nada.');
      Game.UI.render();
      return;
    }

    if (encounter.kind === 'monster') {
      Game.Combat.startCombat(encounter.id, loc.id);
    } else if (encounter.kind === 'event') {
      Game.Events.startEvent(encounter.id, loc.id);
    }

    Game.UI.render();
  }

  function restAtCamp() {
    const state = Game.State.get();
    if (!state || state.endgame) return;

    if (state.adventures <= 0) {
      Game.UI.showToast('Sem Adventures suficientes para descansar.');
      return;
    }

    const computed = Game.State.getComputedStats();
    state.adventures -= 1;
    state.hp = computed.maxHp;
    state.mp = computed.maxMp;
    Game.State.save();

    if (state.adventures <= 0) {
      Game.State.triggerEndgame(
        'defeat',
        'Fim das Aventuras (Derrota)!',
        'Você gastou sua última Adventure descansando e o tempo da missão acabou.'
      );
      Game.UI.render();
      return;
    }

    Game.UI.showToast('Você descansou na barraca (-1 Adventure). HP e MP 100% restaurados!');
    Game.UI.render();
  }

  function navigateTo(viewName) {
    const state = Game.State.get();

    if (viewName === 'help') {
      if (transientView === 'help') {
        transientView = null;
        Game.UI.render(state ? state.currentView : 'title');
      } else {
        transientView = 'help';
        Game.UI.render('help');
      }
      return;
    }

    if (viewName === 'restart') {
      const confirmed = window.confirm('Deseja reiniciar a partida e apagar o progresso atual?');
      if (!confirmed) return;
      Game.State.clearSave();
      transientView = null;
      selectedClassId = 'seal_clubber';
      Game.UI.showToast('Partida reiniciada. Crie um novo personagem.');
      Game.UI.render('title');
      return;
    }

    if (!state || state.endgame) return;

    if (
      (state.activeCombat && !state.activeCombat.resolved) ||
      (state.activeEvent && !state.activeEvent.resolved)
    ) {
      Game.UI.showToast('Finalize ou fuja do encontro atual antes de navegar!');
      return;
    }

    transientView = null;
    Game.UI.showToast('');
    Game.State.setView(viewName);
    Game.UI.render();
  }

  function handleViewClick(event) {
    const target = event.target.closest('button');
    if (!target || target.disabled) return;

    const state = Game.State.get();

    // Seleção de classe na tela inicial
    if (target.hasAttribute('data-class-id')) {
      selectedClassId = target.getAttribute('data-class-id');
      const cards = document.querySelectorAll('#class-selector .class-card');
      cards.forEach(function (card) {
        card.classList.toggle('is-selected', card.getAttribute('data-class-id') === selectedClassId);
      });
      return;
    }

    if (target.id === 'btn-start-new') {
      const nameInput = document.getElementById('input-player-name');
      const playerName = nameInput ? nameInput.value : 'Aventureiro';
      Game.State.createNewGame(playerName, selectedClassId);
      transientView = null;
      Game.UI.showToast('Bem-vindo ao Reino! Explore os locais para ficar mais forte.');
      Game.UI.render();
      return;
    }

    if (target.id === 'btn-continue-save') {
      if (Game.State.load()) {
        transientView = null;
        Game.UI.showToast('Progresso carregado do localStorage.');
        Game.UI.render();
      }
      return;
    }

    if (target.id === 'btn-title-help') {
      navigateTo('help');
      return;
    }

    if (target.id === 'btn-help-back') {
      transientView = null;
      Game.UI.render(state ? state.currentView : 'title');
      return;
    }

    if (target.hasAttribute('data-explore')) {
      exploreLocation(target.getAttribute('data-explore'));
      return;
    }

    // Combate
    if (target.id === 'btn-combat-attack') {
      Game.Combat.playerAttack();
      Game.UI.render();
      return;
    }
    if (target.id === 'btn-combat-skill') {
      Game.Combat.playerSkill();
      Game.UI.render();
      return;
    }
    if (target.id === 'btn-combat-item') {
      Game.Combat.toggleItemPicker();
      Game.UI.render();
      return;
    }
    if (target.hasAttribute('data-combat-use-item')) {
      Game.Combat.playerUseItem(target.getAttribute('data-combat-use-item'));
      Game.UI.render();
      return;
    }
    if (target.id === 'btn-combat-flee') {
      const res = Game.Combat.playerFlee();
      if (res && res.fled) {
        Game.UI.showToast(res.message);
      }
      Game.UI.render();
      return;
    }
    if (target.id === 'btn-combat-truce') {
      Game.Combat.playerProposeTruce();
      Game.UI.render();
      return;
    }
    if (target.id === 'btn-combat-continue') {
      Game.Combat.finishResolvedCombat();
      Game.UI.render();
      return;
    }

    // Eventos
    if (target.hasAttribute('data-event-choice')) {
      const idx = parseInt(target.getAttribute('data-event-choice'), 10);
      const res = Game.Events.chooseOption(idx);
      if (res && !res.ok) {
        Game.UI.showToast(res.message);
      }
      Game.UI.render();
      return;
    }
    if (target.id === 'btn-event-continue') {
      Game.Events.finishResolvedEvent();
      Game.UI.render();
      return;
    }

    // Inventário e Equipamentos
    if (target.hasAttribute('data-use-item')) {
      const res = Game.Inventory.useConsumable(target.getAttribute('data-use-item'));
      Game.UI.showToast(res.message);
      Game.UI.render();
      return;
    }
    if (target.hasAttribute('data-equip-item')) {
      const res = Game.Inventory.equipItem(target.getAttribute('data-equip-item'));
      Game.UI.showToast(res.message);
      Game.UI.render();
      return;
    }
    if (target.hasAttribute('data-unequip')) {
      const res = Game.Inventory.unequipSlot(target.getAttribute('data-unequip'));
      Game.UI.showToast(res.message);
      Game.UI.render();
      return;
    }

    // Crafting
    if (target.id === 'btn-craft-combine') {
      const selA = document.getElementById('craft-select-a');
      const selB = document.getElementById('craft-select-b');
      const res = Game.Inventory.craftByIngredients(
        selA ? selA.value : '',
        selB ? selB.value : ''
      );
      Game.UI.showToast(res.message);
      Game.UI.render();
      return;
    }
    if (target.hasAttribute('data-craft-recipe')) {
      const res = Game.Inventory.craftByRecipe(target.getAttribute('data-craft-recipe'));
      Game.UI.showToast(res.message);
      Game.UI.render();
      return;
    }

    // Acampamento
    if (target.id === 'btn-camp-rest') {
      restAtCamp();
      return;
    }
    if (target.id === 'btn-camp-map') {
      navigateTo('map');
      return;
    }

    // Fim de Jogo -> Reiniciar
    if (target.id === 'btn-endgame-restart') {
      Game.State.clearSave();
      transientView = null;
      selectedClassId = 'seal_clubber';
      Game.UI.showToast('Nova partida pronta! Escolha sua classe.');
      Game.UI.render('title');
    }
  }

  function handleKeydown(event) {
    const tag = event.target && event.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
      if (event.key === 'Enter' && event.target.id === 'input-player-name') {
        const startBtn = document.getElementById('btn-start-new');
        if (startBtn) startBtn.click();
      }
      return;
    }

    const key = event.key.toLowerCase();
    const state = Game.State.get();
    const activeView = transientView || (state ? state.currentView : 'title');

    if (key === 'h' || key === 'escape') {
      if (activeView === 'combat' && state && state.activeCombat && state.activeCombat.showItemPicker && key === 'escape') {
        Game.Combat.toggleItemPicker();
        Game.UI.render();
        return;
      }
      event.preventDefault();
      navigateTo('help');
      return;
    }

    if (activeView === 'help') {
      if (key === 'enter' || key === ' ') {
        event.preventDefault();
        transientView = null;
        Game.UI.render(state ? state.currentView : 'title');
      }
      return;
    }

    if (key === 'm') {
      event.preventDefault();
      navigateTo('map');
      return;
    }
    if (key === 'i') {
      event.preventDefault();
      navigateTo('inventory');
      return;
    }
    if (key === 'c') {
      event.preventDefault();
      navigateTo('crafting');
      return;
    }
    if (key === 'r') {
      event.preventDefault();
      navigateTo('camp');
      return;
    }

    if (!state) return;

    // Avançar com Enter ou Espaço após resolver combate/evento
    if (key === 'enter' || key === ' ') {
      if (activeView === 'combat' && state.activeCombat && state.activeCombat.resolved) {
        event.preventDefault();
        Game.Combat.finishResolvedCombat();
        Game.UI.render();
        return;
      }
      if (activeView === 'event' && state.activeEvent && state.activeEvent.resolved) {
        event.preventDefault();
        Game.Events.finishResolvedEvent();
        Game.UI.render();
        return;
      }
    }

    // Atalhos numéricos 1..5 contextuais
    if (/^[1-5]$/.test(key)) {
      const num = parseInt(key, 10);

      if (activeView === 'map') {
        const loc = Game.Data.locations[num - 1];
        if (loc) {
          event.preventDefault();
          exploreLocation(loc.id);
        }
        return;
      }

      if (activeView === 'combat' && state.activeCombat && !state.activeCombat.resolved) {
        event.preventDefault();
        if (state.activeCombat.showItemPicker) {
          const consumables = Game.Inventory.getConsumables();
          const chosen = consumables[num - 1];
          if (chosen) {
            Game.Combat.playerUseItem(chosen.item.id);
            Game.UI.render();
          }
          return;
        }
        if (num === 1) Game.Combat.playerAttack();
        else if (num === 2) Game.Combat.playerSkill();
        else if (num === 3) Game.Combat.toggleItemPicker();
        else if (num === 4) {
          const res = Game.Combat.playerFlee();
          if (res && res.fled) Game.UI.showToast(res.message);
        } else if (num === 5 && Game.Combat.canProposeTruce()) {
          Game.Combat.playerProposeTruce();
        }
        Game.UI.render();
        return;
      }

      if (activeView === 'event' && state.activeEvent && !state.activeEvent.resolved) {
        event.preventDefault();
        const res = Game.Events.chooseOption(num - 1);
        if (res && !res.ok) Game.UI.showToast(res.message);
        Game.UI.render();
        return;
      }

      if (activeView === 'camp' && num === 1) {
        event.preventDefault();
        restAtCamp();
      }
    }
  }

  async function bootstrap() {
    Game.UI.init();
    await Game.DataLoader.loadAll();

    // Eventos da barra superior
    const topNav = document.querySelector('.top-nav');
    if (topNav) {
      topNav.addEventListener('click', function (event) {
        const btn = event.target.closest('button[data-nav]');
        if (!btn || btn.disabled) return;
        navigateTo(btn.getAttribute('data-nav'));
      });
    }

    // Evento "Last Adventure" na sidebar
    const lastAdvBtn = document.getElementById('btn-last-adventure');
    if (lastAdvBtn) {
      lastAdvBtn.addEventListener('click', function () {
        const state = Game.State.get();
        if (state && state.lastAdventureId && !lastAdvBtn.disabled) {
          exploreLocation(state.lastAdventureId);
        }
      });
    }

    // Delegação de cliques do painel central
    const viewContainer = document.getElementById('view-container');
    if (viewContainer) {
      viewContainer.addEventListener('click', handleViewClick);
    }

    document.addEventListener('keydown', handleKeydown);

    // Exibe a Tela Inicial sempre ao abrir (com botão Continuar caso haja save)
    Game.UI.render('title');
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
})(window.Game);
