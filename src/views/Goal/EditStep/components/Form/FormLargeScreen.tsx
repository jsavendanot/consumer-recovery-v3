import React, { useState, useContext, ChangeEvent, useEffect } from 'react';
import useRouter from 'common/utils/useRouter';
import GoalContext from '../../GoalContext';
import { GoalForm, StepForm as StepFormType } from 'types/goal';
import { FocusArea } from 'types/other';
import validate from 'validate.js';

import { makeStyles } from '@material-ui/styles';
import {
  IconButton,
  TextField,
  Theme,
  Dialog,
  DialogContent
} from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import produce from 'immer';

import { Button, YesNoConfirmation } from 'common/components';
import { Deadline, GoalImage, StepForm, Tips } from './components';

const useStyles = makeStyles((theme: Theme) => ({
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
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '48px',
    lineHeight: '58px',
    color: '#37474F'
  },
  backText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
    color: '#003E1F'
  },
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    padding: '20px 10%'
  },
  container: {
    width: '80%',
    padding: '0 10px'
  },
  tips: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '77px',
    padding: '3px',
    border: '1px solid #73BA9B',
    boxSizing: 'border-box',
    borderRadius: '31px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '193.69%',
    color: '#73BA9B',
    cursor: 'pointer'
  },
  textField: {
    width: '100%',
    margin: '10px 0 30px'
  },
  subTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '25px',
    color: '#003E1F',
    margin: '5px 0'
  },
  goalDesc: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '23px',
    color: '#323F45'
  },
  cancelText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F',
    marginRight: '100px'
  },
  stepValidation: {
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
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 120
    }
  },
  desc: {
    presence: false,
    length: {
      maximum: 1000
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    name?: string;
    desc?: string;
  };
  touched: {
    name?: boolean;
    desc?: boolean;
  };
  errors: {
    name?: string[];
    desc?: string[];
  };
};

