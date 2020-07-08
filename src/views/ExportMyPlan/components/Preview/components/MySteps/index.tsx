import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Step, Goal } from 'types/goal';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
  content: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '11px',
    lineHeight: '16px',
    color: '#000000'
  },
  table: {
    width: '100%',
    border: '1px solid #73BA9B',
    borderCollapse: 'collapse',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '11px',
    lineHeight: '13px',
    color: '#000000',
    '&& th, td': {
      border: '1px solid #73BA9B',
      padding: '5px',
      textAlign: 'left'
    }
  }
}));

type Props = {};
export const MySteps: React.FC<Props> = () => {
  const classes = useStyles();

  const steps: Step[] = useSelector(
    (state: RootState) => state.goalRoot.goalStep.steps
  );

  const goals: Goal[] = useSelector(
    (state: RootState) => state.goalRoot.goal.goals
  );

  return (
    <Grid container style={{ border: '1px solid #73BA9B' }}>
      <Grid
        item
        xs={12}
        container
        justify="center"
        style={{ backgroundColor: '#73BA9B', padding: '5px 0' }}>
        <span className={classes.headerText}>MY PLAN OF ACTION</span>
      </Grid>
      <Grid item xs={12}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Goal Name</th>
              <th>Actions to be taken</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            {steps.map(step => {
              return (
                <tr key={step.Id}>
                  <td>{goals.find(goal => goal.Id === step.GoalId)?.Name}</td>
                  <td>{step.Name}</td>
                  <td>{moment(step.StartDate).format('L')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

export default MySteps;
