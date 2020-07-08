import React, {
  useState,
  ChangeEvent,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react';
import { Unwell } from 'types/safety';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  TextField,
  IconButton,
  Dialog,
  DialogContent,
  useMediaQuery,
  Theme
} from '@material-ui/core';
import { People, KeyboardArrowRight } from '@material-ui/icons';

import validate from 'validate.js';
import Responsible from './Responsible';
import { Network } from 'types/network';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import uuid from 'uuid';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '20px 0'
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '23px',
    color: '#73BA9B'
  },
  label2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#F79221',
    marginRight: '5px'
  },
  keywords: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px'
  },
  chips: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing(1),
    color: '#73BA9B',
    '& .MuiChip-label': {
      whiteSpace: 'normal'
    }
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: '5px',
    borderStyle: 'none'
  },
  saveTextRequired: {
    color: '#f44336'
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  responsibleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px'
  },
  addMore: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0'
  },
  arrowRight: {
    fill: '#73BA9B'
  },
  arrowRightRequired: {
    fill: '#f44336'
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
  formState: FormStateType;
  setFormState: Dispatch<SetStateAction<FormStateType>>;
  addToList: (value: Unwell) => void;
  value: Unwell;
  setValue: Dispatch<SetStateAction<Unwell>>;
};

const Responsibility: React.FC<Props> = ({
  formState,
  setFormState,
  value,
  setValue,
  addToList
}) => {
  const classes = useStyles();

  const networks: Network[] = useSelector(
    (state: RootState) => state.networkRoot.network.networks
  );

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values, setFormState]);

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
    setValue(oldValue => ({ ...oldValue, Name: event.target.value }));
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  const addFromList = (who: Network | undefined) => {
    if (who) {
      setValue(oldValue => ({
        ...oldValue,
        NetworkContactIdResponsible: who.Id
      }));
    } else {
      setValue(oldValue => ({
        ...oldValue,
        NetworkContactIdResponsible: ''
      }));
    }
  };

  const handleAdd = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        inputValue: value.Name
      },
      touched: {
        ...formState.touched,
        inputValue: true
      }
    }));

    if (formState.isValid) {
      addToList(value);
      setValue({
        UnwellId: uuid(),
        Name: '',
        Description: '',
        SafetyPlanId: sessionStorage.getItem('SafetyPlanId')!,
        NetworkContactIdResponsible: ''
      });
    }
  };

  /** Dialog */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const responsibleDialog = (
    <Dialog
      open={open}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleClose}>
      <DialogContent>
        <Responsible
          close={handleClose}
          add={who => addFromList(who)}
          value={value}
        />
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <div className={classes.container}>
        <div className={classes.keywords}>
          <TextField
            error={hasError('inputValue')}
            fullWidth
            label=""
            name="inputValue"
            autoComplete="off"
            value={value.Name}
            placeholder="Please type here"
            className={classes.textField}
            onChange={handleChange}
            inputProps={{ maxLength: 100 }}
          />
        </div>
        <div className={classes.responsibleContainer}>
          <div className={classes.flexContainer}>
            <IconButton style={{ padding: '0', marginRight: '5px' }}>
              <People style={{ fill: '#73BA9B' }} />
            </IconButton>
            <span className={classes.label}>Who is responsible?</span>
          </div>
          <IconButton onClick={handleClickOpen}>
            <KeyboardArrowRight
              fontSize="large"
              className={classes.arrowRight}
            />
          </IconButton>
        </div>
        <div className={classes.flexContainer} style={{ padding: '0 43px' }}>
          <span className={classes.label2}>
            {
              networks.find(
                item => item.Id === value.NetworkContactIdResponsible
              )?.Name
            }
          </span>
        </div>
      </div>
      <div className={classes.addMore}>
        <IconButton onClick={handleAdd}>
          <span className={classes.saveText}>Add</span>
        </IconButton>
      </div>
      {open && responsibleDialog}
    </>
  );
};

export default Responsibility;
