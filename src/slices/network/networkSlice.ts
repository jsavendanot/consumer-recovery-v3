import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { NetworkRootType, Network, ShareNetworkApi } from 'types/network';
import invitationReducer from './invitation/invitationSlice';

const initialState: NetworkRootType = {
  networks: [],
  sharedList: [],
  loading: false
};

const networkSlice = createSlice({
  name: 'network',
  initialState: initialState,
  reducers: {
    read(state, action: PayloadAction<{ networks: Network[] }>) {
      const { networks } = action.payload;
      state.networks = networks;
    },
    add(state, action: PayloadAction<{ network: Network }>) {
      const { network } = action.payload;
      state.networks.push(network);
    },
    remove(state, action: PayloadAction<{ network: Network }>) {
      const { network } = action.payload;
      const updatedNetworks = state.networks.filter(
        item => item.Id !== network.Id
      );
      state.networks = updatedNetworks;
    },
    update(state, action: PayloadAction<{ network: Network }>) {
      const { network } = action.payload;
      const reducedNetworks = state.networks.filter(
        item => item.Id !== network.Id
      );
      reducedNetworks.push(network);
      state.networks = reducedNetworks;
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
  read,
  add,
  remove,
  update,
  startLoading,
  stopLoading,
  fetchSharedList
} = networkSlice.actions;

const networkCombinedRootReducer = combineReducers({
  network: networkSlice.reducer,
  invitation: invitationReducer
});

export default networkCombinedRootReducer;
