import React, { useState, useEffect, ChangeEvent } from 'react';
import useRouter from 'common/utils/useRouter';
import validate from 'validate.js';
import { useDispatch } from 'react-redux';
import { startSession } from 'slices/auth/action';

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  TextField,
  Typography,
  IconButton,
  Theme
} from '@material-ui/core';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';

import { Button } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  container1: {
    [theme.breakpoints.up('xs')]: {
      padding: '0 20px 20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 10% 20px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 10% 10px'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 10% 10px'
    }
  },
  container2: {
    [theme.breakpoints.up('xs')]: {
      padding: '0 20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 20%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 20%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 30%'
    }
  },
  backArrow: {
    fontSize: '42px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '52px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '52px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '52px'
    },
    marginTop: '12px',
    fill: '#6FBC9E'
  },
  textField: {
    background: '#D5F2E3',
    borderRadius: '5px'
  }
}));

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
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
  };
  touched: {
    email?: boolean;
    password?: boolean;
  };
  errors: {
    email?: string[];
    password?: string[];
  };
};

const Login: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = useRouter();

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
  };

  useEffect(() => {
    dispatch(startSession(history));
  }, [dispatch, history]);

  const handleSubmit = () => {
    history.push('/goals/current');
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  return (
    <>
      <Grid container className={classes.container1}>
        <Grid item xs={12}>
          <IconButton
            style={{ padding: '0' }}
            onClick={() => history.push('/')}>
            <ArrowIcon className={classes.backArrow} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container className={classes.container2} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1">Log in</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={hasError('email')}
            helperText={
              hasError('email')
                ? formState.errors.email && formState.errors.email![0]
                : null
            }
            fullWidth
            label="Email"
            name="email"
            autoComplete="off"
            value={formState.values.email || ''}
            variant="outlined"
            className={classes.textField}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={hasError('password')}
            helperText={
              hasError('password')
                ? formState.errors.password && formState.errors.password![0]
                : null
            }
            fullWidth
            autoComplete="off"
            label="Password"
            name="password"
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
            className={classes.textField}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="primary"
            click={handleSubmit}
            disabled={!formState.isValid}>
            Log in
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
