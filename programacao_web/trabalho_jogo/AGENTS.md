# AGENTS.md — Guia de Arquitetura e Convenções do Projeto

## 1. Visão Geral do Projeto
- **Nome provisório:** *Kingdom of Loathing — Protótipo Acadêmico (UEM)*
- **Contexto:** Trabalho da disciplina de Programação Web (UEM).
- **Objetivo:** Jogo curto de RPG em turnos no navegador, inspirado na interface e nas mecânicas clássicas de [Kingdom of Loathing](https://wiki.kingdomofloathing.com/Main_Page).
- **Restrições Técnicas:**
  - **100% Vanilla:** HTML5, CSS3 e JavaScript (ES6+) puros.
  - **Zero frameworks ou bibliotecas externas** (sem engines de jogo, sem jQuery, sem Tailwind/Bootstrap).
  - **Sem repositório Git** (a menos que explicitamente solicitado depois).
  - **Sem assets gráficos externos inicialmente:** placeholders com texto, ASCII/Unicode e SVGs simples em preto e branco desenhados no código (estilo *stick figure* / traço simples).
  - **Persistência:** `localStorage` para salvar e continuar o progresso automaticamente.
  - **Modularidade via JSON:** Itens, equipamentos/armaduras, monstros/batalhas, eventos, locais do mapa e receitas de crafting devem ser configuráveis externamente via arquivos JSON.

---

## 2. Requisitos Obrigatórios da Disciplina (Checklist de Avaliação)
1. **Interface (HTML e CSS):**
   - Estética fiel à referência original do *Kingdom of Loathing*: fundo branco (`#ffffff`), linhas pretas simples (`1px` ou `2px solid #000000`) **mais o azul clássico de destaque (`#0000ff`) nas barras de título e bordas das caixas de conteúdo**, tipografia limpa (`Arial, Helvetica, sans-serif`), layout em estilo frames ocupando toda a largura (sem barra lateral direita de chat/anúncios).
   - Na **Tela Inicial**, as barras lateral e superior ficam ocultas (`body.is-title`), centralizando o conteúdo como página de entrada separada.
   - Estrutura visual em três regiões principais durante o jogo:
     - **Barra Lateral Esquerda (`#char-pane`, ~150px):** Avatar palito (SVG), Nome sublinhado, Nível com barra de progresso, Classe, Atributos (*Muscle*, *Mysticality*, *Moxie*) com barras de sub-pontos, Recursos (*HP*, *MP*, *Meat*, *Adventures*), *Current Quest*, *Last Adventure* (link) e *Score*.
     - **Barra Superior (`#top-pane`):** Ícones simples em traço preto com rótulo em minúsculas abaixo para **mapa**, **inventário**, **crafting**, **acampamento**, **ajuda** e **reiniciar**, além das luas *Ronald & Grimace*.
     - **Painel Central (`#main-pane`):** Área de aviso (`#notice`) e caixa dinâmica (`#view`) alternando entre Tela Inicial, Mapa, Combate, Evento, Inventário, Crafting, Acampamento, Ajuda e Fim de Jogo.
2. **Tela Inicial:**
   - Exibe o nome do jogo, explicação breve das regras e controles, campo de nome do personagem e seleção de classe inicial.
   - Botão **Iniciar Nova Partida** e botão **Continuar Jogo** (visível/habilitado quando houver estado salvo no `localStorage`).
3. **Mecânica e Controles (Mouse e Teclado):**
   - **Mouse:** Cliques em regiões/locais do mapa, botões de ação em combate, equipar/usar itens, selecionar ingredientes no crafting e escolhas em eventos.
   - **Teclado:**
     - Atalhos globais de navegação: `M` (Mapa), `I` (Inventário), `C` (Crafting), `R` (Acampamento/Descansar), `H` ou `Esc` (Ajuda/Controles).
     - Atalhos contextuais numéricos (`1`, `2`, `3`, `4`...): ações de combate (Atacar, Habilidade, Usar Item, Fugir), opções de eventos ou entrada rápida nos locais do mapa; `Enter` / `Espaço` para avançar após fim de batalha/evento.
4. **Pontuação (Optativa, implementada):**
   - Calculada continuamente e exibida no painel lateral e na tela final:
     `Score = Meat acumulado + (Adventures restantes × 50) + (Inimigos derrotados × 100) + Bônus de Desfecho (Vitória/Empate)`.
5. **Condições de Término (Vitória, Empate e Derrota):**
   - **Vitória:** Derrotar o Boss Final da missão principal mantendo `HP > 0` antes de esgotar as `Adventures`.
   - **Derrota:** Chegar a `0 HP` durante uma batalha sem conseguir recuperar, ou esgotar todas as `Adventures` (turnos) sem concluir a missão principal.
   - **Empate:** Ocorrência de nocaute mútuo contra o Boss Final (ambos chegam a `0 HP` no mesmo turno — ex.: ataque final de contra-ataque/explosão do Boss) ou escolha de **Trégua Mútua** em evento/condição especial do confronto final.
6. **Reiniciar:**
   - Botão dedicado na barra superior (com confirmação simples) e nas telas de Vitória/Empate/Derrota para limpar a partida atual no `localStorage` e recomeçar do zero.

---

## 3. Sistema de Jogo (Inspirado na Wiki do Kingdom of Loathing)

### 3.1 Atributos Primários e Progressão
- **Muscle:** Aumenta o `HP máximo` e o dano de ataques físicos/corpo-a-corpo.
- **Mysticality:** Aumenta o `MP máximo` e o poder de habilidades/magias.
- **Moxie:** Aumenta a defesa/esquiva contra ataques inimigos e o dano de ataques à distância/astúcia.
- **Sub-pontos e Níveis:** Vencer combates e resolver eventos concede sub-pontos aos atributos (exibidos como barra simples sob cada atributo). Ao atingir o limite do nível atual, o atributo base aumenta e o personagem pode subir de `Level`.

### 3.2 Recursos e Turnos
- **Adventures (Turnos):** Recurso central inspirado em KoL. Cada incursão em uma zona de aventura ou descanso completo consome `1 Adventure` (ex.: campanha curta começa com `30` Adventures).
- **HP (Hit Points) e MP (Magical Points):** Recuperados com itens consumíveis ou descansando no Acampamento.
- **Meat:** Moeda do jogo, obtida em batalhas/eventos e usada na pontuação ou eventuais interações.

### 3.3 Equipamentos e Crafting
- **Slots de Equipamento:** `hat` (Chapéu), `weapon` (Arma), `armor` (Armadura/Torso), `pants` (Calças), `accessory` (Acessório).
- **Bônus de Equipamento:** Cada peça pode conceder modificadores planos (`+Muscle`, `+Mysticality`, `+Moxie`, `+Attack`, `+Defense`, `+MaxHP`, `+MaxMP`). Os stats efetivos são exibidos no formato KoL quando modificados por equipamentos, ex.: `12 (10)`.
- **Crafting (estilo Meat Paste):** O jogador combina 2 itens específicos do inventário segundo `recipes.json` (opcionalmente consumindo Meat ou 1 Adventure se configurado) para criar equipamentos ou consumíveis mais fortes.

---

## 4. Estrutura de Diretórios Planejada

```text
trabalho_jogo/
├── AGENTS.md
├── index.html              # Estrutura principal (layout KoL em frames: sidebar esquerda, topo, centro)
├── css/
│   └── style.css           # Estilo KoL (fundo branco, linhas pretas, caixas com cabeçalho/borda #0000ff)
├── tools/
│   └── build-data.ps1      # Gera data/bundle.js a partir dos JSONs para suporte a file://
├── js/
│   ├── main.js             # Bootstrap, tabela de ações (data-action), atalhos (data-key) e save único
│   ├── state.js            # Estado global do jogador, fórmulas de atributos/nível, score e localStorage
│   ├── dataLoader.js       # Carregamento dos JSONs via fetch() com fallback para window.GAME_DATA
│   ├── combat.js           # Motor de combate em turnos (ataque, skill, item, fuga, trégua, vitória/empate/derrota)
│   ├── events.js           # Motor de encontros narrativos (não-combate) e escolhas ramificadas
│   ├── inventory.js        # Gerenciamento de mochila, uso de consumíveis, equipar/desequipar e crafting
│   ├── art.js              # Desenhos SVG inline em traço preto (avatar, ícones, monstros, mapa, itens)
│   └── ui.js               # Renderização pura do DOM via template literals
└── data/
    ├── items.json          # Itens consumíveis, materiais de crafting e equipamentos/armaduras
    ├── monsters.json       # Inimigos comuns e Boss Final (stats, falas, drops, recompensas)
    ├── events.json         # Encontros não-combate com escolhas e consequências
    ├── locations.json      # Zonas do mapa, posições e tabela de encontros
    ├── recipes.json        # Receitas de crafting (ingrediente A + ingrediente B -> resultado)
    └── bundle.js           # GERADO por tools/build-data.ps1 (não editar à mão)
```

---

## 5. Convenções dos Schemas JSON

### `data/items.json`
- Campos esperados: `id`, `name`, `type` (`"consumable" | "equipment" | "material"`), `slot` (`"hat" | "weapon" | "armor" | "pants" | "accessory" | null`), `description`, `priceMeat`, `effects` (para consumíveis: `{ "hp": 10, "mp": 5 }`), `bonuses` (para equipamentos: `{ "muscle": 2, "defense": 3 }`), `image` (string opcional ou `null`).

### `data/monsters.json`
- Campos esperados: `id`, `name`, `isBoss` (boolean), `hp`, `attack`, `defense`, `meatDrop`, `statGain` (`{ "muscle": 2, "mysticality": 1, "moxie": 1 }`), `drops` (`[{ "itemId": "...", "chance": 0.5 }]`), `introText`, `attackText`, `defeatText`, `specialOnZeroHp` (opcional, para suportar empate por explosão/contra-ataque final do Boss), `image` (string opcional ou `null`).

### `data/events.json`
- Campos esperados: `id`, `title`, `text`, `choices` (`[{ "label": "...", "costMeat": 0, "requiresItem": null, "outcomes": { "text": "...", "hpDelta": 0, "mpDelta": 0, "meatDelta": 10, "giveItems": [], "statGain": {}, "triggerEndgame": null } }]`), `image` (string opcional ou `null`).

### `data/locations.json`
- Campos esperados: `id`, `name`, `shortLabel`, `description`, `recommendedLevel`, `unlockedByDefault`, `unlockFlag`, `mapPosition` (`{ "x": 18, "y": 24 }` em porcentagem no mapa), `encounters` (`[{ "kind": "monster" | "event", "id": "...", "weight": 1 }]`), `image` (string opcional ou `null`).

### `data/recipes.json`
- Campos esperados: `id`, `ingredientA`, `ingredientB`, `resultItemId`, `meatCost`, `description`.

---

## 6. Nota Técnica sobre Carregamento de JSON no Navegador
- Os arquivos `data/*.json` são a **fonte única da verdade**.
- Sobre HTTP (`Live Server`, `python -m http.server`, etc.), o `dataLoader.js` busca os arquivos `./data/*.json` diretamente via `fetch()`.
- Para abrir `index.html` com duplo clique no navegador (`file://`, onde `fetch()` sofre bloqueio de CORS), o jogo usa `window.GAME_DATA` carregado de `data/bundle.js`. **Sempre que editar qualquer JSON em `data/`, execute:**
  ```powershell
  powershell -ExecutionPolicy Bypass -File tools/build-data.ps1
  ```

---

## 7. Regras para Agentes e Desenvolvimento Futuro
- **Manter simplicidade acadêmica:** Código legível, bem comentado no porquê e organizado por responsabilidade, sem over-engineering.
- **Preservar estética KoL:** Fundo branco, linhas pretas simples e azul clássico `#0000ff` apenas em cabeçalhos e bordas das caixas de conteúdo; sem sombras, cantos arredondados ou gradientes.
- **Convenções de código:**
  - Ações de UI declaradas via `data-action` e despachadas pela tabela `actions` em `js/main.js`.
  - Atalhos contextuais declarados via `data-key` no elemento correspondente.
  - Motores (`state.js`, `inventory.js`, `combat.js`, `events.js`) não tocam no DOM e não chamam `save()`; `main.js` persiste o estado uma vez por ação.
- **Atualizar `AGENTS.md`:** Sempre que novos slots, tipos de evento ou campos de JSON forem adicionados, documentar neste arquivo para manter a referência sincronizada.
