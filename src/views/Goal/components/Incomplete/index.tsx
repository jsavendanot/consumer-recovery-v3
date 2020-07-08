import React from 'react';
import useRouter from 'common/utils/useRouter';

import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { Button } from 'common/components';
import { Goal } from 'types/goal';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: '50px',
    width: '100%'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '37px',
    color: '#4D3826'
  },
  description: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#37474F',
    margin: '20px 0'
  },
  closeButton: {
    textAlign: 'right'
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '100%'
  },
  subImageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    textAlign: 'center',
    padding: '30px 10px',
    cursor: 'pointer'
  },
  buttonContainer: {
    width: '100%'
  },
  subButtonContainer: {
    padding: '30px 40px'
  },
  progress: {
    padding: '20px 0px'
  },
  imageText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '25px',
    color: '#003E1F'
  },
  image1: {
    width: '130px',
    height: '130px'
  },
  image2: {
    width: '120px',
    height: '120px'
  }
}));

type Props = {
  close: () => void;
  goal: Goal;
};

const Incomplete: React.FC<Props> = ({ goal, close }) => {
  const classes = useStyles();
  const { history } = useRouter();

  const editGoalHandler = () => {
    history.push(`/goals/current/${goal.Id}/edit`);
  };

  const sendHelpRequest = () => {
    history.push(`/goals/current/${goal.Id}/help`);
  };

  return (
    <>
      <div className={classes.closeButton}>
        <IconButton style={{ padding: '0' }} onClick={close}>
          <Close fontSize="large" style={{ fill: '#73BA9B' }} />
        </IconButton>
      </div>
      <div className={classes.container}>
        <div className={classes.header}>
          <span className={classes.title}>
            It's alright!
            <br />
            We can work it out.
          </span>
        </div>
        <span className={classes.description}>
          What would you like to do with your goal{' '}
          {goal != null ? goal.Name : ''} ?
        </span>
      </div>
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <IconButton onClick={editGoalHandler} style={{ padding: '0 42px' }}>
            <div className={classes.subImageContainer}>
              <img
                src="/images/goal/checkin/incomplete/image1.svg"
                alt=""
                className={classes.image1}
              />
              <span className={classes.imageText}>
                Modify this
                <br />
                goal
              </span>
            </div>
          </IconButton>
          <IconButton onClick={sendHelpRequest} style={{ padding: '0 35px' }}>
            <div className={classes.subImageContainer}>
              <img
                src="/images/goal/checkin/incomplete/image2.svg"
                alt=""
                className={classes.image2}
              />
              <span className={classes.imageText}>
                Ask my network <br />
                for help
              </span>
            </div>
          </IconButton>
        </div>
        <div className={classes.buttonContainer}>
          <div className={classes.subButtonContainer}>
            <Button type="secondary" click={close}>
              It's all good!
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Incomplete;
