import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import { makeStyles } from '@material-ui/styles';
import { Grid, TextField, Theme } from '@material-ui/core';
import { Phone, LocalPostOffice } from '@material-ui/icons';

import Navigation from '../Navigation';
import { Profile } from 'types/profile';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    [theme.breakpoints.up('xs')]: {
      padding: '0 20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 20%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 30%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 30%'
    }
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '37px',
    color: '#FFFFFF'
  },
  titleContainer: {
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center'
    }
  },
  fieldContainer: {
    background: '#FFFFFF'
  },
  formGroup: {
    marginTop: '15px',
    padding: '0 22px'
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: '5px',
    width: '90%',
    '& .MuiInput-underline:after': {
      borderBottomColor: '#73BA9B'
    }
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '23px',
    color: '#73BA9B'
  },
  textFieldContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 0'
  }
}));

const schema = {
  MobilePhone: {
    presence: false,
    length: {
      maximum: 10
    }
  },
  PostalAddress: {
    presence: false,
    length: {
      maximum: 264
    }
  }
};

type Props = {
  index: number;
  next: () => void;
  back: () => void;
  profile: Profile;
  setProfile: (name: string, value: string) => void;
  submitProfile: () => void;
};

type FormStateType = {
  isValid: boolean;
  values: {
    MobilePhone?: string;
    PostalAddress?: string;
  };
  touched: {
    MobilePhone?: boolean;
    PostalAddress?: boolean;
  };
  errors: {
    MobilePhone?: string[];
    PostalAddress?: string[];
  };
};

const CreateProfileForm4: React.FC<Props> = ({
  index,
  next,
  back,
  profile,
  setProfile,
  submitProfile
}) => {
  const classes = useStyles();

  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {
      MobilePhone: profile.MobilePhone,
      PostalAddress: profile.PostalAddress
    },
    touched: {},
    errors: {}
  });

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

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
    setProfile(event.target.name, event.target.value);
  };

  const goNext = () => {
    if (formState.isValid) {
      next();
      submitProfile();
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} style={{ background: '#73BA9B' }}>
        <Navigation
          current={index}
          active={formState.isValid}
          next={
            formState.isValid
              ? goNext
              : () => {
                  return;
                }
          }
          back={back}
        />
      </Grid>
      <Grid item xs={12} style={{ background: '#73BA9B' }}>
        <div className={classes.titleContainer}>
          <span className={classes.title}>
            How would you like to be contacted?
          </span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <div className={classes.formGroup}>
              {/* <span className={classes.label}>
                Please provide at least one contact method.
              </span> */}
            </div>
          </Grid>
          <Grid item xs={12} className={classes.textFieldContainer}>
            <Phone style={{ fill: '#73BA9B' }} />
            <TextField
              error={hasError('MobilePhone')}
              label={<span className={classes.label}>Phone number</span>}
              name="MobilePhone"
              type="text"
              autoComplete="off"
              value={profile.MobilePhone}
              variant="outlined"
              placeholder="Enter your phone number"
              className={classes.textField}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className={classes.textFieldContainer}>
            <LocalPostOffice style={{ fill: '#73BA9B' }} />
            <TextField
              error={hasError('PostalAddress')}
              label={<span className={classes.label}>Postal address</span>}
              name="PostalAddress"
              type="text"
              autoComplete="off"
              value={profile.PostalAddress}
              variant="outlined"
              placeholder="Enter your postal address"
              className={classes.textField}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateProfileForm4;
