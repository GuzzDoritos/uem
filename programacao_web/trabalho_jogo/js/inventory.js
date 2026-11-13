/**
 * js/inventory.js
 * Gerencia mochila do jogador, uso de consumíveis, equipamentos em 5 slots
 * e o sistema de crafting (estilo Meat Paste: 2 ingredientes -> novo item).
 */

window.Game = window.Game || {};

(function (Game) {
  'use strict';

  const SLOT_LABELS = {
    hat: 'Chapéu',
    weapon: 'Arma',
    armor: 'Armadura',
    pants: 'Calças',
    accessory: 'Acessório'
  };

  Game.Inventory = {
    SLOT_LABELS: SLOT_LABELS,

    getItemCount(itemId) {
      const state = Game.State.get();
      if (!state || !state.inventory) return 0;
      return state.inventory[itemId] || 0;
    },

    addItem(itemId, quantity) {
      const state = Game.State.get();
      const qty = typeof quantity === 'number' ? quantity : 1;
      if (!state || !Game.Data.itemsById[itemId] || qty <= 0) return false;
      state.inventory[itemId] = (state.inventory[itemId] || 0) + qty;
      Game.State.save();
      return true;
    },

    removeItem(itemId, quantity) {
      const state = Game.State.get();
      const qty = typeof quantity === 'number' ? quantity : 1;
      if (!state || this.getItemCount(itemId) < qty) return false;
      state.inventory[itemId] -= qty;
      if (state.inventory[itemId] <= 0) {
        delete state.inventory[itemId];
      }
      Game.State.save();
      return true;
    },

    getOwnedEntries() {
      const state = Game.State.get();
      if (!state) return [];
      return Object.keys(state.inventory)
        .filter(function (id) {
          return state.inventory[id] > 0 && Boolean(Game.Data.itemsById[id]);
        })
        .map(function (id) {
          return {
            item: Game.Data.itemsById[id],
            quantity: state.inventory[id]
          };
        });
    },

    getConsumables() {
      return this.getOwnedEntries().filter(function (entry) {
        return entry.item.type === 'consumable';
      });
    },

    useConsumable(itemId) {
      const state = Game.State.get();
      const item = Game.Data.itemsById[itemId];
      if (!state || !item || item.type !== 'consumable') {
        return { ok: false, message: 'Item inválido para consumo.' };
      }
      if (this.getItemCount(itemId) < 1) {
        return { ok: false, message: 'Você não possui ' + item.name + '.' };
      }

      const computed = Game.State.getComputedStats();
      const hpGain = (item.effects && item.effects.hp) || 0;
      const mpGain = (item.effects && item.effects.mp) || 0;

      const oldHp = state.hp;
      const oldMp = state.mp;
      state.hp = Math.min(computed.maxHp, state.hp + hpGain);
      state.mp = Math.min(computed.maxMp, state.mp + mpGain);
      const actualHp = state.hp - oldHp;
      const actualMp = state.mp - oldMp;

      this.removeItem(itemId, 1);
      Game.State.save();

      return {
        ok: true,
        message:
          'Você usou ' +
          item.name +
          ' (+' +
          actualHp +
          ' HP, +' +
          actualMp +
          ' MP).'
      };
    },

    equipItem(itemId) {
      const state = Game.State.get();
      const item = Game.Data.itemsById[itemId];
      if (!state || !item || item.type !== 'equipment' || !item.slot) {
        return { ok: false, message: 'Este item não pode ser equipado.' };
      }
      if (this.getItemCount(itemId) < 1) {
        return { ok: false, message: 'Você não possui este equipamento na mochila.' };
      }

      const previousId = state.equipment[item.slot];
      this.removeItem(itemId, 1);
      if (previousId) {
        this.addItem(previousId, 1);
      }
      state.equipment[item.slot] = itemId;
      Game.State.clampVitals();
      Game.State.save();

      return {
        ok: true,
        message: 'Equipou ' + item.name + ' em ' + (SLOT_LABELS[item.slot] || item.slot) + '.'
      };
    },

    unequipSlot(slot) {
      const state = Game.State.get();
      if (!state || !state.equipment[slot]) {
        return { ok: false, message: 'Nada equipado neste espaço.' };
      }
      const removedId = state.equipment[slot];
      const item = Game.Data.itemsById[removedId];
      state.equipment[slot] = null;
      this.addItem(removedId, 1);
      Game.State.clampVitals();
      Game.State.save();

      return {
        ok: true,
        message: 'Desequipou ' + (item ? item.name : removedId) + '.'
      };
    },

    findMatchingRecipe(itemA, itemB) {
      if (!itemA || !itemB) return null;
      return (
        Game.Data.recipes.find(function (recipe) {
          return (
            (recipe.ingredientA === itemA && recipe.ingredientB === itemB) ||
            (recipe.ingredientA === itemB && recipe.ingredientB === itemA)
          );
        }) || null
      );
    },

    canCraftRecipe(recipe) {
      const state = Game.State.get();
      if (!state || !recipe) return false;
      if (state.meat < (recipe.meatCost || 0)) return false;

      if (recipe.ingredientA === recipe.ingredientB) {
        return this.getItemCount(recipe.ingredientA) >= 2;
      }
      return (
        this.getItemCount(recipe.ingredientA) >= 1 &&
        this.getItemCount(recipe.ingredientB) >= 1
      );
    },

    craftByIngredients(itemA, itemB) {
      const state = Game.State.get();
      if (!state) return { ok: false, message: 'Nenhuma partida ativa.' };
      if (!itemA || !itemB) {
        return { ok: false, message: 'Selecione dois itens para combinar.' };
      }

      const recipe = this.findMatchingRecipe(itemA, itemB);
      if (!recipe) {
        return {
          ok: false,
          message: 'Esses dois itens não formam nenhuma receita conhecida.'
        };
      }

      return this.craftByRecipe(recipe.id);
    },

    craftByRecipe(recipeId) {
      const state = Game.State.get();
      const recipe = Game.Data.recipesById[recipeId];
      if (!state || !recipe) {
        return { ok: false, message: 'Receita não encontrada.' };
      }

      const cost = recipe.meatCost || 0;
      if (state.meat < cost) {
        return {
          ok: false,
          message: 'Meat insuficiente (precisa de ' + cost + ' Meat).'
        };
      }

      if (!this.canCraftRecipe(recipe)) {
        return {
          ok: false,
          message: 'Faltam ingredientes na mochila para esta receita.'
        };
      }

      state.meat -= cost;
      this.removeItem(recipe.ingredientA, 1);
      this.removeItem(recipe.ingredientB, 1);
      this.addItem(recipe.resultItemId, 1);

      const resultItem = Game.Data.itemsById[recipe.resultItemId];
      Game.State.save();

      return {
        ok: true,
        message: 'Crafting concluído! Você criou: ' + (resultItem ? resultItem.name : recipe.resultItemId) + '!'
      };
    }
  };
})(window.Game);
