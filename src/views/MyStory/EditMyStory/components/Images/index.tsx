import React, { useState } from 'react';
import useRouter from 'common/utils/useRouter';

import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Hidden, IconButton, Theme } from '@material-ui/core';
import { ArrowBackIos, CameraEnhance } from '@material-ui/icons';
import { Image } from 'types/gallery';
import { Story } from 'types/story';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  imageEmptyContainer: {
    position: 'relative',
    height: '279px',
    width: '100%',
    backgroundColor: '#EEEEEE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0',
    [theme.breakpoints.up('sm')]: {
      marginTop: '110px'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '110px'
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '10px'
    }
  },
  backBigArrow: {
    fontSize: '32px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    }
  },
  backBigArrowInactive: {
    fontSize: '32px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    },
    fill: 'rgba(255, 255, 255, 0.4)'
  },
  nextBigArrow: {
    fontSize: '32px',
    transform: 'rotate(180deg)',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    }
  },
  nextBigArrowInactive: {
    fontSize: '32px',
    transform: 'rotate(180deg)',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    },
    fill: 'rgba(255, 255, 255, 0.4)'
  },
  backArrowActive: {
    fontSize: '32px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    },
    fill: '#FFFFFF'
  },
  backArrowInActive: {
    fontSize: '32px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    },
    fill: 'rgba(255, 255, 255, 0.4)'
  },
  nextArrowActive: {
    fontSize: '32px',
    transform: 'rotate(180deg)',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    },
    fill: '#FFFFFF'
  },
  nextArrowInActive: {
    fontSize: '32px',
    transform: 'rotate(180deg)',
    [theme.breakpoints.up('sm')]: {
      fontSize: '42px'
    },
    fill: 'rgba(255, 255, 255, 0.4)'
  },
  imageContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: '258px',
    width: '100%',
    objectFit: 'cover'
  },
  addImageText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B',
    cursor: 'pointer'
  },
  navigation: {
    marginBottom: '10px',
    position: 'absolute',
    bottom: '0',
    display: 'flex',
    alignItems: 'center'
  },
  navDot: {
    width: '7.95px',
    height: '7.95px',
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
    margin: '0 5px'
  }
}));

type Props = {
  story: Story;
};

export const Images: React.FC<Props> = () => {
  const classes = useStyles();
  const { history } = useRouter();

  const images: Image[] = useSelector(
    (state: RootState) => state.gallery.images
  );

  const [index, setIndex] = useState(0);

  const next = () => {
    const nextIndex = index < images.length - 1 ? index + 1 : index;
    setIndex(nextIndex);
  };

  const back = () => {
    const nextIndex = index > 0 ? index - 1 : 0;
    setIndex(nextIndex);
  };

  return (
    <>
      <Hidden mdUp>
        <Grid container>
          <Grid item xs={12}>
            {images.length > 0 ? (
              <div className={classes.imageContainer}>
                <img
                  src={'data:image/png;base64,' + images[index].Data}
                  alt=""
                  className={classes.image}
                  onClick={() => history.push('/gallery')}
                />
                <div className={classes.navigation}>
                  <IconButton
                    style={{ padding: '0', marginRight: '20px' }}
                    onClick={back}>
                    <ArrowBackIos
                      className={clsx(
                        index > 0 && classes.backArrowActive,
                        index === 0 && classes.backArrowInActive
                      )}
                    />
                  </IconButton>
                  {[...Array(5).keys()].map(i => {
                    return <div className={classes.navDot} key={i} />;
                  })}
                  <IconButton
                    style={{ padding: '0', marginLeft: '20px' }}
                    onClick={next}>
                    <ArrowBackIos
                      className={clsx(
                        index < images.length && classes.nextArrowActive,
                        index === images.length - 1 && classes.nextArrowInActive
                      )}
                    />
                  </IconButton>
                </div>
              </div>
            ) : (
              <div className={classes.imageEmptyContainer}>
                <div style={{ marginTop: '70px' }}>
                  <IconButton onClick={() => history.push('/gallery')}>
                    <CameraEnhance fontSize="large" />
                  </IconButton>
                  <span
                    className={classes.addImageText}
                    onClick={() => history.push('/gallery')}>
                    Add Image
                  </span>
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </Hidden>
      <Hidden smDown>
        <Grid container spacing={2} justify="center">
          <Hidden mdDown>
            <Grid item xs={12} sm={8} md={7} style={{ marginTop: '25px' }}>
              <Typography variant="h1">Edit My Story</Typography>
            </Grid>
          </Hidden>
          {images.length > 0 ? (
            <Grid item xs={12} sm={8} md={7} className={classes.flexItem}>
              <IconButton
                style={{ padding: '0', marginRight: '20px' }}
                onClick={back}>
                <ArrowBackIos
                  fontSize="large"
                  className={clsx(
                    index > 0 && classes.backBigArrow,
                    index === 0 && classes.backBigArrowInactive
                  )}
                />
              </IconButton>
              <img
                src={'data:image/png;base64,' + images[index].Data}
                alt=""
                className={classes.image}
                onClick={() => history.push('/gallery')}
              />
              <IconButton
                style={{ padding: '0', marginLeft: '20px' }}
                onClick={next}>
                <ArrowBackIos
                  fontSize="large"
                  className={clsx(
                    index < images.length && classes.nextBigArrow,
                    index === images.length - 1 && classes.nextBigArrowInactive
                  )}
                />
              </IconButton>
            </Grid>
          ) : (
            <Grid item xs={12} sm={8} md={7} className={classes.flexItem}>
              <div className={classes.imageEmptyContainer}>
                <div>
                  <IconButton onClick={() => history.push('/gallery')}>
                    <CameraEnhance fontSize="large" />
                  </IconButton>
                  <span
                    className={classes.addImageText}
                    onClick={() => history.push('/gallery')}>
                    Add Image
                  </span>
                </div>
              </div>
            </Grid>
          )}
        </Grid>
      </Hidden>
    </>
  );
};

export default Images;
