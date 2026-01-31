import { createSlice } from "@reduxjs/toolkit";
import { loadWishlist, saveWishlist } from "@/utils/helpers";
import { WISHLIST_STORAGE_KEY } from "@/utils/constants";

const initialState = loadWishlist() || { items: [] };

const slice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const payload = action.payload || {};
      const id = String(payload.id);
      if (!id) return;
      const exists = state.items.some((it) => String(it.id) === id);
      if (exists) return;
      state.items.push({ id, name: payload.name, image: payload.image, price: Number(payload.price) || 0 });
      saveWishlist(state);
    },

    removeFromWishlist(state, action) {
      const id = String(action.payload ?? "");
      state.items = state.items.filter((it) => String(it.id) !== id);
      saveWishlist(state);
    },

    toggleWishlist(state, action) {
      const payload = action.payload || {};
      const id = String(payload.id ?? payload);
      if (!id) return;
      const idx = state.items.findIndex((it) => String(it.id) === id);
      if (idx === -1) {
        state.items.push({ id, name: payload.name, image: payload.image, price: Number(payload.price) || 0 });
      } else {
        state.items.splice(idx, 1);
      }
      saveWishlist(state);
    },

    clearWishlist(state) {
      state.items = [];
      try { localStorage.removeItem(WISHLIST_STORAGE_KEY); } catch (err) { console.log(err); }
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = slice.actions;
export default slice.reducer;

