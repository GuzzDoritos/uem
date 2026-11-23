// Renderização do DOM em templates HTML estilo Kingdom of Loathing.
window.Game = window.Game || {};

(function (Game) {
  // Posições fixas de árvores decorativas ao redor dos locais do mapa (%)
  const MAP_TREES = [
    [4, 6], [4, 48], [6, 82], [8, 66], [33, 45], [38, 10],
    [43, 36], [46, 16], [46, 52], [46, 72], [46, 88],
    [77, 48], [84, 10], [88, 30], [91, 50], [91, 82]
  ];

  const BONUS_LABELS = {
    muscle: 'Muscle',
    mysticality: 'Mysticality',
    moxie: 'Moxie',
    attack: 'Ataque',
    defense: 'Defesa',
    maxHp: 'HP Máx',
    maxMp: 'MP Máx'
  };

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function box(title, bodyHtml) {
    return `
      <section class="box">
        <div class="box-title">${esc(title)}</div>
        <div class="box-body">${bodyHtml}</div>
      </section>`;
  }

  function formatBonuses(bonuses) {
    if (!bonuses) return '';
    return Object.entries(bonuses)
      .filter(([, v]) => v)
      .map(([k, v]) => `+${v} ${BONUS_LABELS[k] || k}`)
      .join(', ');
  }

  function formatStat(effective, base) {
    return effective !== base ? `${effective} (${base})` : String(base);
  }

  function renderEncounterLinks(locationId, leaveAction) {
    const state = Game.State.get();
    const loc = Game.Data.locationsById[locationId];
    const againLink =
      state.adventures > 0 && loc
        ? `<div><button type="button" class="link" data-action="explore" data-id="${esc(loc.id)}">Aventurar de novo (${esc(loc.shortLabel)})</button></div>`
        : '';
    const leaveLabel = state.adventures > 0 ? 'Voltar ao Mapa Principal' : 'Continuar';
    return `
      <div class="stack">
        ${againLink}
        <div><button type="button" class="link" data-action="${leaveAction}" data-key="Enter">${leaveLabel}</button></div>
      </div>`;
  }

  const views = {
    title(ctx) {
      const hasSave = Game.State.hasSavedGame();
      const draftName = document.getElementById('input-player-name')?.value ?? 'Aventureiro';
      const selectedClass = ctx?.selectedClassId || 'seal_clubber';

      const classRows = Object.values(Game.State.CLASSES)
        .map((cls) => {
          const checked = cls.id === selectedClass ? ' checked' : '';
          return `
            <tr>
              <td>
                <label>
                  <input type="radio" name="classId" value="${esc(cls.id)}" data-action="selectClass" data-id="${esc(cls.id)}"${checked}>
                  <strong>${esc(cls.name)}</strong>
                </label>
              </td>
              <td>MUS ${cls.baseStats.muscle} / MYS ${cls.baseStats.mysticality} / MOX ${cls.baseStats.moxie}</td>
              <td class="hint">${esc(cls.description)}</td>
            </tr>`;
        })
        .join('');

      const formBox = box(
        'Novo Personagem',
        `
          <div class="stack">
            <div>
              <label for="input-player-name"><strong>Nome:</strong></label>
              <input id="input-player-name" class="text-input" type="text" maxlength="24" value="${esc(draftName)}">
            </div>
            <table class="plain-table">${classRows}</table>
            <div class="row">
              <button type="button" class="button" data-action="start" data-key="Enter">Iniciar Nova Partida</button>
              ${hasSave ? '<button type="button" class="button" data-action="continue">Continuar Partida Salva</button>' : ''}
            </div>
            <div><button type="button" class="link" data-action="help">Como jogar e controles</button></div>
          </div>`
      );

      const rulesBox = box(
        'Regras da Campanha',
        `
          <ul class="rules-list">
            <li>Você começa com <strong>30 Adventures</strong>. Explorar zonas ou descansar consome 1 Adventure.</li>
            <li><strong>Vitória:</strong> Derrote o <em>Barão do Espaguete Supremo</em> no Pico do Boss antes que suas Adventures ou HP acabem.</li>
            <li><strong>Empate:</strong> Nocaute mútuo no golpe final contra o Boss, ou acordo de Trégua Mútua.</li>
            <li><strong>Derrota:</strong> Chegar a 0 HP ou esgotar todas as Adventures sem concluir a missão.</li>
          </ul>`
      );

      return `
        <div class="title-head">
          <h1>Kingdom of Loathing</h1>
          <div class="hint">protótipo acadêmico — UEM</div>
        </div>
        ${formBox}
        ${rulesBox}`;
    },

    map() {
      const state = Game.State.get();
      const disabled = state.adventures <= 0 ? ' disabled' : '';

      const treesHtml = MAP_TREES.map(
        ([x, y]) => `<span class="map-tree" style="left:${x}%;top:${y}%;">${Game.Art.tree()}</span>`
      ).join('');

      const spotsHtml = Game.Data.locations
        .map((loc, idx) => {
          const pos = loc.mapPosition || { x: 20 + idx * 20, y: 50 };
          return `
            <button type="button" class="map-spot" style="left:${pos.x}%;top:${pos.y}%;"
              data-action="explore" data-id="${esc(loc.id)}" data-key="${idx + 1}"
              title="${esc(loc.description)}"${disabled}>
              <span class="map-spot-label"><strong>${esc(loc.shortLabel)}</strong><br><span class="hint">(nív. ${loc.recommendedLevel}) (${idx + 1})</span></span>
              ${Game.Art.location(loc)}
            </button>`;
        })
        .join('');

      return box(
        'Mapa do Reino',
        `
          <div class="map">
            ${treesHtml}
            ${spotsHtml}
          </div>
          <p class="hint">Clique num local ou use 1–4. Cada exploração gasta 1 Adventure.</p>`
      );
    },

    combat() {
      const state = Game.State.get();
      const combat = state.activeCombat;
      if (!combat) return '';

      const monster = Game.Data.monstersById[combat.monsterId];
      const cls = Game.State.CLASSES[state.classId] || Game.State.CLASSES.seal_clubber;
      const hpPct = Math.max(0, Math.round((combat.monsterHp / combat.monsterMaxHp) * 100));
      const logHtml = combat.log.map((line) => `<p>${esc(line)}</p>`).join('');

      let controlsHtml;
      if (combat.resolved) {
        controlsHtml = renderEncounterLinks(combat.locationId, 'leaveCombat');
      } else {
        const consumables = Game.Inventory.getConsumables();
        const itemOptions = consumables.length
          ? consumables
              .map((e) => `<option value="${esc(e.item.id)}">${esc(e.item.name)} (x${e.quantity})</option>`)
              .join('')
          : '<option value="">(sem consumíveis)</option>';

        const noMp = state.mp < Game.Combat.SKILL_MP_COST ? ' disabled' : '';
        const noItems = consumables.length === 0 ? ' disabled' : '';
        const truceBtn = Game.Combat.canTruce()
          ? '<div><button type="button" class="button" data-action="truce" data-key="5" title="Requer Medalhão da Diplomacia, Boss <= 50% HP ou 50 Meat">Propor Trégua (5)</button></div>'
          : '';

        controlsHtml = `
          <div class="stack">
            <div><button type="button" class="button" data-action="attack" data-key="1">Atacar (1)</button></div>
            <div><button type="button" class="button" data-action="skill" data-key="2"${noMp}>${esc(cls.skillName)} (${Game.Combat.SKILL_MP_COST} MP) (2)</button></div>
            <div class="row">
              <select id="combat-item" class="select-input"${noItems}>${itemOptions}</select>
              <button type="button" class="button" data-action="useCombatItem" data-key="3"${noItems}>Usar Item (3)</button>
            </div>
            <div><button type="button" class="button" data-action="flee" data-key="4">Fugir (4)</button></div>
            ${truceBtn}
          </div>`;
      }

      return box(
        'Combate!',
        `
          <p>Você está enfrentando: <strong>${esc(monster.name)}</strong>${monster.isBoss ? ' [BOSS]' : ''}</p>
          <div class="combat-art">${Game.Art.monster(monster)}</div>
          <div class="combat-hp">
            <div>HP do inimigo: <strong>${combat.monsterHp} / ${combat.monsterMaxHp}</strong></div>
            <div class="hp-bar"><div class="hp-bar-fill" style="width:${hpPct}%"></div></div>
          </div>
          <div class="combat-log">${logHtml}</div>
          ${controlsHtml}`
      );
    },

    event() {
      const state = Game.State.get();
      const active = state.activeEvent;
      if (!active) return '';

      const def = Game.Data.eventsById[active.eventId];
      if (!active.resolved) {
        const choicesHtml = def.choices
          .map((choice, idx) => {
            const disabled = Game.Events.canChoose(choice) ? '' : ' disabled';
            return `<div><button type="button" class="button" data-action="choose" data-id="${idx}" data-key="${idx + 1}"${disabled}>${esc(choice.label)} (${idx + 1})</button></div>`;
          })
          .join('');

        return box(def.title, `<p>${esc(def.text)}</p><div class="stack">${choicesHtml}</div>`);
      }

      const linesHtml = active.resultLines.map((line) => `<p>${esc(line)}</p>`).join('');
      const itemsHtml = (active.gainedItems || [])
        .map((id) => Game.Data.itemsById[id])
        .filter(Boolean)
        .map(
          (item) =>
            `<div class="row">${Game.Art.itemIcon(item)}<span>Você recebeu um item: <strong>${esc(item.name)}</strong></span></div>`
        )
        .join('');

      return box(
        'Resultado da Aventura:',
        `${linesHtml}${itemsHtml}${renderEncounterLinks(active.locationId, 'leaveEvent')}`
      );
    },

    inventory() {
      const state = Game.State.get();
      const stats = Game.State.getComputedStats();

      const equipRows = Object.entries(Game.Inventory.SLOT_LABELS)
        .map(([slot, label]) => {
          const item = Game.Data.itemsById[state.equipment[slot]];
          const nameHtml = item
            ? `<strong>${esc(item.name)}</strong> <span class="hint">(${esc(formatBonuses(item.bonuses))})</span>`
            : '<span class="hint">(vazio)</span>';
          const actionHtml = item
            ? `<button type="button" class="link" data-action="unequip" data-id="${esc(slot)}">[remover]</button>`
            : '';
          return `<tr><td><strong>${esc(label)}:</strong></td><td>${nameHtml}</td><td>${actionHtml}</td></tr>`;
        })
        .join('');

      const equipBox = box(
        'Equipamento',
        `
          <p>Ataque: <strong>${stats.attack}</strong> &nbsp;|&nbsp; Defesa: <strong>${stats.defense}</strong></p>
          <table class="plain-table">${equipRows}</table>`
      );

      const groups = [
        ['consumable', 'Consumíveis'],
        ['equipment', 'Equipamentos'],
        ['material', 'Diversos']
      ];
      const owned = Game.Inventory.getOwned();

      const catBoxes = groups
        .map(([type, title]) => {
          const entries = owned.filter((e) => e.item.type === type);
          if (!entries.length) return '';

          const rows = entries
            .map(({ item, quantity }) => {
              const bonuses = item.bonuses ? ` (${formatBonuses(item.bonuses)})` : '';
              let act = '';
              if (item.type === 'consumable') {
                act = `<button type="button" class="link" data-action="use" data-id="${esc(item.id)}">[usar]</button>`;
              } else if (item.type === 'equipment') {
                act = `<button type="button" class="link" data-action="equip" data-id="${esc(item.id)}">[equipar]</button>`;
              }
              return `
                <div class="inv-row">
                  <div class="inv-main">
                    ${Game.Art.itemIcon(item)}
                    <div>
                      <strong>${esc(item.name)}</strong> (${quantity})
                      <div class="hint">${esc(item.description + bonuses)}</div>
                    </div>
                  </div>
                  <div>${act}</div>
                </div>`;
            })
            .join('');

          return box(title, rows);
        })
        .join('');

      const emptyNote = owned.length ? '' : box('Mochila', '<p>Sua mochila está vazia.</p>');
      return equipBox + catBoxes + emptyNote;
    },

    crafting() {
      const owned = Game.Inventory.getOwned();
      const options =
        '<option value="">-- escolha um item --</option>' +
        owned
          .map((e) => `<option value="${esc(e.item.id)}">${esc(e.item.name)} (x${e.quantity})</option>`)
          .join('');

      const combineBox = box(
        'Combinar Itens',
        `
          <p>Junte dois itens da sua mochila para criar equipamentos ou pratos melhores.</p>
          <div class="row">
            <select id="craft-a" class="select-input">${options}</select>
            <strong>+</strong>
            <select id="craft-b" class="select-input">${options}</select>
          </div>
          <div class="row">
            <button type="button" class="button" data-action="combine">Combinar!</button>
          </div>`
      );

      const recipeRows = Game.Data.recipes
        .map((r) => {
          const itemA = Game.Data.itemsById[r.ingredientA];
          const itemB = Game.Data.itemsById[r.ingredientB];
          const res = Game.Data.itemsById[r.resultItemId];
          const cost = r.meatCost ? ` + ${r.meatCost} Meat` : '';
          const disabled = Game.Inventory.canCraft(r) ? '' : ' disabled';

          return `
            <tr>
              <td>${esc(itemA?.name || r.ingredientA)} + ${esc(itemB?.name || r.ingredientB)}${cost}</td>
              <td>&rarr; <strong>${esc(res?.name || r.resultItemId)}</strong></td>
              <td><button type="button" class="link" data-action="craft" data-id="${esc(r.id)}"${disabled}>[combinar]</button></td>
            </tr>`;
        })
        .join('');

      const recipesBox = box(
        'Receitas Conhecidas',
        `<table class="plain-table">${recipeRows}</table>`
      );

      return combineBox + recipesBox;
    },

    camp() {
      const state = Game.State.get();
      const stats = Game.State.getComputedStats();
      const disabled = state.adventures <= 0 ? ' disabled' : '';

      return box(
        'Acampamento',
        `
          <div>${Game.Art.tent()}</div>
          <p>Descansar na barraca gasta <strong>1 Adventure</strong> e recupera totalmente seu HP (${stats.maxHp}) e MP (${stats.maxMp}).</p>
          <div class="stack">
            <div><button type="button" class="button" data-action="rest" data-key="1"${disabled}>Descansar (1 Adventure) (1)</button></div>
            <div><button type="button" class="link" data-action="nav" data-view="map" data-key="Enter">Voltar ao Mapa Principal</button></div>
          </div>`
      );
    },

    help() {
      return box(
        'Ajuda',
        `
          <p>Explore as zonas do mapa para ganhar atributos, equipamentos e derrotar o <em>Barão do Espaguete Supremo</em> no Pico do Boss antes que suas 30 Adventures ou seu HP cheguem a 0.</p>
          <table class="plain-table">
            <thead><tr><th>Controle</th><th>Ação</th></tr></thead>
            <tbody>
              <tr><td><strong>Mouse</strong></td><td>Clique nos locais, botões e links do jogo</td></tr>
              <tr><td><strong>M</strong></td><td>Mapa Principal</td></tr>
              <tr><td><strong>I</strong></td><td>Inventário e Equipamentos</td></tr>
              <tr><td><strong>C</strong></td><td>Crafting</td></tr>
              <tr><td><strong>R</strong></td><td>Acampamento (Descansar)</td></tr>
              <tr><td><strong>H / Esc</strong></td><td>Abrir ou fechar Ajuda</td></tr>
              <tr><td><strong>1 – 5</strong></td><td>Explorar zona, ações de combate ou escolhas</td></tr>
              <tr><td><strong>Enter / Espaço</strong></td><td>Avançar após combate ou evento</td></tr>
            </tbody>
          </table>
          <div class="row">
            <button type="button" class="link" data-action="back" data-key="Enter">Voltar</button>
          </div>`
      );
    },

    endgame() {
      const state = Game.State.get();
      if (!state?.endgame) return '';

      const titles = { victory: 'Vitória!', draw: 'Empate!', defeat: 'Derrota!' };
      const score = Game.State.getScoreBreakdown();

      return box(
        titles[state.endgame.result] || 'Fim de Jogo',
        `
          <p><strong>${esc(state.endgame.title)}</strong></p>
          <p>${esc(state.endgame.reason)}</p>
          <table class="plain-table">
            <tr><td>Meat acumulado (${state.meat})</td><td class="num">${score.meat}</td></tr>
            <tr><td>Adventures restantes (${state.adventures} &times; 50)</td><td class="num">${score.adventuresBonus}</td></tr>
            <tr><td>Inimigos derrotados (${state.monstersDefeated} &times; 100)</td><td class="num">${score.combatBonus}</td></tr>
            <tr><td>Bônus de desfecho</td><td class="num">${score.outcomeBonus}</td></tr>
            <tr><th>Pontuação Final</th><th class="num">${score.total}</th></tr>
          </table>
          <div class="row">
            <button type="button" class="button" data-action="restart" data-key="Enter">Jogar Novamente</button>
          </div>`
      );
    }
  };

  function renderCharPane() {
    const state = Game.State.get();
    if (!state) return;

    const stats = Game.State.getComputedStats();
    document.getElementById('char-avatar').innerHTML = Game.Art.avatar(state.classId);
    document.getElementById('char-name').textContent = state.name;
    document.getElementById('char-level').textContent = `Level ${state.level}`;
    document.getElementById('char-class').textContent = state.className;

    const totalBase = state.stats.muscle + state.stats.mysticality + state.stats.moxie;
    const lvlPct = ((Math.max(0, totalBase - 19) % 4) / 4) * 100;
    document.getElementById('level-bar-fill').style.width = `${lvlPct}%`;

    document.getElementById('stat-muscle').textContent = formatStat(stats.muscle, stats.baseMuscle);
    document.getElementById('stat-mysticality').textContent = formatStat(stats.mysticality, stats.baseMysticality);
    document.getElementById('stat-moxie').textContent = formatStat(stats.moxie, stats.baseMoxie);

    for (const k of ['muscle', 'mysticality', 'moxie']) {
      const pct = Math.min(100, Math.round((state.substats[k] / Game.State.getSubstatThreshold(state.stats[k])) * 100));
      document.getElementById(`substat-${k}-fill`).style.width = `${pct}%`;
    }

    document.getElementById('res-hp').textContent = `${state.hp} / ${stats.maxHp}`;
    document.getElementById('res-mp').textContent = `${state.mp} / ${stats.maxMp}`;
    document.getElementById('res-meat').textContent = String(state.meat);
    document.getElementById('res-adv').textContent = String(state.adventures);
    document.getElementById('char-quest').textContent = state.questText;
    document.getElementById('char-score').textContent = String(Game.State.getScoreBreakdown().total);

    const lastBtn = document.getElementById('btn-last-adventure');
    const lastLoc = state.lastAdventureId && Game.Data.locationsById[state.lastAdventureId];
    const busy = (state.activeCombat && !state.activeCombat.resolved) || (state.activeEvent && !state.activeEvent.resolved);
    if (lastLoc) {
      lastBtn.textContent = lastLoc.shortLabel;
      lastBtn.dataset.id = lastLoc.id;
      lastBtn.disabled = Boolean(state.endgame || busy || state.adventures <= 0);
    } else {
      lastBtn.textContent = '(nenhuma)';
      lastBtn.dataset.id = '';
      lastBtn.disabled = true;
    }
  }

  function renderTopMenu(activeView) {
    const state = Game.State.get();
    const busy = Boolean(
      state &&
        ((state.activeCombat && !state.activeCombat.resolved) ||
          (state.activeEvent && !state.activeEvent.resolved))
    );
    const ended = Boolean(state?.endgame);

    document.querySelectorAll('.top-nav .nav-link').forEach((btn) => {
      const view = btn.dataset.view;
      const act = btn.dataset.action;
      btn.classList.toggle('is-active', Boolean(view && view === activeView));
      if (act === 'help') btn.disabled = false;
      else if (act === 'restart') btn.disabled = !state;
      else btn.disabled = !state || ended || busy;
    });
  }

  Game.UI = {
    init() {
      document.getElementById('icon-hp').innerHTML = Game.Art.icon('hp');
      document.getElementById('icon-mp').innerHTML = Game.Art.icon('mp');
      document.getElementById('icon-meat').innerHTML = Game.Art.icon('meat');
      document.getElementById('icon-adv').innerHTML = Game.Art.icon('adventures');
      document.getElementById('moons-slot').innerHTML = Game.Art.moons();

      document.querySelectorAll('[data-nav-icon]').forEach((el) => {
        el.innerHTML = Game.Art.navIcon(el.dataset.navIcon);
      });
    },

    notice(text) {
      const el = document.getElementById('notice');
      if (el) el.textContent = text || '';
    },

    render(viewName, ctx) {
      const state = Game.State.get();
      const view = viewName || (state ? state.currentView : 'title');
      document.body.classList.toggle('is-title', view === 'title' || !state);

      if (state) {
        renderCharPane();
        renderTopMenu(view);
      }

      const viewEl = document.getElementById('view');
      const renderer = views[view] || views.title;
      viewEl.innerHTML = renderer(ctx);
    }
  };
})(window.Game);
