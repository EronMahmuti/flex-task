
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './slices/jobSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    categories: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
