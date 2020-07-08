import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import { makeStyles } from '@material-ui/styles';
import { Grid, TextField, Theme } from '@material-ui/core';

import Navigation from '../Navigation';
import { Profile } from 'types/profile';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: 35,
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
    marginBottom: 29,
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
    marginTop: '15px'
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: '5px',
    borderStyle: 'none'
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '23px',
    color: '#73BA9B'
  }
}));

const schema = {
  FirstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  Surname: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  PreferredName: {
    presence: false
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    FirstName?: string;
    Surname?: string;
    PreferredName?: string;
  };
  touched: {
    FirstName?: boolean;
    Surname?: boolean;
    PreferredName?: boolean;
  };
  errors: {
    FirstName?: string[];
    Surname?: string[];
    PreferredName?: string[];
  };
};

type Props = {
  index: number;
  next: () => void;
  back: () => void;
  profile: Profile;
  setProfile: (name: string, value: string) => void;
};

const CreateProfileForm1: React.FC<Props> = ({
  index,
  next,
  back,
  profile,
  setProfile
}) => {
  const classes = useStyles();

  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {
      FirstName: profile.FirstName,
      Surname: profile.Surname
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
    setProfile(event.target.name, event.target.value);
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  const goNext = () => {
    if (formState.isValid) {
      next();
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} style={{ background: '#73BA9B' }}>
        <Navigation
          current={index}
          active={formState.isValid}
          next={goNext}
          back={back}
        />
      </Grid>
      <Grid item xs={12} style={{ background: '#73BA9B' }}>
        <div className={classes.titleContainer}>
          <span className={classes.title}>What's your name?</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <div className={classes.formGroup}>
              <TextField
                error={hasError('FirstName')}
                fullWidth
                label={<span className={classes.label}>First name</span>}
                name="FirstName"
                autoComplete="off"
                value={profile.FirstName}
                placeholder="Enter your first name"
                className={classes.textField}
                onChange={handleChange}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.formGroup}>
              <TextField
                error={hasError('Surname')}
                fullWidth
                label={<span className={classes.label}>Last name</span>}
                name="Surname"
                autoComplete="off"
                value={profile.Surname}
                placeholder="Enter your surname"
                className={classes.textField}
                onChange={handleChange}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.formGroup}>
              <TextField
                error={hasError('PreferredName')}
                fullWidth
                label={
                  <span className={classes.label}>
                    What should we call you?
                  </span>
                }
                name="PreferredName"
                autoComplete="off"
                value={profile.PreferredName}
                placeholder="Enter your preferred name"
                className={classes.textField}
                onChange={handleChange}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateProfileForm1;
