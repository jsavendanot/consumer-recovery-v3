import React, { useState, MouseEvent, useEffect } from 'react';
import useRouter from 'common/utils/useRouter';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { Item } from 'types/safety';

import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton, Theme } from '@material-ui/core';
import { MoreVert, ArrowBackIos } from '@material-ui/icons';
import { Loader } from 'common/components';
import { ActionMenu } from '../components';
import { ListItems, SuggestedItem } from './components';
import { fetchSuggestedStressMe } from 'slices/suggestion/safety/stress/action';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    background: '#196386',
    padding: '20px 20px',
    height: '260px',
    position: 'relative'
  },
  navigation: {
    background: '#196386',
    height: '113px'
  },
  container2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('xs')]: {
      padding: '20px 20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '20px 10%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 10%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '20px 20%'
    }
  },
  headerText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '35px',
    color: '#FFFFFF',
    flexGrow: 2,
    marginTop: '10px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '12px'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '15px'
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '15px'
    }
  },
  image1: {
    position: 'absolute',
    [theme.breakpoints.up('xs')]: {
      top: '35%',
      right: '25%',
      height: 120,
      width: 120
    },
    [theme.breakpoints.up('sm')]: {
      top: '35%',
      right: '28%',
      height: 160,
      width: 160
    },
    [theme.breakpoints.up('md')]: {
      top: '35%',
      right: '35%',
      height: 160,
      width: 160
    },
    [theme.breakpoints.up('lg')]: {
      top: '35%',
      right: '40%',
      height: 160,
      width: 160
    }
  },
  image2: {
    position: 'absolute',
    [theme.breakpoints.up('xs')]: {
      top: '56%',
      right: '28%',
      height: 220,
      width: 220
    },
    [theme.breakpoints.up('sm')]: {
      top: '60%',
      right: '32%',
      height: 270,
      width: 270
    },
    [theme.breakpoints.up('md')]: {
      top: '60%',
      right: '38%',
      height: 270,
      width: 270
    },
    [theme.breakpoints.up('lg')]: {
      top: '60%',
      right: '45%',
      height: 270,
      width: 270
    }
  },
  moreIcon: {
    margin: '5px 10px'
  },
  backArrow: {
    fontSize: '42px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '52px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '52px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '52px',
      marginLeft: '20px'
    },
    marginTop: '12px',
    fill: '#FFFFFF'
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#323F45'
  }
}));

const Stress = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.safetyRoot.safety.loading
  );

  const stressMes: Item[] = useSelector(
    (state: RootState) => state.safetyRoot.stress.items
  );

  const suggestedStressMes: Item[] = useSelector(
    (state: RootState) => state.suggestion.stressMe
  );

  useEffect(() => {
    dispatch(fetchSuggestedStressMe());
  }, [dispatch]);

  /** Navigation */
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleMenuClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      {loading && <Loader />}
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.header}>
            <IconButton
              style={{ padding: '0' }}
              onClick={() => history.push('/safety')}>
              <ArrowBackIos className={classes.backArrow} />
            </IconButton>
            <span className={classes.headerText}>Things that stress me</span>
            <IconButton
              className={classes.moreIcon}
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}>
              <MoreVert fontSize="large" style={{ fill: '#FFFFFF' }} />
            </IconButton>
            <ActionMenu
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              type="stress"
            />
            <img
              src="/images/safety/stress1.svg"
              alt=""
              className={classes.image1}
            />
            <img
              src="/images/safety/stress2.svg"
              alt=""
              className={classes.image2}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.navigation} />
        </Grid>
      </Grid>
      <Grid container className={classes.container2}>
        <Grid item xs={12}>
          <span className={classes.subTitle}>
            Things that may stress me or cause me to have difficulties managing
            my issues.
          </span>
        </Grid>
        <Grid item xs={12}>
          <ListItems items={stressMes} />
        </Grid>
        <Grid item xs={12}>
          {suggestedStressMes.map(item => {
            return <SuggestedItem item={item} />;
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default Stress;
