import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import { read } from './shareSlice';
import { JournalShareNetwork } from 'types/journey';
import { ShareNetworkApi, Network } from 'types/network';
import { stopLoading, startLoading } from '../journeySlice';
import moment from 'moment';

//** ASYNC FUNCS */
export const fetchJournalsSharedNetworks = (): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(startLoading());

    let totalShare: JournalShareNetwork[] = [];
    for (const journal of getState().journeyRoot.journey.journals) {
      const networks = await callJournalShareListApi(journal.Id);
      networks.forEach(item => {
        const journalShare: JournalShareNetwork = {
          JournalId: journal.Id,
          JournalName: journal.Title,
          SharedWithNetworkContactId: item.SharedWithNetworkContactId,
          SharedWithNetworkName: item.SharedWithNetworkName,
          SharedOnDate: item.SharedOnDate
        };
        totalShare.push(journalShare);
      });
    }
    dispatch(read({ share: totalShare }));
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

export const callJournalShareCreateApi = (
  journalId: string,
  network: Network
) => {
  const requestContent = {
    SharedWithNetworkContactId: network.Id,
    SharedWithNetworkName: network.Name,
    SharedOnDate: moment().format('YYYY-MMM-DD')
  };
  return axios.post(`/JournalShare/Create/${journalId}`, requestContent);
};

export const callJournalShareListApi = (journalId: string) => {
  return axios.get(`/JournalShare/List/${journalId}`).then(response => {
    const networks: ShareNetworkApi[] = JSON.parse(
      JSON.stringify(response.data)
    );
    return networks;
  });
};

export const callJournalShareDeleteApi = (
  journalId: string,
  sharedWithUserId: string
) => {
  return axios.delete(
    `/JournalShare/Delete/${journalId}?sharedWithUserId=${sharedWithUserId}`
  );
};
