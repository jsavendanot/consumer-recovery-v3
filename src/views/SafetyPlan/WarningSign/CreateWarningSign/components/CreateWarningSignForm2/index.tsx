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

const CreateWarningSignForm2: React.FC<Props> = ({
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
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAABs1BMVEUAAAD///////////+////M/8zV/9Xb/9vf/9/j/+PM5ubR6OjV6urY6+vP79/S8OHV8ePX8uTZ8ubb8+fT9N7Z9uPT9uXV7ubX79/Y8ODS8OHV8ePW8ePX8uTY8uXS8ubW8+LX9OPT9OPV9OTX8OHT8OLV8ePV8ePU8uXV8uHT8+PU8+TV8+TV9OTV8ePV8ePU8uXV8uLW8uPU8+PV8+TV8+TW8+LW8+LU8eLV8ePV8ePW8eTV8uLV8+TV8+TV8+TW8+LW8+LU8+LW8eTW8uPU8uPV8uPV8uTV8uTW8+LU8+LV8ePW8eTU8eTV8eTW8uPV8uPV8uTW8uLU8+LV8+PV8eTV8eLV8uLW8uPU8uPV8uPU8uLV8uPV8+PV8uPV8uPV8uPV8uTV8uLV8uPV8uPV8uPV8uPV8uPV8uTV8uLW8uPV8uPV8uPV8+TV8ePV8uPV8uPV8uPV8uPV8uPV8uPV8uPV8uPV8uTV8+PV8ePV8uPV8uPV8uPV8uTV8uPV8uPV8uPV8uPV8uPV8uPV8uPV8uPV8uPV8+PV8uPV8uPV8uPV8uPV8uPV8uPV8uPV8uPV8uNopdzpAAAAkHRSTlMAAQIDBAUGBwgJCgsMDRAREhMUFRcbHR4gISIkJSYnKCwtLjAzNDY3OzxAQUJDSElNT1FTVFZXWFlaXF5iZmdoaWprcHZ3eHl6fH2BgoOEiIuMjo+SlpeYmpudoaKkrq+wsbK0t8DBwsPExcfIzM7Q0tPU19jb3N/h4uPl5+jp6+zt7u/w8vP19vf5+vv8/f542lvsAAAAAWJLR0QB/wIt3gAAAfxJREFUGBl1wYdCUgEABdALQYL5sEFahnuUmkVqilaGOcKGSgyjqVlImUQkFuKoDDNA3/3kfBsRz0GRyt5gdOMvf6++HW9FWQ2RLA1JbwVKVYcPKH6c6qmpNFW3eOY2yXQfjupcZy7sgs7SFydfV6HIUI6xRhxhHsky7oRu6IB+C0rVrzIhQNWZ5wTKuJDkvBmys+v0o6y6bT6BbI4xC3RXX56Crms/34xDDQe5Rhg+8w4MQS7iUIRhGG6R309Dd35XbAHOZEUXdOYvJO/DEGQA6OUnGDw8lLFD1840EOQUZI62274XG5TEnj24ccUKiWmLLkTZA8lzlsh1QLLAfmRYA8m1HR713g7JLCexRztkTRkWe1MB2SRnUKAFistrNITNUIwxgD90QHVxjRo/NI/4FN/YDE2MmgFoIhzFPD1QmXaomYZmmdcxzjmoLlH3DiohXxDQyk0LFG6SudDACskfUA0zCiDJfih8zIVrAZN7haIDiiXeA+Bl3AzZzUAtZCZ3xAZZN38KAGxpjuAE1gQfQtLHbD3KCzFlg+wVU06Uc5f/OqCoivNrHY7zFsRBaJwJbnehhDVE0QeDsMD94DkU605wbxDFzI/z3A22m6CoGl4iU20o0bQoklsLsxNjU5HlAvnLZ8NxLYE0VYUPIwJO4OqfmAlMj/YIKPYf4h/HTJpAjBAAAAAASUVORK5CYII="
              alt=""
              style={{ marginRight: '20px' }}
            />
            <span className={classes.title}>
              If I start having difficulties, my plan will be to...
            </span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <div className={classes.strenghtContainer}>
                <span className={classes.label}>
                  What are the strategies or actions you can try if you start
                  having difficulties?
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

export default CreateWarningSignForm2;
