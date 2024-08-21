import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./emailSlice";
import templateSlice from "./templateSlice";

export const store = configureStore({
  reducer: {
    emails: emailSlice,
    templates: templateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
