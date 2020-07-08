import React, { useState, ChangeEvent, useEffect } from 'react';

import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  TextField,
  IconButton,
  Dialog,
  DialogContent,
  Slide,
  Theme
} from '@material-ui/core';
import { Phone, KeyboardArrowRight } from '@material-ui/icons';
import SelectContactType from './SelectContactType';
import AddNumber from './AddNumber';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { Network } from 'types/network';
import produce from 'immer';

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
  keywords: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px'
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: '5px',
    borderStyle: 'none'
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
  bottomDialog: {
    [theme.breakpoints.up('xs')]: {
      bottom: '0',
      right: '0',
      width: '100%',
      position: 'fixed',
      background: '#FFFFFF',
      borderRadius: '12px 12px 0px 0px'
    },
    [theme.breakpoints.up('sm')]: {
      width: '500px',
      height: '270px',
      position: 'relative',
      background: '#FFFFFF',
      padding: '20',
      borderRadius: '12px'
    }
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

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

type Props = {
  addToList: (network: Network) => void;
  openSuggestion: () => void;
  type: 'Person' | 'Organisation';
};

const AddSupport: React.FC<Props> = ({ addToList, openSuggestion, type }) => {
  const classes = useStyles();

  const [network, setNetwork] = useState<Network>({
    Id: '',
    UserId: sessionStorage.getItem('UserId')!,
    ContactId: '',
    Name: '',
    Email: '',
    Phone: '',
    CallForSupport: true,
    Address: '',
    Type: type,
    Relationship: '',
    Image: '',
    ImageType: '',
    ImageUrl: ''
  });

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
        draft.Name = event.target.value;
      })
    );
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  const saveNetwork = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        inputValue: network.Name
      },
      touched: {
        ...formState.touched,
        inputValue: true
      }
    }));

    if (formState.isValid) {
      addToList(network);
      setNetwork({
        Id: '',
        UserId: sessionStorage.getItem('UserId')!,
        ContactId: '',
        Name: '',
        Email: '',
        Phone: '',
        CallForSupport: true,
        Address: '',
        Type: type,
        Relationship: '',
        Image: '',
        ImageType: '',
        ImageUrl: ''
      });
    }
  };

  /** Dialog for Select Contact Type*/
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const showAddNumberDialog = () => {
    handleClose();
    handleClickOpen3();
  };

  /** Dialog for Enter number */
  const [open3, setOpen3] = useState(false);
  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const selectContactTypeDialog = (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}>
      <DialogContent className={classes.bottomDialog}>
        <SelectContactType
          clickNumber={showAddNumberDialog}
          close={handleClose}
          openSuggestion={openSuggestion}
        />
      </DialogContent>
    </Dialog>
  );

  const addNumberDialog = (
    <Dialog
      open={open3}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose3}>
      <DialogContent className={classes.bottomDialog}>
        <AddNumber
          save={saveNetwork}
          close={handleClose3}
          setNetwork={setNetwork}
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
            value={network.Name}
            placeholder="Please type name here"
            className={classes.textField}
            onChange={handleChange}
            inputProps={{ maxLength: 100 }}
          />
        </div>
        <div className={classes.responsibleContainer}>
          <div className={classes.flexContainer}>
            <IconButton style={{ padding: '0', marginRight: '8px' }}>
              <Phone style={{ fill: '#73BA9B' }} />
            </IconButton>
            <span className={classes.label}>Contact number</span>
          </div>
          <IconButton onClick={handleClickOpen}>
            <KeyboardArrowRight fontSize="large" style={{ fill: '#73BA9B' }} />
          </IconButton>
        </div>
      </div>
      {open && selectContactTypeDialog}
      {open3 && addNumberDialog}
    </>
  );
};

export default AddSupport;
