import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Invitation } from 'types/network';

export interface NetworkInvitationRootType {
  pendingContacts: Invitation[];
  connectRequests: Invitation[];
}

const initialState: NetworkInvitationRootType = {
  pendingContacts: [],
  connectRequests: []
};

const invitationSlice = createSlice({
  name: 'network/invitation',
  initialState: initialState,
  reducers: {
    fetchPendingContacts(
      state,
      action: PayloadAction<{ pendingContacts: Invitation[] }>
    ) {
      const { pendingContacts } = action.payload;
      state.pendingContacts = pendingContacts;
    },
    fetchConnectRequests(
      state,
      action: PayloadAction<{ connectRequests: Invitation[] }>
    ) {
      const { connectRequests } = action.payload;
      state.connectRequests = connectRequests;
    }
  }
});

export const {
  fetchPendingContacts,
  fetchConnectRequests
} = invitationSlice.actions;
export default invitationSlice.reducer;
