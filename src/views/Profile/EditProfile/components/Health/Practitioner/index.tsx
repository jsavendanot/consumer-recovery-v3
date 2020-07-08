import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import { makeStyles } from '@material-ui/styles';
import { Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#B3B3B3'
  },
  title2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    color: 'rgba(115, 186, 155, 0.7)'
  },
  divider: {
    border: '1px solid #73BA9B',
    margin: '10px 0 20px'
  },
  value: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#323F45'
  },
  tabTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0'
  },
  subContainer: {
    width: '50%',
    textAlign: 'left'
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: '5px',
    borderStyle: 'none',
    width: '100%',
    '& .MuiInput-underline:after': {
      borderBottomColor: '#73BA9B'
    }
  }
}));

const schema = {
  serviceName: {
    length: {
      maximum: 164
    }
  },
  name: {
    length: {
      maximum: 164
    }
  },
  practiceName: {
    length: {
      maximum: 164
    }
  },
  phone: {
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 15,
      minimum: 7
    }
  },
  address: {
    length: {
      maximum: 364
    }
  },
  additional: {
    length: {
      maximum: 564
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    serviceName?: string;
    name?: string;
    practiceName?: string;
    phone?: string;
    address?: string;
    additional?: string;
  };
  touched: {
    serviceName?: boolean;
    name?: boolean;
    practiceName?: boolean;
    phone?: boolean;
    address?: boolean;
    additional?: boolean;
  };
  errors: {
    serviceName?: string[];
    name?: string[];
    practiceName?: string[];
    phone?: string[];
    address?: string[];
    additional?: string[];
  };
};

const Practitioner: React.FC = () => {
  const classes = useStyles();

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

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  return (
    <Grid item xs={12}>
      <div className={classes.tabTitleContainer}>
        <TextField
          error={hasError('serviceName')}
          helperText={
            hasError('serviceName')
              ? formState.errors.serviceName && formState.errors.serviceName[0]
              : null
          }
          label=""
          name="serviceName"
          type="text"
          autoComplete="off"
          value={formState.values.serviceName || ''}
          placeholder="Service Name"
          className={classes.textField}
          onChange={handleChange}
        />
      </div>
      <div className={classes.tabTitleContainer}>
        <div className={classes.subContainer}>
          <span className={classes.title2}>Name</span>
        </div>
        <div className={classes.subContainer}>
          <TextField
            error={hasError('name')}
            helperText={
              hasError('name')
                ? formState.errors.name && formState.errors.name[0]
                : null
            }
            label=""
            name="name"
            type="text"
            autoComplete="off"
            value={formState.values.name || ''}
            placeholder="type here"
            className={classes.textField}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={classes.tabTitleContainer}>
        <div className={classes.subContainer}>
          <span className={classes.title2}>Practice name</span>
        </div>
        <div className={classes.subContainer}>
          <TextField
            error={hasError('practiceName')}
            helperText={
              hasError('practiceName')
                ? formState.errors.practiceName &&
                  formState.errors.practiceName[0]
                : null
            }
            label=""
            name="practiceName"
            type="text"
            autoComplete="off"
            value={formState.values.practiceName || ''}
            placeholder="type here"
            className={classes.textField}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={classes.tabTitleContainer}>
        <div className={classes.subContainer}>
          <span className={classes.title2}>Phone</span>
        </div>
        <div className={classes.subContainer}>
          <TextField
            error={hasError('phone')}
            helperText={
              hasError('phone')
                ? formState.errors.phone && formState.errors.phone[0]
                : null
            }
            label=""
            name="phone"
            type="text"
            autoComplete="off"
            value={formState.values.phone || ''}
            placeholder="type here"
            className={classes.textField}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={classes.tabTitleContainer}>
        <div className={classes.subContainer}>
          <span className={classes.title2}>Address</span>
        </div>
        <div className={classes.subContainer}>
          <TextField
            error={hasError('address')}
            helperText={
              hasError('address')
                ? formState.errors.address && formState.errors.address[0]
                : null
            }
            label=""
            name="address"
            type="text"
            autoComplete="off"
            value={formState.values.address || ''}
            placeholder="type here"
            className={classes.textField}
            onChange={handleChange}
          />
        </div>
      </div>
    </Grid>
  );
};

export default Practitioner;
