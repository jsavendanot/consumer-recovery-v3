import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Avatar,
  Hidden,
  Menu,
  MenuItem,
  Theme,
  IconButton,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { ArrowDropDown, Menu as MenuIcon } from '@material-ui/icons';
import queryString from 'query-string';

import { Button, UseJiembaFor } from 'common/components';
import { RouteComponentProps } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#D5F2E3'
  },
  flexItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 15px 20px'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '37px',
    color: '#37474F'
  },
  desc: {
    width: '270px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F'
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  bigAvatar: {
    margin: 10,
    width: 152,
    height: 152
  },
  heyText: {
    fontFamily: 'Play',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B',
    transform: 'rotate(-14.66deg)',
    position: 'absolute',
    top: 6,
    right: -48
  },
  line1: {
    width: '35.85px',
    border: '2px solid #73BA9B',
    transform: 'rotate(-33.22deg)',
    position: 'absolute',
    top: 7,
    right: -23
  },
  line2: {
    width: '35.85px',
    border: '2px solid #73BA9B',
    transform: 'rotate(-4.96deg)',
    position: 'absolute',
    top: 38,
    right: -37
  },
  buttonContainer: {
    width: '100%',
    margin: '10px 0',
    padding: '0 20%'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '25px 15px 15px',
    margin: '0 20px'
  },
  menuContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  menuBox: {
    display: 'flex',
    alignItems: 'center'
  },
  headerMenuText: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#73BA9B'
  },
  headerLogo: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '0px'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '10px'
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '20px'
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '20px'
    }
  },
  menuIcon: {
    fill: '#73BA9B',
    position: 'absolute',
    top: 0
  },
  headerMenuItemText: {
    fontFamily: 'Scada',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#B7C38C'
  },
  arrowDown: {
    fill: '#73BA9B'
  }
}));

