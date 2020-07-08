import React, { useState, ChangeEvent, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useRouter from 'common/utils/useRouter';
import { RootState } from 'reducer';
import { editProfile } from 'slices/profile/action';
import { Profile } from 'types/profile';
import validate from 'validate.js';

import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton, Avatar, Tabs, Tab, Theme } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import { General, Health } from './components';
import { Loader, YesNoConfirmation } from 'common/components';
import produce from 'immer';
import { FormStateType, schema } from './components/General';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  container1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#73BA9B'
  },
  tabContainer: {
    [theme.breakpoints.up('xs')]: {
      paddingBottom: '20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 20px 20px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 20% 30px'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 20% 30px'
    }
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '20px 20px 10px',
    [theme.breakpoints.up('md')]: {
      padding: '20px 8% 10px'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '35px 10% 10px'
    }
  },
  headerContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  headerText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '35px',
    color: '#FFFFFF',
    [theme.breakpoints.up('sm')]: {
      marginTop: '0'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '0'
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '0'
    }
  },
  smallHeaderText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: 'rgba(255, 255, 255, 0.4)',
    cursor: 'pointer',
    marginTop: '7px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '15px',
      fontSize: '23px'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '15px',
      fontSize: '25px'
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '20px',
      fontSize: '25px'
    }
  },
  activeSaveButton: {
    color: '#FFFFFF'
  },
  backArrow: {
    fontSize: '32px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '52px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '52px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '52px'
    },
    fill: '#D5F2E3'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10px',
    marginBottom: '10px',
    position: 'relative'
  },
  avatar: {
    width: '100px',
    height: '100px'
  },
  name: {
    marginTop: '10px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '26px',
    color: '#FFFFFF'
  },
  tabs: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#fa9419'
    },
    marginBottom: '10px'
  },
  divider: {
    border: '1px solid #73BA9B',
    margin: '10px 0 20px'
  },
  content: {
    marginTop: theme.spacing(3)
  },
  label: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '17px',
    color: '#FFFFFF',
    cursor: 'pointer'
  },
  cameraImage: {
    position: 'absolute',
    top: '37%',
    right: '-24px',
    cursor: 'pointer'
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  }
}));

const EditProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = useRouter();

  const loading: boolean = useSelector(
    (state: RootState) => state.profile.loading
  );

  const profileState: Profile = useSelector(
    (state: RootState) => state.profile.profile
  );

  /** Tabs */
  const [tab, setTab] = useState('general');

  const tabs = [
    { value: 'general', label: 'General' },
    { value: 'health', label: 'Health' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string) => {
    value === 'general' ? setTab('general') : setTab('health');
  };

  const [profile, setProfile] = useState(profileState);

  const handleProfileField = (name: string, value: string) => {
    setProfile(values => ({
      ...values,
      [name]: value
    }));
  };

  const handleSaveEvent = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        FirstName: profile.FirstName,
        Surname: profile.Surname,
        PostalAddress: profile.PostalAddress,
        MobilePhone: profile.MobilePhone,
        Gender: profile.Gender,
        DateOfBirth: profile.DateOfBirth
      },
      touched: {
        ...formState.touched,
        FirstName: true,
        Surname: true,
        PostalAddress: true,
        MobilePhone: true,
        Gender: true,
        DateOfBirth: true
      }
    }));

    if (formState.isValid) {
      dispatch(editProfile(history, profile));
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let imageType = event.target.files[0].type.replace('image/', '');
      if (imageType === 'jpeg') {
        imageType = 'jpg';
      }
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = e => {
        setProfile(
          produce((draft: Profile) => {
            draft.Image = e.target
              ? e.target?.result!.toString().split('base64,')[1]
              : '';
            draft.ImageType = imageType;
          })
        );
      };
    }
  };

  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {
      FirstName: profile.FirstName,
      Surname: profile.Surname,
      PostalAddress: profile.PostalAddress,
      MobilePhone: profile.MobilePhone,
      Gender: profile.Gender,
      DateOfBirth: profile.DateOfBirth
    },
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));

    setProfile(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  /** Dialog */
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    JSON.stringify(profile) !== JSON.stringify(profileState)
      ? setOpen(true)
      : history.goBack();
  }

  function handleClose() {
    setOpen(false);
  }

  const cancelConfirmation = (
    <YesNoConfirmation
      open={open}
      close={handleClose}
      action={handleSaveEvent}
      redirect>
      <span className={classes.confirmTitle}>
        Do you want to
        <br />
        save the changes?
      </span>
    </YesNoConfirmation>
  );

  if (sessionStorage.getItem('DateOfBirth') === 'null') {
    return (
      <Redirect to={`/profile/${sessionStorage.getItem('FirstName')}/create`} />
    );
  }

  return (
    <>
      {loading && <Loader />}
      <Grid container className={classes.container1}>
        <Grid item xs={12}>
          <div className={classes.header}>
            <div className={classes.headerContent}>
              <IconButton style={{ padding: '0' }} onClick={handleClickOpen}>
                <ArrowBackIos className={classes.backArrow} />
              </IconButton>
              <span className={classes.headerText}>Edit Profile</span>
            </div>
            <span
              className={clsx(
                classes.smallHeaderText,
                formState.isValid && classes.activeSaveButton
              )}
              onClick={handleSaveEvent}>
              Save
            </span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.avatarContainer}>
            <div style={{ position: 'relative' }}>
              {profile.Image ? (
                <Avatar
                  alt=""
                  className={classes.avatar}
                  src={'data:image/png;base64,' + profile.Image!}
                />
              ) : (
                <Avatar
                  alt=""
                  className={classes.avatar}
                  src="/images/avatars/defaultAvatar.svg"
                />
              )}
              <div>
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleInputChange}
                  id="icon-button-file"
                  style={{ display: 'none' }}
                />
                <label htmlFor="icon-button-file">
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                    className={classes.cameraImage}
                  />
                </label>
              </div>
            </div>
            {/* <span className={classes.name}>
              {sessionStorage.getItem('FirstName')}{' '}
              {sessionStorage.getItem('Surname')}
            </span> */}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Tabs
            className={classes.tabs}
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={tab}
            variant="scrollable">
            {tabs.map(tab => (
              <Tab
                key={tab.value}
                label={<span className={classes.label}>{tab.label}</span>}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Grid>
      </Grid>
      <div className={classes.tabContainer}>
        {tab === 'health' && (
          <Health profile={profile} setProfile={handleProfileField} />
        )}
        {tab === 'general' && (
          <General
            profile={profile}
            hasError={hasError}
            handleChange={handleChange}
          />
        )}
      </div>
      {open && cancelConfirmation}
    </>
  );
};

export default EditProfile;
