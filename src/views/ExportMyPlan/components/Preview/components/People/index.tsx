import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Network } from 'types/network';
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
export const People: React.FC<Props> = () => {
  const classes = useStyles();

  const people: Network[] = useSelector((state: RootState) =>
    state.networkRoot.network.networks.filter(item => item.Type === 'Person')
  );

  return (
    <Grid container style={{ border: '1px solid #73BA9B' }}>
      <Grid
        item
        xs={12}
        container
        justify="center"
        style={{ backgroundColor: '#73BA9B', padding: '5px 0' }}>
        <span className={classes.headerText}>My network</span>
      </Grid>
      <Grid item xs={12}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th colSpan={2} style={{ color: '#73BA9B' }}>
                People
              </th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Relationship</th>
              <th>Contact details</th>
              <th>Access to my plan</th>
            </tr>
          </thead>
          <tbody>
            {people.map(person => {
              return (
                <tr key={person.Id}>
                  <td>{person.Name}</td>
                  <td>{person.Relationship}</td>
                  <td>{`${person.Phone} ${person.Email}`}</td>
                  <td>...</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

export default People;
