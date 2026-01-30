import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/utils/constants";

const initialFilters = {
  query: "",
  category: null,
  sortBy: "none", // 'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc' | 'none'
};

const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: { ...initialFilters },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(BASE_URL + "/products");
      if (!res.ok) {
        const text = await res.text().catch(() => null);
        return rejectWithValue(text || `Failed to fetch products`);
      }
      const json = await res.json();
      return json;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy(state, action) {
      state.filters.sortBy = action.payload;
    },
    resetFilters(state) {
      state.filters = { ...initialFilters };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload || [];
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to load products";
      });
  },
});

export const { setFilter, setSortBy, resetFilters } = productsSlice.actions;

export default productsSlice.reducer;
