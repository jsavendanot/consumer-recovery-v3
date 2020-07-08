import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import moment from 'moment';
import uuid from 'uuid';
import { read } from './commentSlice';
import { GoalComment } from 'types/goal';
import { startLoading, stopLoading } from '../goalSlice';

//** ASYNC FUNCS */
export const fetchGoalsComments = (
  goalId: string
): AppThunk => async dispatch => {
  try {
    const comments = await callGoalCommentListApi(goalId);
    dispatch(read({ comments }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const addNewComment = (
  goalId: string,
  message: string,
  personName: string,
  parentId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callGoalCommentCreateApi(goalId, message, personName, parentId);

    const comments = await callGoalCommentListApi(goalId);
    dispatch(read({ comments }));

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const removeComment = (
  goalId: string,
  commentId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callGoalCommentDeleteApi(commentId);

    const comments = await callGoalCommentListApi(goalId);
    dispatch(read({ comments }));

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
const callGoalCommentListApi = (goalId: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/GoalComment/List/${goalId}/${sessionStorage.getItem('UserId')}`)
    .then(async response => {
      const comments: GoalComment[] = JSON.parse(JSON.stringify(response.data));

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

const callGoalCommentCreateApi = (
  goalId: string,
  message: string,
  personName: string,
  parentId: string
) => {
  const requestContent = {
    Id: uuid(),
    ParentCommentId: parentId,
    GoalId: goalId,
    Message: message,
    PersonName: personName,
    CreatedOnDate: moment()
      .toDate()
      .toDateString(),
    NetworkContactId: sessionStorage.getItem('ContactId')
  };

  return axios.post('/GoalComment/Create', requestContent);
};

const callGoalCommentDeleteApi = (commentId: string) => {
  return axios.delete(`/GoalComment/Delete/${commentId}`);
};
