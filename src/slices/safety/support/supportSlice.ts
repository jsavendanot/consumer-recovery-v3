import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Network } from 'types/network';

export interface SupportRootType {
  emergencyNetworks: Network[];
}

const initialState: SupportRootType = {
  emergencyNetworks: []
};

const supportSlice = createSlice({
  name: 'safety/support',
  initialState: initialState,
  reducers: {
    fetchEmergency(
      state,
      action: PayloadAction<{ emergencyNetworks: Network[] }>
    ) {
      const { emergencyNetworks } = action.payload;
      state.emergencyNetworks = emergencyNetworks;
    }
  }
});

export const { fetchEmergency } = supportSlice.actions;
export default supportSlice.reducer;
