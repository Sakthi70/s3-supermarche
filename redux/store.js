import { configureStore } from '@reduxjs/toolkit';
import AppSlice from './reducers/appSlice';

export const store = configureStore({
  reducer: {
    app: AppSlice
  }
});