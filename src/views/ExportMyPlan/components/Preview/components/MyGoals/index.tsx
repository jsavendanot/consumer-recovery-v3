import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Goal } from 'types/goal';
import { FocusArea } from 'types/other';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

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

export const MyGoals: React.FC<Props> = () => {
  const classes = useStyles();

  const [focusAreas] = useState<FocusArea[]>(
    JSON.parse(sessionStorage.getItem('focusAreas')!)
  );

  const myGoals: Goal[] = useSelector(
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
        <span className={classes.headerText}>My goals</span>
      </Grid>
      <Grid item xs={12}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Focus Area</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {myGoals.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.Name}</td>
                  <td>
                    {focusAreas.find(area => area.id === item.FocusArea)?.name}
                  </td>
                  <td>{moment(item.StartDate).format('L')}</td>
                  <td>{moment(item.EndDate).format('L')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

export default MyGoals;
