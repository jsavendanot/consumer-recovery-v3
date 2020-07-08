import React, { useState, ChangeEvent, MouseEvent } from 'react';
import useRouter from 'common/utils/useRouter';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { Unwell as UnwellType } from 'types/safety';

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  IconButton,
  Divider,
  Tabs,
  Tab,
  colors,
  Theme
} from '@material-ui/core';
import { MoreVert, ArrowBackIos, Block, CheckCircle } from '@material-ui/icons';
import { ActionMenu } from '../components';

import { Loader } from 'common/components';
import PleaseDo from './PleaseDo';
import DontDo from './DontDo';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    background: '#FFE566',
    padding: '20px 20px',
    height: '280px',
    position: 'relative'
  },
  navigation: {
    background: '#FFE566',
    height: '60px'
  },
  container: {
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
    bottom: '-22%',
    [theme.breakpoints.up('xs')]: {
      right: '10%',
      height: 180
    },
    [theme.breakpoints.up('sm')]: {
      right: '20%'
    },
    [theme.breakpoints.up('md')]: {
      right: '30%'
    },
    [theme.breakpoints.up('lg')]: {
      right: '30%'
    }
  },
  image1: {
    position: 'absolute',
    bottom: '-20%',
    [theme.breakpoints.up('xs')]: {
      left: '10%',
      height: 120
    },
    [theme.breakpoints.up('sm')]: {
      left: '20%'
    },
    [theme.breakpoints.up('md')]: {
      left: '30%'
    },
    [theme.breakpoints.up('lg')]: {
      left: '30%'
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
    lineHeight: '23px',
    color: '#323F45'
  },
  tabs: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#fa9419'
    }
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  },
  text: {
    fontFamily: 'Tajawal',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#006633',
    textTransform: 'capitalize'
  },
  tabsContainer: {
    padding: '0px 20px 20px'
  },
  flexTabContent: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const Unwell = () => {
  const classes = useStyles();
  const { history } = useRouter();

  const loading: boolean = useSelector(
    (state: RootState) => state.safetyRoot.safety.loading
  );

  const pleaseDo: UnwellType[] = useSelector(
    (state: RootState) => state.safetyRoot.unwell.pleaseDo
  );

  const doNotDo: UnwellType[] = useSelector(
    (state: RootState) => state.safetyRoot.unwell.doNotDo
  );

  const [tab, setTab] = useState('pleasedo');

  const tabs = [
    {
      value: 'pleasedo',
      label: 'Please do',
      logo: <CheckCircle style={{ fill: '#41C04E', marginRight: '5px' }} />
    },
    {
      value: 'dontdo',
      label: 'Do not do',
      logo: <Block style={{ fill: '#B50000', marginRight: '5px' }} />
    }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string) => {
    value === 'pleasedo' ? setTab('pleasedo') : setTab('dontdo');
  };

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
              If I become unwell, I would like others to...
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
              type="unwell"
            />
            <img
              src="/images/safety/unwell2.svg"
              alt=""
              className={classes.image}
            />
            <img
              src="/images/safety/unwell1.svg"
              alt=""
              className={classes.image1}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.navigation} />
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <span className={classes.subTitle}>
            If I become unwell I would like these to happen or not happen
          </span>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.tabsContainer}>
            <Tabs
              className={classes.tabs}
              onChange={handleTabsChange}
              scrollButtons="auto"
              value={tab}
              variant="scrollable">
              {tabs.map(tab => (
                <Tab
                  key={tab.value}
                  label={
                    <span className={classes.text}>
                      <div className={classes.flexTabContent}>
                        {tab.logo}
                        {tab.label}
                      </div>
                    </span>
                  }
                  value={tab.value}
                />
              ))}
            </Tabs>
            <Divider className={classes.divider} />
            <div className={classes.content}>
              {tab === 'pleasedo' && <PleaseDo pleaseDo={pleaseDo} />}
              {tab === 'dontdo' && <DontDo doNotDo={doNotDo} />}
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Unwell;
