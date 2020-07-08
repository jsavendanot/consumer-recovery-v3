import React, { useContext, useEffect, useState, ChangeEvent } from 'react';
import validate from 'validate.js';
import GoalContext from '../../../../GoalContext';

import { makeStyles } from '@material-ui/styles';
import { TextField, Divider, Theme, Hidden } from '@material-ui/core';
import produce from 'immer';
import { StepForm as StepFormType } from 'types/goal';

import { Repeat, DateTime, Share } from './components';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    width: '100%',
    margin: '10px 0 30px'
  },
  stepNumberText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 900,
    fontSize: '20px',
    lineHeight: '193.69%',
    color: '#73BA9B'
  },
  stepEmpty: {
    [theme.breakpoints.down('md')]: {
      [theme.breakpoints.up('xs')]: {
        width: '90vw'
      },
      [theme.breakpoints.up('sm')]: {
        width: '60vw'
      },
      [theme.breakpoints.up('md')]: {
        width: '60vw'
      },
      // [theme.breakpoints.up('lg')]: {
      //   width: '60vw'
      // },
      height: 430,
      scrollSnapAlign: 'start',
      scrollSnapStop: 'normal',
      float: 'left',
      marginRight: 10
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'normal',
      float: 'left',
      marginRight: 10
    }
  },
  divider: {
    border: '1px solid #73BA9B'
  },
  stepAddText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#73BA9B',
    cursor: 'pointer'
  },
  container: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingRight: '7px',
      margin: '10px 0 5px'
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
      margin: '10px 0'
    }
  },
  subContainer: {
    [theme.breakpoints.down('md')]: {
      borderRight: '1px solid #73BA9B',
      marginRight: '40px'
    },
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      width: '100%'
    }
  }
}));

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 120
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    name?: string;
  };
  touched: {
    name?: boolean;
  };
  errors: {
    name?: string[];
  };
};

export const StepForm: React.FC = () => {
  const { step, setStep } = useContext(GoalContext!);
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

  const handleInputFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
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

    handleStepField(event.target.value);
  };

  const handleStepField = (value: string) => {
    setStep(
      produce((draft: StepFormType) => {
        draft.name = value;
      })
    );
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  return (
    <>
      <div className={classes.stepEmpty}>
        <div className={classes.container}>
          <Hidden mdDown>
            <Divider className={classes.divider} />
          </Hidden>
        </div>
        <div className={classes.subContainer}>
          <Hidden mdDown>
            <div
              style={{
                width: '50%',
                paddingRight: '10px',
                margin: '10px 0'
              }}>
              <div
                style={{
                  marginRight: '40px'
                }}>
                <TextField
                  error={hasError('name')}
                  // helperText={
                  //   hasError('name')
                  //     ? formState.errors.name && formState.errors.name[0]
                  //     : null
                  // }
                  placeholder="Enter step name"
                  value={step.name}
                  multiline
                  name="name"
                  className={classes.textField}
                  style={{ width: '97%' }}
                  onChange={handleInputFieldChange}
                  inputProps={{ maxLength: 120 }}
                />
                <Repeat step={step} setStep={setStep} />
                <DateTime step={step} setStep={setStep} />
              </div>
            </div>
          </Hidden>
          <Hidden lgUp>
            <TextField
              error={hasError('name')}
              placeholder="Enter step name"
              value={step.name}
              name="name"
              multiline
              className={classes.textField}
              style={{ width: '97%' }}
              onChange={handleInputFieldChange}
              inputProps={{ maxLength: 120 }}
            />
            <Repeat step={step} setStep={setStep} />
            <DateTime step={step} setStep={setStep} />
          </Hidden>
          <Share step={step} setStep={setStep} />
        </div>
      </div>
    </>
  );
};

export default StepForm;
