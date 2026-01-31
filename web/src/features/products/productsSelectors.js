import { createSelector } from "@reduxjs/toolkit";

export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export const selectProductById = (id) => {
  return (state) => {
    const pid = state.products.product;
    if (pid && String(pid.id) === String(id)) return pid;
    return state.products.items.find((p) => String(p.id) === String(id))
  }
};

export const selectProductCategories = createSelector(
  [(state) => state.categories?.items || [], selectAllProducts],
  (categories, items) => {
    if (Array.isArray(categories) && categories.length) return categories.map((c) => c.name || String(c));
    const set = new Set();
    items.forEach((it) => { if (it && it.category) set.add(it.category); });
    return Array.from(set).sort();
  }
);

export const selectFilteredProducts = createSelector(
  [selectAllProducts, (state) => state.products.filters, (state) => state.categories?.items || []],
  (items, filters, categoriesSlice) => {
    const q = (filters.query || "").trim().toLowerCase();
    let results = items.slice();

    if (filters.category) {
      const requested = filters.category;
      const resolvedById = categoriesSlice.find((c) => String(c.id) === String(requested));
      const resolvedByName = categoriesSlice.find((c) => String(c.name) === String(requested));
      const targetCategoryId = resolvedById ? String(resolvedById.id) : (resolvedByName ? String(resolvedByName.id) : null);
      const targetCategoryName = resolvedByName ? String(resolvedByName.name) : (resolvedById ? String(resolvedById.name) : (typeof requested === 'string' ? requested : null));

      results = results.filter((p) => {
        if (p.category_id != null) {
          if (targetCategoryId) return String(p.category_id) === targetCategoryId;
          if (targetCategoryName) {
            const prodCat = categoriesSlice.find((c) => String(c.id) === String(p.category_id));
            return prodCat && String(prodCat.name) === targetCategoryName;
          }
          return false;
        }

        if (p.category != null) {
          return String(p.category) === String(targetCategoryName);
        }

        return false;
      });
    }

    if (q) {
      results = results.filter((p) => {
        return (
          String(p.name || "").toLowerCase().includes(q) ||
          String(p.description || "").toLowerCase().includes(q)
        );
      });
    }

    switch (filters.sortBy) {
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating-asc":
        results.sort((a, b) => (a.rating_rate || 0) - (b.rating_rate || 0));
        break;
      case "rating-desc":
        results.sort((a, b) => (b.rating_rate || 0) - (a.rating_rate || 0));
        break;
      default:
        break;
    }

    return results;
  }
);