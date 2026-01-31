export const selectWishlistItems = (state) => state.wishlist?.items || [];
export const selectWishlistCount = (state) => (state.wishlist?.items || []).length;
export const selectIsInWishlist = (state, id) => {
  if (!id) return false;
  return (state.wishlist?.items || []).some((it) => String(it.id) === String(id));
};
