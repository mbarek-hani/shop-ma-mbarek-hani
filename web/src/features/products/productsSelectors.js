import { createSelector } from "@reduxjs/toolkit";

export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export const selectProductById = (state, id) =>
  state.products.items.find((p) => String(p.id) === String(id));

export const selectFilteredProducts = createSelector(
  [selectAllProducts, (state) => state.products.filters],
  (items, filters) => {
    const q = (filters.query || "").trim().toLowerCase();
    let results = items.slice();

    if (filters.category) {
      results = results.filter((p) => String(p.category) === String(filters.category));
    }

    if (q) {
      results = results.filter((p) => {
        return (
          String(p.title || "").toLowerCase().includes(q) ||
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
        results.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
      case "rating-desc":
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return results;
  }
);