const Invitation: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const { location } = history;

  const invitationValues = queryString.parse(location.search);

  useEffect(() => {
    sessionStorage.setItem(
      'invitationId',
      invitationValues.id ? (invitationValues.id as string) : ''
    );
    sessionStorage.setItem(
      'inviterEmail',
      invitationValues.email ? (invitationValues.email as string) : ''
    );
    sessionStorage.setItem(
      'inviterName',
      invitationValues.inviter ? (invitationValues.inviter as string) : ''
    );
    sessionStorage.setItem(
      'inviterAccountType',
      invitationValues.type ? (invitationValues.type as string) : ''
    );
  }, [
    invitationValues.id,
    invitationValues.email,
    invitationValues.inviter,
    invitationValues.type
  ]);

  /** Header menus */
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [anchorEl2, setAnchorEl2] = useState<Element | null>(null);

  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDialog, setOpenDialog] = useState(false);

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
        setAnchorEl(null);
        break;
      case 'caring':
        window.open('https://jiemba.aihealth.tech/caring', '_blank');
        setAnchorEl(null);
        break;
      case 'provider':
        window.open('https://jiemba.aihealth.tech/service-provider', '_blank');
        setAnchorEl(null);
        break;
      case 'faq':
        window.open('https://jiemba.aihealth.tech/faq', '_blank');
        setAnchorEl2(null);
        break;
      case 'howto':
        window.open('https://jiemba.aihealth.tech/howtojiemba', '_blank');
        setAnchorEl2(null);
        break;
      case 'about':
        window.open('https://jiemba.aihealth.tech/about', '_blank');
        setAnchorEl2(null);
        break;
      default:
    }
  };

  return (
    <>
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12}>
          <div className={classes.header}>
            <img
              src={
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAMAAAAyNwimAAACeVBMVEUAAAAA//+AgIBVqqqAv4BmzJmAqqpttpKAv59xxo6As5l0uaJqv5V2sZ1ttqR3u5lwv594tJZxuJx5vKFzv5l0uZd1v59wuJl2up1xvZd2tptyuZ5zvZxwt5d0uZtxvJ51vZlxuJx1uphyvJp2t51zuZlwu5tzvJ50uZxxu5l0vJtyuJ1yu5x1uJlzuZtxup1zvJp0uZlyu5t0vJ11upxzuZxxupp0u5tyupx0vJpzuZt1up1zu5pzuZpyupt0u5x0uZxyupp0u5t0uppyu5pzuZtyupx0u5pzupt0u5xzuZpyuptzupxyu5tzuZxyupp0u5tyuZx0uZtzupx0u5pzuZtyupxyu5tzuZpyupt0u5xzu5p0uZtzuppzuZxyuppzuptyu5x0uZt0uppzuptzuZpyuptzupxyu5tzupp0uptzu5x0uZtzuZtzupp0uZpzuptzu5pyuZtzupxyuptyuppzuptzu5x0uZtzupt0uppzu5tyuZxzuptyuptzu5pzuptzupt0uZtzupp0uptzu5tyuZtzuptzupxzupt0uptzuptzuptyuptzu5pyuZtzupxzuptzu5tzupp0uptzupx0uZtzuptyuppzuZtzuptzupt0uptzuptzupxzuptzuptzupxzuptzupt0uptzuptyu5tzuptzuppzuZtzuptzuptzupp0uptzu5tzuptzupxzuZtzuptzuptzupxzuptyuptzuptzuptzuptzuptzuZtzuptzupt0uptzuptzuptzuptzuptzuptzuppzu5tzuptyuptzuptzuptzuptzuptzuptzuptzuptzuptzuptzupv///+ya+quAAAA0XRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQWGBkaGxwdHyAhIiMkJSYnKCkqLC0uLzEyMzQ1Nzg5Oz4/QENERUZHSUpLTU5PUVNUVVZZWltcXV5fYGFiY2RlZmdpamtsbW5vcXJzdHV3enx9fn+BgoOEh4mLjI6PkJGTlJWWl5iZmpucnZ6goaKjpKWmp6mqq62ur7CxsrO0tba3uLm7vL/AwcPFx8jJysvMzc7Q0dLT1dbY2drc3d7f4OHj5OXm5+jp6uvs7u/w8fL09fb3+Pn6+/z9/uQsDjEAAAABYktHRNLg2K6wAAADZUlEQVQYGaXBi1tTBQDG4e8AAxwXJ5BSZhahXQkwIq24TC3DKJCLeCkyNS+lJWoUJpGJVohhZoUVhpKhYaEgFoUSlcyEufP7jzpnG1LmeMbj++rWNfS7NZHU3EVla9+ob7Lt3/lqZfG62t1NTUePdhx8RmEZpk8TWENoWQpDMpgxCu0CIQ3fpTBkAPEK7YmL2EYvnDzX88vQkInt6s+dXzRunK1w5AOJmkBiYYU7a0aEgiqAHREK32LApfDlAKWahCJgmv4j5635CikHKJUlt3OVwlECpCguY4aConaZmO/EKIQcoEyWrZCtm4qPl81Z9nSkpErA3XgV35E0+X2A7ftU3VwaUCHL7H6W6AYpTyY4yk6ZvgOJ0uO98Kak1Yz5I1OWp4Da03AiUkExubEadxuwXDbng4ZsCav27S2bItt7DPVj+0ilo1jmSa9g+7TkYzgfK+lD6IhoAYoUkNZNrcbNBKr0L7POwg+DvQ/IcgyL9xDwpQnXoFlaD5jVkvZBsaR+WKZ24DMFfAJfaVwGUCXbshMrJBnH4VRcHX1RkjqwVESOYOl7tBkuSZuBjbLkw9tStA/mxHiAkWT5vQy+53XdcmCJLIYH33QpDzx3Gt9BuqSfgNekXwFvlqqBRG2Fy05ZFkKdlAm4irBVy8/YC761GnMEyJIlFlggtcIex3YYjpV0CfYbUjewRaoCUlUDA7IdhAqpEEacZ7ENuuQX1QQ0RMsvG/A4ZEkAVivDhOE/ge2SIq7BC5L6wOOSysEbrZ3glRRVD8MuaR7QBV27gW0KcDQD3yTLkvQj0CBbElCnGgI6XZKcQLmk0/C+pBJok14EpsfktQNrJDkGsXRPd56D0fsVELkD6HEbSj8DXEmXzQUckBubr36qLA6gUtJirzdTUraJW0q9DCMmlhpDlpVA7x3SAhPaDAVV/Q30tXgAs1x+ScAmqQtonSvp3hX3aQCqZLn7HtkKnpVl4V/Y2h5TwKLGLSmy7AGWaszcdgKuFCtgDrBJWgoMrSt46ZjJ6zoMxfqf2zd//nVtpm6UdBF+m6oxkZU9WFrTFTQfWC8Zhwg6H6dZx7sSFLZCE7ZpXNRzh2se0XX5QIGkKS34DTwkKcLQJGyA3xVS7BlOOmTL29XV8+2GaZq8vHcfVmhJK2fq1v0DdzcosBIVfhkAAAAASUVORK5CYII='
              }
              alt=""
              style={{ cursor: 'pointer' }}
              onClick={() => history.push('/')}
            />
            <div className={classes.menuContainer}>
              <Hidden mdUp>
                <IconButton onClick={() => setOpenDialog(true)}>
                  <MenuIcon fontSize="large" className={classes.menuIcon} />
                </IconButton>
              </Hidden>
              <Hidden smDown>
                <div className={classes.headerMenuText}>
                  <span onClick={event => setAnchorEl(event.currentTarget)}>
                    Use Jiemba For...
                  </span>
                  <IconButton
                    onClick={event => setAnchorEl(event.currentTarget)}>
                    <ArrowDropDown className={classes.arrowDown} />
                  </IconButton>
                  <Menu
                    id="menu1"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}>
                    <MenuItem onClick={() => clickMenuHandler('wellbeing')}>
                      <span className={classes.headerMenuItemText}>
                        Your own wellbeing
                      </span>
                    </MenuItem>
                    <MenuItem onClick={() => clickMenuHandler('caring')}>
                      <span className={classes.headerMenuItemText}>
                        Caring for others
                      </span>
                    </MenuItem>
                    <MenuItem onClick={() => clickMenuHandler('provider')}>
                      <span className={classes.headerMenuItemText}>
                        Providing services
                      </span>
                    </MenuItem>
                  </Menu>
                </div>
                <div className={classes.headerMenuText}>
                  <span onClick={event => setAnchorEl2(event.currentTarget)}>
                    Information
                  </span>
                  <IconButton
                    onClick={event => setAnchorEl2(event.currentTarget)}>
                    <ArrowDropDown className={classes.arrowDown} />
                  </IconButton>
                  <Menu
                    id="menu2"
                    anchorEl={anchorEl2}
                    keepMounted
                    open={Boolean(anchorEl2)}
                    onClose={() => setAnchorEl2(null)}>
                    <MenuItem onClick={() => clickMenuHandler('faq')}>
                      <span className={classes.headerMenuItemText}>FAQ</span>
                    </MenuItem>
                    <MenuItem onClick={() => clickMenuHandler('howto')}>
                      <span className={classes.headerMenuItemText}>
                        How to Jiemba
                      </span>
                    </MenuItem>
                    <MenuItem onClick={() => clickMenuHandler('about')}>
                      <span className={classes.headerMenuItemText}>
                        About Us
                      </span>
                    </MenuItem>
                  </Menu>
                </div>
              </Hidden>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.flexItem}>
          <span className={classes.title}>
            <div style={{ textAlign: 'center' }}>
              {invitationValues.inviter} invited you to
              <br />
              create your wellbeing
              <br />
              plan on Jiemba!
            </div>
          </span>
        </Grid>
        <Grid item xs={12} className={classes.flexItem}>
          <div className={classes.avatarContainer}>
            <div className={classes.line1} />
            <div className={classes.heyText}>Hey!</div>
            <div className={classes.line2} />
            <Avatar
              src={
                invitationValues.profile
                  ? (invitationValues.profile as string)
                  : ''
              }
              alt=""
              className={classes.bigAvatar}
            />
          </div>
        </Grid>
        <Grid item xs={12} className={classes.flexItem}>
          <span className={classes.desc}>
            <div style={{ textAlign: 'center' }}>
              Create your own wellbeing plan on any device and share it with
              {' ' + invitationValues.inviter}. You can unshare it anytime.
            </div>
          </span>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          className={classes.flexItem}
          style={{ flexDirection: 'column' }}>
          <div className={classes.buttonContainer}>
            <Button type="secondary" click={() => history.push('/auth')}>
              Log in
            </Button>
          </div>
          <div className={classes.buttonContainer}>
            <Button type="primary" click={() => history.push('/auth')}>
              Create account
            </Button>
          </div>
        </Grid>
      </Grid>
      {openDialog && useJiembaForDialog}
    </>
  );
};

export default Invitation;
