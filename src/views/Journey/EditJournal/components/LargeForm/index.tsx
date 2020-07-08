import React, { useContext, useState, useEffect, ChangeEvent } from 'react';
import moment from 'moment';
import useRouter from 'common/utils/useRouter';
import JournalContext from '../../JournalContext';
import { useDispatch, useSelector } from 'react-redux';
import { updateJournal } from 'slices/journey/action';
import validate from 'validate.js';

import useInterval from 'common/hooks/useInterval';

import { makeStyles } from '@material-ui/styles';
import {
  IconButton,
  TextField,
  Grid,
  Theme,
  Dialog,
  DialogContent
} from '@material-ui/core';
import {
  CalendarToday,
  AccessTime,
  KeyboardArrowLeft
} from '@material-ui/icons';

import {
  Button,
  Loader,
  YesNoConfirmation,
  SubmitConfirmation
} from 'common/components';
import { Moods, Share, Image } from '../components';
import { RootState } from 'reducer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '45px'
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
    fill: '#003E1F',
    margin: '0 10px'
  },
  backText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F'
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '48px',
    lineHeight: '58px',
    color: '#37474F'
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
    marginLeft: '6px'
  },
  textField: {
    width: '100%',
    margin: '10px 0',
    backgroundColor: '#FFFAE9'
  },
  cancelText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F',
    marginRight: '100px',
    cursor: 'pointer'
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
  }
}));

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

const LargeForm: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const { journal, setJournal } = useContext(JournalContext);

  const loading: boolean = useSelector(
    (state: RootState) => state.journeyRoot.journey.loading
  );

  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {
      title: journal.title,
      journalText: journal.journalText
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
    dispatch(updateJournal(history, journal));
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

  /** YesNoConfirmation Dialog */
  const [openConfirm, setOpenConfirm] = useState(false);

  function openConfirmHandler() {
    const errors = validate(formState.values, schema);

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

    if (!errors) {
      if (journal.feeling !== '') {
        setOpenConfirm(true);
      } else {
        setValidationDialogOpen(true);
      }
    }
  }

  function closeConfirmHandler() {
    setOpenConfirm(false);
  }

  const confirmDialog = (
    <SubmitConfirmation
      open={openConfirm}
      close={closeConfirmHandler}
      action={handleCreateJournal}
      donRedirect>
      <span className={classes.confirmTitle}>
        Are you sure you want to
        <br />
        update this journal?
      </span>
    </SubmitConfirmation>
  );

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
      action={() => history.goBack()}>
      <span className={classes.confirmTitle}>
        Are you sure you want to
        <br />
        leave this page?
      </span>
    </YesNoConfirmation>
  );

  return (
    <>
      {loading && <Loader />}
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <div className={classes.header}>
              <IconButton
                style={{ padding: '0' }}
                onClick={openCancelConfirmHandler}>
                <KeyboardArrowLeft className={classes.headerIcon} />
              </IconButton>
              <span className={classes.backText}>Back</span>
            </div>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={3} justify="space-between">
              <Grid item xs={12}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '40px 0'
                  }}>
                  <span className={classes.headerText}>Update Journal</span>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '20px',
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
              </Grid>
              <Grid item xs={5}>
                <Image />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={hasError('title')}
                  name="title"
                  variant="outlined"
                  placeholder="Please write journal title here"
                  value={journal.title}
                  autoComplete="off"
                  className={classes.textField}
                  style={{ margin: '0' }}
                  onChange={handleInputFieldChange}
                  inputProps={{ maxLength: 120 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={hasError('journalText')}
                  name="journalText"
                  variant="outlined"
                  placeholder="Please write something for your journal"
                  multiline
                  value={journal.journalText}
                  autoComplete="off"
                  rows="6"
                  style={{ marginTop: '15px' }}
                  className={classes.textField}
                  onChange={handleInputFieldChange}
                  inputProps={{ maxLength: 1000 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="flex-start" justify="space-between">
                  <Grid item xs={5}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Moods />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={5}>
                    <Share />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '20px 0'
                    }}>
                    <span
                      className={classes.cancelText}
                      onClick={openCancelConfirmHandler}>
                      Cancel
                    </span>
                    <div style={{ width: '30%' }}>
                      <Button type="primary" click={openConfirmHandler}>
                        Update journal
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {validationDialogOpen && validationDialog}
      {openConfirm && confirmDialog}
      {openCancelConfirm && confirmCancelDialog}
    </>
  );
};

export default LargeForm;
