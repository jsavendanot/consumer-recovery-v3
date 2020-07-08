import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { StepShareNetwork, Step, Goal } from 'types/goal';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    margin: '10px 0'
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
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
  }
}));

type Props = {
  goal: Goal;
  steps: Step[];
  checkGoal: boolean;
  currentSharedSteps: StepShareNetwork[];
  handleAddSteps: (step: Step) => void;
  handleDeleteSteps: (step: Step) => void;
  handleAddGoals: (goal: Goal) => void;
  handleDeleteGoals: (goal: Goal) => void;
};

const AccessGoalRow: React.FC<Props> = ({
  goal,
  steps,
  checkGoal,
  currentSharedSteps,
  handleAddSteps,
  handleDeleteSteps,
  handleAddGoals,
  handleDeleteGoals
}) => {
  const classes = useStyles();

  const [checkAll, setCheckAll] = useState(checkGoal);

  const [selectedValue, setSelectedValues] = useState(
    steps.filter(item =>
      currentSharedSteps.find(step => step.StepId === item.Id)
    )
  );

  const handleSelectOne = (step: Step) => {
    const selectedIndex = selectedValue.indexOf(step);
    let newSelectedValues: Step[] = [];
    if (selectedIndex === -1) {
      handleAddSteps(step);
      newSelectedValues = newSelectedValues.concat(selectedValue, step);
    } else if (selectedIndex === 0) {
      handleDeleteSteps(step);
      newSelectedValues = newSelectedValues.concat(selectedValue.slice(1));
    } else if (selectedIndex === selectedValue!.length - 1) {
      handleDeleteSteps(step);
      newSelectedValues = newSelectedValues.concat(selectedValue.slice(0, -1));
    } else if (selectedIndex > 0) {
      handleDeleteSteps(step);
      newSelectedValues = newSelectedValues.concat(
        selectedValue.slice(0, selectedIndex),
        selectedValue.slice(selectedIndex + 1)
      );
    }
    setSelectedValues(newSelectedValues);
  };

  const handleSelectAll = () => {
    setCheckAll(value => !value);
    if (!checkAll) {
      setSelectedValues(steps);
      handleAddGoals(goal);
      steps.forEach(step => {
        handleAddSteps(step);
      });
    } else {
      setSelectedValues([]);
      handleDeleteGoals(goal);
      steps.forEach(step => {
        handleDeleteSteps(step);
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Checkbox
          color="primary"
          checked={checkAll}
          onChange={handleSelectAll}
          value={checkAll}
        />
        <span className={classes.goalName}>{goal.Name}</span>
      </div>
      <div style={{ paddingLeft: '30px' }}>
        <Table>
          <TableBody>
            {steps.map(step => (
              <TableRow
                hover
                key={step.Id}
                selected={selectedValue.indexOf(step) !== -1}
                onClick={event => handleSelectOne(step)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedValue.indexOf(step) !== -1}
                    color="primary"
                    value={selectedValue.indexOf(step) !== -1}
                  />
                </TableCell>
                <TableCell>
                  <div className={classes.nameCell}>
                    <span className={classes.stepName}>{step.Name}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AccessGoalRow;
