import React, { useState, MouseEvent, useEffect } from 'react';
import { RootState } from 'reducer';
import { Item } from 'types/safety';

import useRouter from 'common/utils/useRouter';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton, Theme } from '@material-ui/core';
import { MoreVert, ArrowBackIos } from '@material-ui/icons';
import { Loader } from 'common/components';
import { ActionMenu } from '../components';
import { ListItems, SuggestedItem } from './components';
import { fetchSuggestedStayWell } from 'slices/suggestion/safety/staywell/action';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    background: '#BDEEFF',
    padding: '20px 20px',
    height: '260px',
    position: 'relative'
  },
  navigation: {
    background: '#52CAFF',
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
    color: '#37474F',
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
  image: {
    position: 'absolute',
    top: '28%',
    left: '20%',
    height: 250,
    [theme.breakpoints.up('sm')]: {
      height: 300,
      left: '30%'
    },
    [theme.breakpoints.up('md')]: {
      height: 300,
      left: '40%'
    },
    [theme.breakpoints.up('lg')]: {
      height: 300,
      left: '40%'
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
    fill: '#4D3826'
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

const StayWell: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.safetyRoot.safety.loading
  );

  const staywells: Item[] = useSelector(
    (state: RootState) => state.safetyRoot.staywell.items
  );

  const suggestedStaywells: Item[] = useSelector(
    (state: RootState) => state.suggestion.stayWell
  );

  useEffect(() => {
    dispatch(fetchSuggestedStayWell());
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
            <span className={classes.headerText}>Things I do to stay well</span>
            <IconButton
              className={classes.moreIcon}
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}>
              <MoreVert fontSize="large" style={{ fill: '#003E1F' }} />
            </IconButton>
            <ActionMenu
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              type="staywell"
            />
            <img
              src="/images/safety/staywell.svg"
              alt=""
              className={classes.image}
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
            These are things that I can do to be and stay well
          </span>
        </Grid>
        <Grid item xs={12}>
          <ListItems items={staywells} />
        </Grid>
        <Grid item xs={12}>
          {suggestedStaywells.map(item => {
            return <SuggestedItem item={item} />;
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default StayWell;
