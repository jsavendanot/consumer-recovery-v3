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
    borderStyle: 'none',
    '& .MuiInput-underline:after': {
      borderBottomColor: '#73BA9B'
    },
    '& .MuiInputBase-root': {
      fontSize: '20px'
    }
  },
  textSlash: {
    marginLeft: '15px'
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
    justifyContent: 'flex-start',
    padding: '15px 22px'
  },
  calendar: {
    marginLeft: '15px'
  }
}));

const schema = {
  DateOfBirth: {
    format: {
      pattern: `^([0-2]?[1-9]|[1-3][01])/(0?[1-9]|1[0-2])/((19|20)[0-9][0-9]$)`
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
    DateOfBirth?: string;
  };
  touched: {
    DateOfBirth?: boolean;
  };
  errors: {
    DateOfBirth?: string[];
  };
};

const CreateProfileForm3: React.FC<Props> = ({
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

    setProfile('DateOfBirth', event.target.value);
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
          <span className={classes.title}>When were you born?</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <div className={classes.formGroup}>
              <span className={classes.label}>I was born on</span>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.textFieldContainer}>
              <TextField
                error={hasError('DateOfBirth')}
                fullWidth
                placeholder="DD/MM/YYYY"
                name="DateOfBirth"
                autoComplete="off"
                className={classes.textField}
                value={profile.DateOfBirth}
                variant="outlined"
                onChange={handleChange}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateProfileForm3;
