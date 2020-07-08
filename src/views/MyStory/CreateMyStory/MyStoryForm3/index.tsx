import React, { useState } from 'react';
import useRouter from 'common/utils/useRouter';
import { useDispatch, useSelector } from 'react-redux';
import { addMyAreas } from 'slices/story/action';
import clsx from 'clsx';
import { RootState } from 'reducer';
import { FocusArea } from 'types/other';

import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Navigation from '../../Navigation';
import { YesNoConfirmation } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '37px',
    color: '#FFFFFF'
  },
  titleContainer: {
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center'
    }
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '23px',
    color: '#73BA9B'
  },
  container2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px'
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    // [theme.breakpoints.up('xs')]: {
    //   height: 155
    // },
    // [theme.breakpoints.up('sm')]: {
    //   height: 210
    // },
    // [theme.breakpoints.up('md')]: {
    //   height: 225
    // },
    // [theme.breakpoints.up('lg')]: {
    //   height: 166
    // },
    // border: '1.5px solid #73BA9B',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
    borderRadius: '12px',
    position: 'relative',
    textAlign: 'center'
  },
  selectedBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    // [theme.breakpoints.up('xs')]: {
    //   height: 155
    // },
    // [theme.breakpoints.up('sm')]: {
    //   height: 210
    // },
    // [theme.breakpoints.up('md')]: {
    //   height: 225
    // },
    // [theme.breakpoints.up('lg')]: {
    //   height: 166
    // },
    // border: '1.5px solid #73BA9B',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
    borderRadius: '12px',
    position: 'relative',
    textAlign: 'center',
    border: '2px solid #F79221'
  },
  boxTitle: {
    background: '#FFFFFF',
    // border: '1.5px solid #73BA9B',
    boxSizing: 'border-box',
    borderRadius: '12px',
    padding: '10px 5px',
    textAlign: 'center',
    position: 'relative',
    bottom: '0',
    width: '100%',
    marginTop: -4,
    height: 61,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title2: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    textAlign: 'center',
    color: '#003E1F'
  },
  imageContainer: {
    // padding: '10px 0',
    boxSizing: 'border-box'
  },
  images: {
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '74%',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    }
  },
  textContainer: {
    textAlign: 'justify',
    padding: '20px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '600px',
      marginLeft: '10px'
    }
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  }
}));

const MyStoryForm3: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();
  const focusAreasState: FocusArea[] = useSelector(
    (state: RootState) => state.story.focusAreas
  );

  const [focusAreas] = useState<FocusArea[]>(
    JSON.parse(sessionStorage.getItem('focusAreas')!)
  );
  const [selectedAreas, setSelectedAreas] = useState([
    ...focusAreasState.map(area => {
      return area.id;
    })
  ]);

  const selectOneArea = (id: string) => {
    const selectedIndex = selectedAreas.indexOf(id);
    let newSelectedAreas: string[] = [];
    if (selectedIndex === -1) {
      newSelectedAreas = newSelectedAreas.concat(selectedAreas, id);
    } else if (selectedIndex === 0) {
      newSelectedAreas = newSelectedAreas.concat(selectedAreas.slice(1));
    } else if (selectedIndex === selectedAreas.length - 1) {
      newSelectedAreas = newSelectedAreas.concat(selectedAreas.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedAreas = newSelectedAreas.concat(
        selectedAreas.slice(0, selectedIndex),
        selectedAreas.slice(selectedIndex + 1)
      );
    }
    setSelectedAreas(newSelectedAreas);
  };

  const save = () => {
    if (selectedAreas.length > 0) {
      dispatch(
        addMyAreas(focusAreas.filter(area => selectedAreas.includes(area.id))!)
      );
      history.push('/story');
    }
  };

  /** Confirm Dialog */
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);

  function openCancelConfirmHandler() {
    setOpenCancelConfirm(true);
  }

  function closeCancelConfirmHandler() {
    setOpenCancelConfirm(false);
  }

  const confirmCancelDialog = (
    <YesNoConfirmation
      open={openCancelConfirm}
      close={closeCancelConfirmHandler}
      action={() => history.push('/story')}>
      <span className={classes.confirmTitle}>
        Are you sure you want to
        <br />
        leave this page?
      </span>
    </YesNoConfirmation>
  );

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ background: '#73BA9B' }}>
          <Navigation
            save={save}
            back={openCancelConfirmHandler}
            active={selectedAreas.length > 0}
          />
        </Grid>
        <Grid item xs={12} style={{ background: '#73BA9B' }}>
          <div className={classes.titleContainer}>
            <span className={classes.title}>
              What areas would you like to work on?
            </span>
          </div>
        </Grid>

        <Grid item xs={12} container justify="center">
          <Grid item xs={12} sm={7} container justify="center">
            <div className={classes.textContainer}>
              Improving your health and wellbeing usually means changing things
              across different areas in your life. Let’s think about some of the
              areas of your life where you might want to set some goals.
            </div>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Grid container>
              {focusAreas.map(area => {
                return (
                  <Grid item xs={6} sm={6} md={4} lg={3} key={area.id}>
                    <div className={classes.container2}>
                      <div
                        className={clsx(
                          selectedAreas.indexOf(area.id) !== -1
                            ? classes.selectedBox
                            : classes.box
                        )}
                        style={{ background: `${area.color}` }}
                        onClick={() => selectOneArea(area.id)}>
                        <div className={classes.imageContainer}>
                          <img className={classes.images} src={'/images/areas/' + area.image} alt="" />
                        </div>
                        <div className={classes.boxTitle}>
                          <span className={classes.title2}>{area.name}</span>
                        </div>
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {openCancelConfirm && confirmCancelDialog}
    </>
  );
};

export default MyStoryForm3;
