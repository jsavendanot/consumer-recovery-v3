import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JournalShareNetwork } from 'types/journey';

export interface JourneyShareRootType {
  share: JournalShareNetwork[];
}

const initialState: JourneyShareRootType = {
  share: []
};

const shareSlice = createSlice({
  name: 'journey/share',
  initialState: initialState,
  reducers: {
    read(state, action: PayloadAction<{ share: JournalShareNetwork[] }>) {
      const { share } = action.payload;
      state.share = share;
    },
    start(
      state,
      action: PayloadAction<{
        share: JournalShareNetwork[];
      }>
    ) {
      const { share } = action.payload;
      const updatedShares = state.share.concat(share);
      state.share = updatedShares;
    },
    stop(state, action: PayloadAction<{ share: JournalShareNetwork[] }>) {
      const { share } = action.payload;
      const updatedShare = state.share.filter(
        item => !share.some(share => share.JournalId === item.JournalId)
      );
      state.share = updatedShare;
    }
  }
});

export const { start, stop, read } = shareSlice.actions;
export default shareSlice.reducer;
