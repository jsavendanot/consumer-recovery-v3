import React, { useState, useEffect, MouseEvent } from 'react';
import validate from 'validate.js';
import useRouter from 'common/utils/useRouter';

import {
  IconButton,
  Button,
  Dialog,
  DialogContent,
  useMediaQuery,
  Hidden,
  Menu,
  MenuItem,
  Grid,
  Theme
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { ArrowForward, ArrowDropDown } from '@material-ui/icons';

import { HowCarerWorks } from './components';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '25px 15px 15px',
    backgroundColor: '#DEF3FF'
  },
  headerMenuText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#73BA9B'
  },
  headerMenuItemText: {
    fontFamily: 'Scada',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#B7C38C'
  },
  menuBox: {
    display: 'flex',
    alignItems: 'center'
  },
  section1: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#DEF3FF',
    padding: '0 22px',
    position: 'relative'
  },
  section3: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#DEF3FF',
    padding: '5% 22px',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center'
    },
    [theme.breakpoints.up('md')]: {
      alignItems: 'center'
    },
    [theme.breakpoints.up('lg')]: {
      alignItems: 'center'
    },
    [theme.breakpoints.up('xl')]: {
      alignItems: 'center'
    }
  },
  section4: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '51px 18px',
    backgroundColor: '#DEF3FF'
  },
  footer: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: '675px',
    padding: '37px 15px',
    backgroundColor: '#424135',
    [theme.breakpoints.up('sm')]: {
      height: '450px'
    },
    [theme.breakpoints.up('md')]: {
      height: '330px'
    },
    [theme.breakpoints.up('lg')]: {
      height: '330px'
    },
    [theme.breakpoints.up('xl')]: {
      height: '330px'
    }
  },
  titleSection1: {
    fontFamily: 'Scada',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: '36px',
    lineHeight: '40px',
    color: '#37474F',
    textAlign: 'left',
    marginTop: '39px',
    [theme.breakpoints.up('lg')]: {
      fontSize: '55px',
      lineHeight: '61px'
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '55px',
      lineHeight: '61px'
    }
  },
  desc: {
    fontFamily: 'Scada',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '22px',
    color: '#37474F',
    textAlign: 'left',
    margin: '20px 0 34px',
    [theme.breakpoints.up('md')]: {
      fontSize: '24px',
      lineHeight: '28px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '24px',
      lineHeight: '28px'
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '24px',
      lineHeight: '28px'
    }
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#003E1F',
    textAlign: 'left'
  },
  jiemba_2: {
    position: 'absolute',
    bottom: '-73px'
  },
  titleSection3: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '34px',
    lineHeight: '40px',
    color: '#37474F',
    textAlign: 'left',
    marginTop: '47px'
  },
  controller: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  controlTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '25px',
    color: '#37474F',
    marginTop: '26px',
    marginBottom: '19px'
  },
  controlDesc: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#37474F'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '35px 0'
  },
  userText1: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '22px',
    lineHeight: '27px',
    color: '#003E1F'
  },
  userText2: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '22px',
    lineHeight: '27px',
    color: '#175BA5'
  },
  footerContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0'
  },
  footerText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '30px',
    color: '#B7C38C',
    margin: '8px 10px'
  },
  footerContentTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '30px',
    color: 'rgba(183, 195, 140, 0.4)',
    margin: '8px 10px'
  },
  copyright: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#B7C38C',
    width: '100%',
    textAlign: 'right'
  },
  getStart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '15px 0',
    [theme.breakpoints.up('sm')]: {
      width: '400px'
    },
    [theme.breakpoints.up('md')]: {
      width: '400px'
    },
    [theme.breakpoints.up('lg')]: {
      width: '400px'
    },
    [theme.breakpoints.up('xl')]: {
      width: '400px'
    }
  },
  getStartTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '40px',
    color: '#37474F',
    marginBottom: '12.5px'
  },
  formGroup: {
    padding: '7.5px 0',
    width: '100%'
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: '5px'
  },
  socialContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '10px 30px'
  },
  socialText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F'
  },
  loginText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#37474F'
  },
  button: {
    width: '100%',
    height: '50px',
    boxSizing: 'border-box',
    borderRadius: '25px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    cursor: 'pointer',
    border: 'none',
    color: '#FFFFFF',
    backgroundColor: '#175BA5',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#175BA5'
    },
    '&:active': {
      backgroundColor: '#175BA5'
    }
  }
}));

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 124
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  retypedPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    email?: string;
    password?: string;
    retypedPassword?: string;
  };
  touched: {
    email?: boolean;
    password?: boolean;
    retypedPassword?: boolean;
  };
  errors: {
    email?: string[];
    password?: string[];
    retypedPassword?: string[];
  };
};

