import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/utils/constants";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(BASE_URL + "/categories");
      if (!res.ok) {
        return rejectWithValue("Failed to fetch categories");
      }
      const json = await res.json();
      return json;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload || [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to load categories";
      });
  },
});

export default slice.reducer;
