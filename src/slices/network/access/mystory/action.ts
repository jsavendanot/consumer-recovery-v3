import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import { Network } from 'types/network';
import moment from 'moment';
import { fetchStoryData } from 'slices/story/action';

export const startSharingStory = (
  storyId: string,
  network: Network
): AppThunk => async dispatch => {
  try {
    await callMyStoryShareCreateApi(storyId, network);
    await dispatch(fetchStoryData());
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const stopSharingStory = (
  storyId: string,
  network: Network
): AppThunk => async dispatch => {
  try {
    await callMyStoryShareDeleteApi(storyId, network.Id);
    await dispatch(fetchStoryData());
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

const callMyStoryShareCreateApi = (storyId: string, network: Network) => {
  const requestContent = {
    SharedWithNetworkContactId: network.Id,
    SharedWithNetworkName: network.Name,
    SharedOnDate: moment().format('YYYY-MMM-DD')
  };
  return axios.post(`/MyStoryShare/Create/${storyId}`, requestContent);
};

export const callMyStoryShareDeleteApi = (
  storyId: string,
  networkId: string
) => {
  return axios.delete(`/MyStoryShare/Delete/${storyId}/${networkId}`);
};
