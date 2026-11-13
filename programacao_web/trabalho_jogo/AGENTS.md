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
   - Estética fiel à referência do *Kingdom of Loathing*: fundo branco (`#ffffff`), bordas/linhas pretas simples (`1px` ou `2px solid #000000`), tipografia limpa (`Arial, Verdana, sans-serif`), sem barra lateral direita (chat/anúncios).
   - Estrutura visual em três regiões principais:
     - **Barra Lateral Esquerda (Character/Stats Pane):** Avatar palito (placeholder SVG/CSS), Nome, Nível, Classe, Atributos (*Muscle*, *Mysticality*, *Moxie*) com barras de progresso de sub-pontos, Recursos (*HP*, *MP*, *Meat*, *Adventures* restantes), *Current Quest* (missão atual), *Last Adventure* e *Score* (pontuação).
     - **Barra Superior (Top Menu Pane):** Botões/ícones simples em linha preta para abrir o **Mapa**, **Inventário**, **Crafting**, **Acampamento (Descansar)**, **Ajuda/Controles** e **Reiniciar Partida**.
     - **Painel Central (Main Pane):** Área dinâmica principal que alterna entre: Tela Inicial, Mapa Principal/Zonas, Cena de Batalha, Cena de Evento Narrativo, Inventário/Equipamentos, Crafting, Acampamento e Tela de Fim de Jogo.
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
├── index.html              # Estrutura principal (layout KoL: topo, sidebar esquerda, centro)
├── css/
│   └── style.css           # Estilo P&B minimalista (fundo branco, linhas pretas, tabelas/bordas KoL)
├── js/
│   ├── main.js             # Bootstrap, inicialização de dados, loop de eventos e atalhos de teclado
│   ├── state.js            # Estado global do jogador, fórmulas de atributos/nível, score e localStorage
│   ├── dataLoader.js       # Carregamento dos JSONs via fetch() com fallback para execução local (file://)
│   ├── combat.js           # Motor de combate em turnos (ataque, skill, item, fuga, vitória/empate/derrota)
│   ├── events.js           # Motor de encontros narrativos (não-combate) e escolhas ramificadas
│   ├── inventory.js        # Gerenciamento de mochila, uso de consumíveis, equipar/desequipar e crafting
│   └── ui.js               # Renderização pura do DOM para cada tela e atualização da sidebar/topbar
└── data/
    ├── items.json          # Itens consumíveis, materiais de crafting e equipamentos/armaduras
    ├── monsters.json       # Inimigos comuns e Boss Final (stats, falas, drops, recompensas)
    ├── events.json         # Encontros não-combate com escolhas e consequências
    ├── locations.json      # Zonas do mapa, tabela de encontros (monstros/eventos) e pré-requisitos
    └── recipes.json        # Receitas de crafting (ingrediente A + ingrediente B -> resultado)
```

---

## 5. Convenções dos Schemas JSON

### `data/items.json`
- Campos esperados: `id`, `name`, `type` (`"consumable" | "equipment" | "material"`), `slot` (`"hat" | "weapon" | "armor" | "pants" | "accessory" | null`), `description`, `priceMeat`, `effects` (para consumíveis: `{ "hp": 10, "mp": 5 }`), `bonuses` (para equipamentos: `{ "muscle": 2, "defense": 3 }`).

### `data/monsters.json`
- Campos esperados: `id`, `name`, `isBoss` (boolean), `hp`, `attack`, `defense`, `meatDrop`, `statGain` (`{ "muscle": 2, "mysticality": 1, "moxie": 1 }`), `drops` (`[{ "itemId": "...", "chance": 0.5 }]`), `introText`, `attackText`, `defeatText`, `specialOnZeroHp` (opcional, para suportar empate por explosão/contra-ataque final do Boss).

### `data/events.json`
- Campos esperados: `id`, `title`, `text`, `choices` (`[{ "label": "...", "costMeat": 0, "requiresItem": null, "outcomes": { "text": "...", "hpDelta": 0, "mpDelta": 0, "meatDelta": 10, "giveItem": null, "triggerEndgame": null } }]`).

### `data/locations.json`
- Campos esperados: `id`, `name`, `description`, `recommendedLevel`, `unlockedByDefault`, `unlockFlag`, `encounters` (`[{ "kind": "monster" | "event", "id": "...", "weight": 1 }]`).

### `data/recipes.json`
- Campos esperados: `id`, `ingredientA`, `ingredientB`, `resultItemId`, `meatCost`, `description`.

---

## 6. Nota Técnica sobre Carregamento de JSON no Navegador
- Ao abrir `index.html` via servidor local (`Live Server`, `python -m http.server`, etc.), `fetch('./data/*.json')` funciona normalmente.
- Como muitos professores/avaliadores abrem trabalhos acadêmicos dando **duplo clique no `index.html`** (protocolo `file://`, onde `fetch()` é bloqueado por CORS em navegadores modernos), o `dataLoader.js` deve tentar `fetch()` primeiro e possuir um **fallback embutido** (ou camada de dados padrão) caso `fetch()` falhe em `file://`, garantindo que o jogo funcione nos dois cenários.

---

## 7. Regras para Agentes e Desenvolvimento Futuro
- **Manter simplicidade acadêmica:** Código legível, bem comentado e organizado por responsabilidade, sem over-engineering.
- **Preservar estética KoL:** Nunca adicionar gradientes coloridos pesados, sombras modernas ou tema escuro que fujam da proposta branco + linhas pretas simples.
- **Atualizar `AGENTS.md`:** Sempre que novos slots, tipos de evento ou campos de JSON forem adicionados, documentar neste arquivo para manter a referência sincronizada.
