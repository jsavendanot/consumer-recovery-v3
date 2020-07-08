import React, {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useEffect
} from 'react';
import uuid from 'uuid/v1';
import { Item } from 'types/safety';

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
  index: number;
  next: () => void;
  back: () => void;
  setValues: Dispatch<SetStateAction<Item[]>>;
  remove: (value: string) => void;
  values: Item[];
};

const CreateWarningSignForm1: React.FC<Props> = ({
  newInputValue,
  setNewInputValue,
  index,
  next,
  back,
  values,
  setValues,
  remove
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
          <Navigation index={index} next={next} back={back} active />
        </Grid>
        <Grid item xs={12} style={{ background: '#73BA9B' }}>
          <div className={classes.titleContainer}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAADdElEQVRYhb2YT4hVdRTHP7/HWKYz6mQhLSyKcSzMsShDEFLRCFolU5FWiyAZp03LqCxChGgxaRI51C7aBG1c1CaIGpJqkWUmKUaU/Ru0qXAqx8b8tHjn8W6Pee/d38yrA4/77rm/8znfe36/+3vnvkSGqQuAO4FNwBqgH1gELAB+BU4DXwIfAu+klD7N4ZcV0a++qp41z46pw+r8TojoVV9W/w74RfWQ+rS6WV2uLlRTjB1Qt6mj6nhB1Hfq4FyErFdPBey8ekBdkRHfpQ6qhwuiXle7c4XcHwJUP1BvyL6bOquiDhWm+BN1WY6Q2rSMqF2zFdLAXakeD+7nak+7gPWFijzRCREN/CvVL4J/UK00G9hbWCMjnRZSyHOteiby7G426EBhjXRkaloI2qheUKfV1Y0X++Pi+bks1kxB++Pm36r5Ulx4BdgBjKaUhkuAtgLNqvdHSuntEoylwDfAQuDmlNIRYtM6a3VDK7WPqL/b3L4uwwhOrTp7a46t4TiUAdmkbil89hbEvJjBuSViTjWq21UW0gB8SP0rKvtsZmyy/rOxAvX9ONkyCyGPhYgpdVtufDAORv57K0Bf+E9kQvYA+wCBZ4B3ZyOmkLevAvTGyc+ZkDviWAGeB35Q31CvyORMxHFJFzAvTqYzIU8ClwOXUG20HgXuA64Cbs/gTMXxUtTfYs6WZIr5l6k7Ck/Uuoy4XRGzpwKMh3/5XMQAY4Xv12fEXR3HnyrA8Ti5cY5iihtmzvqr5T2B+niUabRstPpmbHSb1XXqI+r3wflWvawkpzv2qGl1EepNARm3xK+1ulg96sz2mboq46a2R9xY0XksnPdkgAbUB622lHerA2VjC4z3Iu/OonM4nIdt1n112NQNkXPCYguqzrfe5Q39D0LmxZSqPjXTgMG4OKmu/I/FvBS5vrLZC576Wgw6adnXiXwhD0eOc+ptrQZ2W3/pOqpe12EhQ9bbje1lApYVHt0z6oYOiOgqTM3FGddJi+Ae633GBasN2NJZCtmoHgnWn6UqMgOkou6OstYW9n71VjW1ie1WH7DeuNUW69pWcS2hAV4NPAfcVRh/GviIamM0AZwDeoBrgFXAWuqtyS/AC8BISmmKTpi6Rt1n9e+Ndjatjqk7bfdOXbC2lWkirJ9qQ9UHLKb6z9Uk8CPVan2cUprM5f4DFP5/nOFrk40AAAAASUVORK5CYII="
              alt=""
              style={{ marginRight: '20px' }}
            />
            <span className={classes.title}>
              Warning signs I may be having difficulty
            </span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <div className={classes.strenghtContainer}>
                <span className={classes.label}>
                  What are the things you or others may notice when you are
                  unwell?
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

export default CreateWarningSignForm1;
