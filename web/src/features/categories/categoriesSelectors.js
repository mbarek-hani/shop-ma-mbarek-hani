export const selectAllCategories = (state) => state.categories.items;
export const selectCategoriesStatus = (state) => state.categories.status;
export const selectCategoriesError = (state) => state.categories.error;
export const selectCategoryById = (state, id) => (state.categories.items).find((c) => c.id == id);
export const selectCategoryNames = (state) => (state.categories.items).map((c) => c.name);