const FormLargeScreen: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const { goal, step, setGoal, setConfirm } = useContext(GoalContext!);

  const [focusAreas] = useState<FocusArea[]>(
    JSON.parse(sessionStorage.getItem('focusAreas')!)
  );

  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {
      name: goal.name,
      desc: goal.desc
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

    handleGoalField(event.target.name as 'name' | 'desc', event.target.value);
  };

  const handleGoalField = (field: 'name' | 'desc', value: string) => {
    if (field === 'name') {
      setGoal(
        produce((draft: GoalForm) => {
          draft.name = value;
        })
      );
    }
    if (field === 'desc') {
      setGoal(
        produce((draft: GoalForm) => {
          draft.desc = value;
        })
      );
    }
  };

  /** Create goal handler */
  const handleClickCreateGoalButton = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        name: goal.name,
        desc: goal.desc
      },
      touched: {
        ...formState.touched,
        name: true,
        desc: true
      }
    }));

    if (formState.isValid) {
      if (step.name === '' && goal.steps.length === 0) {
        setValidationDialogOpen(true);
      } else {
        if (step.name !== '') {
          setGoal(
            produce((draft: GoalForm) => {
              const selectedIndex = draft.steps.findIndex(
                item => item.id === step.id
              );
              let newSelectedStep: StepFormType[] = [];
              if (selectedIndex === -1) {
                newSelectedStep = newSelectedStep.concat(draft.steps, step);
              } else if (selectedIndex === 0) {
                newSelectedStep = newSelectedStep.concat(draft.steps.slice(1));
                newSelectedStep.push(step);
              } else if (selectedIndex === draft.steps.length - 1) {
                newSelectedStep = newSelectedStep.concat(
                  draft.steps.slice(0, -1)
                );
                newSelectedStep.push(step);
              } else if (selectedIndex > 0) {
                newSelectedStep = newSelectedStep.concat(
                  draft.steps.slice(0, selectedIndex),
                  draft.steps.slice(selectedIndex + 1)
                );
                newSelectedStep.push(step);
              }
              draft.steps = newSelectedStep;
            })
          );
        }
        setConfirm(true);
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

  const addStepValidationDialog = (
    <Dialog
      open={validationDialogOpen}
      keepMounted
      onClose={handleValidationDialogClose}>
      <DialogContent>
        <div className={classes.stepValidation}>
          Please add at least one step to your goal
        </div>
      </DialogContent>
    </Dialog>
  );

  /** Dialog */
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  /** Confirm Dialog */
  const [openConfirm, setOpenConfirm] = useState(false);

  function openConfirmHandler() {
    setOpenConfirm(true);
  }

  function closeConfirmHandler() {
    setOpenConfirm(false);
  }

  const confirmDialog = (
    <YesNoConfirmation
      open={openConfirm}
      close={closeConfirmHandler}
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
      <div className={classes.root}>
        <div className={classes.header}>
          <IconButton style={{ padding: '0' }} onClick={openConfirmHandler}>
            <KeyboardArrowLeft className={classes.headerIcon} />
          </IconButton>
          <span className={classes.backText}>Back</span>
        </div>
        <div className={classes.container}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '40px 0'
            }}>
            <span className={classes.headerText}>Update Step</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <span className={classes.title}>What is your goal?</span>
            <div className={classes.tips} onClick={handleClickOpen}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABSlBMVEUAAAAA//+AgIBVqqqAv4BmzJlxxo52sZ1ttqR3u5lxuJxvvJtwuJl2up1xvZdyuZ53u5lzvZx0uZt1vZl1uph2t510vJtyuJ11uppyu5x1uJl0uZlyu5tzu5lyuJ1yupxzuZtzu5p0u5xyuZp0u5pzuptzuZxzuZtyupxzuppzuZp0u5xzu5p0uZtzuZxzupx0uppzuptzuZpyupt0uZt0uptzu5xzuptzupp0uZpzu5pzuZtzuptyuZxyuptzupt0uZtzuptzuptyuZtzupxzuptzu5t0uptzupxzuptyuppzuptzuZtzu5pyu5tzuptzupxzuptzuptzuppzuptzuptzupt0uptzuptzuZtzuptzuptzupt0uptzuptzuptzuppzuptzuptyuptzuptzuptzuptzuptzuptzuptzuptzuptzupv///+hDSIGAAAAbHRSTlMAAQIDBAUJDQ4PEhcZGhsdHh8hIyUnLi8wMTI3ODxBQ0VHS0xWWV9mZ2hqbG1ucXZ3enx9gIKDhYmLjpKXmpyeoamrsLGys7W2uLm6u77Cx8jJz9DS09TW29zj5ebq7O7x8/T19/j5+vv8/f4m3PvVAAAAAWJLR0RtuwYArQAAANdJREFUGBkFwUVCAgAAALARFgZid2CAjZ0YWIio2C124f/PbhAEgCAQ2ktSO7mRHqtmPg1YeKyaev85Lby/JGNvIwDRudJKhMrl0kQUQMdvCpj5agSweR4EwrcrAO5mAZbPQFOix9sQwPiDgUStweKap1GAxQs7xW6wuw8IXKwBiP/1A8O/7QBkntug9XUVAOUnN2WErwtlAGJzgfrvXuKfDeGlCBC6vKpwfJBK5Y7U3R0C+mrIfhSLX1s0dwIgu04uDQDI3ufzT2kAwPR26TOTBADQ1QLgHy5MIJMp43oOAAAAAElFTkSuQmCC"
                alt=""
              />
              Tips
            </div>
          </div>
          <div style={{ padding: '10px 0 20px' }}>
            <span className={classes.goalDesc}>
              Make a meaningful goal that actually aligns to your ultimate life
              goal
            </span>
          </div>
          <TextField
            error={hasError('name')}
            name="name"
            variant="outlined"
            placeholder="You haven't entered the name of your goal!"
            value={goal.name}
            multiline
            className={classes.textField}
            onChange={handleInputFieldChange}
            inputProps={{ maxLength: 120, readOnly: true }}
          />
          <div style={{ width: '100%', display: 'flex' }}>
            <div style={{ width: '50%', paddingRight: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}>
                <span className={classes.subTitle}>Goal Description</span>
              </div>
              <TextField
                error={hasError('desc')}
                variant="outlined"
                placeholder="Why is this goal so important for you? What are the challenges?"
                multiline
                rows="12"
                name="desc"
                value={goal.desc}
                style={{ marginTop: '15px' }}
                className={classes.textField}
                onChange={handleInputFieldChange}
                inputProps={{ maxLength: 1000, readOnly: true }}
              />
            </div>
            <div style={{ width: '50%', paddingLeft: '10px' }}>
              <Deadline />
              <GoalImage
                focusArea={
                  focusAreas.find(area => area.id === goal.focusAreaId)!
                }
              />
            </div>
          </div>
          <StepForm />
          <div
            style={{
              width: '100%',
              margin: '70px 0 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <span className={classes.cancelText} onClick={openConfirmHandler}>
              Cancel
            </span>
            <div style={{ width: '30%' }}>
              <Button type="primary" click={handleClickCreateGoalButton}>
                Update step
              </Button>
            </div>
          </div>
        </div>
      </div>
      {open && <Tips open={open} close={handleClose} />}
      {validationDialogOpen && addStepValidationDialog}
      {openConfirm && confirmDialog}
    </>
  );
};

export default FormLargeScreen;
