import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetchPendingContacts, fetchConnectRequests } from './invitationSlice';
import { Invitation, Network } from 'types/network';
import { stopLoading, startLoading } from '../networkSlice';
import {
  callNetworkContactListApi,
  callNetworkContactCreateApi,
  fetchNetworks
} from '../action';
import { startSharingAllJournals } from '../access/journals/action';
import { startSharingAllGoals } from '../access/goals/action';
import { shareSafetyPlan } from '../access/safetyplan/action';
import { startSharingContact } from '../access/contacts/action';
import { callMyStoryReadApi } from 'slices/story/action';
import { startSharingStory } from '../access/mystory/action';

//** ASYNC FUNCS */
export const fetchPendingContactFromInvitation = (): AppThunk => async dispatch => {
  try {
    const contacts = await callNetworkContactListApi();

    const invitations = await callInvitationListApi();
    const pendingContacts = invitations.filter(
      item =>
        !item.Name &&
        !item.AcceptedOn &&
        !contacts.find(contact => contact.Email === item.EmailAddress)
    );

    const sortedContacts = pendingContacts.sort(
      (a, b) =>
        new Date(b.CreatedOn).getTime() - new Date(a.CreatedOn).getTime()
    );

    dispatch(fetchPendingContacts({ pendingContacts: sortedContacts }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchConnectionRequests = (): AppThunk => async dispatch => {
  try {
    const requests = await callInvitationReadApi();
    // const newConnectionRequests = requests.filter(item => !item.AcceptedOn);

    const connectRequests = requests.sort(
      (a, b) =>
        new Date(b.CreatedOn).getTime() - new Date(a.CreatedOn).getTime()
    );

    dispatch(fetchConnectRequests({ connectRequests }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const acceptConnectRequest = (
  invitationId: string,
  email: string,
  name: string,
  close: () => void,
  accountType: 'Person' | 'Organisation',
  history: any
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    let network: Network = {
      Id: '',
      UserId: sessionStorage.getItem('UserId')!,
      Name: name,
      Email: email,
      Phone: '',
      CallForSupport: false,
      Address: '',
      Type: accountType,
      Relationship: '',
      Image: '',
      ImageType: '',
      ImageUrl: ''
    };

    const response: string = await callNetworkContactCreateApi(network);

    const responseArray = response.split(' ');
    const updatedNetwork: Network = {
      ...network,
      Id: responseArray[5]
    };

    await callInvitationConsumerAcceptAndNotify(invitationId);
    await callInvitationDelete(invitationId);
    await dispatch(fetchConnectionRequests());
    close();

    sessionStorage.removeItem('invitationId');
    sessionStorage.removeItem('inviterEmail');
    sessionStorage.removeItem('inviterName');

    // sharing journals
    await dispatch(startSharingAllJournals(updatedNetwork));

    // sharing goals
    await dispatch(startSharingAllGoals(updatedNetwork));

    // sharing my story
    const story = await callMyStoryReadApi();
    dispatch(startSharingStory(story.MyStoryId, updatedNetwork));

    // sharing safety plan
    await dispatch(shareSafetyPlan(updatedNetwork));

    // sharing contacts
    await dispatch(startSharingContact(updatedNetwork));

    await dispatch(fetchNetworks());

    dispatch(stopLoading());

    if (responseArray.length > 5) {
      history.replace(
        `/networks/${accountType === 'Person' ? 'people' : 'services'}/${
          updatedNetwork.Id
        }/edit`
      );
    }
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const sendInvitation = (
  invitation: Invitation
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callInvitationCreateApi(invitation);
    await dispatch(fetchPendingContactFromInvitation());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const acceptInvitation = (id: string): AppThunk => async dispatch => {
  try {
    await callInvitationConsumerAcceptAndNotify(id);
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const deleteInvitation = (id: string): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callInvitationDelete(id);
    await dispatch(fetchPendingContactFromInvitation());
    await dispatch(fetchConnectionRequests());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
export const callInvitationListApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get('/Invitation/List').then(response => {
    const invitations: Invitation[] = JSON.parse(JSON.stringify(response.data));
    return invitations;
  });
};

export const callInvitationCreateApi = (invitation: Invitation) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.post('/Invitation/Create', invitation);
};

// const callInvitationAccept = (id: string) => {
//   axios.defaults.headers.common['Authorization'] =
//     'Bearer ' + authentication.getAccessToken();

//   return axios.post(`/Invitation/Accept/${id}`);
// };

const callInvitationDelete = (id: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.delete(`/Invitation/Delete/${id}`);
};

export const callInvitationReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get('/Invitation/Read').then(response => {
    const invitations: Invitation[] = JSON.parse(JSON.stringify(response.data));
    return invitations;
  });
};

const callInvitationConsumerAcceptAndNotify = (id: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.post(`/Invitation/ConsumerAcceptAndNotify/${id}`);
};
