import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMyStory } from 'slices/story/action';
import useRouter from 'common/utils/useRouter';
import { RootState } from 'reducer';
import { StoryRootType } from 'types/story';
import { FocusArea } from 'types/other';
import { Image } from 'types/gallery';

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Hidden,
  IconButton,
  Divider,
  Theme
} from '@material-ui/core';
import {
  ArrowBackIos,
  CameraEnhance,
  AddCircleOutlined
} from '@material-ui/icons';

import { EditStory, EditMyStrengths, EditMyFocusAreas } from './components';
import { Button, Loader, YesNoConfirmation } from 'common/components';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: '20px 20px'
  },
  imageEmptyContainer: {
    position: 'relative',
    height: '279px',
    width: '100%',
    backgroundColor: '#EEEEEE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20px'
  },
  name: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '35px',
    color: '#003E1F'
  },
  item: {
    width: '100%'
  },
  flexItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px'
  },
  backArrow: {
    fontSize: '32px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '52px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '52px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '52px'
    }
  },
  image: {
    height: '258px',
    width: '100%',
    objectFit: 'cover'
  },
  divider: {
    backgroundColor: '#73BA9B'
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  addPhoto: {
    [theme.breakpoints.down('xs')]: {
      bottom: '0',
      right: '0',
      width: '100%',
      position: 'fixed',
      background: '#FFFFFF',
      borderRadius: '12px 12px 0px 0px'
    },
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      background: '#FFFFFF',
      borderRadius: '12px 12px 0px 0px'
    }
  },
  buttonContainer: {
    [theme.breakpoints.up('xs')]: {
      padding: '20px 20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '20px 10%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 15%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '20px 20%'
    }
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
  desc: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '23px',
    color: '#B3B3B3'
  },
  descContainer: {
    padding: '20px',
    textAlign: 'center'
  },
  addMoreText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#73BA9B',
    cursor: 'pointer'
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '20px 20px 10px',
    [theme.breakpoints.up('sm')]: {
      padding: '20px 40px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 8%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '35px 10%'
    },
    backgroundColor: '#73BA9B'
  },
  headerContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  headerText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '35px',
    color: '#FFFFFF',
    [theme.breakpoints.up('sm')]: {
      marginTop: '0'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '0'
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '0'
    }
  },
  smallHeaderText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#D5F2E3',
    marginTop: '7px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '15px',
      fontSize: '23px'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '15px',
      fontSize: '25px'
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '20px',
      fontSize: '25px'
    }
  },
  backText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F',
    cursor: 'pointer'
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
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
  }
}));

