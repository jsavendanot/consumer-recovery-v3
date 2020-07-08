import React, { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import useRouter from 'common/utils/useRouter';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';

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
import { MoreVert, ArrowBackIos } from '@material-ui/icons/';
import { ActionMenu } from '../components';
import { Loader } from 'common/components';
import People from './People';
import Organisations from './Organisations';
import { fetchSuggestedUnwellNotice } from 'slices/suggestion/safety/contact/action';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    background: '#D5F2E3',
    padding: '20px 20px',
    position: 'relative',
    [theme.breakpoints.up('xs')]: {
      height: '260px'
    },
    [theme.breakpoints.up('sm')]: {
      height: '280px'
    },
    [theme.breakpoints.up('md')]: {
      height: '280px'
    },
    [theme.breakpoints.up('lg')]: {
      height: '330px'
    }
  },
  navigation: {
    background: '#D5F2E3',
    height: '30px'
  },
  container2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('xs')]: {
      padding: '30px 20px 20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '30px 10% 20px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '30px 10% 20px'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '30px 20% 20px'
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
  image1: {
    position: 'absolute',
    [theme.breakpoints.up('xs')]: {
      left: '1%',
      bottom: '-12%',
      height: 150
    },
    [theme.breakpoints.up('sm')]: {
      left: '10%',
      bottom: '-12%',
      height: 180
    },
    [theme.breakpoints.up('md')]: {
      left: '15%',
      bottom: '-5%'
    },
    [theme.breakpoints.up('lg')]: {
      left: '25%',
      bottom: '-5%'
    }
  },
  image3: {
    position: 'absolute',
    [theme.breakpoints.up('xs')]: {
      left: '34%',
      bottom: '-14%',
      height: 70
    },
    [theme.breakpoints.up('sm')]: {
      left: '40%',
      bottom: '-13%',
      height: 80
    },
    [theme.breakpoints.up('md')]: {
      left: '40%',
      bottom: '-5%'
    },
    [theme.breakpoints.up('lg')]: {
      left: '45%',
      bottom: '-5%'
    }
  },
  image2: {
    position: 'absolute',
    [theme.breakpoints.up('xs')]: {
      right: '1%',
      bottom: '-12%',
      height: 150
    },
    [theme.breakpoints.up('sm')]: {
      right: '15%',
      bottom: '-12%',
      height: 180
    },
    [theme.breakpoints.up('md')]: {
      right: '20%',
      bottom: '-5%'
    },
    [theme.breakpoints.up('lg')]: {
      right: '25%',
      bottom: '-5%'
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
  }
}));

const Service: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.safetyRoot.safety.loading
  );

  const [tab, setTab] = useState('people');

  const tabs = [
    { value: 'people', label: 'People' },
    { value: 'services', label: 'Services' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string) => {
    value === 'people' ? setTab('people') : setTab('services');
  };

  /** Navigation */
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleMenuClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(fetchSuggestedUnwellNotice());
  }, [dispatch]);

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
              People or services who I can contact
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
              type="service"
            />
            <img
              src="/images/safety/service1.svg"
              alt=""
              className={classes.image1}
            />
            <img
              src="/images/safety/service2.svg"
              alt=""
              className={classes.image2}
            />
            <img
              src="/images/safety/service3.svg"
              alt=""
              className={classes.image3}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.navigation} />
        </Grid>
      </Grid>
      <Grid container className={classes.container2}>
        <Grid item xs={12}>
          <div>
            <span className={classes.subTitle}>
              People or services who I can contact for support if I need
              immediate help.
            </span>
          </div>
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
                  label={<span className={classes.text}>{tab.label}</span>}
                  value={tab.value}
                />
              ))}
            </Tabs>
            <Divider className={classes.divider} />
            <div className={classes.content}>
              {tab === 'people' && <People />}
              {tab === 'services' && <Organisations />}
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Service;
