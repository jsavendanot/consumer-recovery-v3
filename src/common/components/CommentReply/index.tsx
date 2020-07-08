import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { removeComment } from 'slices/goal/comment/action';
import moment from 'moment';
import { DeleteConfirmation } from 'common/components';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
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
  name: string;
  message: string;
  favorite?: boolean;
  date: string;
  image: string;
};

const CommentReply: React.FC<Props> = ({
  commentId,
  id,
  name,
  message,
  date,
  favorite = true,
  image
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDeleteEvent = () => {
    dispatch(removeComment(id, commentId));
  };

  /** Dialog */
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
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
            {/* <span className={classes.text}>{name}</span> */}
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
        {/* <Grid item xs={2}>
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
                </Grid> */}
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
    </>
  );
};

export default CommentReply;
