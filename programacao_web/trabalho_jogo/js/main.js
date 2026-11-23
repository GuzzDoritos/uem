// Ponto de entrada: tabela de ações (data-action), atalhos de teclado e persistência única.
window.Game = window.Game || {};

(function (Game) {
  let selectedClassId = 'seal_clubber';
  let showingHelp = false;

  function currentView() {
    if (showingHelp) return 'help';
    return Game.State.get()?.currentView || 'title';
  }

  function isEncounterBusy() {
    const state = Game.State.get();
    return Boolean(
      state &&
        ((state.activeCombat && !state.activeCombat.resolved) ||
          (state.activeEvent && !state.activeEvent.resolved))
    );
  }

  function pickEncounter(encounters) {
    if (!encounters?.length) return null;
    const total = encounters.reduce((sum, e) => sum + (e.weight || 1), 0);
    let roll = Math.random() * total;
    for (const enc of encounters) {
      roll -= enc.weight || 1;
      if (roll <= 0) return enc;
    }
    return encounters[0];
  }

  const actions = {
    selectClass(data) {
      selectedClassId = data.id || 'seal_clubber';
    },

    start() {
      const name = document.getElementById('input-player-name')?.value || 'Aventureiro';
      Game.State.createNewGame(name, selectedClassId);
      showingHelp = false;
      return 'Aventura iniciada! Explore um local no mapa.';
    },

    continue() {
      if (!Game.State.load()) return 'Nenhum save encontrado.';
      showingHelp = false;
      return 'Partida carregada.';
    },

    nav(data) {
      const state = Game.State.get();
      if (!state || state.endgame) return;
      if (isEncounterBusy()) return 'Termine o encontro atual primeiro.';
      showingHelp = false;
      Game.State.setView(data.view);
    },

    help() {
      showingHelp = !showingHelp;
    },

    back() {
      showingHelp = false;
    },

    restart() {
      const state = Game.State.get();
      if (state && !state.endgame && !window.confirm('Reiniciar a partida e apagar o progresso atual?')) {
        return;
      }
      Game.State.clearSave();
      showingHelp = false;
      selectedClassId = 'seal_clubber';
      return 'Partida reiniciada.';
    },

    explore(data) {
      const state = Game.State.get();
      const loc = Game.Data.locationsById[data.id];
      if (!state || !loc || state.endgame) return;
      if (isEncounterBusy()) return 'Termine o encontro atual primeiro.';
      if (Game.State.checkOutOfAdventures()) return;

      showingHelp = false;
      state.adventures -= 1;
      state.lastAdventureId = loc.id;

      const enc = pickEncounter(loc.encounters);
      if (!enc) {
        Game.State.setView('map');
        Game.State.checkOutOfAdventures();
        return `Você explorou ${loc.shortLabel}, mas não encontrou nada.`;
      }
      if (enc.kind === 'monster') Game.Combat.start(enc.id, loc.id);
      else if (enc.kind === 'event') Game.Events.start(enc.id, loc.id);
    },

    attack() {
      Game.Combat.attack();
    },

    skill() {
      Game.Combat.skill();
    },

    useCombatItem() {
      const itemId = document.getElementById('combat-item')?.value;
      if (itemId) Game.Combat.useItem(itemId);
    },

    flee() {
      const res = Game.Combat.flee();
      if (res?.fled) {
        Game.State.checkOutOfAdventures();
        return res.message;
      }
    },

    truce() {
      Game.Combat.truce();
    },

    leaveCombat() {
      Game.Combat.finish();
      Game.State.checkOutOfAdventures();
    },

    choose(data) {
      const res = Game.Events.choose(Number(data.id));
      if (res && !res.ok) return res.message;
    },

    leaveEvent() {
      Game.Events.finish();
      Game.State.checkOutOfAdventures();
    },

    use(data) {
      return Game.Inventory.use(data.id).message;
    },

    equip(data) {
      return Game.Inventory.equip(data.id).message;
    },

    unequip(data) {
      return Game.Inventory.unequip(data.id).message;
    },

    combine() {
      const itemA = document.getElementById('craft-a')?.value;
      const itemB = document.getElementById('craft-b')?.value;
      if (!itemA || !itemB) return 'Selecione dois itens para combinar.';
      const recipe = Game.Inventory.findRecipe(itemA, itemB);
      if (!recipe) return 'Esses dois itens não formam nenhuma receita conhecida.';
      return Game.Inventory.craft(recipe.id).message;
    },

    craft(data) {
      return Game.Inventory.craft(data.id).message;
    },

    rest() {
      const state = Game.State.get();
      if (!state || state.endgame || state.adventures <= 0) return;
      const stats = Game.State.getComputedStats();
      state.adventures -= 1;
      state.hp = stats.maxHp;
      state.mp = stats.maxMp;
      if (Game.State.checkOutOfAdventures()) return;
      return 'Você descansou na barraca (-1 Adventure). HP e MP restaurados!';
    }
  };

  function runAction(name, dataset) {
    const fn = actions[name];
    if (!fn) return;
    const msg = fn(dataset || {});
    if (name !== 'restart') Game.State.save();
    Game.UI.notice(msg || '');
    Game.UI.render(currentView(), { selectedClassId });
  }

  function handleClick(event) {
    const target = event.target.closest('[data-action]');
    if (!target || target.disabled) return;
    runAction(target.dataset.action, target.dataset);
  }

  function handleKeydown(event) {
    const tag = event.target?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
      if (event.key === 'Enter' && event.target.id === 'input-player-name') {
        document.querySelector('#view [data-key="Enter"]')?.click();
      }
      return;
    }

    if (tag === 'BUTTON' && (event.key === 'Enter' || event.key === ' ')) {
      return;
    }

    const key = event.key === ' ' ? 'Enter' : event.key;
    const lower = key.toLowerCase();

    if (lower === 'h' || key === 'Escape') {
      event.preventDefault();
      runAction('help');
      return;
    }

    const navKeys = { m: 'map', i: 'inventory', c: 'crafting', r: 'camp' };
    if (navKeys[lower]) {
      event.preventDefault();
      runAction('nav', { view: navKeys[lower] });
      return;
    }

    const match = key === 'Enter' ? 'Enter' : lower;
    const btn = document.querySelector(`#view [data-key="${match}"]:not(:disabled)`);
    if (btn) {
      event.preventDefault();
      btn.click();
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    Game.UI.init();
    await Game.DataLoader.loadAll();
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeydown);
    Game.UI.render('title', { selectedClassId });
  });
})(window.Game);
