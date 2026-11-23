// Mochila, consumíveis, equipamentos em 5 slots e crafting (não persiste nem toca no DOM).
window.Game = window.Game || {};

(function (Game) {
  const SLOT_LABELS = {
    hat: 'Chapéu',
    weapon: 'Arma',
    armor: 'Armadura',
    pants: 'Calças',
    accessory: 'Acessório'
  };

  Game.Inventory = {
    SLOT_LABELS,

    count(itemId) {
      const state = Game.State.get();
      return state?.inventory?.[itemId] || 0;
    },

    add(itemId, qty = 1) {
      const state = Game.State.get();
      if (!state || !Game.Data.itemsById[itemId] || qty <= 0) return false;
      state.inventory[itemId] = (state.inventory[itemId] || 0) + qty;
      return true;
    },

    remove(itemId, qty = 1) {
      const state = Game.State.get();
      if (!state || this.count(itemId) < qty) return false;
      state.inventory[itemId] -= qty;
      if (state.inventory[itemId] <= 0) delete state.inventory[itemId];
      return true;
    },

    getOwned() {
      const state = Game.State.get();
      if (!state) return [];
      return Object.keys(state.inventory)
        .filter((id) => state.inventory[id] > 0 && Game.Data.itemsById[id])
        .map((id) => ({ item: Game.Data.itemsById[id], quantity: state.inventory[id] }));
    },

    getConsumables() {
      return this.getOwned().filter((entry) => entry.item.type === 'consumable');
    },

    use(itemId) {
      const state = Game.State.get();
      const item = Game.Data.itemsById[itemId];
      if (!state || !item || item.type !== 'consumable') {
        return { ok: false, message: 'Item inválido para consumo.' };
      }
      if (this.count(itemId) < 1) {
        return { ok: false, message: `Você não possui ${item.name}.` };
      }

      const stats = Game.State.getComputedStats();
      const oldHp = state.hp;
      const oldMp = state.mp;
      state.hp = Math.min(stats.maxHp, state.hp + (item.effects?.hp || 0));
      state.mp = Math.min(stats.maxMp, state.mp + (item.effects?.mp || 0));
      this.remove(itemId, 1);

      return {
        ok: true,
        message: `Você usou ${item.name} (+${state.hp - oldHp} HP, +${state.mp - oldMp} MP).`
      };
    },

    equip(itemId) {
      const state = Game.State.get();
      const item = Game.Data.itemsById[itemId];
      if (!state || !item || item.type !== 'equipment' || !item.slot) {
        return { ok: false, message: 'Este item não pode ser equipado.' };
      }
      if (this.count(itemId) < 1) {
        return { ok: false, message: 'Item não encontrado na mochila.' };
      }

      const prevId = state.equipment[item.slot];
      this.remove(itemId, 1);
      if (prevId) this.add(prevId, 1);
      state.equipment[item.slot] = itemId;
      Game.State.clampVitals();

      return { ok: true, message: `Equipou ${item.name}.` };
    },

    unequip(slot) {
      const state = Game.State.get();
      const removedId = state?.equipment?.[slot];
      if (!removedId) return { ok: false, message: 'Espaço já está vazio.' };

      const item = Game.Data.itemsById[removedId];
      state.equipment[slot] = null;
      this.add(removedId, 1);
      Game.State.clampVitals();

      return { ok: true, message: `Desequipou ${item ? item.name : removedId}.` };
    },

    findRecipe(itemA, itemB) {
      if (!itemA || !itemB) return null;
      return (
        Game.Data.recipes.find(
          (r) =>
            (r.ingredientA === itemA && r.ingredientB === itemB) ||
            (r.ingredientA === itemB && r.ingredientB === itemA)
        ) || null
      );
    },

    canCraft(recipe) {
      const state = Game.State.get();
      if (!state || !recipe || state.meat < (recipe.meatCost || 0)) return false;
      if (recipe.ingredientA === recipe.ingredientB) {
        return this.count(recipe.ingredientA) >= 2;
      }
      return this.count(recipe.ingredientA) >= 1 && this.count(recipe.ingredientB) >= 1;
    },

    craft(recipeId) {
      const state = Game.State.get();
      const recipe = Game.Data.recipesById[recipeId];
      if (!state || !recipe) return { ok: false, message: 'Receita não encontrada.' };

      const cost = recipe.meatCost || 0;
      if (state.meat < cost) {
        return { ok: false, message: `Meat insuficiente (precisa de ${cost} Meat).` };
      }
      if (!this.canCraft(recipe)) {
        return { ok: false, message: 'Faltam ingredientes na mochila.' };
      }

      state.meat -= cost;
      this.remove(recipe.ingredientA, 1);
      this.remove(recipe.ingredientB, 1);
      this.add(recipe.resultItemId, 1);

      const resItem = Game.Data.itemsById[recipe.resultItemId];
      return { ok: true, message: `Você criou: ${resItem ? resItem.name : recipe.resultItemId}.` };
    }
  };
})(window.Game);
