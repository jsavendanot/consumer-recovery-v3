import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { Unwell } from 'types/safety';
import { Network } from 'types/network';

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
export const UnwellNotHappen: React.FC<Props> = () => {
  const classes = useStyles();

  const unwellNotHappen: Unwell[] = useSelector(
    (state: RootState) => state.safetyRoot.unwell.doNotDo
  );

  const networks: Network[] = useSelector(
    (state: RootState) => state.networkRoot.network.networks
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
          If I become unwell I DO NOT want the following to happen
        </span>
      </Grid>
      <Grid item xs={12}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>What you do not want to happen</th>
              <th>Who will be responsible</th>
            </tr>
          </thead>
          <tbody>
            {unwellNotHappen.map(unwell => {
              return (
                <tr key={unwell.UnwellId}>
                  <td>
                    <span>{unwell.Name}</span>
                  </td>
                  <td>
                    <span>{`${
                      networks.find(
                        network =>
                          network.Id === unwell.NetworkContactIdResponsible
                      )
                        ? networks.find(
                            network =>
                              network.Id === unwell.NetworkContactIdResponsible
                          )?.Name
                        : ''
                    }, `}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

export default UnwellNotHappen;
