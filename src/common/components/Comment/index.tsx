import React, { useState, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid, TextField } from '@material-ui/core';
import { Favorite, Delete } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { removeComment } from 'slices/goal/comment/action';
import moment from 'moment';
import { DeleteConfirmation } from 'common/components';

import { GoalComment } from 'types/goal';
import { JournalComment } from 'types/journey';
import CommentReply from '../CommentReply';

// import { addNewComment } from 'slices/goal/comment/action';

const goalComment = require('slices/goal/comment/action');
const journalComment = require('slices/journey/comment/action');

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '20px 10px',
    border: '1px solid #73BA9B',
    boxSizing: 'border-box',
    borderRadius: '13px',
    marginTop: '18px',
    backgroundColor: '#FFFFFF'
  },
  avatar: {
    width: 50,
    height: 50
  },
  text: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '127.69%',
    color: '#B3B3B3'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  replyTextField: {
    boxSizing: 'border-box',
    boxShadow: 'inset 0px 0px 6px rgba(0, 0, 0, 0.2)',
    background: '#EEEEEE',
    borderRadius: '3px',
    margin: '0 10px'
  }
}));

type Props = {
  commentId: string;
  id: string;
  type: string;
  name: string;
  message: string;
  favorite?: boolean;
  date: string;
  image: string;
  children: (GoalComment | JournalComment)[];
};

const Comment: React.FC<Props> = ({
  commentId,
  id,
  type,
  name,
  message,
  date,
  favorite = true,
  image,
  children
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDeleteEvent = () => {
    dispatch(removeComment(id, commentId));
  };

  /** Dialog */
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // To reply on a comment
  const [replyBox, setReplyBox] = useState(false);

  function openReplyBox() {
    setReplyBox(true);
  }

  function closeReplyBox() {
    setReplyBox(false);
  }

  const [new_message, setMessage] = useState('');

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (type === 'Goal') {
      if (new_message.length > 1) {
        dispatch(
          goalComment.addNewComment(
            id,
            new_message,
            sessionStorage.getItem('FirstName')!,
            commentId
          )
        );
        setMessage('');
        closeReplyBox();
      }
    } else {
      if (new_message.length > 1) {
        dispatch(
          journalComment.addNewComment(
            id,
            new_message,
            sessionStorage.getItem('FirstName')!,
            commentId
          )
        );
        setMessage('');
        closeReplyBox();
      }
    }
  };

  // To show replies
  const [showReplies, setShowReplyStatus] = useState(false);

  function setShowReplies() {
    setShowReplyStatus(true);
  }

  function setCloseReplies() {
    setShowReplyStatus(false);
  }

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={2}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}>
            <span className={classes.text}>{name}</span>
            {image ? (
              <Avatar
                alt=""
                className={classes.avatar}
                src={'data:image/png;base64,' + image}
              />
            ) : (
              <Avatar alt="" className={classes.avatar} src="" />
            )}
          </div>
        </Grid>
        <Grid item xs={8}>
          <div style={{ overflowWrap: 'break-word' }}>
            <span>{message}</span>
          </div>
          <div style={{ marginTop: '5px' }}>
            <span className={classes.text}>{moment(date).format('LLLL')}</span>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div>
            {favorite ? (
              <Favorite style={{ fill: '#FA7268' }} />
            ) : (
              <Favorite style={{ fill: '#D5F2E3' }} />
            )}
          </div>
          <div style={{ marginTop: '5px' }}>
            <Delete
              style={{ fill: '#73BA9B', cursor: 'pointer' }}
              onClick={handleClickOpen}
            />
          </div>
          <div>
            <p style={{ cursor: 'pointer' }} onClick={openReplyBox}>
              Reply
            </p>
          </div>
        </Grid>
        {showReplies ? (
          <div>
            <p style={{ cursor: 'pointer' }} onClick={setCloseReplies}>
              Hide Replies
            </p>
          </div>
        ) : (
          <div>
            <p style={{ cursor: 'pointer' }} onClick={setShowReplies}>
              Show Replies
            </p>
          </div>
        )}
      </Grid>
      {open && (
        <DeleteConfirmation
          open={open}
          close={handleClose}
          action={handleDeleteEvent}
          donRedirect>
          <span className={classes.title}>
            Are you sure you want to
            <br />
            delete this comment?
          </span>
        </DeleteConfirmation>
      )}
      {showReplies && (
        <Grid container>
          {children.map(child => {
            return (
              <Grid key={child.Id} container lg={12}>
                <Grid item lg={2}></Grid>
                <Grid item lg={10}>
                  <CommentReply
                    commentId={child.Id}
                    id={child.Id}
                    name={sessionStorage.getItem('FirstName')!}
                    message={child.Message}
                    date={child.CreatedOnDate}
                    image={sessionStorage.getItem('Avatar')!}
                  />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      )}
      {replyBox && (
        <div>
          <TextField
            variant="outlined"
            placeholder="Say something about this goal..."
            fullWidth
            multiline
            value={new_message}
            autoComplete="off"
            rows="2"
            className={classes.replyTextField}
            onChange={event => handleFieldChange(event)}
          />
          <button onClick={handleCommentSubmit}>Submit</button>
        </div>
      )}
    </>
  );
};

export default Comment;
