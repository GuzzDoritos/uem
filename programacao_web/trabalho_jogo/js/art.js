// Desenhos SVG P&B em estilo Kingdom of Loathing (substituíveis por imagens nos JSONs).
window.Game = window.Game || {};

(function (Game) {
  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function svg(w, h, body, vbW, vbH) {
    const vw = vbW || w;
    const vh = vbH || h;
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${vw} ${vh}" fill="none" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }

  function imgOr(obj, cls, altFallback) {
    if (obj && obj.image) {
      return `<img src="${esc(obj.image)}" alt="${esc(obj.name || altFallback || '')}" class="${cls}">`;
    }
    return null;
  }

  const MONSTERS = {
    wild_pinecone: () => svg(100, 100, `
      <ellipse cx="50" cy="52" rx="24" ry="32" fill="#fff"/>
      <path d="M33 38 H67 M28 52 H72 M32 66 H68" stroke-width="1.3"/>
      <path d="M40 32 L50 40 L60 32" stroke-width="1.3"/>
      <circle cx="42" cy="45" r="2.2" fill="#000"/>
      <circle cx="58" cy="45" r="2.2" fill="#000"/>
      <path d="M39 39 L46 42 M61 39 L54 42"/>
      <path d="M43 58 Q50 54 57 58"/>
    `),
    skeleton_intern: () => svg(100, 100, `
      <circle cx="50" cy="23" r="11" fill="#fff"/>
      <circle cx="46" cy="22" r="2" fill="#000"/>
      <circle cx="54" cy="22" r="2" fill="#000"/>
      <path d="M45 29 H55"/>
      <path d="M50 34 V64 M40 42 H60 M42 49 H58 M44 56 H56"/>
      <path d="M50 40 L32 54 M50 40 L72 48"/>
      <rect x="70" y="38" width="16" height="22" fill="#fff"/>
      <path d="M74 44 H82 M74 49 H82 M74 54 H79" stroke-width="1.2"/>
      <path d="M50 64 L40 88 M50 64 L60 88"/>
    `),
    goblin_barista: () => svg(100, 100, `
      <path d="M29 25 L39 19 V30 Z M71 25 L61 19 V30 Z" fill="#fff"/>
      <circle cx="50" cy="26" r="11" fill="#fff"/>
      <rect x="40" y="21" width="8" height="5" fill="#fff"/>
      <rect x="52" y="21" width="8" height="5" fill="#fff"/>
      <path d="M48 23 H52"/>
      <path d="M50 37 V65 M50 44 L32 54 M50 44 L73 41"/>
      <rect x="42" y="41" width="16" height="20" fill="#fff"/>
      <rect x="72" y="33" width="11" height="13" fill="#fff"/>
      <path d="M83 36 C87 36 87 43 83 43"/>
      <path d="M50 65 L40 88 M50 65 L60 88"/>
    `),
    barroom_brawler: () => svg(100, 100, `
      <circle cx="50" cy="22" r="11" fill="#fff"/>
      <path d="M44 18 L48 21 M56 18 L52 21"/>
      <circle cx="46" cy="23" r="1.5" fill="#000"/>
      <circle cx="54" cy="23" r="1.5" fill="#000"/>
      <path d="M44 28 H56"/>
      <path d="M41 36 H59 L56 64 H44 Z" fill="#fff"/>
      <path d="M41 39 L24 48 L30 57 M59 39 L74 46"/>
      <rect x="70" y="42" width="18" height="11" fill="#fff"/>
      <path d="M73 53 V62 M85 53 V62"/>
      <path d="M46 64 L40 88 M54 64 L60 88"/>
    `),
    temple_gargoyle: () => svg(100, 100, `
      <path d="M36 38 Q16 20 14 48 Q26 46 36 52 M64 38 Q84 20 86 48 Q74 46 64 52" fill="#fff"/>
      <path d="M42 20 L38 10 L47 17 M58 20 L62 10 L53 17"/>
      <circle cx="50" cy="26" r="10" fill="#fff"/>
      <circle cx="46" cy="25" r="1.8" fill="#000"/>
      <circle cx="54" cy="25" r="1.8" fill="#000"/>
      <path d="M46 30 L50 28 L54 30"/>
      <rect x="40" y="36" width="20" height="26" fill="#fff"/>
      <rect x="33" y="68" width="34" height="18" fill="#fff"/>
      <path d="M44 62 V68 M56 62 V68"/>
    `),
    spaghetti_baron: () => svg(110, 100, `
      <polygon points="35,18 41,7 49,14 55,5 61,14 69,7 75,18" fill="#fff"/>
      <circle cx="55" cy="29" r="12" fill="#fff"/>
      <circle cx="50" cy="27" r="1.8" fill="#000"/>
      <circle cx="60" cy="27" r="1.8" fill="#000"/>
      <path d="M48 34 Q55 31 62 34"/>
      <path d="M36 47 Q27 65 34 79 M43 49 Q38 69 44 82 M67 49 Q72 69 66 82 M74 47 Q83 65 76 79"/>
      <path d="M55 41 V72 M55 50 L88 37 M55 72 L44 92 M55 72 L66 92"/>
      <path d="M88 16 V84 M82 16 V28 H94 V16"/>
    `)
  };

  const LOCATIONS = {
    stick_woods: () => svg(92, 68, `
      <circle cx="24" cy="26" r="12" fill="#fff"/>
      <path d="M24 38 V56 M19 56 H29"/>
      <circle cx="48" cy="20" r="14" fill="#fff"/>
      <path d="M48 34 V58 M42 58 H54"/>
      <circle cx="70" cy="29" r="11" fill="#fff"/>
      <path d="M70 40 V57 M65 57 H75"/>
    `),
    typical_tavern: () => svg(92, 68, `
      <polygon points="14,30 46,11 78,30" fill="#fff"/>
      <rect x="20" y="30" width="52" height="28" fill="#fff"/>
      <rect x="40" y="41" width="12" height="17" fill="#fff"/>
      <rect x="25" y="35" width="9" height="9" fill="#fff"/>
      <rect x="58" y="35" width="9" height="9" fill="#fff"/>
      <rect x="33" y="20" width="26" height="9" fill="#fff"/>
      <path d="M38 24.5 H54" stroke-width="1.4"/>
    `),
    ancient_ruins: () => svg(92, 68, `
      <path d="M12 58 H80"/>
      <rect x="20" y="24" width="10" height="34" fill="#fff"/>
      <path d="M18 24 H32"/>
      <rect x="41" y="34" width="10" height="24" fill="#fff"/>
      <path d="M40 34 L46 31 L52 35"/>
      <rect x="62" y="20" width="10" height="38" fill="#fff"/>
      <path d="M60 20 H74 M24 18 H68"/>
    `),
    baron_peak: () => svg(92, 68, `
      <polygon points="10,60 36,22 50,40 64,18 84,60" fill="#fff"/>
      <path d="M30 31 L36 33 L41 30 M58 28 L64 31 L70 28" stroke-width="1.3"/>
      <path d="M64 18 V6 M64 6 H76 V13 H64" fill="#fff"/>
    `)
  };

  Game.Art = {
    avatar(classId) {
      let prop = '';
      if (classId === 'pastamancer') {
        prop = '<path d="M11 14 H29 L26 8 H14 Z" fill="#fff"/>';
      } else if (classId === 'seal_clubber') {
        prop = '<path d="M30 33 L36 16" stroke-width="2.4"/>';
      } else if (classId === 'disco_bandit') {
        prop = '<path d="M9 12 L12 12 M10.5 10.5 L10.5 13.5 M29 10 L32 10 M30.5 8.5 L30.5 11.5" stroke-width="1.3"/>';
      }
      return svg(38, 54, `
        ${prop}
        <circle cx="20" cy="17" r="6" fill="#fff"/>
        <circle cx="18" cy="16" r="0.8" fill="#000"/>
        <circle cx="22" cy="16" r="0.8" fill="#000"/>
        <path d="M18 19.5 Q20 21 22 19.5" stroke-width="1.2"/>
        <path d="M20 23 V38 M20 28 L10 34 M20 28 L30 34 M20 38 L13 50 M20 38 L27 50"/>
      `);
    },

    icon(name) {
      if (name === 'hp') {
        return `<svg width="24" height="22" viewBox="0 0 24 22" aria-hidden="true">
          <path d="M12 20 L3 11 A5 5 0 0 1 12 6 A5 5 0 0 1 21 11 Z" fill="#000"/>
          <text x="12" y="13.5" text-anchor="middle" fill="#fff" font-size="7" font-weight="bold" font-family="Arial">HP</text>
        </svg>`;
      }
      if (name === 'mp') {
        return `<svg width="24" height="22" viewBox="0 0 24 22" aria-hidden="true">
          <polygon points="12,1 15,7 22,5 18,11 23,16 16,16 14,21 10,16 3,17 7,11 2,6 9,7" fill="#000"/>
          <text x="12" y="13.5" text-anchor="middle" fill="#fff" font-size="6.5" font-weight="bold" font-family="Arial">MP</text>
        </svg>`;
      }
      if (name === 'meat') {
        return svg(22, 20, `
          <path d="M5 10 C4 5 12 3 16 6 C20 9 18 16 12 16 C7 16 6 13 5 10 Z" fill="#000"/>
          <circle cx="10" cy="10" r="2.1" fill="#fff" stroke="none"/>
        `);
      }
      // Ampulheta (Adventures)
      return svg(20, 20, `
        <path d="M5 3 H15 L10 10 L15 17 H5 L10 10 Z" fill="#fff"/>
        <path d="M4 3 H16 M4 17 H16"/>
      `);
    },

    navIcon(name) {
      const paths = {
        map: '<polygon points="2,4 8,2 14,4 20,2 20,17 14,19 8,17 2,19" fill="#fff"/><path d="M8 2 V17 M14 4 V19"/>',
        inventory: '<rect x="4" y="6" width="14" height="12" fill="#fff"/><path d="M8 6 V4 A3 3 0 0 1 14 4 V6 M4 10 H18"/>',
        crafting: '<path d="M14 3 A4 4 0 0 0 10 9 L4 15 L6 17 L12 11 A4 4 0 0 0 18 7 L15 8 L13 6 Z" fill="#fff"/>',
        camp: '<polygon points="11,3 2,18 20,18" fill="#fff"/><path d="M11 3 V18 M8 18 L11 12 L14 18"/>',
        help: '<circle cx="11" cy="11" r="8" fill="#fff"/><path d="M8.5 8.5 A2.5 2.5 0 1 1 12.5 10.5 C11.3 11.2 11 11.8 11 12.8"/><circle cx="11" cy="15.5" r="0.8" fill="#000" stroke="none"/>',
        restart: '<path d="M17 11 A6 6 0 1 1 15 6"/><polyline points="16,2 16.5,7 12,6.5"/>'
      };
      return svg(22, 22, paths[name] || '');
    },

    moons() {
      return `
        <div class="moons">
          <div class="moon-cell">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="#fff" stroke="#000" stroke-width="1.6"/>
              <path d="M12 3 A9 9 0 0 0 12 21 A5 9 0 0 1 12 3 Z" fill="#000"/>
            </svg>
            <span>Ronald</span>
          </div>
          <div class="moon-cell">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="#fff" stroke="#000" stroke-width="1.6"/>
              <path d="M12 3 A9 9 0 0 1 12 21 A5 9 0 0 0 12 3 Z" fill="#000"/>
            </svg>
            <span>Grimace</span>
          </div>
        </div>`;
    },

    monster(monster) {
      const img = imgOr(monster, 'monster-img', 'Monstro');
      if (img) return img;
      const fn = monster && MONSTERS[monster.id];
      if (fn) return fn();
      return svg(100, 100, `
        <circle cx="50" cy="24" r="12" fill="#fff"/>
        <circle cx="46" cy="22" r="1.8" fill="#000"/>
        <circle cx="54" cy="22" r="1.8" fill="#000"/>
        <path d="M45 29 L50 27 L55 29 M50 36 V66 M50 45 L30 55 M50 45 L70 55 M50 66 L38 88 M50 66 L62 88"/>
      `);
    },

    location(loc) {
      const img = imgOr(loc, 'location-img', 'Local');
      if (img) return img;
      const fn = loc && LOCATIONS[loc.id];
      return fn ? fn() : LOCATIONS.stick_woods();
    },

    tree() {
      return svg(22, 26, `
        <circle cx="11" cy="9" r="7" fill="#fff" stroke-width="1.4"/>
        <path d="M11 16 V24 M8 24 H14" stroke-width="1.4"/>
      `);
    },

    itemIcon(item) {
      const img = imgOr(item, 'item-img', 'Item');
      if (img) return img;
      if (!item) return '';
      if (item.type === 'consumable') {
        return svg(20, 20, '<rect x="7" y="3" width="6" height="3" fill="#fff"/><path d="M7 6 L5 10 V17 H15 V10 L13 6 Z" fill="#fff"/>');
      }
      if (item.slot === 'hat') {
        return svg(20, 20, '<path d="M4 13 A6 6 0 0 1 16 13 Z M2 13 H18" fill="#fff"/>');
      }
      if (item.slot === 'weapon') {
        return svg(20, 20, '<path d="M4 16 L15 5 M12 4 L16 8 M5 12 L8 15"/>');
      }
      if (item.slot === 'armor') {
        return svg(20, 20, '<path d="M6 4 L3 7 L5 10 L6 9 V16 H14 V9 L15 10 L17 7 L14 4 L12 6 H8 Z" fill="#fff"/>');
      }
      if (item.slot === 'pants') {
        return svg(20, 20, '<path d="M6 4 H14 L15 16 H11 L10 10 L9 16 H5 Z" fill="#fff"/>');
      }
      if (item.slot === 'accessory') {
        return svg(20, 20, '<circle cx="10" cy="11" r="5" fill="#fff"/><polygon points="10,3 12,6 10,8 8,6" fill="#fff"/>');
      }
      // Material
      return svg(20, 20, '<polygon points="4,13 7,7 14,6 17,12 12,16 5,15" fill="#fff"/>');
    },

    tent() {
      return svg(120, 76, `
        <polygon points="60,10 15,66 105,66" fill="#fff"/>
        <path d="M60 10 V66 M50 66 L60 40 L70 66 M4 66 H116"/>
      `);
    }
  };
})(window.Game);
