import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartAPI } from '../api/api';

const syncCartFromServer = async () => {
  const response = await cartAPI.getAll();
  return response.data.data;
};

export const fetchCart = createAsyncThunk('cart/fetchCart', syncCartFromServer);

export const addToCart = createAsyncThunk('cart/addToCart', async (item) => {
  await cartAPI.add(item);
  return syncCartFromServer();
});

export const updateCartQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ id, quantity }) => {
    await cartAPI.update(id, { quantity });
    return syncCartFromServer();
  }
);

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (id) => {
  await cartAPI.remove(id);
  return syncCartFromServer();
});

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  await cartAPI.clear();
  return [];
});

const calculateTotals = (items) => {
  let pizzaTotal = 0;
  let ingredientsTotal = 0;

  items.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    if (item.isCustom) {
      pizzaTotal += itemTotal;
      if (item.customIngredients?.length) {
        const ingCost = item.customIngredients.reduce((sum, ing) => sum + ing.price, 0);
        ingredientsTotal += ingCost * item.quantity;
      }
    } else {
      pizzaTotal += itemTotal;
    }
  });

  return {
    pizzaTotal,
    ingredientsTotal,
    grandTotal: pizzaTotal + ingredientsTotal,
  };
};

const applyCartItems = (state, items) => {
  state.items = items;
  const totals = calculateTotals(items);
  state.pizzaTotal = totals.pizzaTotal;
  state.ingredientsTotal = totals.ingredientsTotal;
  state.grandTotal = totals.grandTotal;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    pizzaTotal: 0,
    ingredientsTotal: 0,
    grandTotal: 0,
    loading: false,
    error: null,
    actionLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        applyCartItems(state, action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.actionLoading = false;
        applyCartItems(state, action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.actionLoading = false;
        applyCartItems(state, action.payload);
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.error.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.actionLoading = false;
        applyCartItems(state, action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.error.message;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.actionLoading = false;
        state.items = [];
        state.pizzaTotal = 0;
        state.ingredientsTotal = 0;
        state.grandTotal = 0;
      });
  },
});

export default cartSlice.reducer;
