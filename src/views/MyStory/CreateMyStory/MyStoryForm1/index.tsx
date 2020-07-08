import React, { useState, useEffect, ChangeEvent } from 'react';
import useRouter from 'common/utils/useRouter';
import validate from 'validate.js';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { writeStory } from 'slices/story/action';

import { makeStyles } from '@material-ui/styles';
import { Grid, TextField, IconButton, Theme } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/KeyboardArrowRight';

import Navigation from '../../Navigation';
import { YesNoConfirmation } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    [theme.breakpoints.up('xs')]: {
      padding: '0 20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 20%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 28%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 28%'
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
  item: {
    marginTop: '30px'
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
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F'
  },
  suggestContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  questions: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '173.19%',
    color: '#37474F',
    margin: '20px 0'
  },
  fold: {
    transform: 'rotate(90deg)'
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

const schema = {
  story: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 1000
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    story?: string;
  };
  touched: {
    story?: boolean;
  };
  errors: {
    story?: string[];
  };
};

const MyStoryForm1: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const [myStory, setMyStory] = useState('');
  const [questions, setQuestions] = useState(true);

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

    setMyStory(event.target.value);
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  const save = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        story: myStory
      },
      touched: {
        ...formState.touched,
        story: true
      }
    }));

    if (formState.isValid && formState.values.story) {
      dispatch(writeStory(history, formState.values.story));
    }
  };

  /** Confirm Dialog */
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);

  function openCancelConfirmHandler() {
    setOpenCancelConfirm(true);
  }

  function closeCancelConfirmHandler() {
    setOpenCancelConfirm(false);
  }

  const confirmCancelDialog = (
    <YesNoConfirmation
      open={openCancelConfirm}
      close={closeCancelConfirmHandler}
      action={() => history.push('/story')}>
      <span className={classes.confirmTitle}>
        Are you sure you want to
        <br />
        leave this page?
      </span>
    </YesNoConfirmation>
  );

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ background: '#73BA9B' }}>
          <Navigation
            save={save}
            back={openCancelConfirmHandler}
            active={formState.isValid}
          />
        </Grid>
        <Grid item xs={12} style={{ background: '#73BA9B' }}>
          <div className={classes.titleContainer}>
            <span className={classes.title}>What is your story?</span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.container}>
            <Grid item xs={12} className={classes.item}>
              <div className={classes.suggestContainer}>
                <span className={classes.label}>
                  Need inspiration? Try answering these questions:
                </span>
                <IconButton
                  style={{ padding: '0' }}
                  onClick={() => setQuestions(value => !value)}>
                  <MoreIcon className={clsx(questions && classes.fold)} />
                </IconButton>
              </div>
              {questions && (
                <div className={classes.questions}>
                  What was life like for you growing up?
                  <br />
                  Who have been the important people in your life?
                  <br />
                  What challenges have you had? How have you got through the
                  tough times in your life?
                  <br />
                  What do you like doing most?
                  <br />
                  What would someone who knew you really well and liked you say
                  about you?
                </div>
              )}
              <TextField
                error={hasError('story')}
                fullWidth
                multiline
                label=""
                name="story"
                autoComplete="off"
                value={formState.values.story || ''}
                placeholder="Write your story here..."
                className={classes.textField}
                onChange={handleChange}
                inputProps={{ maxLength: 1000 }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {openCancelConfirm && confirmCancelDialog}
    </>
  );
};

export default MyStoryForm1;
