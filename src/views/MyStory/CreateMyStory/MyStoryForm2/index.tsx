import React, { useState, ChangeEvent, useEffect } from 'react';
import validate from 'validate.js';
import uuid from 'uuid/v1';
import { useDispatch, useSelector } from 'react-redux';
import { addMyStrengths } from 'slices/story/action';
import { RootState } from 'reducer';
import { Strength, Suggestion } from 'types/story';

import { makeStyles, useTheme } from '@material-ui/styles';
import useRouter from 'common/utils/useRouter';
import {
  Grid,
  Divider,
  TextField,
  Chip,
  Dialog,
  DialogContent,
  useMediaQuery,
  Theme,
  IconButton
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { Button, YesNoConfirmation } from 'common/components';
import Navigation from '../../Navigation';
import Suggestions from './Suggestions';

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '40px'
  },
  strenghtContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '40px'
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
    color: '#73BA9B',
    marginBottom: '20px'
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '193.69%',
    color: '#73BA9B'
  },
  buttonContainer: {
    width: '100%',
    padding: '0 40px'
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  keywords: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px'
  },
  chips: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing(1),
    color: '#73BA9B'
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
  strength: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 1000
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    strength?: string;
  };
  touched: {
    strength?: boolean;
  };
  errors: {
    strength?: string[];
  };
};

const MyStoryForm2: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const strengthsState: Strength[] = useSelector(
    (state: RootState) => state.story.strengths
  );

  const [strength, setStrength] = useState('');
  const [strengths, setStrengths] = useState<Strength[]>(strengthsState);

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
    setStrength(event.target.value);
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  /** Theme */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const addInputButton = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        strength: strength
      },
      touched: {
        ...formState.touched,
        strength: true
      }
    }));

    if (formState.isValid && formState.values.strength) {
      setStrengths(values => [
        ...values,
        { id: uuid(), name: formState.values.strength! }
      ]);
    }
    setStrength('');
  };

  const addFromSuggestions = (suggestions: Suggestion[]) => {
    suggestions.forEach(suggestion => {
      const s = strengths.find(value => value.id === suggestion.id);
      if (s === undefined) {
        setStrengths(values => [...values, suggestion]);
      }
    });
  };

  const handleDelete = (id: string) => {
    setStrengths(strengths => strengths.filter(s => id !== s.id));
  };

  /** Dialog */
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const save = () => {
    if (strengths.length > 0) {
      dispatch(addMyStrengths(strengths));
      history.push('/story');
    }
  };

  const suggesionsDialog = (
    <Dialog
      open={open}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleClose}>
      <DialogContent>
        <Suggestions
          close={handleClose}
          add={values => addFromSuggestions(values)}
          startIndex={strengths.length}
        />
      </DialogContent>
    </Dialog>
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
      action={() => history.push('/story')}>
      <span className={classes.confirmTitle}>
        Are you sure you want to
        <br />
        leave this page?
      </span>
    </YesNoConfirmation>
  );

  return (
    <Grid container>
      <Grid item xs={12} style={{ background: '#73BA9B' }}>
        <Navigation
          save={save}
          back={openCancelConfirmHandler}
          active={strengths.length > 0}
        />
      </Grid>
      <Grid item xs={12} style={{ background: '#73BA9B' }}>
        <div className={classes.titleContainer}>
          <span className={classes.title}>
            What are your current strengths?
          </span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <div className={classes.formGroup}>
              <span className={classes.label}>
                Strengths that I have or can build on include:
              </span>
              <div className={classes.buttonContainer}>
                <Button type="secondary" click={handleClickOpen}>
                  <div className={classes.buttonContent}>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAMAAAB1/u6nAAABOFBMVEUAAAAA//+AgIBmzJmAqqpttpKAv5+As5l0uaJqv5VttqR3u5lwv594tJZzv5lttp5wuJlxvZd2tptzvZxwt5d0uZtxvJ5xuJx1uphyvJp2t51zuZlzvJ50vJtyuJ1zuZtxup10uZl0u5t0uZt0vJpzuZpyuZp0uZx0uppzuZtyupxzuptzuZpyuppzuZtyupxzuppyu5x0uZt0uppzu5tyu5tzuppzuZtyupx0upxyuptzuZtyuppzuptzu5p0uZtzu5tzupt0uZxyuptyuZtzupx0uZtzuptzuptzu5pzuptzupxzuZtzuptzupp0uptzuptzuptzuptzuptyuptzuZtzuptzuptzuptzuptzuptzuppzuptzuptyuptzuptzuptzuptzuptzuptzuptzuptzupv////sdaubAAAAZnRSTlMAAQIFBgcICgsMDg8QERQVGRscHyAhIiQlJicoKi4vMzQ3QEJESUxNUVRVWVtgZmdodHV3eHuBh4iNkZKTm52hqKusrrCxt7y9vr/Dxs7V1tfd3uDh5+jr7e7w8fP09fb4+fr7/P730DuKAAAAAWJLR0RnW9PpswAAAP5JREFUGBlVwYlCAQEUQNFrS4qQMC0SERWjQmkTbUqb0h5K5f3/J2QmM+UcwF5NAWPpwsaKG0hV7Wi8jW5kZKstfR/bzki34UXnK45fynl6ajJ51LuaKPownPTWLWhWv2oWDEnZY6AgyxiOX5wM2B9OMTxVMB200ahqmM8dTFsyGlZVRDJ0ypjKHUtGhFDIxdmdlQHr/QWuUAjNmmQZyIqKwXbTiqGbfbu2YVIen2fo89y+zvHPwnuNvt3vRUzxuptNCYKjVcZdj6Pzt5sB5uWwVNqXJQLNth9dLgiK6GIQzPFHkbzHk5dphilSUdWKKAxTRKcwzBFNNBqJqINfP/b7LF0PQyAgAAAAAElFTkSuQmCC"
                      alt=""
                      style={{ marginRight: '4px' }}
                    />
                    <span className={classes.text}>Pick from suggestions</span>
                  </div>
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.strenghtContainer}>
              <span className={classes.label}>Write your strength here</span>
              <div className={classes.keywords}>
                <TextField
                  error={hasError('strength')}
                  fullWidth
                  label=""
                  name="strength"
                  autoComplete="off"
                  value={strength}
                  placeholder="Enter your strength"
                  className={classes.textField}
                  onChange={handleChange}
                  inputProps={{ maxLength: 100 }}
                />
                <IconButton
                  style={{ marginLeft: '10px' }}
                  onClick={addInputButton}>
                  <span className={classes.text}>add</span>
                </IconButton>
              </div>
              <Divider />
              <div className={classes.chips}>
                {strengths.map(value => (
                  <Chip
                    key={value.id}
                    className={classes.chip}
                    deleteIcon={<Close />}
                    label={value.name}
                    onDelete={() => handleDelete(value.id)}
                  />
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      {open && suggesionsDialog}
      {openCancelConfirm && confirmCancelDialog}
    </Grid>
  );
};

export default MyStoryForm2;
