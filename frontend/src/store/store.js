import { configureStore } from '@reduxjs/toolkit';
import receiverReducer from '../features/receiverSlice';
import templateReducer from '../features/templateSlice';

export const store = configureStore({
  reducer: {
    receivers: receiverReducer,
    templates: templateReducer,
  },
});
