// Carrega os JSONs via fetch() em HTTP e usa window.GAME_DATA (data/bundle.js) no file://.
window.Game = window.Game || {};

(function (Game) {
  const DATA_FILES = ['items', 'monsters', 'events', 'locations', 'recipes'];

  function indexById(list) {
    const map = {};
    for (const entry of list) {
      map[entry.id] = entry;
    }
    return map;
  }

  async function fetchAllJson() {
    const entries = await Promise.all(
      DATA_FILES.map(async (name) => {
        const res = await fetch(`./data/${name}.json`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`${name}.json: HTTP ${res.status}`);
        return [name, await res.json()];
      })
    );
    return Object.fromEntries(entries);
  }

  Game.Data = {
    items: [],
    monsters: [],
    events: [],
    locations: [],
    recipes: [],
    itemsById: {},
    monstersById: {},
    eventsById: {},
    locationsById: {},
    recipesById: {}
  };

  Game.DataLoader = {
    async loadAll() {
      let raw = null;
      if (window.location.protocol !== 'file:') {
        try {
          raw = await fetchAllJson();
        } catch (err) {
          console.warn('fetch() falhou; usando data/bundle.js.', err);
        }
      }
      if (!raw) raw = window.GAME_DATA;

      for (const name of DATA_FILES) {
        Game.Data[name] = raw[name] || [];
        Game.Data[`${name}ById`] = indexById(Game.Data[name]);
      }
      return Game.Data;
    }
  };
})(window.Game);
