import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction
} from 'react';

import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField } from '@material-ui/core';

import { Button } from 'common/components';
import { Network } from 'types/network';
import produce from 'immer';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 10px',
    marginBottom: '10px'
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#73BA9B'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px'
  },
  buttonContainer: {
    display: 'flex',
    width: '100%'
  },
  buttonContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F'
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: '5px',
    borderStyle: 'none'
  }
}));

const schema = {
  phone: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 15
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    phone?: string;
  };
  touched: {
    phone?: boolean;
  };
  errors: {
    phone?: string[];
  };
};

type Props = {
  close: () => void;
  save: () => void;
  setNetwork: Dispatch<SetStateAction<Network>>;
};

const AddNumber: React.FC<Props> = ({ save, close, setNetwork }) => {
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

    setNetwork(
      produce((draft: Network) => {
        draft.Phone = event.target.value;
      })
    );
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  const handleSave = () => {
    save();
    handleClose();
  };

  const handleClose = () => {
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
    close();
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={12} xl={12}>
        <div className={classes.header}>
          <span className={classes.headerText}>Add a number</span>
        </div>
      </Grid>
      <Grid item xs={12} md={12} xl={12}>
        <TextField
          error={hasError('phone')}
          fullWidth
          variant="outlined"
          label="Enter phone number"
          name="phone"
          autoComplete="off"
          value={formState.values.phone || ''}
          className={classes.textField}
          onChange={handleChange}
          inputProps={{ maxLength: 15 }}
        />
      </Grid>
      <Grid item xs={12} md={12} xl={12}>
        <div className={classes.buttonContainer}>
          <div className={classes.buttonContent}>
            <span className={classes.buttonText} onClick={handleClose}>
              Cancel
            </span>
          </div>
          <div className={classes.buttonContent}>
            <Button
              type="extra"
              disabled={!formState.isValid}
              click={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default AddNumber;
