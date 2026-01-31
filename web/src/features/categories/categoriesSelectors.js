export const selectAllCategories = (state) => state.categories?.items || [];
export const selectCategoriesStatus = (state) => state.categories?.status || 'idle';
export const selectCategoryById = (state, id) => (state.categories?.items || []).find((c) => String(c.id) === String(id));
export const selectCategoryNames = (state) => (state.categories?.items || []).map((c) => c.name);
