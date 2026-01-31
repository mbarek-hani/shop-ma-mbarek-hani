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
  // single product cache / detail
  product: null,
  filters: { ...initialFilters },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(BASE_URL + "/products");
      if (!res.ok) {
        return rejectWithValue("Failed to fetch products");
      }
      const json = await res.json();
      return json;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    if (id == null) return rejectWithValue("Missing id");
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      if (!res.ok) {
        return rejectWithValue(`Le produit avec l'id ${id} que vous avez demandé n'existe pas.`);
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
      // fetchProducts
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
      })
      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload || null;
        if (action.payload && action.payload.id != null) {
          const idx = state.items.findIndex((i) => String(i.id) === String(action.payload.id));
          if (idx === -1) state.items.push(action.payload);
          else state.items[idx] = action.payload;
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error?.message || "Failed to load product";
      });
  },
});

export const { setFilter, setSortBy, resetFilters } = productsSlice.actions;

export default productsSlice.reducer;
