import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '@/features/products/productsSlice';
import cartReducer from '@/features/cart/cartSlice';
import wishlistReducer from '@/features/wishlist/wishlistSlice';
import categoriesReducer from '@/features/categories/categoriesSlice';

// only logs in development
const loggerMiddleware = (storeAPI) => (next) => (action) => {
  if (process.env.NODE_ENV !== 'development') return next(action);
  try {
    const prev = storeAPI.getState();
    console.group?.(action.type);
    console.log('prev state', prev);
    console.log('action', action);
    const result = next(action);
    console.log('next state', storeAPI.getState());
    console.groupEnd?.();
    return result;
  } catch (err) {
    return next(action);
  }
};

export const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});