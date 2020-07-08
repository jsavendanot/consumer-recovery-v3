import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import {
  read,
  add,
  remove,
  startLoading,
  stopLoading,
  fetchSharedList
} from './networkSlice';
import {
  fetchStepsSharedNetworks,
  fetchGoalsSharedNetworks,
  callGoalShareListApi
} from 'slices/goal/share/action';
import { fetchJournalsData, callJournalListApi } from 'slices/journey/action';
import {
  fetchStoryData,
  callMyStoryReadApi,
  callMyStoryShareListApi
} from 'slices/story/action';
import {
  fetchSafetySharedList,
  callSafetyPlanShareListApi
} from 'slices/safety/action';
import { Network, ShareNetworkApi } from 'types/network';
import moment from 'moment';
import {
  fetchJournalsSharedNetworks,
  callJournalShareListApi,
  callJournalShareDeleteApi
} from 'slices/journey/share/action';
import {
  callInvitationListApi,
  callInvitationReadApi
} from './invitation/action';
import { callGoalListApi, fetchGoals } from 'slices/goal/action';
import {
  callGoalShareDeleteApi,
  startSharingAllGoals,
  stopAllGoalsSharing
} from './access/goals/action';
import {
  callSafetyPlanShareDeleteApi,
  shareSafetyPlan,
  stopSharingSafetyPlan
} from './access/safetyplan/action';
import {
  callMyStoryShareDeleteApi,
  startSharingStory,
  stopSharingStory
} from './access/mystory/action';
import {
  startSharingAllJournals,
  stopSharingAllJournals
} from './access/journals/action';
import {
  startSharingContact,
  stopSharingContact,
  callNetworkShareDeleteApi
} from './access/contacts/action';

