import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useRouter from 'common/utils/useRouter';
import { RootState } from 'reducer';
import { StoryRootType, Strength } from 'types/story';
import { fetchStoryAllData } from 'slices/story/action';

import { makeStyles } from '@material-ui/styles';
import { Grid, Theme, Hidden, Divider, IconButton } from '@material-ui/core';
import { AddCircleOutlined, Edit } from '@material-ui/icons';

import { Images, Story, MyStrengths, MyFocusAreas } from './components';
import { Button, Loader } from 'common/components';
import { FocusArea } from 'types/other';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: '20px 20px'
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '50px'
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
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
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
  desc: {
    fontFamily: 'Scada',
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
  edit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '10px 0'
  },
  editText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#003E1F',
    cursor: 'pointer'
  },
  divider: {
    backgroundColor: '#73BA9B'
  }
}));

const MyStory: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const storyStore: StoryRootType = useSelector(
    (state: RootState) => state.story
  );

  const suggestedStrengths: Strength[] = useSelector(
    (state: RootState) => state.suggestion.strengths
  );

  const suggestedAreas: FocusArea[] = useSelector(
    (state: RootState) => state.suggestion.focusAreas
  );

  useEffect(() => {
    dispatch(fetchStoryAllData());
  }, [dispatch]);

  return (
    <>
      {storyStore.loading && <Loader />}
      <Images story={storyStore.story} />
      <Grid container justify="center">
        <Grid item md={10} lg={10} />
        <Grid item xs={12} sm={10} md={2} lg={2} className={classes.item}>
          <Hidden smDown>
            <div className={classes.edit}>
              {storyStore.story.Story != null && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '10px'
                  }}
                  onClick={() => history.push(`/story/edit`)}>
                  <IconButton>
                    <Edit
                      style={{
                        fill: '#73BA9B'
                      }}
                    />
                  </IconButton>
                  <span className={classes.editText}>Edit</span>
                </div>
              )}
            </div>
          </Hidden>
        </Grid>
        <Grid item lg={1} />
        <Grid item xs={12} sm={10} md={10} className={classes.item}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item lg={1} />
        <Grid item lg={3} />
        <Grid item xs={12} sm={10} md={7} lg={6} className={classes.item}>
          <div className={classes.nameContainer}>
            <span className={classes.name}>
              {sessionStorage.getItem('FirstName')}{' '}
              {sessionStorage.getItem('Surname')}
            </span>
          </div>
        </Grid>
        <Grid item lg={3} />
        <Grid item lg={3} />
        <Grid item xs={12} sm={10} md={7} lg={6} className={classes.item}>
          <div className={classes.container}>
            {storyStore.story.Story != null ? (
              <Story storyText={storyStore.story.Story} />
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
        <Grid item lg={3} />
        <Grid item lg={3} />
        <Grid item xs={12} sm={10} md={7} lg={6} className={classes.item}>
          <div className={classes.container}>
            <span className={classes.text}>My strengths</span>
            {storyStore.strengths.length > 0 ||
            suggestedStrengths.length > 0 ? (
              <>
                <MyStrengths strengths={storyStore.strengths} />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px 0'
                  }}>
                  <IconButton onClick={() => history.push('/story/strengths')}>
                    <AddCircleOutlined
                      style={{
                        fill: '#73BA9B'
                      }}
                    />
                  </IconButton>
                  <span
                    className={classes.addMoreText}
                    onClick={() => history.push('/story/strengths')}>
                    Add more
                  </span>
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
        <Grid item lg={3} />
        <Grid item lg={3} />
        <Grid item xs={12} sm={10} md={7} lg={6} className={classes.item}>
          <div className={classes.container}>
            <span className={classes.text}>My focus areas</span>
            {storyStore.focusAreas.length > 0 || suggestedAreas.length > 0 ? (
              <MyFocusAreas myFocusAreas={storyStore.focusAreas} />
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
        <Grid item lg={3} />
      </Grid>
    </>
  );
};

export default MyStory;
