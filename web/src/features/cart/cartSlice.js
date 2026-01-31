import { createSlice } from "@reduxjs/toolkit";
import { saveCart, loadCart } from "@/utils/helpers";

function recalc(state) {
  let totalQuantity = 0;
  let totalPrice = 0;
  for (const it of state.items) {
    const q = Number(it.quantity) || 0;
    const p = Number(it.price) || 0;
    totalQuantity += q;
    totalPrice += q * p;
  }
  state.totalQuantity = totalQuantity;
  state.totalPrice = Number(totalPrice.toFixed(2));
}

const savedCart = loadCart();

const initialState = savedCart || {
  items: [], // { id, price, quantity, name, image }[]
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // payload: { id, price, quantity = 1, name, image}
      const payload = action.payload || {};
      const id = String(payload.id);
      if (!id) return;

      const qty = Math.max(1, Number(payload.quantity) || 1);
      const existing = state.items.find((it) => String(it.id) === id);
      if (existing) {
        existing.quantity = (Number(existing.quantity) || 0) + qty;
      } else {
        state.items.push({
          id,
          quantity: qty,
          price: Number(payload.price) || 0,
          name: payload.name,
          image: payload.image,
        });
      }

      recalc(state);
      saveCart(state);
    },

    removeFromCart(state, action) {
      const id = String(action.payload);
      state.items = state.items.filter((it) => String(it.id) !== id);
      recalc(state);
      saveCart(state);
    },

    updateQuantity(state, action) {
      // payload: { id, quantity }
      const { id: rawId, quantity } = action.payload || {};
      const id = String(rawId ?? "");
      const q = Number(quantity);
      const idx = state.items.findIndex((it) => String(it.id) === id);
      if (idx === -1) return;
      if (!Number.isFinite(q) || q <= 0) {
        state.items.splice(idx, 1);
      } else {
        state.items[idx].quantity = Math.floor(q);
      }
      recalc(state);
      saveCart(state);
    },

    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
      try { localStorage.removeItem(STORAGE_KEY); } catch (err) { console.log(err); }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
