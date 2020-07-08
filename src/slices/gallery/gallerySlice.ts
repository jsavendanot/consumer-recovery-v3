import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GalleryRootType, Image } from 'types/gallery';

const initialState: GalleryRootType = {
  images: [],
  loading: false
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: initialState,
  reducers: {
    fetchImages(state, action: PayloadAction<{ images: Image[] }>) {
      const { images } = action.payload;
      state.images = images;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  }
});

export const { fetchImages, startLoading, stopLoading } = gallerySlice.actions;
export default gallerySlice.reducer;
