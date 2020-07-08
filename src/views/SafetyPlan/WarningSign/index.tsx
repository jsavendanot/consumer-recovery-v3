import React, { MouseEvent, useState, useEffect } from 'react';
import useRouter from 'common/utils/useRouter';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { Item } from 'types/safety';

import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton, Theme } from '@material-ui/core';
import { MoreVert, ArrowBackIos } from '@material-ui/icons';
import { Loader } from 'common/components';
import { ActionMenu } from '../components';
import Difficulties from './Difficulties';
import { fetchSuggestedWarningSigns } from 'slices/suggestion/safety/warning/action';
import Strategies from './Strategies';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    background: '#FFE566',
    padding: '20px 20px',
    height: '260px',
    position: 'relative',
    [theme.breakpoints.up('lg')]: {
      height: '330px'
    }
  },
  navigation: {
    position: 'relative',
    background: '#FFE566',
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
    top: '48%',
    [theme.breakpoints.up('xs')]: {
      left: '15%',
      height: 90
    },
    [theme.breakpoints.up('sm')]: {
      left: '20%',
      height: 120
    },
    [theme.breakpoints.up('md')]: {
      left: '30%',
      height: 120
    },
    [theme.breakpoints.up('lg')]: {
      left: '30%',
      height: 150
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
  }
}));

const WarningSign: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.safetyRoot.safety.loading
  );

  const difficulties: Item[] = useSelector(
    (state: RootState) => state.safetyRoot.warning.difficulties
  );

  const strategies: Item[] = useSelector(
    (state: RootState) => state.safetyRoot.warning.strategies
  );

  useEffect(() => {
    dispatch(fetchSuggestedWarningSigns());
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
            <span className={classes.headerText}>
              Warning signs I may be having difficulty
            </span>
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
              type="warningsign"
            />
            <img
              src="/images/safety/warningsigns1.svg"
              alt=""
              className={classes.image}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container className={classes.container2}>
        <Grid item xs={12}>
          <Difficulties difficulties={difficulties} />
        </Grid>
        <Grid item xs={12}>
          <Strategies strategies={strategies} />
        </Grid>
      </Grid>
    </>
  );
};

export default WarningSign;
