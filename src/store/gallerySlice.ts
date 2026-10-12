import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ColumnCount = 3 | 5;

interface GalleryState {
  columnCount: ColumnCount;
  searchQuery: string;
}

const initialState: GalleryState = {
  columnCount: 5,
  searchQuery: "",
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setColumnCount(state, action: PayloadAction<ColumnCount>) {
      state.columnCount = action.payload;
    },
    toggleColumnCount(state) {
      state.columnCount = state.columnCount === 5 ? 3 : 5;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setColumnCount, toggleColumnCount, setSearchQuery } =
  gallerySlice.actions;
export default gallerySlice.reducer;
