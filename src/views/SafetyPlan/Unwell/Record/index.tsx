import React from 'react';
import { Unwell } from 'types/safety';

import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import { People } from '@material-ui/icons';
import { Network } from 'types/network';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: '10px'
  },
  subContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#F79221',
    marginRight: '5px'
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#37474F'
  }
}));

type Props = {
  value: Unwell;
};

const Record: React.FC<Props> = ({ value }) => {
  const classes = useStyles();

  const networks: Network[] = useSelector(
    (state: RootState) => state.networkRoot.network.networks
  );

  return (
    <div className={classes.container}>
      <div className={classes.subContainer}>
        <span className={classes.text}>{value.Name}</span>
      </div>
      <div className={classes.subContainer}>
        <IconButton style={{ padding: '0', margin: '0 5px' }}>
          <People style={{ fill: '#73BA9B' }} />
        </IconButton>
        <span className={classes.label}>
          {
            networks.find(item => item.Id === value.NetworkContactIdResponsible)
              ?.Name
          }
        </span>
      </div>
    </div>
  );
};

export default Record;
