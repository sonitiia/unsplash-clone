import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  addToCollection,
  readCollection,
  removeFromCollection,
} from "../services/collectionStorage";
import type { UnsplashPhoto } from "../types/unsplash";

interface CollectionState {
  photos: UnsplashPhoto[];
  userId: string | null;
}

const initialState: CollectionState = {
  photos: [],
  userId: null,
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    loadCollection(state, action: PayloadAction<string>) {
      state.userId = action.payload;
      state.photos = readCollection(action.payload);
    },
    resetCollection(state) {
      state.userId = null;
      state.photos = [];
    },
    savePhoto(state, action: PayloadAction<UnsplashPhoto>) {
      if (!state.userId) return;
      if (state.photos.some((p) => p.id === action.payload.id)) return;
      state.photos = addToCollection(state.userId, action.payload);
    },
    removePhoto(state, action: PayloadAction<string>) {
      if (!state.userId) return;
      state.photos = removeFromCollection(state.userId, action.payload);
    },
  },
});

export const { loadCollection, resetCollection, savePhoto, removePhoto } =
  collectionSlice.actions;

export const selectIsPhotoSaved =
  (photoId: string) => (state: { collection: CollectionState }) =>
    state.collection.photos.some((p) => p.id === photoId);

export default collectionSlice.reducer;