const EditMyStory: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();
  const storyStore: StoryRootType = useSelector(
    (state: RootState) => state.story
  );

  const [storyText, setStoryText] = useState(storyStore.story.Story);
  const [strengths, setStrengths] = useState([...storyStore.strengths]);
  const [focusAreas, setFocusAreas] = useState([...storyStore.focusAreas]);
  const [removedFocusAreas, setRemovedFocusAreas] = useState<FocusArea[]>([]);

  /** Show images */
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

  const deleteStrengthsHandler = (id: string) => {
    setStrengths([...strengths.filter(strength => strength.id !== id)]);
  };

  const deleteFocusAreasHandler = (id: string) => {
    setFocusAreas([...focusAreas.filter(area => area.id !== id)]);
    setRemovedFocusAreas(value => [
      ...value,
      focusAreas.find(area => area.id === id)!
    ]);
  };

  const saveStoryHandler = () => {
    dispatch(updateMyStory(history, storyText, strengths, removedFocusAreas));
  };

  /** Confirm Dialog */
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);

  function openCancelConfirmHandler() {
    if (
      storyText !== storyStore.story.Story ||
      strengths.length !== storyStore.strengths.length ||
      focusAreas.length !== storyStore.focusAreas.length
    ) {
      setOpenCancelConfirm(true);
    } else {
      history.goBack();
    }
  }

  function closeCancelConfirmHandler() {
    setOpenCancelConfirm(false);
  }

  const confirmCancelDialog = (
    <YesNoConfirmation
      open={openCancelConfirm}
      close={closeCancelConfirmHandler}
      action={saveStoryHandler}
      redirect>
      <span className={classes.confirmTitle}>
        Do you want to save
        <br />
        the changes?
      </span>
    </YesNoConfirmation>
  );

  return (
    <>
      {storyStore.loading && <Loader />}
      <Hidden mdUp>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.header}>
              <div className={classes.headerContent}>
                <IconButton
                  style={{ padding: '0' }}
                  onClick={openCancelConfirmHandler}>
                  <ArrowBackIos
                    className={classes.backArrow}
                    style={{ color: '#FFFFFF' }}
                  />
                </IconButton>
                <span className={classes.headerText}>Edit My Story</span>
              </div>
              <span
                className={classes.smallHeaderText}
                onClick={saveStoryHandler}>
                Save
              </span>
            </div>
          </Grid>
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
          <Grid item xs={12} sm={10} md={10} style={{ marginTop: '25px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '50px'
                }}
                onClick={openCancelConfirmHandler}>
                <ArrowBackIos
                  fontSize="large"
                  style={{ fontSize: '32px', cursor: 'pointer' }}
                />
                <span className={classes.backText}>Back</span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={8} md={7}>
            <Typography variant="h1">Edit My story</Typography>
          </Grid>
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
          <Grid item xs={12} sm={9} md={9}>
            <Divider className={classes.divider} />
          </Grid>
        </Grid>
      </Hidden>
      <Grid container justify="center">
        <Grid item xs={12} sm={10} md={7} lg={7} className={classes.item}>
          <div className={classes.nameContainer}>
            <span className={classes.name}>Bessie Richards</span>
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={7} lg={7} className={classes.item}>
          <div className={classes.container}>
            {storyStore.story ? (
              <EditStory text={storyText} change={setStoryText} />
            ) : (
                <>
                  <div className={classes.descContainer}>
                    <span className={classes.desc}>
                      This is where you share your story for your choice of people
                      to understand you better.
                  </span>
                  </div>
                  <div className={classes.buttonContainer}>
                    <Button
                      type="secondary"
                      click={() => history.push('/story/write')}>
                      Write my story
                  </Button>
                  </div>
                </>
              )}
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={7} lg={7} className={classes.item}>
          <div className={classes.container}>
            <span className={classes.text}>My strengths</span>
            {strengths.length > 0 ? (
              <>
                <EditMyStrengths
                  strengths={strengths}
                  remove={deleteStrengthsHandler}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px 0'
                  }}
                  onClick={() => history.push('/story/strengths')}>
                  <IconButton>
                    <AddCircleOutlined
                      style={{
                        fill: '#73BA9B',
                        cursor: 'pointer'
                      }}
                    />
                  </IconButton>
                  <span className={classes.addMoreText}>Add more</span>
                </div>
              </>
            ) : (
                <>
                  <div className={classes.buttonContainer}>
                    <Button
                      type="secondary"
                      click={() => history.push('/story/strengths')}>
                      Add my strengths
                  </Button>
                  </div>
                </>
              )}
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={7} lg={7} className={classes.item}>
          <div className={classes.container}>
            <span className={classes.text}>My focus areas</span>
            {focusAreas.length > 0 ? (
              <EditMyFocusAreas
                myFocusAreas={focusAreas}
                onDeleteFocusAreas={deleteFocusAreasHandler}
              />
            ) : (
                <>
                  <div className={classes.buttonContainer}>
                    <Button
                      type="secondary"
                      click={() => history.push('/story/focusareas')}>
                      Add my focus areas
                  </Button>
                  </div>
                </>
              )}
          </div>
        </Grid>
        <Hidden smDown>
          <Grid item xs={12} sm={10} md={7} lg={7}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '20px 0'
              }}>
              <div style={{ width: '30%', margin: '0 20px' }}>
                <span
                  className={classes.backText}
                  onClick={openCancelConfirmHandler}>
                  Cancel
                </span>
              </div>
              <div style={{ width: '30%', margin: '0 20px' }}>
                <Button type="primary" click={saveStoryHandler}>
                  Save my story
                </Button>
              </div>
            </div>
          </Grid>
        </Hidden>
      </Grid>
      {openCancelConfirm && confirmCancelDialog}
    </>
  );
};

export default EditMyStory;
