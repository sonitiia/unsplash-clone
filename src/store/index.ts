import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import collectionReducer from "./collectionSlice";
import galleryReducer from "./gallerySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gallery: galleryReducer,
    collection: collectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
