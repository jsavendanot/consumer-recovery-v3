import React, { useState } from 'react';
import { Step, GoalShareNetwork, StepShareNetwork, Goal } from 'types/goal';
import { useDispatch, useSelector } from 'react-redux';
import {
  stopSharingGoals,
  startSharingGoals
} from 'slices/network/access/goals/action';
import {
  startShareSteps,
  stopShareSteps
} from 'slices/network/access/steps/action';

import { makeStyles } from '@material-ui/styles';
import { TextField, InputAdornment, Theme } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { Button } from 'common/components';
import AccessGoalRow from './AccessGoalRow';
import { Network } from 'types/network';
import { RootState } from 'reducer';

const useStyles = makeStyles((theme: Theme) => ({
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '35px',
    color: '#73BA9B'
  },
  cancelText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F'
  },
  tableContainer: {
    overflowY: 'auto',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      height: '63vh',
      maxHeight: '63vh'
    },
    [theme.breakpoints.up('sm')]: {
      width: '60%',
      height: '63vh',
      maxHeight: '63vh'
    },
    [theme.breakpoints.up('md')]: {
      width: '55vw',
      height: '55vh',
      maxHeight: '55vh'
    },
    [theme.breakpoints.up('lg')]: {
      width: '40vw',
      height: '40vh',
      maxHeight: '40vh'
    }
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    [theme.breakpoints.up('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '60%'
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%'
    }
  },
  searchContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('xs')]: {
      paddingLeft: '15px'
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '15px'
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '50px'
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-start'
    }
  },
  textField: {
    [theme.breakpoints.up('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '60%'
    },
    [theme.breakpoints.up('md')]: {
      width: '60%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%'
    }
  },
  goalName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#37474F'
  },
  stepName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#37474F'
  },
  loadingContainer: {
    padding: '0',
    backgroundColor: '#696969',
    '&.MuiDialogContent-root:first-child': {
      padding: '0'
    }
  }
}));

type Props = {
  network: Network;
  close: () => void;
};

const AccessGoals: React.FC<Props> = (props: Props) => {
  const { network, close } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const goalsState: Goal[] = useSelector((state: RootState) =>
    state.goalRoot.goal.goals.filter(
      item => item.VisibleTo === 'SpecificPeople'
    )
  );

  const stepsState: Step[] = useSelector(
    (state: RootState) => state.goalRoot.goalStep.steps
  );

  const goalsShareState: GoalShareNetwork[] = useSelector(
    (state: RootState) => state.goalRoot.goalShare.goalsShare
  );

  const stepsShareState: StepShareNetwork[] = useSelector(
    (state: RootState) => state.goalRoot.goalShare.stepsShare
  );

  const [currentSharedGoals] = useState(
    goalsShareState.filter(
      item => item.SharedWithNetworkContactId === network.Id
    )
  );
  const [currentSharedSteps] = useState(
    stepsShareState.filter(
      item => item.SharedWithNetworkContactId === network.Id
    )
  );
  const [addedGoals, setAddedGoals] = useState<Goal[]>([]);
  const [deletedGoals, setDeletedGoals] = useState<Goal[]>([]);
  const [addedSteps, setAddedSteps] = useState<Step[]>([]);
  const [deletedSteps, setDeletedSteps] = useState<Step[]>([]);

  const handleAddSteps = (step: Step) => {
    if (!currentSharedSteps.some(item => item.StepId === step.Id)) {
      setAddedSteps(value => [...value, step]);
    } else {
      const index = deletedSteps.indexOf(step);
      if (index !== -1) {
        setDeletedSteps(deletedSteps.filter(value => value.Id !== step.Id));
      }
    }
  };

  const handleDeleteSteps = (step: Step) => {
    if (currentSharedSteps.some(item => item.StepId === step.Id)) {
      setDeletedSteps(value => [...value, step]);
    } else {
      const index = addedSteps.indexOf(step);
      if (index !== -1) {
        setAddedSteps(addedSteps.filter(value => value.Id !== step.Id));
      }
    }
  };

  const handleAddGoals = (goal: Goal) => {
    if (!currentSharedGoals.some(item => item.GoalId === goal.Id)) {
      setAddedGoals(value => [...value, goal]);
    } else {
      const index = deletedGoals.indexOf(goal);
      if (index !== -1) {
        setDeletedGoals(deletedGoals.filter(value => value.Id !== goal.Id));
      }
    }
  };

  const handleDeleteGoals = (goal: Goal) => {
    if (currentSharedGoals.some(item => item.GoalId === goal.Id)) {
      setDeletedGoals(value => [...value, goal]);
    } else {
      const index = addedGoals.indexOf(goal);
      if (index !== -1) {
        setAddedGoals(addedGoals.filter(value => value.Id !== goal.Id));
      }
    }
  };

  const handleCallBack = () => {
    if (addedGoals.length > 0) dispatch(startSharingGoals(addedGoals, network));
    if (deletedGoals.length > 0)
      dispatch(stopSharingGoals(deletedGoals, network));

    if (addedSteps.length > 0) dispatch(startShareSteps(addedSteps, network));
    if (deletedSteps.length > 0)
      dispatch(stopShareSteps(deletedSteps, network));

    setAddedGoals([]);
    setDeletedGoals([]);
    setAddedSteps([]);
    setDeletedSteps([]);
    close();
  };

  // const loading = (
  //   <BarLoader
  //     css={override}
  //     height={8}
  //     width={100}
  //     color={'#F79221'}
  //     loading
  //   />
  // );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <div style={{ margin: '10px 0', padding: '10px' }}>
        <span className={classes.title}>Specific goals and steps...</span>
      </div>
      <div className={classes.searchContainer}>
        <TextField
          className={classes.textField}
          id="input-with-icon-textfield"
          label=""
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </div>
      <div
        style={{
          margin: '20px 0',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
        <div className={classes.tableContainer}>
          {goalsState.map(goal => (
            <AccessGoalRow
              key={goal.Id}
              goal={goal}
              steps={stepsState.filter(item => item.GoalId === goal.Id)}
              checkGoal={
                currentSharedGoals.find(element => element.GoalId === goal.Id)
                  ? true
                  : false
              }
              currentSharedSteps={currentSharedSteps}
              handleAddSteps={handleAddSteps}
              handleDeleteSteps={handleDeleteSteps}
              handleAddGoals={handleAddGoals}
              handleDeleteGoals={handleDeleteGoals}
            />
          ))}
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <span className={classes.cancelText} onClick={close}>
            Cancel
          </span>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Button type="extra" click={handleCallBack}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessGoals;
