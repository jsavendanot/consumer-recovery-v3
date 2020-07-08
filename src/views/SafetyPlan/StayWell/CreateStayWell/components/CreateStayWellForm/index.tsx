import React, {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
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
  saveText: {
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

const CreateStayWellForm: React.FC<Props> = ({
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
      setValues(values => [...values, { id: uuid(), name: newInputValue! }]);
    }
    setNewInputValue('');
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ background: '#73BA9B' }}>
          <Navigation back={back} next={next} active />
        </Grid>
        <Grid item xs={12} style={{ background: '#73BA9B' }}>
          <div className={classes.titleContainer}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAADL0lEQVRYhcWYS2idRRTHf/Nxi6FN1VCkqyiVNMVHTcFWFxVbcSEIghIKWldujKUL10W66cZVVIIY0Y2IuHJTRFyIC4tVKxjru8FurFBjbRWM2kdqfi6+83E/w33NzdWczTCP8z+/b2buzJmbyDB1PfAAcB8wAYwD1wLrgd+Ac8B3wMfAeymlz3P0e4UYV19VfzfPvlEPqEODgBhRX1L/DvFl9bh6WL1fHVU3qCnG3qE+pr6sLtSgflQnVwOyWz0TYpfVWXVrhn9DnVTnalBvqMO5II8GgOqH6i3ZX9PUKtSp2hJ/pm7OAamWZVpt9AuyQnebeip0v1Q3dnPYXZuRQ4OAWKF/g/p16B9Vi3YDR2p7ZHrQILU4W9RfIs6RdoNma3tkIEvTAWivelVdUrev7ByPzsur2ayZQDPx8e+s7HglOmb7EL1b3ac+lOm3SV20PLsmqsYN8bNbzjlHwvfpmFHVszm+4V/NzvNVwyPRcDxDJKmv+W/rB+bO8D0DUFBeegDv9iqSUhI4D3wEvJ8LUbM54GdgVN1aUN6+AJ9kCh0C7gV+6JckPupEVHc0gLGozGcKLQGo/bJUVsUdK4CRqJxfrWqfdiHK6wtgXVSW1gjmUpTXFMCfUcm72gdn1YX5RwEsRGV0jWBujPKnAjgVldvXCKaKO19QJs8Ae3IU1DF1H7AlmobiWrgnQ2MY2AlcBT5F3RGn4ELOba0etLW9naGxP3yOATRSSifVb4FbgYeBt3rUOkrrsynniHgyyjfrhAeCcM522deATd0TMS9YT0HVIZtZ3tT/ALJOPRnxnmk1YDI6F9Vt/zHMixHrtO0eeOrrMeh7e31O5IM8ETEuqnd1Gjhs89H1lXrzgEGm1CuWidz+Xhw2B4iWWXzW+dNGs1FbmuWW+6SD80bLd42WaeWMuqlPkL3qF6H1V08z0kKkUI/EtFYbe0bdqaYuvsPq4+oHNu20uquTX0fREN4OPAs8WBt/jjIznKfMRy5S3r43AbcBu2imJr8CzwHTKaVLDMLUCfUFy783utmSekx9ym5v6pp1nZk2YOOUufMYcB3lP1eLwFnK2TqRUlrM1f0HyP3EYpdho2YAAAAASUVORK5CYII="
              alt=""
              style={{ marginRight: '20px' }}
            />
            <span className={classes.title}>Things I do to stay well</span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <div className={classes.strenghtContainer}>
                <span className={classes.label}>
                  What are the things that you can do to be and stay well?
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

export default CreateStayWellForm;
