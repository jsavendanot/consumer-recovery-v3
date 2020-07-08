import React, {
  useState,
  SetStateAction,
  Dispatch,
  ChangeEvent,
  useEffect
} from 'react';
import uuid from 'uuid/v1';
import { Item, Suggestion } from 'types/safety';

import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Divider,
  TextField,
  Chip,
  Theme,
  IconButton
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import Navigation from '../Navigation';

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
    alignItems: 'flex-start',
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
  saveText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '193.69%',
    color: '#73BA9B'
  }
}));

const schema = {
  inputValue: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 1000
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    inputValue?: string;
  };
  touched: {
    inputValue?: boolean;
  };
  errors: {
    inputValue?: string[];
  };
};

type Props = {
  newInputValue: string;
  setNewInputValue: Dispatch<SetStateAction<string>>;
  back: () => void;
  setValues: Dispatch<SetStateAction<Suggestion[]>>;
  remove: (id: string) => void;
  next: () => void;
  values: Item[];
};

const CreateStressForm: React.FC<Props> = ({
  newInputValue,
  setNewInputValue,
  back,
  values,
  setValues,
  remove,
  next
}) => {
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
    setNewInputValue(event.target.value);
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  const addInputButton = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        inputValue: newInputValue
      },
      touched: {
        ...formState.touched,
        inputValue: true
      }
    }));

    if (formState.isValid && newInputValue !== '') {
      setValues(values => [...values, { id: uuid(), name: newInputValue }]);
    }
    setNewInputValue('');
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ background: '#73BA9B' }}>
          <Navigation next={next} back={back} active />
        </Grid>
        <Grid item xs={12} style={{ background: '#73BA9B' }}>
          <div className={classes.titleContainer}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAADiElEQVRYhb2YQYhVVRjHf+f1JHFmrEFiVibJOFKpI+S0yGCsCEuIstmUrdw4uaxdVBBuWk3FFE3ULqIggogoiNokWhmkplYOCYJRDeoUNZba2Pxa3O/xLq9579375tW3OZx7zvc/v3vOuef7zk2UMHUFsB24AxgGhoCVwArgV+As8B3wOfBxSulIGf2iEEPqa+rvlrNv1L3q8m5A9Ksvq3+H+IJ6UH1avUtdrfaoKfpuUh9WX1FnclA/qGNLAdmqngmxy+qUuq6Ef1UdUw/noN5Qe8uCPBQAqgfUG0u/TV2roo7nlvgrdaAMSG1ZJtRqpyANuuvVk6F7TO1r57A1NyNPdAOiQf869UTov6dWmnXsz+2RiW6D5Ma5QT0X4+xr1mkqt0e6sjQtgLapV9R5dWNj41A0Xl7KZi0JNBkv/0Fjw6vRMFVCbI262+zMeUzdqa4s4b9KnTM7u4ZrD3vis1soeo4EwIL/tln17hJAtdl5vvZgZzw4WEJki/qhukNdq96uHgmd82pPQZ1bwudMI91TRWGaCG/PzdCdBX2S9bCxrkIWfQG+WAoMWeSu2eLnR4OllAQORXVzBRiMynSnFGanae3M+C03QBGrjTtYAfqjcr5DkAHgI2ADILAnpTRXQmI2ymurwLKozHcAsgl4H7geuAI8nlJ6u6TMpSivrgB/RKVUaI9P+ECAzAL3ppReLAkCUAuYFyrATFRWlwBZD7wbQieAkZTSJx2AQPYyAD9XgJNR2VBC4BmgBzgH3JNSOt0hSH7c6SpZ8nw/MAq8VVBgNMrjwG1qY/tnKaUf24mYZX1byPbbl6ib49CZKRqt1QuLhIK8PVhQZ1f03w9QTSkdVb8FbgIeAN4poHMfcFWL9mNFYIA9Ub6ZJ9wbhIdtln112dTRXHDtyzcst57ljf8PIMvUozHek4t1GIvGufh0/0uYl2KsUza74KmvR6fvLXqdKA+yO8a4qN7aqmOv9UvXcXVtl0HG1b/MErNdRRwGAkSzLH60rVN7zWpuaRYW3SctnPvM7jWaJeqT6qoOQbapX4fWn4VmZBGRirovprW2sSfNUs7UxrdXfUT91LqdUkda+bUUDeGNwLPAjlz/s2SZ4TRZxL5IFjTXADcDI9RTk1+A54CJlNIlumHqsPqC2e+Ndjav7lcftd2dOmdtZ6YJ2BBZ7jwIXEOW/84BP5HN1qGS2R4A/wBpFh+I/dCSRQAAAABJRU5ErkJggg=="
              alt=""
              style={{ marginRight: '20px' }}
            />
            <span className={classes.title}>Things that stress me</span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <div className={classes.strenghtContainer}>
                <span className={classes.label}>
                  What are the things that may value you or cause you to have
                  difficulties managing your issues?
                </span>
                <div className={classes.keywords}>
                  <TextField
                    error={hasError('inputValue')}
                    fullWidth
                    label=""
                    name="inputValue"
                    autoComplete="off"
                    value={newInputValue}
                    placeholder="Please type here"
                    className={classes.textField}
                    onChange={handleChange}
                    inputProps={{ maxLength: 100 }}
                  />
                  <IconButton
                    style={{ marginLeft: '10px' }}
                    onClick={addInputButton}>
                    <span className={classes.saveText}>Add</span>
                  </IconButton>
                </div>
                <Divider />
                <div className={classes.chips}>
                  {values.map(value => (
                    <Chip
                      key={value.id}
                      className={classes.chip}
                      deleteIcon={<Close />}
                      label={value.name}
                      onDelete={() => remove(value.id)}
                    />
                  ))}
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateStressForm;
