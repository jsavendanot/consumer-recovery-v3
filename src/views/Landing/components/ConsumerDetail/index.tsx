import React, { useState, useEffect, MouseEvent } from 'react';
import validate from 'validate.js';
import useRouter from 'common/utils/useRouter';

import {
  IconButton,
  Dialog,
  DialogContent,
  useMediaQuery,
  Hidden,
  Grid,
  Menu,
  MenuItem,
  Theme
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { ArrowForward, ArrowDropDown } from '@material-ui/icons';

import { Button, UseJiembaFor } from 'common/components';
import SignupIdentity from '../SignupIdentity';

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
    padding: '0 22px'
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
    height: '650px',
    padding: '37px 15px 20px',
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

const ConsumerDetail: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();

  /** Dialog to Identify user*/
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  /** Dialog to show How it works */
  /** Theme */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  /** Dialog */
  const [open2, setOpen2] = useState(false);
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
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

  const signupIdentityDialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <SignupIdentity click={() => history.push('/auth')} />
      </DialogContent>
    </Dialog>
  );

  const howConsumerWorksDialog = (
    <Dialog
      open={open2}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleClose2}>
      <DialogContent style={{ padding: '0' }}>
        <UseJiembaFor close={handleClose2} />
      </DialogContent>
    </Dialog>
  );

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img
          src="/images/landing/header_logo.svg"
          alt=""
          onClick={() => history.push('/')}
        />
        <Hidden mdUp>
          <img
            src="/images/landing/header_icon_menu.svg"
            alt=""
            onClick={handleClickOpen2}
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
            Create a happier,
            <br />
            balanced and
            <br />
            fulfilling lifestyle
          </span>
          <span className={classes.desc}>
            Navigate your life, stay focused on the
            <br />
            things that matter most, and make daily
            <br />
            progress towards your goals.
          </span>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <img
              src="/images/landing/detail/detail_image1.svg"
              alt=""
              style={{ position: 'relative', right: '-22px', top: '-15px' }}
            />
          </div>
          <div className={classes.getStart}>
            <span className={classes.getStartTitle}>Get started now</span>
            <div style={{ width: '100%', padding: '20px 0' }}>
              <Button type="primary" click={() => history.push('/auth')}>
                Sign up to get started
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
              <span
                className={classes.socialText}
                onClick={() => history.push('/auth')}>
                Already have an account?
              </span>
              <span
                className={classes.loginText}
                onClick={() => history.push('/auth')}>
                Log in.
              </span>
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
                Create a happier,
                <br />
                balanced and
                <br />
                fulfilling lifestyle
              </span>
              <span className={classes.desc}>
                Navigate your life, stay focused on the
                <br />
                things that matter most, and make daily
                <br />
                progress towards your goals.
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginLeft: '5%'
              }}>
              <img
                src="/images/landing/detail/detail_image1.svg"
                alt=""
                style={{ position: 'relative', right: '-22px', top: '-15px' }}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '5% 0'
            }}>
            <div className={classes.getStart}>
              <span className={classes.getStartTitle}>Get started now</span>
              <div style={{ width: '100%', padding: '20px 0' }}>
                <Button type="primary" click={() => history.push('/auth')}>
                  Sign up to get started
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
                <span
                  className={classes.socialText}
                  onClick={() => history.push('/auth')}>
                  Already have an account?
                </span>
                <span
                  className={classes.loginText}
                  onClick={() => history.push('/auth')}>
                  Log in.
                </span>
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
          <img src="/images/landing/detail/detail_image2.svg" alt="" />
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
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAOCAMAAAAPOFwLAAAAS1BMVEUAAAAAAAA5VVU7Tk43SUkwQFA8S0s1RFM4SFA2R084R083SE43R083R083Rk44R082R044R1A3R083R083R083R083R083R0/////q3qdhAAAAF3RSTlMAAQkNDhARIoCIl5mhoqOlqarp8fL09aKG31QAAAABYktHRBibaYUeAAAAXklEQVQY083QuRKCABRD0YCSIIIL2/3/P7VwLCgetae9Mymi6zBTmIeLnpx4aIN7ATYBam3brWzb1g8gQD0Avb6Lf5WdJLGSJDnkHW4F2PU+e+0lT2sVl7GT1LjQSB/EUBdH7JzOkwAAAABJRU5ErkJggg=="
                alt=""
                style={{ marginTop: '80px' }}
              />
              <span className={classes.controlTitle}>
                See instant progress of your goals
              </span>
              <span className={classes.controlDesc}>
                View instant progress on your goals
                <br />
                whenever you complete a task. You will
                <br />
                be able to easily track your time and the
                <br />
                action completed for your goal.
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
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAaCAMAAACTisy7AAAA1VBMVEUAAAAAAAAAgIBVVVUzM2YrVVVJSUlAQEA5VVUzTU0uRkY3SUk3SVI1Rk8zRE04SFA1RFM6SVA5R042SlE0SE41RVA4R003RlA5Rk82R084R044R1A3SE44Rk43R083R084SFA3R083Rk42R044R1A3R1A4Rk83R083R082SE84R043Rk83R042R083SE83R083SFA3R083R083R1A3R082R083SE43R083R083R083R083R083Rk83R083R083R083R083R083R082R083R083R0////8Sc1rxAAAARXRSTlMAAQIDBQYHCAkKCw4cHR4gIiMkJicwMjM6PYmTmZyen6Cho6mqra6vsbKztba3ubu9v8ba29zd3t/g4uPk5e3u7/L0+PlJZMuMAAAAAWJLR0RGF7r57QAAALlJREFUKM/NkdcOgkAURBdpoqiIXbFj712wK/P/vySIm6wm67PzdG9OZnJ3lniwCFdA/W9gth3nwswJS4UDzSNgiywUBToZLtCR2Fh52IiEU3IHjBT2IHkA1F40sQXGCnut3Ievqp+sb4CJyj4l8DlnoCLoa+qjMPA5qcIVsFbAVGVLkHqAaxCSvwTZsyjbkNANGSHFGzDXPutr4pAO19J9oX11K5ZNuudif/rZb7i3OWoR/BDx+OzxBHx3NySneEKnAAAAAElFTkSuQmCC"
                alt=""
                style={{ marginTop: '80px' }}
              />
              <span className={classes.controlTitle}>
                Monitor your mood and progress
              </span>
              <span className={classes.controlDesc}>
                Log in regularly to update your progress
                <br />
                and write in your journal. Record all the
                <br />
                ups and downs and reflect on your
                <br />
                journey whenever you open Jiemba.
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
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAeCAMAAADqx5XUAAAAS1BMVEUAAAA9SVU4SFA5R042R042RlE4Rk82SE44SFA4Rk84SFA3R083R042R083Rk84R1A3R1A4R083R083R083R083R083R083R0////9Bzp5xAAAAF3RSTlMAFUBIS0xNVWB7gIGChJWqury+8fLz9UT3fokAAAABYktHRBibaYUeAAAAVklEQVQoz+3MWw5AMAAF0evZepYqs/+d+iEiWhtgfk8ykso5cC/X0cCj02rS5uOWO+e0xs0C4rev2taYe9llrZ5ZQAG6lPnI0xgzAqpIJvUvpmJa4rYDips5LUKB8KsAAAAASUVORK5CYII="
                alt=""
                style={{ marginTop: '80px' }}
              />
              <span className={classes.controlTitle}>Write your story</span>
              <span className={classes.controlDesc}>
                Understand yourself more by writing your
                <br />
                story and identifying your strengths.
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
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAABO1BMVEUAAAAAAAAAgIBVVVVAQEAzM2ZJSUlAQEA9SVU6RlE3Q047RU45TEw2SlE0SE45Rk04RFE5Sk83SE42R1E1RVA4R002RU41SE05R1A1Rk45SVE4SFA3R041SFA4R083Rk43RVA2SE82R084Rk84SE43R1A3R082Rk44SFA3R083R043RlA2R084R083RlA2R082R044R083Rk83SE43R083R083R084R1A3SE83R084R043R083R042R083R083SE83R1A4R083SE82R083R083Rk83R083R083R083R1A3R083R043R083Rk84R083R083SE43R083R083R084R083R083R083Rk83R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R0/////LYyqnAAAAZ3RSTlMAAQIDBAUHCBUWFxobJicoKS0uLzAyNDU2Pj9AQUNERUZHent8fX5/gIGCg4SFhoiWl5iZmqGiqquss7S2t7i5urzExcbHyMnMzc/Q0dLT1N3e3+Dh4uPk5ebn7e7v8PHy8/T19/z+WihyYAAAAAFiS0dEaMts9CIAAAIASURBVBgZfcELP1pxAMfhX9JpMZeJSa4zxmYnk+TSkGIXyW2mFXIp5/v+38H+p051+Ph4Hvl0T9nZP7fcnu9+nQzqJT2JCh0VO6LnwvM1jOvc+tp67hqjNmfpiYEjoLwYDcgVGFr4BxT65ROvYhQDavuJcT+ttvE6DTNqmaChHpdnoEpTVi0Zmqr9aggf4XGiUvhtWBp08BQsueZpy6ZKwGUyQ9tHGT01XvMQkZTAr5hcThbxs6XuCqVfeHLv5RrN4ymUKQc1BZ80kXEw1kJqCqUxnN1pLcKEbBiSNJiBXEgtoTxsD0mKwpKyXAVkJGFUHTH4JiNwzY7OyclVoii/Ey7kynOqezZkhB2S8kvhWDI2udMjazJ6ISG/BPTKSPOoezZkWA6r8kvhWDI2udM5ObkuOZbfCZdy7XOqLFcBGSswqo4YrMroumZHNkQlvfsO+ZBaQvuwG5U0DEuahAVNbjsY6ZCaQmlc2Rl9hnF1Vyj9xpOPyRXbx1MoUw5KNn7HqeXUCX62pEiN1zxEZMzRtpf8C1ysbNE2K5dVoGVEsnotadDBc2ipob9K055atmi66ZMnXqfhg1riNNTH1BavYhQDavuBcTMmn/5DoLw43CVX18hSBTjs0xPW7APGzcF6euOgivEwa+m5iF2mo2y/0UuCE0s7Z1WqZztfxoPq+A9bFemmCj938gAAAABJRU5ErkJggg=="
                alt=""
                style={{ marginTop: '80px' }}
              />
              <span className={classes.controlTitle}>
                Create your safety plan
              </span>
              <span className={classes.controlDesc}>
                Your safety plan reminds you what you
                <br />
                can do to stay well and your coping
                <br />
                strategies when things don’t go according
                <br />
                to plan.
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
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAcCAMAAADY3iYuAAABX1BMVEUAAAAAAAAAgIBVVVVAQEAzM2YrVVVJSUk5VVUzTU1AQFU7Tk4zRFUwQFA8S0s5R1UzTU09SVU7RU41Rk82Rk01RFM6SVA0SE45Rk03SU82R1E5SU44R003RlA2RU45R1A4Rk83SU05Rk82R085SVE2Rk03Rk44RlA3SE82R084Rk43R083Rk44R084R043RlA2SE82R044RlA3SE83R084SE83R044SE43R1A3Rk82SE42R1A4R083Rk82R083R1A3R084SFA3Rk82SE83R083Rk42SE84R083Rk82R044R1A3R083R1A3R084R082Rk43R043SE83R083Rk83R083SE83R082R083R083R083R083R083R1A3R082R083R084R083R083R083Rk83R083R083R083R083R083R083R083R083R083R083R082R083R083R083R083R0////85Y3QdAAAAc3RSTlMAAQIDBAUGBwkKDA0PEBESFBUaHSEiIycoKi8xMjM0Njc4Oj0/QkVJSlpbYWJkZWZnaGlqa25vcnN0dXZ3eHp9foCKkp6jpKWnqaqvsLu8wMPExsfIy8zO1dbX2Nrb3ODh4uPk5ujr7e7v8PHz9ff4+fv8qTS9DAAAAAFiS0dEdN9tqG0AAAGASURBVCjPfZPpV9NQFMSnBUtjRYFQFEGwgFAWiwYXFhVQdpB9X5O6NNLGVH///zl+aCmlaZwvc+6beXd55z6pgs6J1QPb8+yD1YlOBXF//JgqXH5ovqtHLJcauFakymBuArjLVo9pxM0ea9kF2DQrhg4bOB6L316Jj50Adkc5TGbBn43drRub8yGblCRFt6EwGOx9IA97DZI0Cf7zOtMp5cOkpMR1ietgGvIPpAxcROs7oheQkTZgWgpNsiHZ8ExS+ls2HaBusKXf8EiSA9kANYMv5eHh/x2n0CVpyHGGAtQNV9IafAzrdAbWpWE4vxcy7SW8lBI/YSo0xXVC0jso9tcz9BXhvSTFdsF9GjS8KMBO6bXbfsBird40XwSnvRQkcpCWWhtvdSNzBtjJcvgJTqKR0Xxu7W3KNAyz983KL4CvN1uY9GA4tVW7yblXN5vctAd/j2r1M8uolPxSPvvzuctaOnI872p/5fWT6qZLH6W48Djs6TVX+H64NNISqusf6KeLiz3L0IkAAAAASUVORK5CYII="
                alt=""
                style={{ marginTop: '80px' }}
              />
              <span className={classes.controlTitle}>
                Share with your network
              </span>
              <span className={classes.controlDesc}>
                Share your recovery plan with your choice
                <br />
                of people and/or services and make it
                <br />
                easier for them to support you.
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
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAfCAMAAAA7p6b/AAAA4VBMVEUAAAAAgIBVVVVAQEArVVVJSUkzTU0uRkY7Tk43SUkzTU06RlE6SVA5R043RUw2SlE5Rk04RFE1R004RU43SFE4R083Rk43Rk82R084Rk42SFA4R082R044SE82SE44R083Rk83R083RlA3SE84SE84Rk43R1A4R1A3SE83R083R083R1A3R082SE84R044R083SE82R083R083R083Rk83R083R083SE43R083R083R084R083R083R083R083R082R043R083R083R082R083R083R083R083R083R0////+l4nnaAAAASXRSTlMAAgMEBgcKCw0OFBYjJCUmKCkrOzxERVRaW2NkbG51d3h+hoeOnJ2qq6yvsLGys7zLzs/R0tfZ3d7f4OHi4+Xm6uzt8fj5+vz+n0nNJQAAAAFiS0dESh4MtcYAAADXSURBVCjPvZDXEoIwEEVXbNh7L9h7b9gQu+z//5CrIMqwz96XnJxkNncCoEfIjdSbOso6wJLIHPXMwr86dsZPTtGvdq9e5na4v5aly/Ql2j5qIoj1B1HR9FPald9UIZp8tFdD3Al6LQVR8xg+RJcGBg+JgwbHidsGt4nj//BCRmoQLyQ9C+KGlHFAC7k04cr6KyCfr9d61R7n81SiYPezd825zXfN+lZ/FEk7t/b54wD4O8y7mIAk29MHPo3xa5q/YXyf/IDxF1mWL9y71v9RWL2HNHegpJ5+poXxNiDaQAAAAABJRU5ErkJggg=="
                alt=""
                style={{ marginTop: '80px' }}
              />
              <span className={classes.controlTitle}>Control your privacy</span>
              <span className={classes.controlDesc}>
                Jiemba makes sure you have complete
                <br />
                control of what you want to share and
                <br />
                who you want to share with.
              </span>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.section4}>
        <div
          className={classes.userSection}
          onClick={() => history.push('/auth')}>
          <img
            src="/images/landing/consumer.svg"
            alt=""
            style={{ marginRight: '16px', width: '114px', height: '114px' }}
          />
          <span className={classes.userText1}>
            Sign up to create a recovery plan
          </span>
          <IconButton style={{ padding: '0', marginLeft: '10px' }}>
            <ArrowForward fontSize="large" style={{ fill: '#003E1F' }} />
          </IconButton>
        </div>
      </div>
      <div className={classes.footer}>
        <img src="/images/landing/footer_logo.svg" alt="" />
        <Grid container>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <div className={classes.footerContent}>
              <span
                className={classes.footerText}
                onClick={() => history.push('/auth')}>
                Sign Up
              </span>
              <span
                className={classes.footerText}
                onClick={() => history.push('/auth')}>
                Sign In
              </span>
            </div>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <div className={classes.footerContent}>
              <span className={classes.footerContentTitle}>How it works</span>
              <span
                className={classes.footerText}
                onClick={() => history.push('/')}>
                Create A Recovery Plan
              </span>
              <span
                className={classes.footerText}
                onClick={() => history.push('/home/carer')}>
                Access Other's Recovery Plan
              </span>
            </div>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <div className={classes.footerContent}>
              <span className={classes.footerContentTitle}>Information</span>
              <span className={classes.footerText}>About Us</span>
              <span className={classes.footerText}>Privacy</span>
              <span className={classes.footerText}>FAQ</span>
            </div>
          </Grid>
        </Grid>
      </div>
      {open && signupIdentityDialog}
      {open2 && howConsumerWorksDialog}
    </div>
  );
};

export default ConsumerDetail;
