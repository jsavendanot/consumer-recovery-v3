import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import {
  start as shareJournalsState,
  stop as stopSharingJournalsState
} from 'slices/journey/share/shareSlice';
import { Network } from 'types/network';
import { Journal, JournalShareNetwork } from 'types/journey';
import { callJournalShareCreateApi } from 'slices/journey/share/action';
import { callJournalListApi } from 'slices/journey/action';

export const startSharingJournals = (
  journals: Journal[],
  network: Network
): AppThunk => async dispatch => {
  try {
    const updatedJournalsShares: JournalShareNetwork[] = [];
    for (const journal of journals) {
      await callJournalShareCreateApi(journal.Id, network);
      const updatedShare: JournalShareNetwork = {
        JournalId: journal.Id,
        JournalName: journal.Title,
        SharedWithNetworkContactId: network.Id,
        SharedWithNetworkName: network.Name,
        SharedOnDate: new Date().toDateString()
      };
      updatedJournalsShares.push(updatedShare);
    }
    dispatch(shareJournalsState({ share: updatedJournalsShares }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const stopSharingJournals = (
  journals: Journal[],
  network: Network
): AppThunk => async dispatch => {
  try {
    const updatedJournalsShares: JournalShareNetwork[] = [];
    for (const journal of journals) {
      await callJournalShareDeleteApi(journal.Id, network.Id);
      const updatedShare: JournalShareNetwork = {
        JournalId: journal.Id,
        JournalName: journal.Title,
        SharedWithNetworkContactId: network.Id,
        SharedWithNetworkName: network.Name,
        SharedOnDate: new Date().toDateString()
      };
      updatedJournalsShares.push(updatedShare);
    }

    dispatch(stopSharingJournalsState({ share: updatedJournalsShares }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const startSharingAllJournals = (
  network: Network
): AppThunk => async dispatch => {
  try {
    const allJournals = await callJournalListApi();
    const updatedJournalsShares: JournalShareNetwork[] = [];

    for (const journal of allJournals) {
      await callJournalShareCreateApi(journal.Id, network);
      const updatedShare: JournalShareNetwork = {
        JournalId: journal.Id,
        JournalName: journal.Title,
        SharedWithNetworkContactId: network.Id,
        SharedWithNetworkName: network.Name,
        SharedOnDate: new Date().toDateString()
      };
      updatedJournalsShares.push(updatedShare);
    }
    dispatch(shareJournalsState({ share: updatedJournalsShares }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const stopSharingAllJournals = (
  network: Network
): AppThunk => async dispatch => {
  try {
    const allJournals = await callJournalListApi();
    const updatedJournalsShares: JournalShareNetwork[] = [];

    for (const journal of allJournals) {
      await callJournalShareDeleteApi(journal.Id, network.Id);
      const updatedShare: JournalShareNetwork = {
        JournalId: journal.Id,
        JournalName: journal.Title,
        SharedWithNetworkContactId: network.Id,
        SharedWithNetworkName: network.Name,
        SharedOnDate: new Date().toDateString()
      };
      updatedJournalsShares.push(updatedShare);
    }

    dispatch(stopSharingJournalsState({ share: updatedJournalsShares }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const callJournalShareDeleteApi = (
  journalId: string,
  networkId: string
) => {
  return axios.delete(
    `/JournalShare/Delete/${journalId}/?sharedWithUserId=${networkId}`
  );
};
