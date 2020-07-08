import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { Button } from 'common/components';
import {
  setAsCoverOfMyStoryImage
  // setAsMyProfileImage
} from 'slices/gallery/action';
import { Image } from 'types/gallery';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 10px',
    borderBottom: '1px solid #73BA9B',
    marginBottom: '10px'
  },
  headerText: {
    flexGrow: 1,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#73BA9B'
  },
  closeIcon: {
    padding: '0'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '8px 0'
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '18px',
    color: '#003E1F',
    textTransform: 'capitalize',
    cursor: 'pointer'
  },
  button: {
    background: '#FFFFFF',
    border: '1.5px solid #003E1F',
    boxSizing: 'border-box',
    borderRadius: '25px',
    padding: '10px 10px',
    width: '100%'
  }
}));

type Props = {
  image: Image;
  close: () => void;
};

const SetPhoto: React.FC<Props> = ({ close, image }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const setAsCoverOfMyStory = () => {
    dispatch(setAsCoverOfMyStoryImage(image.Id));
    close();
  };

  // const setAsProfileImage = () => {
  //   dispatch(setAsMyProfileImage(image.ImageUrl, image.ImageType));
  //   close();
  // };

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.header}>
          <span className={classes.headerText}>Set photo as...</span>
          <IconButton className={classes.closeIcon} onClick={close}>
            <Close fontSize="large" style={{ fill: '#73BA9B' }} />
          </IconButton>
        </div>
      </Grid>
      {/* <Grid item xs={12}>
        <div className={classes.container}>
          <div style={{ width: '80%' }}>
            <Button type="secondary" click={setAsProfileImage}>
              <span className={classes.text}>My profile photo</span>
            </Button>
          </div>
        </div>
      </Grid> */}
      <Grid item xs={12}>
        <div className={classes.container}>
          <div style={{ width: '80%' }}>
            <Button type="secondary" click={setAsCoverOfMyStory}>
              <span className={classes.text}>The cover of my story</span>
            </Button>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.container} onClick={close}>
          <span className={classes.text}>Cancel</span>
        </div>
      </Grid>
    </Grid>
  );
};

export default SetPhoto;
