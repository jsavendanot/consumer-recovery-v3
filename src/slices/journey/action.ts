import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import {
  fetchJournals,
  removeFromJournals,
  startLoading,
  stopLoading,
  fetchJournalsChart
} from './journeySlice';
import { JournalForm, JournalChart, Journal } from 'types/journey';
import {
  callJournalShareCreateApi,
  callJournalShareDeleteApi
} from './share/action';
import moment from 'moment';
import { Network } from 'types/network';

//** ASYNC FUNCS */
export const fetchJournalsData = (): AppThunk => async (dispatch, getState) => {
  try {
    const journalLen = getState().journeyRoot.journey.journals.length;

    journalLen === 0 && dispatch(startLoading());
    const journalsData = await callJournalListApi();

    const sortedJournalsData = journalsData.sort(
      (b, a) =>
        new Date(a.CreatedOnDate).getTime() -
        new Date(b.CreatedOnDate).getTime()
    );

    dispatch(
      fetchJournals({
        journals: sortedJournalsData
      })
    );

    const converter = (
      feelingStr: 'VerySad' | 'Sad' | 'Neutral' | 'Happy' | 'VeryHappy' | ''
    ) => {
      switch (feelingStr) {
        case 'VerySad': {
          return 1;
        }
        case 'Sad': {
          return 2;
        }
        case 'Neutral': {
          return 3;
        }
        case 'Happy': {
          return 4;
        }
        case 'VeryHappy': {
          return 5;
        }
        default:
          return 1;
      }
    };
    //create journal chart data
    const journalsChart: JournalChart[] = [];
    journalsData.forEach(item => {
      const journalChart: JournalChart = {
        Id: item.Id,
        Message: item.Message,
        CreatedOnDate: item.CreatedOnDate,
        HowAreYouFeeling: converter(item.HowAreYouFeeling)
      };
      journalsChart.push(journalChart);
    });

    const sortedChartData = journalsChart.sort(
      (a, b) =>
        new Date(a.CreatedOnDate).getTime() -
        new Date(b.CreatedOnDate).getTime()
    );

    dispatch(fetchJournalsChart({ journalsChart: sortedChartData }));

    journalLen === 0 && dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const filterJournalsByDateRange = (
  filterType: 'all' | 'week' | 'month' | 'year'
): AppThunk => async (dispatch, getState) => {
  try {
    const journalLen = getState().journeyRoot.journey.journals.length;

    journalLen === 0 && dispatch(startLoading());
    const journalsData = await callJournalListApi();

    const sortedJournalsData = journalsData.sort(
      (b, a) =>
        new Date(a.CreatedOnDate).getTime() -
        new Date(b.CreatedOnDate).getTime()
    );

    dispatch(
      fetchJournals({
        journals: sortedJournalsData
      })
    );

    const converter = (
      feelingStr: 'VerySad' | 'Sad' | 'Neutral' | 'Happy' | 'VeryHappy' | ''
    ) => {
      switch (feelingStr) {
        case 'VerySad': {
          return 1;
        }
        case 'Sad': {
          return 2;
        }
        case 'Neutral': {
          return 3;
        }
        case 'Happy': {
          return 4;
        }
        case 'VeryHappy': {
          return 5;
        }
        default:
          return 1;
      }
    };
    //create journal chart data
    const journalsChart: JournalChart[] = [];
    journalsData.forEach(item => {
      const journalChart: JournalChart = {
        Id: item.Id,
        Message: item.Message,
        CreatedOnDate: item.CreatedOnDate,
        HowAreYouFeeling: converter(item.HowAreYouFeeling)
      };
      journalsChart.push(journalChart);
    });

    const sortedChartData = journalsChart.sort(
      (a, b) =>
        new Date(a.CreatedOnDate).getTime() -
        new Date(b.CreatedOnDate).getTime()
    );

    const startDateRange =
      filterType === 'week'
        ? moment()
            .subtract(1, 'weeks')
            .startOf('week')
            .format('YYYY-MM-DD')
        : filterType === 'month'
        ? moment()
            .subtract(1, 'months')
            .startOf('month')
            .format('YYYY-MM-DD')
        : filterType === 'year'
        ? moment()
            .startOf('year')
            .format('YYYY-MM-DD')
        : moment()
            .subtract(1, 'years')
            .startOf('year')
            .format('YYYY-MM-DD');

    const filteredSortedChartData = sortedChartData.filter(
      data => new Date(data.CreatedOnDate) > new Date(startDateRange)
    );

    dispatch(fetchJournalsChart({ journalsChart: filteredSortedChartData }));

    journalLen === 0 && dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const addNewJournal = (
  history: any,
  journal: JournalForm
): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(startLoading());

    const allNetworks = getState().networkRoot.network.networks;
    await callJournalCreateApi(journal, allNetworks);

    dispatch(stopLoading());
    history.push('/journeys/journals');
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const updateJournal = (
  history: any,
  journal: JournalForm
): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(startLoading());

    const oldJournalShares = getState().journeyRoot.journeyShare.share.filter(
      item => item.JournalId === journal.id
    );

    for (const shareItem of oldJournalShares) {
      await callJournalShareDeleteApi(
        shareItem.JournalId,
        shareItem.SharedWithNetworkContactId
      );
    }

    const allNetworks = getState().networkRoot.network.networks;
    await callJournalUpdateApi(journal, allNetworks);

    dispatch(stopLoading());
    history.push('/journeys/journals');
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const removeJournal = (
  journalId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callJournalDeleteApi(journalId);
    dispatch(removeFromJournals({ journalId }));
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

const callJournalCreateApi = (journal: JournalForm, allNetworks: Network[]) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const requestContext = {
    Id: journal.id,
    Title: journal.title,
    Message: journal.journalText,
    HowAreYouFeeling: journal.feeling,
    CreatedOnDate: journal.date,
    VisibleTo:
      journal.share.whoCanSee === 'OnlyMe' ? 'OnlyMe' : 'SpecificPeople',
    Image: journal.image,
    ImageType: journal.imageType
  };
  return axios.post('/Journal/Create', requestContext).then(async response => {
    journal.id = response.data;
    if (journal.share.whoCanSee === 'SpecificPeople') {
      await Promise.all(
        journal.share.network.map(async item => {
          await callJournalShareCreateApi(response.data, item);
        })
      );
    } else if (journal.share.whoCanSee === 'Network') {
      await Promise.all(
        allNetworks.map(async item => {
          await callJournalShareCreateApi(response.data, item);
        })
      );
    }
    return journal;
  });
};

export const callJournalListApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get(`/Journal/List`).then(async response => {
    const journals: Journal[] = JSON.parse(JSON.stringify(response.data));
    return journals;
  });
};

const callJournalDeleteApi = (journalId: string) => {
  return axios.delete(`/Journal/Delete/${journalId}`);
};

const callJournalUpdateApi = (journal: JournalForm, allNetworks: Network[]) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const requestContext = {
    Id: journal.id,
    Title: journal.title,
    Message: journal.journalText,
    HowAreYouFeeling: journal.feeling,
    CreatedOnDate: journal.date,
    VisibleTo:
      journal.share.whoCanSee === 'OnlyMe' ? 'OnlyMe' : 'SpecificPeople',
    Image: journal.image,
    ImageType: ''
  };

  return axios
    .post(`/Journal/Update/${journal.id}`, requestContext)
    .then(async response => {
      if (journal.share.whoCanSee === 'SpecificPeople') {
        await Promise.all(
          journal.share.network.map(async item => {
            await callJournalShareCreateApi(journal.id, item);
          })
        );
      } else if (journal.share.whoCanSee === 'Network') {
        await Promise.all(
          allNetworks.map(async item => {
            await callJournalShareCreateApi(journal.id, item);
          })
        );
      }
      return journal;
    });
};
