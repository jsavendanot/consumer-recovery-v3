import React, { useContext, useState, useEffect, ChangeEvent } from 'react';
import moment from 'moment';
import useRouter from 'common/utils/useRouter';
import JournalContext from '../../JournalContext';
import { useDispatch, useSelector } from 'react-redux';
import { addNewJournal } from 'slices/journey/action';
import { JournalForm } from 'types/journey';
import validate from 'validate.js';

import useInterval from 'common/hooks/useInterval';

import { makeStyles } from '@material-ui/styles';
import {
  IconButton,
  TextField,
  Theme,
  Dialog,
  DialogContent
} from '@material-ui/core';
import { Close, Check, CalendarToday, AccessTime } from '@material-ui/icons';

import { Button, Loader } from 'common/components';
import { Moods, Share, Image } from '../components';
import { RootState } from 'reducer';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#003E1F',
    [theme.breakpoints.up('xs')]: {
      padding: '20px 0px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '20px 10%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px  10%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '20px 10%'
    }
  },
  headerIcon: {
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
    fill: '#D5F2E3',
    margin: '0 10px'
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
    color: '#D5F2E3',
    marginLeft: '15px'
  },
  container: {
    [theme.breakpoints.up('xs')]: {
      padding: '20px 15px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '20px 20%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px  20%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '20px 25%'
    }
  },
  dateTimeText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '15px',
    lineHeight: '23px',
    color: '#323F45',
    marginLeft: '3px'
  },
  textField: {
    width: '100%',
    margin: '10px 0',
    backgroundColor: '#FFFAE9'
  },
  validationText: {
    padding: '10px 0',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F'
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  activeCheck: {
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
    fill: '#D5F2E3'
  },
  inActiveCheck: {
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
    fill: 'rgba(255, 255, 255, 0.4)',
    margin: '0 10px'
  }
}));

type JournalKeys = keyof JournalForm;

const schema = {
  title: {
    presence: false,
    length: {
      maximum: 120
    }
  },
  journalText: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 1000
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    title?: string;
    journalText?: string;
  };
  touched: {
    title?: boolean;
    journalText?: boolean;
  };
  errors: {
    title?: string[];
    journalText?: string[];
  };
};

const SmallForm: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();
  const { journal, setJournal } = useContext(JournalContext);

  const loading: boolean = useSelector(
    (state: RootState) => state.journeyRoot.journey.loading
  );

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

    handleJournalField(
      event.target.name as 'title' | 'journalText' | 'time',
      event.target.value
    );
  };

  const handleJournalField = (field: string, value: string | boolean) => {
    setJournal(values => ({
      ...values,
      [field]: value
    }));
  };

  /** Hooks */
  useInterval(() => {
    handleJournalField('time', moment().format('h:mm a'));
  });

  const handleCreateJournal = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        title: journal.title,
        journalText: journal.journalText
      },
      touched: {
        ...formState.touched,
        title: true,
        journalText: true
      }
    }));

    if (formState.isValid) {
      if (journal.feeling !== '') {
        dispatch(addNewJournal(history, journal));
      } else {
        setValidationDialogOpen(true);
      }
    }
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  //Validation Dialog
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);

  const handleValidationDialogClose = () => {
    setValidationDialogOpen(false);
  };

  const validationDialog = (
    <Dialog
      open={validationDialogOpen}
      keepMounted
      onClose={handleValidationDialogClose}>
      <DialogContent>
        <div className={classes.validationText}>Please select a mood</div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {loading && <Loader />}
      <div className={classes.header}>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <IconButton style={{ padding: '0' }} onClick={() => history.goBack()}>
            <Close className={classes.headerIcon} />
          </IconButton>
          <span className={classes.headerText}>Add Journal</span>
        </div>
        <IconButton onClick={handleCreateJournal}>
          <Check
            className={clsx(
              formState.isValid ? classes.activeCheck : classes.inActiveCheck
            )}
          />
        </IconButton>
      </div>
      <div className={classes.container}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 0',
            justifyContent: 'space-between'
          }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CalendarToday style={{ fill: '#003E1F' }} />
            <span className={classes.dateTimeText}>{journal.date}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AccessTime style={{ fill: '#003E1F' }} />
            <span className={classes.dateTimeText}>{journal.time}</span>
          </div>
        </div>
        {/* <TextField
          error={hasError('title')}
          name="title"
          variant="outlined"
          placeholder="Please write journal title here"
          value={journal.title}
          autoComplete="off"
          className={classes.textField}
          style={{ marginTop: '15px' }}
          onChange={handleInputFieldChange}
          inputProps={{ maxLength: 120 }}
        /> */}

        <TextField
          error={hasError('journalText')}
          name="journalText"
          variant="outlined"
          placeholder="Type your journal here. It can be your thoughts, experiences or realisations."
          multiline
          value={journal.journalText}
          autoComplete="off"
          rows="6"
          style={{ marginTop: '15px' }}
          className={classes.textField}
          onChange={handleInputFieldChange}
          inputProps={{ maxLength: 1000 }}
        />
        <Moods />
        <Image />
        <Share />
        <div style={{ margin: '20px 0' }}>
          <Button type="primary" click={handleCreateJournal}>
            Save journal
          </Button>
        </div>
      </div>
      {validationDialogOpen && validationDialog}
    </>
  );
};

export default SmallForm;
