import React, { useState } from 'react';
import useRouter from 'common/utils/useRouter';
import { useDispatch } from 'react-redux';
import { endSession } from 'slices/auth/action';

import { makeStyles } from '@material-ui/styles';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import {
  Notifications,
  SettingsApplications,
  Share,
  Phone,
  Person,
  Close
} from '@material-ui/icons';
import { Emergency } from 'common/components';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative'
  },
  item: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '5px 0'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10px',
    cursor: 'pointer'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: '10px',
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F'
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#37474F',
    cursor: 'pointer'
  },
  close: {
    position: 'absolute',
    bottom: '-30px',
    right: '-20px'
  }
}));

type Props = {
  close: () => void;
};

const NavProfile: React.FC<Props> = ({ close }) => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(endSession());
  };

  const handleMenuClick = (menu: string) => {
    if (menu === 'profile') {
      history.push(`/profile/${sessionStorage.getItem('FirstName')}`);
    } else if (menu === 'notification') {
      history.push('/notification');
    } else if (menu === 'export') {
      history.push('/export');
    } else if (menu === 'settings') {
      history.push('/settings');
    }
    close();
  };

  /** Dialog for emergency numbers */
  const [open, setOpen] = useState(false);

  const closeEmergencyHandler = () => {
    setOpen(false);
    close();
  };

  const clickAboutHandler = () => {
    window.open('https://jiemba.aihealth.tech/wellbeing', '_blank');
    close();
  };

  return (
    <>
      <div
        className={classes.avatarContainer}
        onClick={() => handleMenuClick('profile')}>
        <Avatar
          alt=""
          className={classes.avatar}
          src={sessionStorage.getItem('Avatar')!}
        />
        <Typography className={classes.name}>
          {sessionStorage.getItem('FirstName')}{' '}
          {sessionStorage.getItem('Surname')}
        </Typography>
      </div>
      <div className={classes.container}>
        <div
          className={classes.item}
          onClick={() => handleMenuClick('notification')}>
          <IconButton>
            <Notifications style={{ fill: '#FA7268' }} />
          </IconButton>
          <span className={classes.text}>Notifications</span>
        </div>
        <div
          className={classes.item}
          onClick={() => handleMenuClick('settings')}>
          <IconButton>
            <SettingsApplications />
          </IconButton>
          <span className={classes.text}>Settings</span>
        </div>
        <div className={classes.item} onClick={() => handleMenuClick('export')}>
          <IconButton>
            <Share />
          </IconButton>
          <span className={classes.text}>Export PDF</span>
        </div>
        <div className={classes.item} onClick={() => setOpen(true)}>
          <IconButton>
            <Phone style={{ fill: '#fa9419' }} />
          </IconButton>
          <span className={classes.text}>Emergency</span>
        </div>
        <div className={classes.item} onClick={clickAboutHandler}>
          <IconButton>
            <Person />
          </IconButton>
          <span className={classes.text}>About</span>
        </div>
        <div className={classes.item} onClick={handleLogout}>
          <IconButton>
            <img src="/images/settings/logout.svg" alt="" />
          </IconButton>
          <span className={classes.text}>Log out</span>
        </div>
        <IconButton className={classes.close} onClick={close}>
          <Close fontSize="large" style={{ fill: '#73BA9B' }} />
        </IconButton>
      </div>
      {open && <Emergency open={open} close={closeEmergencyHandler} />}
    </>
  );
};

export default NavProfile;
