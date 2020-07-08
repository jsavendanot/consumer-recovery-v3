import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { Network } from 'types/network';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { ContactCard } from '../components';

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '23px',
    textAlign: 'center',
    color: '#B3B3B3',
    margin: '20px 0'
  }
}));

const Services = () => {
  const classes = useStyles();

  const networks: Network[] = useSelector(
    (state: RootState) => state.networkRoot.network.networks
  );

  return (
    <Grid container>
      {networks.filter(network => network.Type === 'Organisation').length ===
      0 ? (
        <Grid item xs={12}>
          <div className={classes.content}>
            <span className={classes.text}>
              There’s nobody in your network yet
            </span>
            <img src="/images/goal/jiemba.svg" alt="" />
          </div>
        </Grid>
      ) : (
        networks
          .filter(network => network.Type === 'Organisation')
          .map(network => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={5}
              xl={4}
              container
              justify="center"
              style={{ alignSelf: 'flex-start', padding: '1%' }}
              key={network.Id}>
              <ContactCard network={network} />
            </Grid>
          ))
      )}
      <Grid item lg={5} />
    </Grid>
  );
};

export default Services;
