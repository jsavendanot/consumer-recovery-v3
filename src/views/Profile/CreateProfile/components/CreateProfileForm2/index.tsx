import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import { makeStyles } from '@material-ui/styles';
import { Grid, TextField, Theme } from '@material-ui/core';

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
  formGroup: {
    marginTop: '15px'
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: '5px',
    borderStyle: 'none',
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
    padding: '15px 22px',
    background: '#FFFFFF'
  }
}));

const schema = {
  Gender: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  }
};

type Props = {
  index: number;
  next: () => void;
  back: () => void;
  profile: Profile;
  setProfile: (name: string, value: string) => void;
};

type FormStateType = {
  isValid: boolean;
  values: {
    Gender?: string;
  };
  touched: {
    Gender?: boolean;
  };
  errors: {
    Gender?: string[];
  };
};

const CreateProfileForm2: React.FC<Props> = ({
  index,
  next,
  back,
  profile,
  setProfile
}) => {
  const classes = useStyles();
  const genders = [
    { name: '', value: '' },
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'Non-binary', value: 'Other' },
    { name: 'Prefer not to say', value: 'Unknown' }
  ];

  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {
      Gender: profile.Gender
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
          <span className={classes.title}>
            To which gender do you most identify?
          </span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <div className={classes.formGroup}>
              <span className={classes.label}>I identify myself as</span>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.textFieldContainer}>
            <TextField
              error={hasError('Gender')}
              fullWidth
              label={<span className={classes.label}>Please select</span>}
              name="Gender"
              select
              autoComplete="off"
              SelectProps={{ native: true }}
              value={profile.Gender}
              className={classes.textField}
              variant="outlined"
              onChange={handleChange}>
              {genders.map(gender => (
                <option key={gender.value} value={gender.value}>
                  {gender.name}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateProfileForm2;
