import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { read } from './commentSlice';
import { JournalComment } from 'types/journey';
import moment from 'moment';
import uuid from 'uuid';
import { stopLoading, startLoading } from '../journeySlice';

//** ASYNC FUNCS */

export const fetchJournalComments = (
  journalId: string
): AppThunk => async dispatch => {
  try {
    const comments = await callJournalCommentListApi(journalId);
    dispatch(read({ comments }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const addNewComment = (
  journalId: string,
  message: string,
  personName: string,
  parentId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callJournalCommentCreateApi(journalId, message, personName, parentId);

    const comments = await callJournalCommentListApi(journalId);
    dispatch(read({ comments }));

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const removeComment = (
  journalId: string,
  commentId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callJournalCommentDeleteApi(commentId);

    const comments = await callJournalCommentListApi(journalId);
    dispatch(read({ comments }));

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

const callJournalCommentListApi = (journalId: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(
      `/JournalComment/List/${journalId}/${sessionStorage.getItem('UserId')}`
    )
    .then(async response => {
      const comments: JournalComment[] = JSON.parse(
        JSON.stringify(response.data)
      );

      // New Code
      const parentComments = comments.filter(each_comment => {
        return each_comment.ParentCommentId === '00000000-0000-0000-0000-000000000000'
      })
      const childComments = comments.filter(each_comment => {
        return each_comment.ParentCommentId !== '00000000-0000-0000-0000-000000000000'
      })
      parentComments.forEach(parent => {
        parent.children = []
      })
      childComments.forEach(child => {
        const parentId = parentComments.findIndex(parent => {
          return parent.Id === child.ParentCommentId;
        })
        parentComments[parentId].children.push(child);
      })
      // New Code

      const sortedComments = parentComments.sort(
        (a, b) =>
          new Date(b.CreatedOnDate).getTime() -
          new Date(a.CreatedOnDate).getTime()
      );
      return sortedComments;
    });
};

const callJournalCommentCreateApi = (
  journalId: string,
  message: string,
  personName: string,
  parentId: string
) => {
  const requestContent = {
    Id: uuid(),
    ParentCommentId: parentId,
    JournalId: journalId,
    Message: message,
    PersonName: personName,
    CreatedOnDate: moment()
      .toDate()
      .toDateString(),
    NetworkContactId: sessionStorage.getItem('ContactId')
  };
  return axios.post('/JournalComment/Create', requestContent);
};

const callJournalCommentDeleteApi = (commentId: string) => {
  return axios.delete(`/JournalComment/Delete/${commentId}`);
};