const CarerDetail: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();

  /** Theme */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  /** Dialog */
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  /** Header menus */
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (id: string) => {
    if (id === 'carer') {
      history.push('/home/carer');
    }
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = useState<Element | null>(null);

  const handleClick2 = (event: MouseEvent) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose2 = () => {
    setAnchorEl2(null);
  };

  const handleClickCarerSignup = () => {
    window.location.href = 'https://carer-d3351.firebaseapp.com';
  };

  const howCarerWorksDialog = (
    <Dialog
      open={open}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleClose}>
      <DialogContent style={{ padding: '0' }}>
        <HowCarerWorks close={handleClose} />
      </DialogContent>
    </Dialog>
  );

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img
          src="/images/landing/carer/logo.svg"
          alt=""
          onClick={() => history.push('/')}
        />
        <Hidden mdUp>
          <img
            src="/images/landing/header_icon_menu.svg"
            alt=""
            onClick={handleClickOpen}
          />
        </Hidden>
        <Hidden smDown>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div style={{ marginRight: '50px' }}>
              <div className={classes.menuBox} onClick={handleClick}>
                <span className={classes.headerMenuText}>How It Works</span>
                <ArrowDropDown
                  style={{ fill: '#73BA9B', marginLeft: '10px' }}
                />
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleMenuClose('')}>
                <MenuItem onClick={() => handleMenuClose('')}>
                  <span className={classes.headerMenuItemText}>
                    Create A Recovery Plan
                  </span>
                </MenuItem>
                <MenuItem onClick={() => handleMenuClose('carer')}>
                  <span className={classes.headerMenuItemText}>
                    Access Other's Recovery Plan
                  </span>
                </MenuItem>
              </Menu>
            </div>
            <div style={{ marginRight: '50px' }}>
              <div className={classes.menuBox} onClick={handleClick2}>
                <span className={classes.headerMenuText}>Information</span>
                <ArrowDropDown
                  style={{ fill: '#73BA9B', marginLeft: '10px' }}
                />
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleMenuClose2}>
                <MenuItem onClick={handleMenuClose2}>
                  <span className={classes.headerMenuItemText}>About Us</span>
                </MenuItem>
                <MenuItem onClick={handleMenuClose2}>
                  <span className={classes.headerMenuItemText}>Privacy</span>
                </MenuItem>
                <MenuItem onClick={() => handleMenuClose('')}>
                  <span className={classes.headerMenuItemText}>FAQ</span>
                </MenuItem>
              </Menu>
            </div>
            <span
              className={classes.headerMenuText}
              style={{ marginRight: '50px' }}
              onClick={() => history.push('/auth')}>
              Sign In
            </span>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '96px',
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                marginRight: '20px',
                padding: '5px'
              }}>
              <span
                className={classes.headerMenuText}
                onClick={() => history.push('/auth')}>
                Sign Up
              </span>
            </div>
          </div>
        </Hidden>
      </div>
      <Hidden smUp>
        <div className={classes.section1}>
          <span className={classes.titleSection1}>
            Be part of the
            <br />
            support network
            <br />
            for someone you
            <br />
            care about
          </span>
          <span className={classes.desc}>
            Access the recovery plan of
            <br />
            those you care about and
            <br />
            encourage them through
            <br />
            the ups and downs of their
            <br />
            journey.
          </span>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <img
              src="/images/landing/carer/carer.svg"
              alt=""
              style={{ position: 'absolute', right: '0', top: '200px' }}
            />
          </div>
          <div className={classes.getStart}>
            <span className={classes.getStartTitle}>Become a carer</span>
            <div style={{ width: '100%', padding: '20px 0' }}>
              <Button
                className={classes.button}
                onClick={handleClickCarerSignup}>
                Sign up to be a carer
              </Button>
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '15px 0'
              }}>
              <span className={classes.socialText}>
                Already have an account?
              </span>
              <span className={classes.loginText}>Log in.</span>
            </div>
          </div>
        </div>
      </Hidden>
      <Hidden xsDown>
        <div className={classes.section1}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginRight: '5%'
              }}>
              <span className={classes.titleSection1}>
                Be part of the support network
                <br />
                for someone you care about
              </span>
              <span className={classes.desc}>
                Access the recovery plan of
                <br />
                those you care about and
                <br />
                encourage them through
                <br />
                the ups and downs of their
                <br />
                journey.
              </span>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <img
                  src="/images/landing/carer/carer.svg"
                  alt=""
                  style={{ position: 'absolute', right: '0', top: '200px' }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '30px'
            }}>
            <div className={classes.getStart}>
              <span className={classes.getStartTitle}>Become a carer</span>
              <div style={{ width: '100%', padding: '20px 0' }}>
                <Button
                  className={classes.button}
                  onClick={handleClickCarerSignup}>
                  Sign up to be a carer
                </Button>
              </div>
              {/* <div className={classes.socialContainer}>
                <span className={classes.socialText}>or Sign Up with</span>
                <img src="/images/landing/facebook.svg" alt="" />
                <img src="/images/landing/google.svg" alt="" />
              </div> */}
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: '15px 0'
                }}>
                <span className={classes.socialText}>
                  Already have an account?
                </span>
                <span className={classes.loginText}>Log in.</span>
              </div>
            </div>
          </div>
        </div>
      </Hidden>
      <div className={classes.section3}>
        <span className={classes.titleSection3}>How it works</span>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '40px'
          }}>
          <img src="/images/landing/carer/kirra.svg" alt="" />
        </div>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={classes.controller}>
              <img
                src="/images/landing/carer/monitor.svg"
                alt=""
                style={{ marginTop: '80px' }}
              />
              <span className={classes.controlTitle}>
                Monitor their journey
              </span>
              <span className={classes.controlDesc}>
                Use the dashboard to have a snapshopt
                <br />
                of their overall progress, or access their
                <br />
                goals and journals to keep track on their
                <br />
                recovery journey.
              </span>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={classes.controller}>
              <img
                src="/images/landing/carer/share.svg"
                alt=""
                style={{ marginTop: '80px' }}
              />
              <span className={classes.controlTitle}>Leave your feedback</span>
              <span className={classes.controlDesc}>
                Cheer for them when they are making
                <br />
                progress; Support them when things are
                <br />
                not going well
              </span>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={classes.controller}>
              <img
                src="/images/landing/carer/write.svg"
                alt=""
                style={{ marginTop: '80px' }}
              />
              <span className={classes.controlTitle}>See their story</span>
              <span className={classes.controlDesc}>
                Understand them more by accessing their
                <br />
                story, strengths and focus area.
              </span>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={classes.controller}>
              <img
                src="/images/landing/carer/safety.svg"
                alt=""
                style={{ marginTop: '80px' }}
              />
              <span className={classes.controlTitle}>
                Access their safety plan
              </span>
              <span className={classes.controlDesc}>
                See their warning signs and know what to
                <br />
                do and not do when they are unwell.
              </span>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={classes.controller}>
              <img
                src="/images/landing/carer/notified.svg"
                alt=""
                style={{ marginTop: '80px' }}
              />
              <span className={classes.controlTitle}>Get notified</span>
              <span className={classes.controlDesc}>
                Receive notifications when there are new
                <br />
                activities and always be in time to show
                <br />
                your support.
              </span>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={classes.controller}>
              <img
                src="/images/landing/carer/invited.svg"
                alt=""
                style={{ marginTop: '80px' }}
              />
              <span className={classes.controlTitle}>
                Be invited or invite others
              </span>
              <span className={classes.controlDesc}>
                There are two ways to connect with
                <br />
                people who's care you are involved in:
                <br />
                1. Be invited by a recovery plan
                <br />
                owner with a special invitation code.
                <br />
                2. Or, if you sign up without an invitation,
                <br />
                you can Invite others to start making
                <br />
                their recovery plan.
              </span>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.section4}>
        <div className={classes.userSection}>
          <img
            src="/images/landing/carer.svg"
            alt=""
            style={{ marginRight: '16px', width: '114px', height: '114px' }}
          />
          <span className={classes.userText2}>
            Sign up to access other’s recovery plan
          </span>
          <IconButton
            style={{ padding: '0', marginLeft: '10px' }}
            onClick={handleClickCarerSignup}>
            <ArrowForward fontSize="large" style={{ fill: '#175BA5' }} />
          </IconButton>
        </div>
      </div>
      <div className={classes.footer}>
        <img src="/images/landing/footer_logo.svg" alt="" />
        <Grid container>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <div className={classes.footerContent}>
              <span className={classes.footerText}>Sign Up</span>
              <span className={classes.footerText}>Sign In</span>
            </div>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <div className={classes.footerContent}>
              <span className={classes.footerContentTitle}>How it works</span>
              <span className={classes.footerText}>Create A Recovery Plan</span>
              <span className={classes.footerText}>
                Access Other's Recovery Plan
              </span>
            </div>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <div
              className={classes.footerContent}
              style={{ padding: '20px 0 5px' }}>
              <span className={classes.footerContentTitle}>Information</span>
              <span className={classes.footerText}>About Us</span>
              <span className={classes.footerText}>Privacy</span>
              <span className={classes.footerText}>FAQ</span>
            </div>
          </Grid>
        </Grid>
      </div>
      {open && howCarerWorksDialog}
    </div>
  );
};

export default CarerDetail;