export const fetchNetworks = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const networks = await callNetworkContactListApi();
    const invitationsSentToOthers = await callInvitationListApi();
    const connectRequestInvitations = await callInvitationReadApi();

    // Check Pending
    const updatedNetworks = networks.map(network => {
      const unAcceptedInvitationsLen = invitationsSentToOthers.filter(
        item => item.EmailAddress === network.Email && !item.AcceptedOn
      ).length;
      const acceptedSentInvitationsLen = invitationsSentToOthers.filter(
        item => item.EmailAddress === network.Email && item.AcceptedOn
      ).length;

      const updatedNetwork: Network = {
        ...network,
        Status:
          network.Email != null &&
          network.Phone !== '' &&
          unAcceptedInvitationsLen > 0 &&
          acceptedSentInvitationsLen === 0
            ? 'Pending'
            : ''
      };
      return updatedNetwork;
    });

    const updatedNetworks2 = updatedNetworks.map(network => {
      const unAcceptedReceivedInvitationsLen = connectRequestInvitations.filter(
        item =>
          item.InviterUserEmailAddress === network.Email && !item.AcceptedOn
      ).length;
      const acceptedReceivedInvitationsLen = connectRequestInvitations.filter(
        item =>
          item.InviterUserEmailAddress === network.Email && item.AcceptedOn
      ).length;

      const updatedNetwork: Network = {
        ...network,
        Status:
          network.Status === '' &&
          network.Email != null &&
          network.Phone !== '' &&
          unAcceptedReceivedInvitationsLen > 0 &&
          acceptedReceivedInvitationsLen === 0
            ? 'Pending'
            : network.Status
      };

      return updatedNetwork;
    });

    // Check isConnected
    let allSharedNetworks: ShareNetworkApi[] = [];

    const goals = await callGoalListApi();
    for (const goal of goals) {
      const networks = await callGoalShareListApi(goal.Id);
      allSharedNetworks = allSharedNetworks.concat(networks);
    }

    const journals = await callJournalListApi();
    for (const journal of journals) {
      const networks = await callJournalShareListApi(journal.Id);
      allSharedNetworks = allSharedNetworks.concat(networks);
    }

    const safetyPlanShareList = await callSafetyPlanShareListApi();
    allSharedNetworks = allSharedNetworks.concat(safetyPlanShareList);

    const story = await callMyStoryReadApi();
    const myStoryShareList = await callMyStoryShareListApi(story.MyStoryId);
    allSharedNetworks = allSharedNetworks.concat(myStoryShareList);

    const updatedNetworks3 = updatedNetworks2.map(network => {
      if (network.Email != null && network.Status === '') {
        const updatedNetwork: Network = {
          ...network,
          Status: allSharedNetworks.find(
            item => item.SharedWithNetworkContactId === network.Id
          )
            ? 'Connected'
            : 'Disconnected'
        };
        return updatedNetwork;
      }

      return network;
    });

    dispatch(
      read({
        networks: updatedNetworks3
      })
    );

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const fetchOtherSharedList = (): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    await dispatch(fetchGoals());
    await dispatch(fetchStepsSharedNetworks());
    await dispatch(fetchGoalsSharedNetworks());

    await dispatch(fetchJournalsData());
    await dispatch(fetchJournalsSharedNetworks());

    await dispatch(fetchStoryData());
    await dispatch(fetchSafetySharedList());

    await dispatch(fetchContactSharedList());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const fetchContactSharedList = (): AppThunk => async dispatch => {
  try {
    const sharedData = await callNetworkShareListApi();
    dispatch(fetchSharedList({ networks: sharedData }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const addNetwork = (
  history: any,
  network: Network
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callNetworkContactCreateApi(network);

    dispatch(add({ network }));
    dispatch(stopLoading());

    if (network.Type === 'Person') {
      history.push('/networks/people');
    } else {
      history.push('/networks/services');
    }
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const deleteContact = (network: Network): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callNetworkContactDeleteApi(network);
    dispatch(remove({ network }));
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const disconnectContact = (
  network: Network
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    // delete goal shares
    const goals = await callGoalListApi();
    for (const goal of goals) {
      const networks = await callGoalShareListApi(goal.Id);
      await Promise.all(
        networks
          .filter(item => item.SharedWithNetworkContactId === network.Id)
          .map(async network => {
            await callGoalShareDeleteApi(
              goal.Id,
              network.SharedWithNetworkContactId
            );
          })
      );
    }

    // delete journal shares
    const journals = await callJournalListApi();
    for (const journal of journals) {
      const networks = await callJournalShareListApi(journal.Id);
      await Promise.all(
        networks
          .filter(item => item.SharedWithNetworkContactId === network.Id)
          .map(async network => {
            await callJournalShareDeleteApi(
              journal.Id,
              network.SharedWithNetworkContactId
            );
          })
      );
    }

    // delete safety plan shares
    const safetyPlanShareList = await callSafetyPlanShareListApi();
    await Promise.all(
      safetyPlanShareList
        .filter(item => item.SharedWithNetworkContactId === network.Id)
        .map(async network => {
          await callSafetyPlanShareDeleteApi(
            network.SharedWithNetworkContactId
          );
        })
    );

    // delete my story share
    const story = await callMyStoryReadApi();
    const myStoryShareList = await callMyStoryShareListApi(story.MyStoryId);
    await Promise.all(
      myStoryShareList
        .filter(item => item.SharedWithNetworkContactId === network.Id)
        .map(async network => {
          await callMyStoryShareDeleteApi(
            story.MyStoryId,
            network.SharedWithNetworkContactId
          );
        })
    );

    // delete my contacts
    const sharedContactsList = await callNetworkShareListApi();
    await Promise.all(
      sharedContactsList.map(async network => {
        await callNetworkShareDeleteApi(network.SharedWithNetworkContactId);
      })
    );

    await dispatch(fetchNetworks());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const updateNetwork = (
  history: any,
  network: Network,
  access: {
    goal: boolean;
    journey: boolean;
    story: boolean;
    safety: boolean;
    network: boolean;
  }
): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    await callNetworkContactUpdateApi(network);

    // sharing journals
    if (access.journey) {
      await dispatch(startSharingAllJournals(network));
    } else {
      await dispatch(stopSharingAllJournals(network));
    }

    // sharing goals
    if (access.goal) {
      await dispatch(startSharingAllGoals(network));
    } else {
      await dispatch(stopAllGoalsSharing(network));
    }

    // sharing my story
    const myStoryId = getState().story.story.MyStoryId;
    if (myStoryId) {
      if (access.story) {
        dispatch(startSharingStory(myStoryId, network));
      } else {
        dispatch(stopSharingStory(myStoryId, network));
      }
    }

    // sharing safety plan
    if (access.safety) {
      await dispatch(shareSafetyPlan(network));
    } else {
      await dispatch(stopSharingSafetyPlan(network));
    }

    // sharing contacts
    if (access.network) {
      await dispatch(startSharingContact(network));
    } else {
      await dispatch(stopSharingContact(network));
    }

    dispatch(stopLoading());

    if (
      sessionStorage.getItem('inviterAccountType') !== null &&
      sessionStorage.getItem('inviterAccountType') !== ''
    ) {
      history.push(
        `/networks/${
          sessionStorage.getItem('inviterAccountType')! === 'RelatedPerson'
            ? 'people'
            : 'services'
        }`
      );
    } else {
      history.goBack();
    }
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const callNetworkContactCreateApi = (network: Network) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const requestBody = {
    ...network,
    Image:
      network.Image === '/images/avatars/carerDefaultAvatar.svg' ||
      network.Image === '/images/avatars/providerDefaultAvatar.png'
        ? ''
        : network.Image.replace('data:image/png;base64,', '')
  };

  return axios.post('/NetworkContact/Create', requestBody).then(response => {
    return response.data;
  });
};

const callNetworkContactDeleteApi = (network: Network) => {
  return axios.delete(`/NetworkContact/Delete/${network.Id}`);
};

export const callNetworkContactUpdateApi = (network: Network) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  const requestContext = {
    ...network,
    Image:
      network.Image === '/images/avatars/carerDefaultAvatar.svg' ||
      network.Image === '/images/avatars/providerDefaultAvatar.png'
        ? ''
        : network.Image.replace('data:image/png;base64,', '')
  };

  return axios.post(`/NetworkContact/Update/${network.Id}`, requestContext);
};

export const callRecoveryPlanShareCreateApi = (
  networkId: string,
  networkName: string
) => {
  const requestContent = {
    SharedWithNetworkContactId: networkId,
    SharedWithNetworkName: networkName,
    SharedOnDate: moment().format('YYYY-MMM-DD')
  };
  return axios.post('/RecoveryPlanShare/Create', requestContent);
};

export const callNetworkContactListApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get('/NetworkContact/List').then(response => {
    const networks: Network[] = JSON.parse(JSON.stringify(response.data));
    const updatedNetworks: Network[] = networks.map(item => {
      return {
        ...item,
        Type: item.Type ? item.Type : 'Person',
        Name: item.Name ? item.Name : '',
        Phone: item.Phone ? item.Phone : '',
        ImageType: item.ImageType ? item.ImageType : '',
        ImageUrl: item.ImageUrl ? item.ImageUrl : '',
        Image: item.Image
          ? 'data:image/png;base64,' + item.Image
          : item.Type === 'Person'
          ? '/images/avatars/carerDefaultAvatar.svg'
          : '/images/avatars/providerDefaultAvatar.png'
      };
    });
    return updatedNetworks;
  });
};

const callNetworkShareListApi = () => {
  return axios.get(`/NetworkShare/List`).then(response => {
    const networks: ShareNetworkApi[] = JSON.parse(
      JSON.stringify(response.data)
    );
    return networks;
  });
};
