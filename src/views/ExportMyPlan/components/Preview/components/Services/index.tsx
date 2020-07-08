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
export const Services: React.FC<Props> = () => {
  const classes = useStyles();

  const organisations: Network[] = useSelector((state: RootState) =>
    state.networkRoot.network.networks.filter(
      item => item.Type === 'Organisation'
    )
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
                Services
              </th>
            </tr>
            <tr>
              <th>Name & Organisation</th>
              <th>Practice</th>
              <th>Contact details</th>
              <th>Access to my plan</th>
            </tr>
          </thead>
          <tbody>
            {organisations.map(org => {
              return (
                <tr key={org.Id}>
                  <td>{org.Name}</td>
                  <td>...</td>
                  <td>{`${org.Phone} ${org.Email}`}</td>
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

export default Services;
