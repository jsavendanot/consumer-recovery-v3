import React, { useState, useRef, MouseEvent, KeyboardEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import clsx from 'clsx';
import { Redirect } from 'react-router-dom';

import {
  Grid,
  Theme,
  IconButton,
  Hidden,
  MenuItem,
  Dialog,
  useTheme,
  useMediaQuery,
  DialogContent,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowDropDown, Menu as MenuIcon } from '@material-ui/icons';
import { UseJiembaFor } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#D5F2E3'
  },
  /** Header */
  header: {
    position: 'fixed',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '20px'
  },
  headerMenu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0',
    marginRight: 20
  },
  headerMenuText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#73BA9B',
    cursor: 'pointer',
    marginRight: '20px'
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#73BA9B',
    cursor: 'pointer',
    margin: '10px 0',
    [theme.breakpoints.up('sm')]: {
      fontSize: '24px',
      lineHeight: '127.69%'
    }
  },
  headerButton: {
    width: '109px',
    padding: '5px',
    border: '1.5px solid #73BA9B',
    boxSizing: 'border-box',
    borderRadius: '18px',
    color: '#73BA9B',
    background: '#FFEAEA',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#FFEAEA'
    },
    '&:active': {
      backgroundColor: '#FFEAEA'
    }
  },
  /** Image  */
  bottonImage: {
    marginTop: 65,
    [theme.breakpoints.up('xs')]: {
      width: 303,
      height: 200
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: 65,
      width: 379,
      height: 238
    },
    [theme.breakpoints.up('md')]: {
      width: 409,
      height: 268
    }
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '30px',
    color: '#4D3826',
    marginTop: 10,
    [theme.breakpoints.up('sm')]: {
      fontSize: '36px',
      lineHeight: '45px'
    }
  },
  firstRow: {
    marginBottom: '30px',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'flex-start'
    }
  },
  logo: {
    width: 200,
    height: 50,
    marginBottom: '20px',
    marginRight: '20px',
    [theme.breakpoints.up('sm')]: {
      width: 265,
      height: 65
    }
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInButton: {
    width: 151,
    height: 59,
    background: '#FFFFFF',
    borderRadius: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '50px',
    cursor: 'pointer',
    '&:hover': {
      color: '#FFFFFF',
      background: '#07914C',
      boxShadow:
        '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2)'
    },
    [theme.breakpoints.down('xs')]: {
      margin: '20px 0',
      height: 36,
      borderRadius: 18
    }
  },
  arrowDown: {
    fill: '#73BA9B'
  },
  middleGrid: {
    height: '200px',
    [theme.breakpoints.down('xs')]: {
      height: '120px'
    }
  },
  menuIcon: {
    fill: '#73BA9B'
  },
  headerMenuItemText: {
    fontFamily: 'Scada',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#73BA9B',
    '&:hover': {
      color: '#B7C38C'
    }
  },
  menuIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10
  }
}));

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

