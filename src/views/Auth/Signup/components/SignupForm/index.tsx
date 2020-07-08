import React, { useState, useEffect, ChangeEvent } from 'react';
import useRouter from 'common/utils/useRouter';
import validate from 'validate.js';

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
  },
  textFooter: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontSize: '14px',
    lineHeight: '18px',
    color: '#73BA9B'
  },
  socialContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '10px 30px'
  },
  socialText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F'
  }
}));

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 124
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  retypedPassword: {
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
    retypedPassword?: string;
  };
  touched: {
    email?: boolean;
    password?: boolean;
    retypedPassword?: boolean;
  };
  errors: {
    email?: string[];
    password?: string[];
    retypedPassword?: string[];
  };
};

type Props = {
  submit: () => void;
};

const SignupForm: React.FC<Props> = ({ submit }) => {
  const classes = useStyles();
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

  const handleSubmit = () => {
    submit();
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
      <Grid
        container
        className={classes.container2}
        spacing={2}
        justify="center">
        <Grid item xs={12}>
          <Typography variant="h1">Sign up</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={hasError('email')}
            helperText={
              hasError('email')
                ? formState.errors.email && formState.errors.email[0]
                : null
            }
            fullWidth
            autoComplete="off"
            label="Email"
            name="email"
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
                ? formState.errors.password && formState.errors.password[0]
                : null
            }
            fullWidth
            label="Password"
            name="password"
            type="password"
            autoComplete="off"
            value={formState.values.password || ''}
            variant="outlined"
            className={classes.textField}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={hasError('retypedPassword')}
            helperText={
              hasError('retypedPassword')
                ? formState.errors.retypedPassword &&
                  formState.errors.retypedPassword[0]
                : null
            }
            fullWidth
            autoComplete="off"
            label="Retype password"
            name="retypedPassword"
            type="password"
            value={formState.values.retypedPassword || ''}
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
            Sign up
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.socialContainer}>
            <span className={classes.socialText}>or Sign Up with</span>
          </div>
        </Grid>
        <Grid item xs={12} style={{ position: 'absolute', bottom: '0' }}>
          <div style={{ textAlign: 'center' }}>
            <span className={classes.textFooter}>
              By signing up, you agree to our{' '}
            </span>
            <span className={classes.textFooter} style={{ color: '#000000' }}>
              Privacy Policy
            </span>
            <span className={classes.textFooter}>
              &nbsp;and&nbsp;
              <br />
            </span>
            <span className={classes.textFooter} style={{ color: '#000000' }}>
              <b>Terms & Condition</b>
            </span>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default SignupForm;
