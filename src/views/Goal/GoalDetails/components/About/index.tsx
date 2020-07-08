import React from 'react';
import { Step, StepShareNetwork } from 'types/goal';

import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  label: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#73BA9B',
    cursor: 'pointer'
  },
  tabContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0'
  },
  value: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#323F45'
  }
}));

type Props = {
  goalDesc: string;
  steps: Step[];
};

export const About: React.FC<Props> = ({ steps, goalDesc }) => {
  const classes = useStyles();

  const stepsSharedNetworks: StepShareNetwork[] = useSelector(
    (state: RootState) => state.goalRoot.goalShare.stepsShare
  );

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <div
          className={classes.tabContainer}
          style={{ justifyContent: 'flex-start' }}>
          <span className={classes.label}>About this goal</span>
        </div>
        <span className={classes.value} style={{ fontSize: '14px' }}>
          {goalDesc}
        </span>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div
          className={classes.tabContainer}
          style={{ justifyContent: 'flex-start' }}>
          <span className={classes.label}>Goal shared with</span>
        </div>
        <span className={classes.value} style={{ fontSize: '14px' }}>
          {steps
            .filter(item => item.VisibleTo === 'SpecificPeople')
            .map(step => {
              return stepsSharedNetworks
                .filter(network => network.StepId === step.Id)
                .map(item => {
                  return `${step.Name} - ${item.SharedWithNetworkName},   `;
                });
            })}
        </span>
      </div>
    </>
  );
};

export default About;
