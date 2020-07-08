import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoryRootType, Strength, Story } from 'types/story';
import { FocusArea } from 'types/other';
import { ShareNetworkApi } from 'types/network';

const initialState: StoryRootType = {
  story: {} as Story,
  strengths: [],
  focusAreas: [],
  sharedList: [],
  loading: false
};

const storySlice = createSlice({
  name: 'story',
  initialState: initialState,
  reducers: {
    fetchStory(state, action: PayloadAction<{ story: Story }>) {
      const { story } = action.payload;
      state.story = story;
    },
    fetchStrenghts(state, action: PayloadAction<{ strengths: Strength[] }>) {
      const { strengths } = action.payload;
      state.strengths = strengths;
    },
    fetchAreas(state, action: PayloadAction<{ focusAreas: FocusArea[] }>) {
      const { focusAreas } = action.payload;
      state.focusAreas = focusAreas;
    },
    fetchSharedList(
      state,
      action: PayloadAction<{ networks: ShareNetworkApi[] }>
    ) {
      const { networks } = action.payload;
      state.sharedList = networks;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  }
});

export const {
  fetchStory,
  fetchStrenghts,
  fetchAreas,
  fetchSharedList,
  startLoading,
  stopLoading
} = storySlice.actions;
export default storySlice.reducer;
