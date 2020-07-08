import React, { useState, ChangeEvent, MouseEvent } from 'react';
import useRouter from 'common/utils/useRouter';
import {
  Goal,
  Step as StepType,
  GoalCompletion,
  GoalComment
} from 'types/goal';
import { FocusArea } from 'types/other';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Grid,
  IconButton,
  Tabs,
  Tab,
  Dialog,
  DialogContent,
  useMediaQuery,
  Theme
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { ArrowBackIos, MoreVert } from '@material-ui/icons';

import { Button, Loader } from 'common/components';
import CheckIn from '../../components/CheckIn';
import Complete from '../../components/Complete';
import Incomplete from '../../components/Incomplete';
import {
  AddStep,
  GoalProgress,
  About,
  Step,
  ActionMenu,
  Comments
} from '../components';

const useStyles = makeStyles((theme: Theme) => ({
  container1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    [theme.breakpoints.up('sm')]: {
      padding: '10px 20%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '10px 20%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '10px 20%'
    }
  },
  imageContainer: {
    [theme.breakpoints.up('sm')]: {
      padding: '10px 20%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '10px 20%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '10px 20%'
    }
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '20px 20px 10px',
    position: 'relative'
  },
  headerContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  headerText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
    color: '#003E1F',
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      marginTop: '12px'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '15px'
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '15px'
    }
  },
  backArrow: {
    fontSize: '42px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '52px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '52px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '52px'
    },
    marginTop: '12px',
    fill: '#003E1F'
  },
  imageItem: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '196px',
    backgroundColor: '#FFFFFF',
    margin: '10px 0'
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
  label: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#73BA9B',
    cursor: 'pointer'
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 900,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#73BA9B'
  },
  checkInDialog: {
    padding: '0',
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

const DetailSmall: React.FC<Props> = ({ goal, steps }) => {
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
  const [tab, setTab] = useState('status');

  const tabs = [
    { value: 'status', label: 'Goal status' },
    { value: 'steps', label: 'Steps' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string) => {
    value === 'status' ? setTab('status') : setTab('steps');
  };

  /** Full screen dialog */

  /** Theme */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open2, setOpen2] = useState(false);
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  /** Dialog for Add step  */
  const [open3, setOpen3] = useState(false);
  const handleClose3 = () => {
    setOpen3(false);
  };

  /** Navigation */
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleMenuClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
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
      <Grid container className={classes.container1}>
        <Grid item xs={12}>
          <div className={classes.header}>
            <div className={classes.headerContent}>
              <IconButton
                style={{ padding: '0' }}
                onClick={() => history.goBack()}>
                <ArrowBackIos className={classes.backArrow} />
              </IconButton>
              <span className={classes.headerText}>{goal.Name}</span>
            </div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}>
              <MoreVert fontSize="large" style={{ fill: '#003E1F' }} />
            </IconButton>
            {goal.PercentageComplete < 1 && (
              <ActionMenu
                goalId={goal.Id}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
              />
            )}
          </div>
        </Grid>
      </Grid>
      <Grid container className={classes.container2}>
        {goal.PercentageComplete < 1 && (
          <Grid item xs={12}>
            <Button type="extra" click={() => handleClickOpen('')}>
              Check-in progress
            </Button>
          </Grid>
        )}
      </Grid>
      {focusArea && (
        <Grid container className={classes.imageContainer}>
          <Grid
            item
            xs={12}
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
        </Grid>
      )}
      <Grid container className={classes.container2}>
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
        {tab === 'status' && (
          <>
            <GoalProgress
              goalCompletion={
                goalCompletionState.find(item => item.GoalId === goal.Id)!
              }
            />
            <Grid item xs={12} style={{ marginBottom: '20px' }}>
              <About goalDesc={goal.Description} steps={steps} />
            </Grid>
            <Comments goalId={goal.Id} comments={commentState} />
          </>
        )}
        {tab === 'steps' &&
          steps.length > 0 &&
          steps.map(step => (
            <Step key={step.Id} step={step} checkIn={handleClickOpen} />
          ))}
        {/* {tab === 'steps' && (
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
      </Grid>
      {open && checkInDialog}
      {open2 && completionDialog}
      {open3 && addStepDialog}
    </>
  );
};

export default DetailSmall;
