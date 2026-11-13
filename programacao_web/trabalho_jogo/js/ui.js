/**
 * js/ui.js
 * Responsável exclusivamente pela renderização do DOM (sidebar, barra superior,
 * ilustrações SVG em preto e branco e todas as telas do painel central).
 */

window.Game = window.Game || {};

(function (Game) {
  'use strict';

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const SVGS = {
    stickAvatar: function (classId) {
      let extra = '';
      if (classId === 'pastamancer') {
        extra = '<path d="M18 17 L40 17 L36 10 L22 10 Z" fill="none" stroke="#000" stroke-width="1.8"/>';
      } else if (classId === 'seal_clubber') {
        extra = '<line x1="42" y1="42" x2="50" y2="24" stroke="#000" stroke-width="2.5"/>';
      } else if (classId === 'disco_bandit') {
        extra = '<circle cx="29" cy="18" r="9" fill="none" stroke="#000" stroke-width="1.2" stroke-dasharray="2,2"/>';
      }
      return (
        '<svg width="54" height="66" viewBox="0 0 58 70">' +
        extra +
        '<circle cx="29" cy="18" r="7" fill="#fff" stroke="#000" stroke-width="2"/>' +
        '<circle cx="26.5" cy="17" r="1" fill="#000"/>' +
        '<circle cx="31.5" cy="17" r="1" fill="#000"/>' +
        '<path d="M26 21 Q29 23 32 21" fill="none" stroke="#000" stroke-width="1.2"/>' +
        '<line x1="29" y1="25" x2="29" y2="46" stroke="#000" stroke-width="2"/>' +
        '<line x1="29" y1="31" x2="17" y2="40" stroke="#000" stroke-width="2"/>' +
        '<line x1="29" y1="31" x2="42" y2="40" stroke="#000" stroke-width="2"/>' +
        '<line x1="29" y1="46" x2="20" y2="63" stroke="#000" stroke-width="2"/>' +
        '<line x1="29" y1="46" x2="38" y2="63" stroke="#000" stroke-width="2"/>' +
        '</svg>'
      );
    },
    hp: '<svg width="16" height="16" viewBox="0 0 20 20"><path d="M10 17 L3 10 A4 4 0 0 1 10 5 A4 4 0 0 1 17 10 Z" fill="#000"/></svg>',
    mp: '<svg width="16" height="16" viewBox="0 0 20 20"><polygon points="10,1 12.5,7 19,7.5 14,11.8 15.5,18.5 10,14.8 4.5,18.5 6,11.8 1,7.5 7.5,7" fill="#000"/></svg>',
    meat: '<svg width="16" height="16" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="7" ry="5" fill="#fff" stroke="#000" stroke-width="2"/><circle cx="7.5" cy="9.5" r="1.6" fill="#000"/></svg>',
    adv: '<svg width="16" height="16" viewBox="0 0 20 20"><path d="M5 3 H15 L10 10 L15 17 H5 L10 10 Z" fill="none" stroke="#000" stroke-width="1.8"/></svg>',
    navMap: '<svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#000" stroke-width="1.8"><polygon points="2,4 8,2 13,4 18,2 18,16 13,18 8,16 2,18"/><line x1="8" y1="2" x2="8" y2="16"/><line x1="13" y1="4" x2="13" y2="18"/></svg>',
    navInv: '<svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#000" stroke-width="1.8"><rect x="4" y="6" width="12" height="11"/><path d="M7 6 V4 A3 3 0 0 1 13 4 V6"/><line x1="4" y1="10" x2="16" y2="10"/></svg>',
    navCraft: '<svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#000" stroke-width="1.8"><path d="M13 3 A4 4 0 0 0 9 9 L4 14 L6 16 L11 11 A4 4 0 0 0 17 7 L14 8 L12 6 Z"/></svg>',
    navCamp: '<svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#000" stroke-width="1.8"><polygon points="10,3 2,17 18,17"/><line x1="10" y1="3" x2="10" y2="17"/><path d="M8 17 L10 12 L12 17"/></svg>',
    navHelp: '<svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#000" stroke-width="1.8"><circle cx="10" cy="10" r="8"/><path d="M7.5 8 A2.5 2.5 0 1 1 11.5 10 C10.3 10.6 10 11.2 10 12.2"/><circle cx="10" cy="14.8" r="0.8" fill="#000"/></svg>',
    navReset: '<svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#000" stroke-width="1.8"><path d="M16 10 A6 6 0 1 1 14 5.5"/><polyline points="15,2 15.5,6.5 11,6"/></svg>'
  };

  function getMonsterSvg(monster) {
    if (monster && monster.image) {
      return '<img src="' + esc(monster.image) + '" alt="' + esc(monster.name) + '" width="120" height="100" />';
    }
    const id = monster ? monster.id : '';
    if (id === 'wild_pinecone') {
      return '<svg width="110" height="100" viewBox="0 0 110 100"><ellipse cx="55" cy="52" rx="26" ry="34" fill="#fff" stroke="#000" stroke-width="2"/><line x1="35" y1="38" x2="75" y2="38" stroke="#000" stroke-width="1.4"/><line x1="30" y1="54" x2="80" y2="54" stroke="#000" stroke-width="1.4"/><line x1="36" y1="70" x2="74" y2="70" stroke="#000" stroke-width="1.4"/><circle cx="46" cy="45" r="2.5" fill="#000"/><circle cx="64" cy="45" r="2.5" fill="#000"/><path d="M44 38 L51 42 M66 38 L59 42" stroke="#000" stroke-width="2"/></svg>';
    }
    if (id === 'skeleton_intern') {
      return '<svg width="110" height="100" viewBox="0 0 110 100"><circle cx="55" cy="24" r="12" fill="#fff" stroke="#000" stroke-width="2"/><circle cx="50" cy="23" r="2.2" fill="#000"/><circle cx="60" cy="23" r="2.2" fill="#000"/><line x1="50" y1="31" x2="60" y2="31" stroke="#000" stroke-width="1.8"/><line x1="55" y1="36" x2="55" y2="66" stroke="#000" stroke-width="2"/><line x1="43" y1="45" x2="67" y2="45" stroke="#000" stroke-width="1.6"/><line x1="45" y1="53" x2="65" y2="53" stroke="#000" stroke-width="1.6"/><line x1="55" y1="43" x2="80" y2="52" stroke="#000" stroke-width="2"/><rect x="76" y="42" width="16" height="22" fill="#fff" stroke="#000" stroke-width="1.8"/><line x1="55" y1="66" x2="43" y2="90" stroke="#000" stroke-width="2"/><line x1="55" y1="66" x2="67" y2="90" stroke="#000" stroke-width="2"/></svg>';
    }
    if (id === 'goblin_barista') {
      return '<svg width="110" height="100" viewBox="0 0 110 100"><polygon points="32,26 42,20 42,32" fill="#fff" stroke="#000" stroke-width="1.8"/><polygon points="78,26 68,20 68,32" fill="#fff" stroke="#000" stroke-width="1.8"/><circle cx="55" cy="27" r="12" fill="#fff" stroke="#000" stroke-width="2"/><rect x="44" y="22" width="9" height="6" fill="none" stroke="#000" stroke-width="1.5"/><rect x="57" y="22" width="9" height="6" fill="none" stroke="#000" stroke-width="1.5"/><line x1="55" y1="39" x2="55" y2="68" stroke="#000" stroke-width="2"/><rect x="46" y="43" width="18" height="22" fill="#fff" stroke="#000" stroke-width="1.8"/><line x1="55" y1="46" x2="82" y2="42" stroke="#000" stroke-width="2"/><rect x="80" y="34" width="12" height="14" fill="#fff" stroke="#000" stroke-width="1.6"/><line x1="55" y1="68" x2="44" y2="90" stroke="#000" stroke-width="2"/><line x1="55" y1="68" x2="66" y2="90" stroke="#000" stroke-width="2"/></svg>';
    }
    if (id === 'spaghetti_baron') {
      return '<svg width="120" height="104" viewBox="0 0 120 104"><polygon points="40,18 46,6 54,14 60,4 66,14 74,6 80,18" fill="#fff" stroke="#000" stroke-width="2"/><circle cx="60" cy="30" r="13" fill="#fff" stroke="#000" stroke-width="2.2"/><circle cx="55" cy="28" r="2" fill="#000"/><circle cx="65" cy="28" r="2" fill="#000"/><path d="M52 35 Q60 32 68 35" fill="none" stroke="#000" stroke-width="1.8"/><path d="M40 50 Q30 68 38 82 M47 52 Q42 72 48 86 M73 52 Q78 72 72 86 M80 50 Q90 68 82 82" fill="none" stroke="#000" stroke-width="2"/><line x1="60" y1="43" x2="60" y2="76" stroke="#000" stroke-width="2.4"/><line x1="60" y1="53" x2="96" y2="38" stroke="#000" stroke-width="2.2"/><line x1="96" y1="18" x2="96" y2="86" stroke="#000" stroke-width="2.4"/><path d="M90 18 V30 H102 V18 M96 18 V30" fill="none" stroke="#000" stroke-width="2"/><line x1="60" y1="76" x2="48" y2="96" stroke="#000" stroke-width="2.2"/><line x1="60" y1="76" x2="72" y2="96" stroke="#000" stroke-width="2.2"/></svg>';
    }
    return '<svg width="110" height="100" viewBox="0 0 110 100"><circle cx="55" cy="25" r="13" fill="#fff" stroke="#000" stroke-width="2"/><circle cx="50" cy="23" r="2" fill="#000"/><circle cx="60" cy="23" r="2" fill="#000"/><path d="M49 30 L55 27 L61 30" fill="none" stroke="#000" stroke-width="1.8"/><line x1="55" y1="38" x2="55" y2="68" stroke="#000" stroke-width="2.2"/><line x1="55" y1="46" x2="34" y2="56" stroke="#000" stroke-width="2"/><line x1="55" y1="46" x2="76" y2="56" stroke="#000" stroke-width="2"/><line x1="55" y1="68" x2="42" y2="90" stroke="#000" stroke-width="2"/><line x1="55" y1="68" x2="68" y2="90" stroke="#000" stroke-width="2"/></svg>';
  }

  function formatStatDisplay(effective, base) {
    if (effective !== base) {
      return effective + ' (' + base + ')';
    }
    return String(base);
  }

  function formatBonuses(bonuses) {
    if (!bonuses) return '-';
    const labels = {
      muscle: 'Muscle',
      mysticality: 'Mysticality',
      moxie: 'Moxie',
      attack: 'Ataque',
      defense: 'Defesa',
      maxHp: 'HP Máx',
      maxMp: 'MP Máx'
    };
    const parts = [];
    Object.keys(bonuses).forEach(function (k) {
      if (bonuses[k]) {
        parts.push('+' + bonuses[k] + ' ' + (labels[k] || k));
      }
    });
    return parts.join(', ') || '-';
  }

  function initStaticIcons() {
    document.getElementById('icon-hp').innerHTML = SVGS.hp;
    document.getElementById('icon-mp').innerHTML = SVGS.mp;
    document.getElementById('icon-meat').innerHTML = SVGS.meat;
    document.getElementById('icon-adv').innerHTML = SVGS.adv;

    document.getElementById('nav-icon-map').innerHTML = SVGS.navMap;
    document.getElementById('nav-icon-inv').innerHTML = SVGS.navInv;
    document.getElementById('nav-icon-craft').innerHTML = SVGS.navCraft;
    document.getElementById('nav-icon-camp').innerHTML = SVGS.navCamp;
    document.getElementById('nav-icon-help').innerHTML = SVGS.navHelp;
    document.getElementById('nav-icon-reset').innerHTML = SVGS.navReset;
  }

  function renderSidebar() {
    const state = Game.State.get();
    const pane = document.getElementById('char-pane');
    const avatarEl = document.getElementById('char-avatar');

    if (!state) {
      pane.classList.add('is-disabled');
      avatarEl.innerHTML = SVGS.stickAvatar('');
      document.getElementById('char-name').textContent = 'Novo Aventureiro';
      document.getElementById('char-level').textContent = 'Level 1';
      document.getElementById('char-class').textContent = 'Escolha na Tela Inicial';
      document.getElementById('stat-muscle').textContent = '0';
      document.getElementById('stat-mysticality').textContent = '0';
      document.getElementById('stat-moxie').textContent = '0';
      document.getElementById('substat-muscle-fill').style.width = '0%';
      document.getElementById('substat-mysticality-fill').style.width = '0%';
      document.getElementById('substat-moxie-fill').style.width = '0%';
      document.getElementById('res-hp').textContent = '0 / 0';
      document.getElementById('res-mp').textContent = '0 / 0';
      document.getElementById('res-meat').textContent = '0';
      document.getElementById('res-adv').textContent = '0';
      document.getElementById('char-quest').textContent = 'Crie seu personagem ao lado';
      const lastBtn = document.getElementById('btn-last-adventure');
      lastBtn.textContent = '(nenhuma ainda)';
      lastBtn.disabled = true;
      document.getElementById('char-score').textContent = '0';
      return;
    }

    pane.classList.remove('is-disabled');
    avatarEl.innerHTML = SVGS.stickAvatar(state.classId);

    const computed = Game.State.getComputedStats();
    document.getElementById('char-name').textContent = state.name;
    document.getElementById('char-level').textContent = 'Level ' + state.level;
    document.getElementById('char-class').textContent = state.className;

    document.getElementById('stat-muscle').textContent = formatStatDisplay(computed.muscle, computed.baseMuscle);
    document.getElementById('stat-mysticality').textContent = formatStatDisplay(computed.mysticality, computed.baseMysticality);
    document.getElementById('stat-moxie').textContent = formatStatDisplay(computed.moxie, computed.baseMoxie);

    ['muscle', 'mysticality', 'moxie'].forEach(function (key) {
      const pct = Math.min(
        100,
        Math.round((state.substats[key] / Game.State.getSubstatThreshold(state.stats[key])) * 100)
      );
      document.getElementById('substat-' + key + '-fill').style.width = pct + '%';
    });

    document.getElementById('res-hp').textContent = state.hp + ' / ' + computed.maxHp;
    document.getElementById('res-mp').textContent = state.mp + ' / ' + computed.maxMp;
    document.getElementById('res-meat').textContent = String(state.meat);
    document.getElementById('res-adv').textContent = String(state.adventures);
    document.getElementById('char-quest').textContent = state.questText;

    const lastBtn = document.getElementById('btn-last-adventure');
    if (state.lastAdventureId && Game.Data.locationsById[state.lastAdventureId]) {
      lastBtn.textContent = Game.Data.locationsById[state.lastAdventureId].shortLabel;
      lastBtn.disabled = Boolean(state.endgame || (state.activeCombat && !state.activeCombat.resolved));
    } else {
      lastBtn.textContent = '(nenhuma ainda)';
      lastBtn.disabled = true;
    }

    document.getElementById('char-score').textContent = String(Game.State.getScoreBreakdown().total);
  }

  function renderTopNav(activeView) {
    const state = Game.State.get();
    const inGame = Boolean(state && activeView !== 'title');
    const inUnresolvedEncounter = Boolean(
      state &&
        ((state.activeCombat && !state.activeCombat.resolved) ||
          (state.activeEvent && !state.activeEvent.resolved))
    );
    const isEnded = Boolean(state && state.endgame);

    const buttons = document.querySelectorAll('.top-nav .nav-btn');
    buttons.forEach(function (btn) {
      const nav = btn.getAttribute('data-nav');
      btn.classList.toggle('is-active', nav === activeView);

      if (nav === 'help') {
        btn.disabled = false;
      } else if (nav === 'restart') {
        btn.disabled = !state && !Game.State.hasSavedGame();
      } else if (!inGame || isEnded) {
        btn.disabled = true;
      } else if (inUnresolvedEncounter) {
        btn.disabled = true;
      } else {
        btn.disabled = false;
      }
    });
  }

  function renderTitleView(container) {
    const hasSave = Game.State.hasSavedGame();
    const classes = Game.State.CLASSES;

    let classCardsHtml = '';
    Object.keys(classes).forEach(function (key, index) {
      const cls = classes[key];
      const selectedClass = index === 0 ? ' is-selected' : '';
      classCardsHtml +=
        '<button type="button" class="class-card' +
        selectedClass +
        '" data-class-id="' +
        esc(cls.id) +
        '">' +
        '<div class="class-card-title">' +
        esc(cls.name) +
        '</div>' +
        '<div class="class-card-stats">MUS ' +
        cls.baseStats.muscle +
        ' | MYS ' +
        cls.baseStats.mysticality +
        ' | MOX ' +
        cls.baseStats.moxie +
        '</div>' +
        '<div>' +
        esc(cls.description) +
        '</div>' +
        '<div class="muted-note">Habilidade: ' +
        esc(cls.skillName) +
        '</div>' +
        '</button>';
    });

    container.innerHTML =
      '<div class="title-hero">' +
      '<h1>KINGDOM OF LOATHING — PROTÓTIPO WEB</h1>' +
      '<p class="title-subtitle">RPG em turnos monocromático inspirado no clássico Kingdom of Loathing (UEM — Programação Web).</p>' +
      '</div>' +
      '<div class="kol-box">' +
      '<div class="kol-box-header">Nova Aventura</div>' +
      '<div class="kol-box-body">' +
      '<div class="form-grid">' +
      '<div class="form-field">' +
      '<label for="input-player-name">Nome do Personagem:</label>' +
      '<input id="input-player-name" class="kol-input" type="text" maxlength="24" placeholder="Ex.: Dwarticus" value="Aventureiro" />' +
      '</div>' +
      '<div class="form-field">' +
      '<label>Escolha sua Classe:</label>' +
      '<div id="class-selector" class="class-cards">' +
      classCardsHtml +
      '</div>' +
      '</div>' +
      '<div class="btn-row">' +
      '<button type="button" id="btn-start-new" class="kol-btn kol-btn-primary">Iniciar Nova Partida</button>' +
      (hasSave
        ? '<button type="button" id="btn-continue-save" class="kol-btn">Continuar Partida Salva</button>'
        : '') +
      '<button type="button" id="btn-title-help" class="kol-btn">[H] Como Jogar e Controles</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="kol-box">' +
      '<div class="kol-box-header">Resumo das Regras</div>' +
      '<div class="kol-box-body">' +
      '<ul>' +
      '<li>Você começa com <strong>30 Adventures</strong> (turnos). Explorar zonas ou descansar consome 1 Adventure.</li>' +
      '<li><strong>Vitória:</strong> Derrote o <em>Barão do Espaguete Supremo</em> no Pico do Boss antes que suas Adventures ou seu HP cheguem a 0.</li>' +
      '<li><strong>Empate:</strong> Nocaute mútuo contra o Boss no golpe final, ou acordo de Trégua Mútua na batalha final.</li>' +
      '<li><strong>Derrota:</strong> Ficar com 0 HP ou esgotar todas as Adventures sem resolver a missão.</li>' +
      '</ul>' +
      '</div>' +
      '</div>';
  }

  function renderMapView(container) {
    const state = Game.State.get();
    const locations = Game.Data.locations;

    let nodesHtml = '';
    let listHtml = '';

    locations.forEach(function (loc, idx) {
      const shortcut = idx + 1;
      const isBoss = loc.id === 'baron_peak';
      const bossClass = isBoss ? ' map-node-boss' : '';
      const pos = loc.mapPosition || { x: 20 + idx * 20, y: 50 };

      nodesHtml +=
        '<button type="button" class="map-node' +
        bossClass +
        '" style="left:' +
        pos.x +
        '%; top:' +
        pos.y +
        '%;" data-explore="' +
        esc(loc.id) +
        '"' +
        (state.adventures <= 0 ? ' disabled' : '') +
        '>' +
        '<span class="map-node-title">[' +
        shortcut +
        '] ' +
        esc(loc.shortLabel) +
        '</span>' +
        '<span class="map-node-level">Nível Rec. ' +
        loc.recommendedLevel +
        '</span>' +
        '</button>';

      listHtml +=
        '<div class="map-list-row">' +
        '<div>' +
        '<strong>[' +
        shortcut +
        '] ' +
        esc(loc.name) +
        '</strong> <span class="muted-note">(Nível rec. ' +
        loc.recommendedLevel +
        ')</span><br />' +
        '<span>' +
        esc(loc.description) +
        '</span>' +
        '</div>' +
        '<button type="button" class="kol-btn" data-explore="' +
        esc(loc.id) +
        '"' +
        (state.adventures <= 0 ? ' disabled' : '') +
        '>Explorar (1 Adv)</button>' +
        '</div>';
    });

    container.innerHTML =
      '<div class="kol-box">' +
      '<div class="kol-box-header">Mapa Principal do Reino</div>' +
      '<div class="kol-box-body">' +
      '<p>Clique em um local no mapa ou use as teclas <span class="kbd-tag">1</span> a <span class="kbd-tag">4</span> para gastar <strong>1 Adventure</strong> e explorar.</p>' +
      '<div class="map-canvas">' +
      '<svg class="map-bg-svg" viewBox="0 0 700 320" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="M130 85 Q300 60 430 105 T490 230" fill="none" stroke="#000" stroke-width="1.5" stroke-dasharray="5,5"/>' +
      '<path d="M130 85 Q170 175 200 218 T490 230" fill="none" stroke="#000" stroke-width="1.5" stroke-dasharray="5,5"/>' +
      '<g stroke="#000" stroke-width="1.3" fill="none">' +
      '<circle cx="70" cy="145" r="12"/><line x1="70" y1="157" x2="70" y2="178"/>' +
      '<circle cx="330" cy="48" r="10"/><line x1="330" y1="58" x2="330" y2="75"/>' +
      '<circle cx="595" cy="70" r="11"/><line x1="595" y1="81" x2="595" y2="98"/>' +
      '<circle cx="385" cy="185" r="10"/><line x1="385" y1="195" x2="385" y2="210"/>' +
      '<circle cx="95" cy="265" r="12"/><line x1="95" y1="277" x2="95" y2="296"/>' +
      '<polygon points="560,265 605,195 650,265"/>' +
      '</g>' +
      '</svg>' +
      nodesHtml +
      '</div>' +
      '<div class="map-list">' +
      listHtml +
      '</div>' +
      '</div>' +
      '</div>';
  }

  function renderCombatView(container) {
    const state = Game.State.get();
    const combat = state.activeCombat;
    if (!combat) return;

    const monster = Game.Data.monstersById[combat.monsterId];
    const cls = Game.State.CLASSES[state.classId] || Game.State.CLASSES.seal_clubber;
    const hpPct = Math.max(0, Math.round((combat.monsterHp / combat.monsterMaxHp) * 100));

    let logHtml = '';
    combat.log.forEach(function (entry) {
      logHtml += '<p>' + esc(entry) + '</p>';
    });

    let actionsHtml = '';
    if (combat.resolved) {
      const btnText =
        state.adventures <= 0
          ? '[Enter] Encerrar Campanha (0 Adventures)'
          : '[Enter] Continuar para o Mapa';
      actionsHtml =
        '<div class="btn-row">' +
        '<button type="button" id="btn-combat-continue" class="kol-btn kol-btn-primary">' +
        btnText +
        '</button>' +
        '</div>';
    } else {
      const truceCheck = Game.Combat.canProposeTruce();
      const consumables = Game.Inventory.getConsumables();

      let itemPickerHtml = '';
      if (combat.showItemPicker) {
        if (consumables.length === 0) {
          itemPickerHtml =
            '<div class="combat-item-picker"><em>Você não possui consumíveis na mochila.</em></div>';
        } else {
          itemPickerHtml = '<div class="combat-item-picker"><strong>Escolha um consumível:</strong><div class="btn-row">';
          consumables.forEach(function (entry, idx) {
            itemPickerHtml +=
              '<button type="button" class="kol-btn" data-combat-use-item="' +
              esc(entry.item.id) +
              '">' +
              (idx < 5 ? '[' + (idx + 1) + '] ' : '') +
              esc(entry.item.name) +
              ' (x' +
              entry.quantity +
              ')</button>';
          });
          itemPickerHtml += '</div></div>';
        }
      }

      actionsHtml =
        '<div class="btn-row">' +
        '<button type="button" id="btn-combat-attack" class="kol-btn kol-btn-primary">[1] Atacar</button>' +
        '<button type="button" id="btn-combat-skill" class="kol-btn"' +
        (state.mp < Game.Combat.SKILL_MP_COST ? ' disabled' : '') +
        '>[2] ' +
        esc(cls.skillName) +
        ' (' +
        Game.Combat.SKILL_MP_COST +
        ' MP)</button>' +
        '<button type="button" id="btn-combat-item" class="kol-btn">[3] Usar Item (' +
        consumables.length +
        ')</button>' +
        '<button type="button" id="btn-combat-flee" class="kol-btn">[4] Fugir</button>' +
        (monster.isBoss && truceCheck
          ? '<button type="button" id="btn-combat-truce" class="kol-btn" title="Requer Medalhão da Diplomacia, Boss <= 50% HP ou 50 Meat">[5] Propor Trégua Mútua</button>'
          : '') +
        '</div>' +
        itemPickerHtml;
    }

    container.innerHTML =
      '<div class="kol-box">' +
      '<div class="kol-box-header">Combate — ' +
      esc(monster.name) +
      (monster.isBoss ? ' [BOSS FINAL]' : '') +
      '</div>' +
      '<div class="kol-box-body">' +
      '<div class="combat-stage">' +
      '<div class="enemy-portrait">' +
      getMonsterSvg(monster) +
      '</div>' +
      '<div class="enemy-hp-wrap">' +
      '<div class="stat-line"><span><strong>' +
      esc(monster.name) +
      '</strong></span><span>HP: ' +
      combat.monsterHp +
      ' / ' +
      combat.monsterMaxHp +
      '</span></div>' +
      '<div class="hp-bar-outer"><div class="hp-bar-inner" style="width:' +
      hpPct +
      '%"></div></div>' +
      '<div class="muted-note">Ataque: ' +
      monster.attack +
      ' | Defesa: ' +
      monster.defense +
      ' | Turno: ' +
      combat.round +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div id="combat-log" class="combat-log">' +
      logHtml +
      '</div>' +
      actionsHtml +
      '</div>' +
      '</div>';

    const logEl = document.getElementById('combat-log');
    if (logEl) logEl.scrollTop = logEl.scrollHeight;
  }

  function renderEventView(container) {
    const state = Game.State.get();
    const active = state.activeEvent;
    if (!active) return;

    const eventDef = Game.Data.eventsById[active.eventId];
    let bodyHtml = '<p>' + esc(eventDef.text) + '</p>';

    if (!active.resolved) {
      bodyHtml += '<div class="btn-row">';
      eventDef.choices.forEach(function (choice, idx) {
        const enabled = Game.Events.canSelectChoice(choice);
        bodyHtml +=
          '<button type="button" class="kol-btn" data-event-choice="' +
          idx +
          '"' +
          (enabled ? '' : ' disabled') +
          '>[' +
          (idx + 1) +
          '] ' +
          esc(choice.label) +
          '</button>';
      });
      bodyHtml += '</div>';
    } else {
      bodyHtml += '<div class="combat-log">';
      active.resultLines.forEach(function (line) {
        bodyHtml += '<p>' + esc(line) + '</p>';
      });
      bodyHtml += '</div>';

      const btnText =
        state.adventures <= 0
          ? '[Enter] Encerrar Campanha (0 Adventures)'
          : '[Enter] Continuar para o Mapa';
      bodyHtml +=
        '<div class="btn-row">' +
        '<button type="button" id="btn-event-continue" class="kol-btn kol-btn-primary">' +
        btnText +
        '</button>' +
        '</div>';
    }

    container.innerHTML =
      '<div class="kol-box">' +
      '<div class="kol-box-header">' +
      esc(eventDef.title) +
      '</div>' +
      '<div class="kol-box-body">' +
      bodyHtml +
      '</div>' +
      '</div>';
  }

  function renderInventoryView(container) {
    const state = Game.State.get();
    const computed = Game.State.getComputedStats();
    const slots = Game.Inventory.SLOT_LABELS;

    let equipRows = '';
    Object.keys(slots).forEach(function (slot) {
      const itemId = state.equipment[slot];
      const item = itemId ? Game.Data.itemsById[itemId] : null;
      equipRows +=
        '<tr>' +
        '<td><strong>' +
        esc(slots[slot]) +
        '</strong></td>' +
        '<td>' +
        (item
          ? esc(item.name) + '<br /><span class="muted-note">' + esc(formatBonuses(item.bonuses)) + '</span>'
          : '<em>(vazio)</em>') +
        '</td>' +
        '<td>' +
        (item
          ? '<button type="button" class="kol-btn" data-unequip="' + esc(slot) + '">Remover</button>'
          : '-') +
        '</td>' +
        '</tr>';
    });

    const owned = Game.Inventory.getOwnedEntries();
    let bagRows = '';
    if (owned.length === 0) {
      bagRows = '<tr><td colspan="4"><em>Sua mochila está vazia.</em></td></tr>';
    } else {
      owned.forEach(function (entry) {
        const item = entry.item;
        let actionBtn = '<span class="muted-note">Material de Crafting</span>';
        let infoText = item.description;

        if (item.type === 'consumable') {
          actionBtn =
            '<button type="button" class="kol-btn" data-use-item="' + esc(item.id) + '">Usar</button>';
        } else if (item.type === 'equipment') {
          actionBtn =
            '<button type="button" class="kol-btn" data-equip-item="' + esc(item.id) + '">Equipar</button>';
          infoText += ' [' + formatBonuses(item.bonuses) + ']';
        }

        bagRows +=
          '<tr>' +
          '<td><strong>' +
          esc(item.name) +
          '</strong> (x' +
          entry.quantity +
          ')</td>' +
          '<td>' +
          esc(item.type) +
          '</td>' +
          '<td>' +
          esc(infoText) +
          '</td>' +
          '<td>' +
          actionBtn +
          '</td>' +
          '</tr>';
      });
    }

    container.innerHTML =
      '<div class="kol-box">' +
      '<div class="kol-box-header">Equipamentos Vestidos</div>' +
      '<div class="kol-box-body">' +
      '<p><strong>Ataque Total:</strong> ' +
      computed.attack +
      ' &nbsp;|&nbsp; <strong>Defesa Total:</strong> ' +
      computed.defense +
      '</p>' +
      '<table class="kol-table">' +
      '<thead><tr><th>Slot</th><th>Item Equipado</th><th>Ação</th></tr></thead>' +
      '<tbody>' +
      equipRows +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '<div class="kol-box">' +
      '<div class="kol-box-header">Mochila (Inventário)</div>' +
      '<div class="kol-box-body">' +
      '<table class="kol-table">' +
      '<thead><tr><th>Item</th><th>Tipo</th><th>Descrição / Bônus</th><th>Ação</th></tr></thead>' +
      '<tbody>' +
      bagRows +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>';
  }

  function renderCraftingView(container) {
    const owned = Game.Inventory.getOwnedEntries();
    let optionsHtml = '<option value="">-- Selecione um item --</option>';
    owned.forEach(function (entry) {
      optionsHtml +=
        '<option value="' +
        esc(entry.item.id) +
        '">' +
        esc(entry.item.name) +
        ' (x' +
        entry.quantity +
        ')</option>';
    });

    let recipeRows = '';
    Game.Data.recipes.forEach(function (recipe) {
      const itemA = Game.Data.itemsById[recipe.ingredientA];
      const itemB = Game.Data.itemsById[recipe.ingredientB];
      const result = Game.Data.itemsById[recipe.resultItemId];
      const canCraft = Game.Inventory.canCraftRecipe(recipe);

      recipeRows +=
        '<tr>' +
        '<td>' +
        esc(itemA ? itemA.name : recipe.ingredientA) +
        ' + ' +
        esc(itemB ? itemB.name : recipe.ingredientB) +
        (recipe.meatCost ? ' + ' + recipe.meatCost + ' Meat' : '') +
        '</td>' +
        '<td><strong>' +
        esc(result ? result.name : recipe.resultItemId) +
        '</strong><br /><span class="muted-note">' +
        esc(recipe.description) +
        '</span></td>' +
        '<td><button type="button" class="kol-btn" data-craft-recipe="' +
        esc(recipe.id) +
        '"' +
        (canCraft ? '' : ' disabled') +
        '>Combinar</button></td>' +
        '</tr>';
    });

    container.innerHTML =
      '<div class="kol-box">' +
      '<div class="kol-box-header">Bancada de Crafting (Estilo Meat Paste)</div>' +
      '<div class="kol-box-body">' +
      '<p>Combine dois itens da sua mochila para forjar equipamentos mais fortes ou pratos nutritivos.</p>' +
      '<div class="craft-select-row">' +
      '<select id="craft-select-a" class="kol-select">' +
      optionsHtml +
      '</select>' +
      '<div class="craft-plus">+</div>' +
      '<select id="craft-select-b" class="kol-select">' +
      optionsHtml +
      '</select>' +
      '</div>' +
      '<button type="button" id="btn-craft-combine" class="kol-btn kol-btn-primary">Combinar Itens Selecionados</button>' +
      '</div>' +
      '</div>' +
      '<div class="kol-box">' +
      '<div class="kol-box-header">Receitas Conhecidas</div>' +
      '<div class="kol-box-body">' +
      '<table class="kol-table">' +
      '<thead><tr><th>Ingredientes</th><th>Resultado</th><th>Ação</th></tr></thead>' +
      '<tbody>' +
      recipeRows +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>';
  }

  function renderCampView(container) {
    const state = Game.State.get();
    const computed = Game.State.getComputedStats();

    container.innerHTML =
      '<div class="kol-box">' +
      '<div class="kol-box-header">Acampamento (Descansar)</div>' +
      '<div class="kol-box-body" style="text-align:center;">' +
      '<svg width="160" height="100" viewBox="0 0 160 100" aria-hidden="true">' +
      '<polygon points="80,15 20,85 140,85" fill="#fff" stroke="#000" stroke-width="2"/>' +
      '<line x1="80" y1="15" x2="80" y2="85" stroke="#000" stroke-width="1.5"/>' +
      '<path d="M68 85 L80 55 L92 85" fill="#fff" stroke="#000" stroke-width="1.8"/>' +
      '<line x1="5" y1="85" x2="155" y2="85" stroke="#000" stroke-width="2"/>' +
      '</svg>' +
      '<p>Sua barraca de linhas pretas oferece descanso completo.</p>' +
      '<p>Descansar consome <strong>1 Adventure</strong> e restaura seu HP para <strong>' +
      computed.maxHp +
      '</strong> e MP para <strong>' +
      computed.maxMp +
      '</strong>.</p>' +
      '<div class="btn-row" style="justify-content:center;">' +
      '<button type="button" id="btn-camp-rest" class="kol-btn kol-btn-primary"' +
      (state.adventures <= 0 ? ' disabled' : '') +
      '>[1] Descansar na Barraca (1 Adventure)</button>' +
      '<button type="button" id="btn-camp-map" class="kol-btn">[M] Voltar ao Mapa</button>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  function renderHelpView(container) {
    const state = Game.State.get();
    const returnLabel = state ? 'Voltar ao Jogo' : 'Voltar à Tela Inicial';

    container.innerHTML =
      '<div class="kol-box">' +
      '<div class="kol-box-header">Como Jogar e Controles</div>' +
      '<div class="kol-box-body">' +
      '<p><strong>Objetivo:</strong> Explore as zonas do mapa, ganhe sub-pontos para subir seus atributos e nível, equipe armaduras melhores e enfrente o <em>Barão do Espaguete Supremo</em> no Pico do Boss antes que suas <strong>30 Adventures</strong> ou seu <strong>HP</strong> acabem.</p>' +
      '<table class="kol-table">' +
      '<thead><tr><th>Tecla / Controle</th><th>Ação</th></tr></thead>' +
      '<tbody>' +
      '<tr><td><span class="kbd-tag">Mouse</span></td><td>Clique em qualquer botão, local do mapa, item ou escolha narrativa.</td></tr>' +
      '<tr><td><span class="kbd-tag">M</span></td><td>Abrir o Mapa Principal.</td></tr>' +
      '<tr><td><span class="kbd-tag">I</span></td><td>Abrir Inventário e Equipamentos.</td></tr>' +
      '<tr><td><span class="kbd-tag">C</span></td><td>Abrir Bancada de Crafting.</td></tr>' +
      '<tr><td><span class="kbd-tag">R</span></td><td>Ir ao Acampamento para descansar.</td></tr>' +
      '<tr><td><span class="kbd-tag">H</span> ou <span class="kbd-tag">Esc</span></td><td>Abrir ou fechar esta tela de Ajuda.</td></tr>' +
      '<tr><td><span class="kbd-tag">1</span> a <span class="kbd-tag">5</span></td><td>Ações contextuais: explorar locais do mapa, ações de combate (Atacar, Habilidade, Item, Fugir, Trégua) ou escolhas de eventos.</td></tr>' +
      '<tr><td><span class="kbd-tag">Enter</span> / <span class="kbd-tag">Espaço</span></td><td>Avançar após o fim de um combate ou evento.</td></tr>' +
      '</tbody>' +
      '</table>' +
      '<div class="btn-row">' +
      '<button type="button" id="btn-help-back" class="kol-btn kol-btn-primary">' +
      returnLabel +
      '</button>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  function renderEndgameView(container) {
    const state = Game.State.get();
    if (!state || !state.endgame) return;
    const score = Game.State.getScoreBreakdown();

    const badgeMap = {
      victory: 'VITÓRIA!',
      draw: 'EMPATE!',
      defeat: 'DERROTA!'
    };

    container.innerHTML =
      '<div class="kol-box">' +
      '<div class="kol-box-header">Fim de Jogo</div>' +
      '<div class="kol-box-body">' +
      '<div class="endgame-banner">' +
      '<h2>' +
      (badgeMap[state.endgame.result] || 'FIM') +
      ' — ' +
      esc(state.endgame.title) +
      '</h2>' +
      '<p>' +
      esc(state.endgame.reason) +
      '</p>' +
      '</div>' +
      '<table class="kol-table">' +
      '<thead><tr><th>Critério de Pontuação</th><th>Valor</th></tr></thead>' +
      '<tbody>' +
      '<tr><td>Meat Acumulado (' + state.meat + ')</td><td>' + score.meat + '</td></tr>' +
      '<tr><td>Adventures Restantes (' + state.adventures + ' &times; 50)</td><td>' + score.adventuresBonus + '</td></tr>' +
      '<tr><td>Inimigos Derrotados (' + state.monstersDefeated + ' &times; 100)</td><td>' + score.combatBonus + '</td></tr>' +
      '<tr><td>Bônus de Desfecho</td><td>' + score.outcomeBonus + '</td></tr>' +
      '<tr><td><strong>PONTUAÇÃO FINAL</strong></td><td><strong>' + score.total + '</strong></td></tr>' +
      '</tbody>' +
      '</table>' +
      '<div class="btn-row">' +
      '<button type="button" id="btn-endgame-restart" class="kol-btn kol-btn-primary">Reiniciar Nova Partida</button>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  Game.UI = {
    init: initStaticIcons,

    showToast(message) {
      const banner = document.getElementById('toast-banner');
      if (!banner) return;
      if (!message) {
        banner.hidden = true;
        banner.textContent = '';
        return;
      }
      banner.textContent = message;
      banner.hidden = false;
    },

    render(viewOverride) {
      const state = Game.State.get();
      const view = viewOverride || (state ? state.currentView : 'title');

      renderSidebar();
      renderTopNav(view);

      const container = document.getElementById('view-container');
      if (!container) return;

      if (view === 'title') renderTitleView(container);
      else if (view === 'map') renderMapView(container);
      else if (view === 'combat') renderCombatView(container);
      else if (view === 'event') renderEventView(container);
      else if (view === 'inventory') renderInventoryView(container);
      else if (view === 'crafting') renderCraftingView(container);
      else if (view === 'camp') renderCampView(container);
      else if (view === 'help') renderHelpView(container);
      else if (view === 'endgame') renderEndgameView(container);
      else renderTitleView(container);
    }
  };
})(window.Game);
