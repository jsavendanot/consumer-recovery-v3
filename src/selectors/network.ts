import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'reducer';

export const selectNetworkById = createSelector(
  (state: RootState) => state.networkRoot.network.networks,
  (_: any, id: string) => id,
  (networks, id) => networks.find(network => network.Id === id)
);

//** Manage Access */

export const selectGoalSharedNetworksLenById = createSelector(
  (state: RootState) => state.goalRoot.goalShare.goalsShare,
  (_: any, id: string) => id,
  (sharedNetworks, id) =>
    sharedNetworks.filter(network => network.SharedWithNetworkContactId === id)
      .length
);

export const selectJournalSharedNetworksLenById = createSelector(
  (state: RootState) => state.journeyRoot.journeyShare.share,
  (_: any, id: string) => id,
  (sharedNetworks, id) =>
    sharedNetworks.filter(network => network.SharedWithNetworkContactId === id)
      .length
);

export const selectMyStorySharedNetworksLen = createSelector(
  (state: RootState) => state.story.sharedList,
  sharedNetworks => sharedNetworks.length
);

export const selectSafetySharedNetworksLen = createSelector(
  (state: RootState) => state.safetyRoot.safety.shareList,
  sharedNetworks => sharedNetworks.length
);

export const selectNetworkSharedNetworksLen = createSelector(
  (state: RootState) => state.networkRoot.network.sharedList,
  sharedNetworks => sharedNetworks.length
);