const Landing: React.FC<Props> = ({ history }) => {
  const classes = useStyles();

  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDialog, setOpenDialog] = useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleClose = (event: MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const [open2, setOpen2] = React.useState(false);
  const anchorRef2 = useRef<HTMLDivElement>(null);

  const handleClose2 = (event: MouseEvent<EventTarget>) => {
    if (
      anchorRef2.current &&
      anchorRef2.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen2(false);
  };

  function handleListKeyDown2(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen2(false);
    }
  }

  // Jorge Avendano Redirect straight to sign up page
  function redirectToB2C() {
    window.location.assign('https://aiaustraliab2c.b2clogin.com/aiaustraliab2c.onmicrosoft.com/b2c_1_signup/oauth2/v2.0/authorize?response_type=id_token&scope=https%3A%2F%2FAIAustraliaB2C.onmicrosoft.com%2Fapi%2Fuser_impersonation%20openid%20profile&client_id=a6cbdbad-8f34-46a2-bcf9-f2c865e354ce&redirect_uri=https%3A%2F%2Fjiemba.azurewebsites.net&state=72b9b378-7b5d-4018-9e63-861d12a1817c&nonce=b9de8c9c-2f5d-44d3-a0b9-2ae46db77591&client_info=1&x-client-SKU=MSAL.JS&x-client-Ver=0.2.4&client-request-id=8a96aa77-fda4-4c3b-b936-6351fa298914&response_mode=fragment');
  }

  const useJiembaForDialog = (
    <Dialog
      open={openDialog}
      keepMounted
      fullScreen={fullScreen}
      onClose={() => setOpenDialog(false)}>
      <DialogContent style={{ padding: '0' }}>
        <UseJiembaFor close={() => setOpenDialog(false)} />
      </DialogContent>
    </Dialog>
  );

  const clickMenuHandler = (menu: string) => {
    switch (menu) {
      case 'wellbeing':
        window.open('https://jiemba.aihealth.tech/wellbeing', '_blank');
        setOpen(false);
        break;
      case 'caring':
        window.open('https://jiemba.aihealth.tech/caring', '_blank');
        setOpen(false);
        break;
      case 'provider':
        window.open('https://jiemba.aihealth.tech/service-provider', '_blank');
        setOpen(false);
        break;
      case 'faq':
        window.open('https://jiemba.aihealth.tech/faq', '_blank');
        setOpen2(false);
        break;
      case 'howto':
        window.open('https://jiemba.aihealth.tech/howtojiemba', '_blank');
        setOpen2(false);
        break;
      case 'about':
        window.open('https://jiemba.aihealth.tech/about', '_blank');
        setOpen2(false);
        break;
      default:
    }
  };

  if (
    sessionStorage.getItem('UserId') !== '' &&
    sessionStorage.getItem('UserId') !== null
  ) {
    return <Redirect to={`/goals/current`} />;
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <div className={classes.header}>
            <div className={classes.headerMenu}>
              <Hidden mdUp>
                <div className={classes.menuIconContainer}>
                  <IconButton onClick={() => setOpenDialog(true)}>
                    <MenuIcon fontSize="large" className={classes.menuIcon} />
                  </IconButton>
                </div>
              </Hidden>
              <Hidden smDown>
                <div className={classes.headerMenuText}>
                  <div
                    ref={anchorRef}
                    onClick={() => setOpen(prevOpen => !prevOpen)}>
                    Use Jiemba For...
                    <IconButton>
                      <ArrowDropDown className={classes.arrowDown} />
                    </IconButton>
                  </div>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom'
                              ? 'center top'
                              : 'center bottom'
                        }}>
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}>
                              <MenuItem
                                onClick={() => clickMenuHandler('wellbeing')}>
                                <span className={classes.headerMenuItemText}>
                                  Your own wellbeing
                                </span>
                              </MenuItem>
                              <MenuItem
                                onClick={() => clickMenuHandler('caring')}>
                                <span className={classes.headerMenuItemText}>
                                  Caring for others
                                </span>
                              </MenuItem>
                              <MenuItem
                                onClick={() => clickMenuHandler('provider')}>
                                <span className={classes.headerMenuItemText}>
                                  Providing services
                                </span>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
                <div className={classes.headerMenuText}>
                  <div
                    ref={anchorRef2}
                    onClick={() => setOpen2(prevOpen => !prevOpen)}>
                    Information
                    <IconButton>
                      <ArrowDropDown className={classes.arrowDown} />
                    </IconButton>
                  </div>
                  <Popper
                    open={open2}
                    anchorEl={anchorRef2.current}
                    role={undefined}
                    transition
                    disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom'
                              ? 'center top'
                              : 'center bottom'
                        }}>
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose2}>
                            <MenuList
                              autoFocusItem={open2}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown2}>
                              <MenuItem onClick={() => clickMenuHandler('faq')}>
                                <span className={classes.headerMenuItemText}>
                                  FAQ
                                </span>
                              </MenuItem>
                              <MenuItem
                                onClick={() => clickMenuHandler('howto')}>
                                <span className={classes.headerMenuItemText}>
                                  How to Jiemba
                                </span>
                              </MenuItem>
                              <MenuItem
                                onClick={() => clickMenuHandler('about')}>
                                <span className={classes.headerMenuItemText}>
                                  About Us
                                </span>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </Hidden>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.middleGrid} />
        <Grid item xs={12} container justify="center">
          <div>
            <div className={classes.firstRow}>
              <img
                src="/images/landing/logo.svg"
                alt=""
                className={classes.logo}
              />
              <div className={classes.title}>For your own wellbeing</div>
            </div>
            <div className={classes.row}>
              {/* Jorge Avendano Redirect straight to sign up page */}
              <div
                className={classes.label}
                onClick={() => redirectToB2C()}>
                Create Account
              </div>
              <div className={classes.buttonContainer}>
                <div
                  className={clsx(classes.label, classes.signInButton)}
                  onClick={() => history.push('/auth')}>
                  Sign in
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} container justify="center">
          <img
            src="/images/landing/jiemba.png"
            alt=""
            className={classes.bottonImage}
          />
        </Grid>
      </Grid>
      {openDialog && useJiembaForDialog}
    </div>
  );
};

export default Landing;
