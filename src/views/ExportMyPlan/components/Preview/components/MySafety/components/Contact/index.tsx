import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { SupportRootType } from 'slices/safety/support/supportSlice';

const useStyles = makeStyles(() => ({
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#FFFFFF'
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
export const Contact: React.FC<Props> = () => {
  const classes = useStyles();

  const contacts: SupportRootType = useSelector(
    (state: RootState) => state.safetyRoot.support
  );

  return (
    <Grid container style={{ border: '1px solid #73BA9B' }}>
      <Grid
        item
        xs={12}
        container
        justify="center"
        style={{ backgroundColor: '#73BA9B', padding: '5px 0' }}>
        <span className={classes.headerText}>
          People or services who I can contact for support if I need immediate
          help
        </span>
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
              <th>Contact number</th>
            </tr>
          </thead>
          <tbody>
            {contacts.emergencyNetworks
              .filter(item => item.Type === 'Person')
              .map(person => {
                return (
                  <tr key={person.Id}>
                    <td>{person.Name}</td>
                    <td>{person.Phone}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
              <th>Name</th>
              <th>Contact number</th>
            </tr>
          </thead>
          <tbody>
            {contacts.emergencyNetworks
              .filter(item => item.Type === 'Organisation')
              .map(org => {
                return (
                  <tr key={org.Id}>
                    <td>{org.Name}</td>
                    <td>{org.Phone}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

export default Contact;
