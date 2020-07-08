import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { endSession } from 'slices/auth/action';
import { NavigateNext } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  subTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#37474F',
    marginBottom: '10px'
  },
  contentText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#B3B3B3'
  },
  card: {
    display: 'flex',
    padding: '10px 20px',
    alignItems: 'center',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    margin: '20px 0'
  },
  navigation: {
    marginLeft: '20px'
  }
}));

type Props = {
  click: (
    settingName: string,
    notifType:
      | 'Update'
      | 'Comment'
      | 'Invitation'
      | 'Suggestion'
      | 'AccessRequest'
      | 'AccountReset'
      | ''
  ) => void;
};

export const AccountSettings: React.FC<Props> = ({ click }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(endSession());
  };

  return (
    <>
      <div className={classes.card}>
        <div style={{ flexGrow: 1 }}>
          <div className={classes.subTitle}>Reset my account</div>
          <div className={classes.contentText}>
            Clear all stored data from your device and Jiemba’s server
          </div>
        </div>
        <div className={classes.navigation}>
          <IconButton onClick={() => click('Reset account', 'AccountReset')}>
            <NavigateNext style={{ fill: '#73BA9B' }} fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div className={classes.card}>
        <div style={{ flexGrow: 1 }}>
          <div className={classes.subTitle}>Log out</div>
        </div>
        <div className={classes.navigation}>
          <IconButton onClick={handleLogout}>
            <img src="/images/settings/logout.svg" alt="" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
