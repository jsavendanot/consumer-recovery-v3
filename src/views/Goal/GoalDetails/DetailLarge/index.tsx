import React, { useState, ChangeEvent } from 'react';
import useRouter from 'common/utils/useRouter';
import { FocusArea } from 'types/other';
import {
  Goal,
  Step as StepType,
  GoalComment,
  GoalCompletion
} from 'types/goal';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Grid,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Dialog,
  DialogContent,
  useMediaQuery,
  Theme
} from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';

import { Button, Loader } from 'common/components';
import CheckIn from '../../components/CheckIn';
import Complete from '../../components/Complete';
import Incomplete from '../../components/Incomplete';
import {
  AddStep,
  GoalProgress,
  Actions,
  About,
  Step,
  Comments
} from '../components';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0 40px'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 50px'
  },
  container2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '10px 50px'
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '20px 0',
    position: 'relative'
  },
  headerContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  backText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
    color: '#003E1F',
    textTransform: 'uppercase'
  },
  backArrow: {
    fontSize: '42px',
    fill: '#003E1F'
  },
  imageItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '320px',
    backgroundColor: '#FFFFFF'
  },
  tabs: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#fa9419'
    },
    marginBottom: '10px'
  },
  divider: {
    border: '1px solid #73BA9B',
    background: '#73BA9B',
    margin: '10px 0 20px'
  },
  label: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#73BA9B',
    cursor: 'pointer'
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
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  },
  image2: {
    height: '186px',
    maxHeight: '186px'
  }
}));

type Props = {
  goal: Goal;
  steps: StepType[];
};

const DetailLarge: React.FC<Props> = ({ goal, steps }) => {
  const classes = useStyles();
  const { history } = useRouter();

  const loadingState: boolean = useSelector(
    (state: RootState) => state.goalRoot.goal.loading
  );
  const goalCompletionState: GoalCompletion[] = useSelector(
    (state: RootState) => state.goalRoot.goal.completionRate
  );

  const commentState: GoalComment[] = useSelector((state: RootState) =>
    state.goalRoot.goalComment.comments.filter(item => item.GoalId === goal.Id)
  );

  const [focusAreas] = useState<FocusArea[]>(
    JSON.parse(sessionStorage.getItem('focusAreas')!)
  );

  const [focusArea] = useState<FocusArea>(
    focusAreas.find(area => area.id === goal.FocusArea)!
  );

  /** Tabs */
  const [tab, setTab] = useState('about');

  const tabs = [
    { value: 'about', label: 'About' },
    { value: 'comment', label: 'Comments' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string) => {
    value === 'about' ? setTab('about') : setTab('comment');
  };

  /** Full screen dialog */

  /** Theme */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open2, setOpen2] = useState(false);
  const handleClose2 = () => {
    setOpen2(false);
    setSelectedValue('complete');
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  /** Dialog for Add step  */
  const [open3, setOpen3] = useState(false);
  const handleClose3 = () => {
    setOpen3(false);
  };

  /** Select complete or incomplete */
  const [selectedValue, setSelectedValue] = useState('complete');
  const [selectedStepId, setSelectedStepId] = useState('');

  /** Dialog */
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (stepId: string) => {
    setSelectedStepId(stepId);
    setOpen(true);
  };

  const checkInDialog = (
    <Dialog open={open} keepMounted onClose={handleClose}>
      <DialogContent className={classes.checkInDialog}>
        {selectedStepId !== '' ? (
          <CheckIn
            goal={goal}
            steps={steps.filter(item => !item.IsCompleted)}
            close={handleClose}
            open={handleClickOpen2}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            stepId={selectedStepId}
          />
        ) : (
            <CheckIn
              goal={goal}
              steps={steps.filter(item => !item.IsCompleted)}
              close={handleClose}
              open={handleClickOpen2}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          )}
      </DialogContent>
    </Dialog>
  );

  const completionDialog = (
    <Dialog
      open={open2}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleClose2}>
      <DialogContent style={{ backgroundColor: '#FEFFCF' }}>
        {selectedValue === 'complete' && (
          <Complete goal={goal} close={handleClose2} />
        )}
        {selectedValue === 'incomplete' && (
          <Incomplete goal={goal} close={handleClose2} />
        )}
      </DialogContent>
    </Dialog>
  );

  const addStepDialog = (
    <Dialog open={open3} keepMounted onClose={handleClose3}>
      <DialogContent style={{ padding: '0' }}>
        <AddStep />
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {loadingState && <Loader />}
      <Grid container className={classes.root}>
        <Grid item xs={12} style={{ margin: '10px 0' }}>
          <div className={classes.header}>
            <div className={classes.headerContent}>
              <IconButton
                style={{ padding: '0' }}
                onClick={() => history.goBack()}>
                <ArrowBackIos className={classes.backArrow} />
              </IconButton>
              <span className={classes.backText}>Back</span>
            </div>
          </div>
        </Grid>
        {focusArea && (
          <Grid
            item
            xs={12}
            lg={6}
            className={classes.imageItem}
            style={{ backgroundColor: focusArea.color }}>
            {goal.Image !== null ? (
              <img
                src={'data:image/png;base64,' + goal.Image}
                alt=""
                className={classes.image}
              />
            ) : (
                <img
                  src={'/images/areas/' + focusArea.image}
                  alt=""
                  className={classes.image2}
                />
              )}
          </Grid>
        )}
        <Grid item xs={12} lg={6}>
          <Grid container className={classes.container}>
            <GoalProgress
              goalCompletion={
                goalCompletionState.find(item => item.GoalId === goal.Id)!
              }
            />
            {goal.PercentageComplete < 1 && <Actions goal={goal} />}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Grid container>
            <Grid item xs={12}>
              <Tabs
                className={classes.tabs}
                onChange={handleTabsChange}
                scrollButtons="auto"
                value={tab}
                variant="scrollable">
                {tabs.map(tab => (
                  <Tab
                    key={tab.value}
                    label={<span className={classes.label}>{tab.label}</span>}
                    value={tab.value}
                  />
                ))}
              </Tabs>
            </Grid>
            <Grid item xs={12} style={{ margin: '10px 0 20px' }}>
              {tab === 'about' && (
                <About goalDesc={goal.Description} steps={steps} />
              )}
              {tab === 'comment' && (
                <Comments goalId={goal.Id} comments={commentState} />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6} className={classes.container2}>
          <Grid container>
            {goal.PercentageComplete < 1 && (
              <Grid item xs={12} style={{ marginBottom: '50px' }}>
                <Button type="extra" click={() => handleClickOpen('')}>
                  Check-in progress
                </Button>
              </Grid>
            )}
            <Grid item xs={12}>
              <span className={classes.label}>Steps</span>
              {steps.length > 0 &&
                steps.map(step => (
                  <Step key={step.Id} step={step} checkIn={handleClickOpen} />
                ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6} />
      </Grid>
      {open && checkInDialog}
      {open2 && completionDialog}
      {open3 && addStepDialog}
    </>
  );
};

export default DetailLarge;
