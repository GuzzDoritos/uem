/**
 * js/dataLoader.js
 * Responsável por carregar os arquivos JSON de configuração (itens, monstros,
 * eventos, locais e receitas). Suporta servidor HTTP via fetch() e possui
 * fallback embutido para execução direta via protocolo file:// (duplo clique).
 */

window.Game = window.Game || {};

(function (Game) {
  'use strict';

  const FALLBACK_DATA = {
    items: [
      {
        id: 'meat_paste_snack',
        name: 'Bolinho de Carne',
        type: 'consumable',
        slot: null,
        description: 'Um bolinho suspeitamente geométrico feito de carne prensada. Recupera 10 de HP.',
        priceMeat: 15,
        effects: { hp: 10, mp: 0 },
        bonuses: null,
        image: null
      },
      {
        id: 'espresso_shot',
        name: 'Café Expresso Duplo',
        type: 'consumable',
        slot: null,
        description: 'Forte o suficiente para acordar esqueletos. Recupera 4 de HP e 10 de MP.',
        priceMeat: 20,
        effects: { hp: 4, mp: 10 },
        bonuses: null,
        image: null
      },
      {
        id: 'spaghetti_plate',
        name: 'Prato de Espaguete Real',
        type: 'consumable',
        slot: null,
        description: 'Massa al dente digna da nobreza palito. Recupera 22 de HP e 12 de MP.',
        priceMeat: 45,
        effects: { hp: 22, mp: 12 },
        bonuses: null,
        image: null
      },
      {
        id: 'ancient_tonic',
        name: 'Tônico dos Antigos',
        type: 'consumable',
        slot: null,
        description: 'Líquido transparente com gosto de giz e hortelã. Recupera 15 de HP e 15 de MP.',
        priceMeat: 40,
        effects: { hp: 15, mp: 15 },
        bonuses: null,
        image: null
      },
      {
        id: 'stick_wood',
        name: 'Galho Reto de Madeira',
        type: 'material',
        slot: null,
        description: 'Um pedaço de madeira perfeitamente desenhado com duas linhas pretas. Útil para crafting.',
        priceMeat: 8,
        effects: null,
        bonuses: null,
        image: null
      },
      {
        id: 'sharp_rock',
        name: 'Pedra Afiada',
        type: 'material',
        slot: null,
        description: 'Uma pedra pontuda encontrada no chão. Excelente para improvisar ferramentas.',
        priceMeat: 10,
        effects: null,
        bonuses: null,
        image: null
      },
      {
        id: 'leather_scrap',
        name: 'Retalho de Couro',
        type: 'material',
        slot: null,
        description: 'Um pedaço resistente de couro curtido. Pode reforçar armaduras.',
        priceMeat: 12,
        effects: null,
        bonuses: null,
        image: null
      },
      {
        id: 'raw_noodles',
        name: 'Massa Crua Seca',
        type: 'material',
        slot: null,
        description: 'Fios de macarrão duro. Falta um bom molho para virar uma refeição.',
        priceMeat: 10,
        effects: null,
        bonuses: null,
        image: null
      },
      {
        id: 'spicy_sauce',
        name: 'Molho Picante Ancestral',
        type: 'material',
        slot: null,
        description: 'Um pote de molho vermelho imaginário que arde só de olhar.',
        priceMeat: 15,
        effects: null,
        bonuses: null,
        image: null
      },
      {
        id: 'colander_hat',
        name: 'Escorredor de Macarrão',
        type: 'equipment',
        slot: 'hat',
        description: 'Protege a cabeça de ataques e filtra pensamentos místicos.',
        priceMeat: 35,
        effects: null,
        bonuses: { defense: 2, mysticality: 2, maxMp: 4 },
        image: null
      },
      {
        id: 'wooden_club',
        name: 'Porrete de Galho',
        type: 'equipment',
        slot: 'weapon',
        description: 'Simples, rústico e eficiente para resolver discordâncias.',
        priceMeat: 25,
        effects: null,
        bonuses: { attack: 3, muscle: 1 },
        image: null
      },
      {
        id: 'stone_axe',
        name: 'Machado de Pedra Artesanal',
        type: 'equipment',
        slot: 'weapon',
        description: 'Arma criada à mão unindo madeira firme e pedra afiada.',
        priceMeat: 65,
        effects: null,
        bonuses: { attack: 6, muscle: 3 },
        image: null
      },
      {
        id: 'cardboard_vest',
        name: 'Colete de Papelão Grosso',
        type: 'equipment',
        slot: 'armor',
        description: 'Surpreendentemente resistente contra golpes leves (desde que não chova).',
        priceMeat: 30,
        effects: null,
        bonuses: { defense: 3, maxHp: 5 },
        image: null
      },
      {
        id: 'reinforced_tunic',
        name: 'Túnica de Couro Reforçada',
        type: 'equipment',
        slot: 'armor',
        description: 'Proteção completa costurada com retalhos de couro sobre base firme.',
        priceMeat: 80,
        effects: null,
        bonuses: { defense: 6, maxHp: 10, moxie: 2 },
        image: null
      },
      {
        id: 'cargo_pants',
        name: 'Calça de Aventureiro',
        type: 'equipment',
        slot: 'pants',
        description: 'Muitos bolsos vazios que garantem mobilidade e estilo duvidoso.',
        priceMeat: 32,
        effects: null,
        bonuses: { defense: 2, moxie: 2 },
        image: null
      },
      {
        id: 'lucky_bottle_cap',
        name: 'Tampinha da Sorte',
        type: 'equipment',
        slot: 'accessory',
        description: 'Uma tampinha metálica amassada que parece desviar golpes fatais.',
        priceMeat: 45,
        effects: null,
        bonuses: { moxie: 2, attack: 2, maxHp: 4 },
        image: null
      },
      {
        id: 'peace_medallion',
        name: 'Medalhão da Diplomacia',
        type: 'equipment',
        slot: 'accessory',
        description: 'Símbolo antigo que permite propor uma trégua imediata ao Barão do Espaguete.',
        priceMeat: 60,
        effects: null,
        bonuses: { mysticality: 2, moxie: 2, defense: 2 },
        image: null
      }
    ],
    monsters: [
      {
        id: 'wild_pinecone',
        name: 'Pinha Selvagem Raivosa',
        isBoss: false,
        hp: 14,
        attack: 4,
        defense: 1,
        meatDrop: [10, 18],
        statGain: { muscle: 2, mysticality: 1, moxie: 1 },
        drops: [
          { itemId: 'stick_wood', chance: 0.65 },
          { itemId: 'meat_paste_snack', chance: 0.35 }
        ],
        introText: 'Uma pinha com olhos rabiscados rola da copa das árvores e bloqueia a trilha!',
        attackText: 'A pinha gira rapidamente e espeta suas canelas.',
        defeatText: 'A pinha se desmonta em gravetos inofensivos.',
        specialOnZeroHp: null,
        image: null
      },
      {
        id: 'skeleton_intern',
        name: 'Esqueleto Estagiário',
        isBoss: false,
        hp: 18,
        attack: 5,
        defense: 2,
        meatDrop: [14, 24],
        statGain: { muscle: 2, mysticality: 2, moxie: 1 },
        drops: [
          { itemId: 'sharp_rock', chance: 0.6 },
          { itemId: 'cardboard_vest', chance: 0.3 }
        ],
        introText: 'Um esqueleto carregando uma prancheta pergunta se você assinou o termo de aventura!',
        attackText: 'Ele golpeia você com uma pilha burocrática de ossos e papel.',
        defeatText: 'O esqueleto bate o ponto de saída e desaba em paz.',
        specialOnZeroHp: null,
        image: null
      },
      {
        id: 'goblin_barista',
        name: 'Goblin Barista Hipster',
        isBoss: false,
        hp: 20,
        attack: 6,
        defense: 2,
        meatDrop: [18, 30],
        statGain: { muscle: 1, mysticality: 2, moxie: 3 },
        drops: [
          { itemId: 'espresso_shot', chance: 0.65 },
          { itemId: 'raw_noodles', chance: 0.45 },
          { itemId: 'colander_hat', chance: 0.25 }
        ],
        introText: 'Um goblin de avental preto ajusta os óculos sem lente e prepara um ataque artesanal!',
        attackText: 'Ele arremessa espuma de leite fervendo na sua direção.',
        defeatText: 'O goblin derruba a prensa francesa e foge reclamando dos clientes.',
        specialOnZeroHp: null,
        image: null
      },
      {
        id: 'barroom_brawler',
        name: 'Brigão da Taverna',
        isBoss: false,
        hp: 24,
        attack: 7,
        defense: 3,
        meatDrop: [22, 35],
        statGain: { muscle: 3, mysticality: 1, moxie: 2 },
        drops: [
          { itemId: 'leather_scrap', chance: 0.65 },
          { itemId: 'cargo_pants', chance: 0.3 }
        ],
        introText: 'Um sujeito palito musculoso derruba a mesa mais próxima e parte para cima!',
        attackText: 'Ele acerta um soco pesado com um banco de madeira.',
        defeatText: 'O brigão tropeça na própria capa de caderno e pede a conta.',
        specialOnZeroHp: null,
        image: null
      },
      {
        id: 'temple_gargoyle',
        name: 'Gárgula de Giz',
        isBoss: false,
        hp: 28,
        attack: 8,
        defense: 4,
        meatDrop: [28, 42],
        statGain: { muscle: 2, mysticality: 3, moxie: 2 },
        drops: [
          { itemId: 'spicy_sauce', chance: 0.55 },
          { itemId: 'ancient_tonic', chance: 0.45 },
          { itemId: 'lucky_bottle_cap', chance: 0.3 }
        ],
        introText: 'Uma estátua desenhada em giz branco cria vida ao sentir sua presença!',
        attackText: 'A gárgula mergulha do pedestal e risca sua armadura com garras afiadas.',
        defeatText: 'A gárgula vira uma nuvem de pó de giz no chão das ruínas.',
        specialOnZeroHp: null,
        image: null
      },
      {
        id: 'spaghetti_baron',
        name: 'Barão do Espaguete Supremo',
        isBoss: true,
        hp: 45,
        attack: 10,
        defense: 5,
        meatDrop: [100, 150],
        statGain: { muscle: 5, mysticality: 5, moxie: 5 },
        drops: [],
        introText: 'O Barão do Espaguete Supremo ergue um garfo colossal no topo do pico! A batalha final começou!',
        attackText: 'O Barão chicoteia você com tentáculos de macarrão escaldante!',
        defeatText: 'O Barão solta o garfo real e desmorona sobre uma montanha de massa!',
        specialOnZeroHp: {
          recoilDamage: 5,
          text: 'Ao cair, o Barão explode em uma nuvem escaldante de molho fervente, causando 5 de dano final!'
        },
        image: null
      }
    ],
    events: [
      {
        id: 'hollow_tree',
        title: 'O Tronco Oco Misterioso',
        text: 'Entre as árvores desenhadas a lápis, você encontra um tronco oco com algo brilhando lá dentro.',
        choices: [
          {
            label: 'Vasculhar o fundo do tronco com cuidado',
            costMeat: 0,
            requiresItem: null,
            outcomes: {
              text: 'Você encontra um galho firme e uma pedra afiada escondidos no musgo.',
              hpDelta: 0,
              mpDelta: 0,
              meatDelta: 5,
              giveItems: ['stick_wood', 'sharp_rock'],
              statGain: { muscle: 1, moxie: 1 },
              triggerEndgame: null
            }
          },
          {
            label: 'Experimentar os cogumelos luminosos da borda',
            costMeat: 0,
            requiresItem: null,
            outcomes: {
              text: 'Eles têm gosto de sopa instantânea! Você se sente revigorado.',
              hpDelta: 8,
              mpDelta: 6,
              meatDelta: 0,
              giveItems: [],
              statGain: { mysticality: 2 },
              triggerEndgame: null
            }
          }
        ],
        image: null
      },
      {
        id: 'tavern_quiz',
        title: 'Desafio do Taverneiro',
        text: 'O taverneiro limpa um copo invisível e oferece trabalho rápido ou um prato especial.',
        choices: [
          {
            label: 'Ajudar a lavar a louça da taverna',
            costMeat: 0,
            requiresItem: null,
            outcomes: {
              text: 'Você lava pratos em tempo recorde e ganha gorjeta e sobras de massa.',
              hpDelta: 0,
              mpDelta: 0,
              meatDelta: 25,
              giveItems: ['raw_noodles'],
              statGain: { muscle: 1, moxie: 1 },
              triggerEndgame: null
            }
          },
          {
            label: 'Comprar o Prato Especial do Dia (15 Meat)',
            costMeat: 15,
            requiresItem: null,
            outcomes: {
              text: 'Você guarda um belo Prato de Espaguete Real na mochila para emergências.',
              hpDelta: 0,
              mpDelta: 0,
              meatDelta: 0,
              giveItems: ['spaghetti_plate'],
              statGain: { mysticality: 1 },
              triggerEndgame: null
            }
          },
          {
            label: 'Pegar um café esquecido no balcão',
            costMeat: 0,
            requiresItem: null,
            outcomes: {
              text: 'Ainda está morno! Você guarda o Café Expresso Duplo.',
              hpDelta: 0,
              mpDelta: 0,
              meatDelta: 0,
              giveItems: ['espresso_shot'],
              statGain: { moxie: 1 },
              triggerEndgame: null
            }
          }
        ],
        image: null
      },
      {
        id: 'ancient_altar',
        title: 'O Altar das Linhas Pretas',
        text: 'No centro das ruínas há um altar geométrico com um medalhão antigo encaixado na pedra.',
        choices: [
          {
            label: 'Fazer uma prece silenciosa diante do altar',
            costMeat: 0,
            requiresItem: null,
            outcomes: {
              text: 'Uma energia monocromática restaura seu espírito mágico.',
              hpDelta: 4,
              mpDelta: 10,
              meatDelta: 0,
              giveItems: [],
              statGain: { mysticality: 3 },
              triggerEndgame: null
            }
          },
          {
            label: 'Arrancar o Medalhão da Diplomacia da pedra (-4 HP)',
            costMeat: 0,
            requiresItem: null,
            outcomes: {
              text: 'Você força a pedra, rala os dedos (-4 HP), mas obtém o Medalhão da Diplomacia e um retalho de couro!',
              hpDelta: -4,
              mpDelta: 0,
              meatDelta: 0,
              giveItems: ['peace_medallion', 'leather_scrap'],
              statGain: { muscle: 2 },
              triggerEndgame: null
            }
          }
        ],
        image: null
      },
      {
        id: 'wandering_merchant',
        title: 'Mercador Palito Ambulante',
        text: 'Um viajante com mochila enorme abre um catálogo rabiscado em folha sulfite.',
        choices: [
          {
            label: 'Comprar Kit de Proteção (20 Meat)',
            costMeat: 20,
            requiresItem: null,
            outcomes: {
              text: 'Você recebe um Colete de Papelão Grosso e um Retalho de Couro para crafting.',
              hpDelta: 0,
              mpDelta: 0,
              meatDelta: 0,
              giveItems: ['cardboard_vest', 'leather_scrap'],
              statGain: { moxie: 1 },
              triggerEndgame: null
            }
          },
          {
            label: 'Trocar histórias sobre o Barão do Espaguete',
            costMeat: 0,
            requiresItem: null,
            outcomes: {
              text: 'O mercador dá boas dicas táticas e algumas moedas pelo papo.',
              hpDelta: 0,
              mpDelta: 0,
              meatDelta: 12,
              giveItems: [],
              statGain: { muscle: 1, mysticality: 1, moxie: 1 },
              triggerEndgame: null
            }
          }
        ],
        image: null
      }
    ],
    locations: [
      {
        id: 'stick_woods',
        name: 'Bosque das Árvores Palito',
        shortLabel: 'Bosque Palito',
        description: 'Área inicial cercada de árvores simples desenhadas à mão. Ideal para juntar materiais e subir de nível.',
        recommendedLevel: 1,
        unlockedByDefault: true,
        unlockFlag: null,
        mapPosition: { x: 18, y: 24 },
        encounters: [
          { kind: 'monster', id: 'wild_pinecone', weight: 4 },
          { kind: 'monster', id: 'skeleton_intern', weight: 3 },
          { kind: 'event', id: 'hollow_tree', weight: 3 }
        ],
        image: null
      },
      {
        id: 'typical_tavern',
        name: 'A Taverna Típica',
        shortLabel: 'Taverna Típica',
        description: 'Movimentada por goblins baristas e brigões. Boa fonte de Meat, café e ingredientes culinários.',
        recommendedLevel: 2,
        unlockedByDefault: true,
        unlockFlag: null,
        mapPosition: { x: 62, y: 32 },
        encounters: [
          { kind: 'monster', id: 'goblin_barista', weight: 4 },
          { kind: 'monster', id: 'barroom_brawler', weight: 3 },
          { kind: 'event', id: 'tavern_quiz', weight: 3 }
        ],
        image: null
      },
      {
        id: 'ancient_ruins',
        name: 'Ruínas do Templo Antigo',
        shortLabel: 'Templo Antigo',
        description: 'Corredores de giz onde moram gárgulas e segredos para enfrentar ou negociar com o Boss.',
        recommendedLevel: 3,
        unlockedByDefault: true,
        unlockFlag: null,
        mapPosition: { x: 28, y: 68 },
        encounters: [
          { kind: 'monster', id: 'temple_gargoyle', weight: 4 },
          { kind: 'monster', id: 'skeleton_intern', weight: 2 },
          { kind: 'event', id: 'ancient_altar', weight: 2 },
          { kind: 'event', id: 'wandering_merchant', weight: 2 }
        ],
        image: null
      },
      {
        id: 'baron_peak',
        name: 'Pico do Barão do Espaguete [BOSS]',
        shortLabel: 'Pico do Boss',
        description: 'O covil final da campanha. Derrote o Barão do Espaguete Supremo ou negocie uma trégua mútua!',
        recommendedLevel: 3,
        unlockedByDefault: true,
        unlockFlag: null,
        mapPosition: { x: 70, y: 72 },
        encounters: [
          { kind: 'monster', id: 'spaghetti_baron', weight: 1 }
        ],
        image: null
      }
    ],
    recipes: [
      {
        id: 'craft_stone_axe',
        ingredientA: 'stick_wood',
        ingredientB: 'sharp_rock',
        resultItemId: 'stone_axe',
        meatCost: 0,
        description: 'Amarre a Pedra Afiada no Galho Reto para forjar um Machado de Pedra Artesanal (+6 Ataque, +3 Muscle).'
      },
      {
        id: 'craft_reinforced_tunic',
        ingredientA: 'cardboard_vest',
        ingredientB: 'leather_scrap',
        resultItemId: 'reinforced_tunic',
        meatCost: 10,
        description: 'Costure Retalho de Couro sobre o Colete de Papelão para obter uma Túnica de Couro Reforçada (+6 Defesa, +10 HP Máx).'
      },
      {
        id: 'craft_spaghetti_plate',
        ingredientA: 'raw_noodles',
        ingredientB: 'spicy_sauce',
        resultItemId: 'spaghetti_plate',
        meatCost: 0,
        description: 'Combine Massa Crua Seca e Molho Picante Ancestral para preparar um Prato de Espaguete Real (+22 HP, +12 MP).'
      },
      {
        id: 'craft_cargo_pants',
        ingredientA: 'stick_wood',
        ingredientB: 'leather_scrap',
        resultItemId: 'cargo_pants',
        meatCost: 5,
        description: 'Use um Galho Reto como molde para costurar uma Calça de Aventureiro com Retalho de Couro (+2 Defesa, +2 Moxie).'
      }
    ]
  };

  function indexById(list) {
    const map = {};
    list.forEach(function (entry) {
      map[entry.id] = entry;
    });
    return map;
  }

  async function fetchJsonFile(path) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Falha ao carregar ' + path + ': ' + response.status);
    }
    return response.json();
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
    recipesById: {},
    loadedFromFallback: false
  };

  Game.DataLoader = {
    async loadAll() {
      let data = null;

      if (window.location.protocol !== 'file:') {
        try {
          const results = await Promise.all([
            fetchJsonFile('./data/items.json'),
            fetchJsonFile('./data/monsters.json'),
            fetchJsonFile('./data/events.json'),
            fetchJsonFile('./data/locations.json'),
            fetchJsonFile('./data/recipes.json')
          ]);
          data = {
            items: results[0],
            monsters: results[1],
            events: results[2],
            locations: results[3],
            recipes: results[4]
          };
          Game.Data.loadedFromFallback = false;
        } catch (err) {
          console.warn('Não foi possível usar fetch() nos JSONs. Ativando fallback local.', err);
        }
      } else {
        console.info('Execução local via file:// detectada. Ativando fallback de dados embutido.');
      }

      if (!data) {
        data = JSON.parse(JSON.stringify(FALLBACK_DATA));
        Game.Data.loadedFromFallback = true;
      }

      Game.Data.items = data.items;
      Game.Data.monsters = data.monsters;
      Game.Data.events = data.events;
      Game.Data.locations = data.locations;
      Game.Data.recipes = data.recipes;

      Game.Data.itemsById = indexById(data.items);
      Game.Data.monstersById = indexById(data.monsters);
      Game.Data.eventsById = indexById(data.events);
      Game.Data.locationsById = indexById(data.locations);
      Game.Data.recipesById = indexById(data.recipes);

      return Game.Data;
    }
  };
})(window.Game);
