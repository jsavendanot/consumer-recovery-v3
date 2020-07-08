import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import useRouter from 'common/utils/useRouter';
import { Goal, Step } from 'types/goal';
import { isEqual } from 'lodash';

import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import {
  IconButton,
  LinearProgress,
  Dialog,
  DialogContent,
  useMediaQuery,
  Theme
} from '@material-ui/core';
import { KeyboardArrowRight, CheckCircle } from '@material-ui/icons';

import CheckIn from '../../../CheckIn';
import Complete from '../../../Complete';
import Incomplete from '../../../Incomplete';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import {
  makePercentageCompletionSelector,
  makeStepsSelector
} from 'selectors/goal';

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    padding: '10px 20px'
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 900,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#73BA9B'
  },
  subText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127%',
    color: '#37474F'
  },
  stepsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '5px 20px',
    cursor: 'pointer'
  },
  iconRotate: {
    transform: 'rotate(90deg)'
  },
  checkInDialog: {
    padding: '0',
    [theme.breakpoints.up('xs')]: {
      width: 260
    },
    [theme.breakpoints.up('sm')]: {
      width: 400
    },
    [theme.breakpoints.up('md')]: {
      width: 450
    },
    [theme.breakpoints.up('lg')]: {
      width: 500
    }
  },
  completeDialog: {
    backgroundColor: '#FEFFCF'
  }
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 17,
    backgroundColor: '#EDEDED'
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#6CD0A5'
  }
})(LinearProgress);

type Props = {
  goal: Goal;
};

//** Selectors */

export const StepsSummary: React.FC<Props> = ({ goal }) => {
  const classes = useStyles();
  const [more, setMore] = useState(false);
  const { history, location } = useRouter();

  const selectPercentageCompletion = useMemo(
    makePercentageCompletionSelector,
    []
  );

  const PercentageCompletion: number | null = useSelector((state: RootState) =>
    selectPercentageCompletion(state, goal.Id)
  );

  const selectSteps = useMemo(makeStepsSelector, []);
  const steps: Step[] = useSelector(
    (state: RootState) => selectSteps(state, goal.Id),
    isEqual
  );

  const toggleMore = () => {
    setMore(value => !value);
  };

  const handleClick = () => {
    history.push(`${location.pathname}/${goal.Id}`);
  };

  const [selectedStepId, setSelectedStepId] = useState('');

  /** Dialog */
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (stepId: string) => {
    setOpen(true);
    setSelectedStepId(stepId);
  };

  /** Full screen dialog */

  /** Theme */
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open2, setOpen2] = useState(false);
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  /** Select complete or incomplete */
  const [selectedValue, setSelectedValue] = useState('complete');

  const checkInDialog = (
    <Dialog open={open} keepMounted onClose={handleClose}>
      <DialogContent className={classes.checkInDialog}>
        <CheckIn
          goal={goal}
          steps={steps.filter(item => !item.IsCompleted)}
          close={handleClose}
          open={handleClickOpen2}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          stepId={selectedStepId}
        />
      </DialogContent>
    </Dialog>
  );

  const completionDialog = (
    <Dialog
      open={open2}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleClose2}>
      <DialogContent className={classes.completeDialog}>
        {selectedValue === 'complete' && (
          <Complete goal={goal} close={handleClose2} />
        )}
        {selectedValue === 'incomplete' && (
          <Incomplete goal={goal} close={handleClose2} />
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <div>
      <div className={classes.progress}>
        <BorderLinearProgress
          variant="determinate"
          color="primary"
          value={PercentageCompletion ? PercentageCompletion * 100 : 0}
        />
      </div>
      <div className={classes.stepsContainer}>
        <div style={{ flexGrow: 1 }} onClick={toggleMore}>
          <span className={classes.text}>Steps</span>
          <IconButton style={{ padding: '0' }}>
            <KeyboardArrowRight
              style={{ fill: '#73BA9B' }}
              className={clsx(more && classes.iconRotate)}
            />
          </IconButton>
        </div>
        {/* <IconButton style={{ padding: '0' }}>
          <Comment fontSize="small" style={{ fill: '#73BA9B' }} />
        </IconButton> */}
      </div>
      {more &&
        steps.length > 0 &&
        steps.map(step => (
          <div className={classes.stepsContainer} key={step.Id}>
            {step.IsCompleted ? (
              <IconButton>
                <CheckCircle style={{ fill: '#73BA9B' }} />
              </IconButton>
            ) : (
                <IconButton onClick={() => handleClickOpen(step.Id)}>
                  <CheckCircle style={{ fill: '#f1d4b2' }} />
                </IconButton>
              )}
            <div style={{ flexGrow: 1 }} onClick={handleClick}>
              <span className={classes.subText}>{step.Name}</span>
            </div>
          </div>
        ))}
      {/* {more && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <IconButton>
            <AddCircle style={{ fill: '#73BA9B' }} />
          </IconButton>
          <span className={classes.text}>Add a step</span>
        </div>
      )} */}
      {open && checkInDialog}
      {open2 && completionDialog}
    </div>
  );
};

export default StepsSummary;
