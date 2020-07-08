import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRouter from 'common/utils/useRouter';

import {
  IconButton,
  Theme,
  useMediaQuery,
  Dialog,
  DialogContent
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { KeyboardArrowLeft, Person, ArrowForwardIos } from '@material-ui/icons';

import {
  Button,
  YesNoConfirmation,
  Loader,
  NetworkList
} from 'common/components';
import { Goal, GoalHelp } from 'types/goal';
import { Network } from 'types/network';
import { RootState } from 'reducer';
import { sendHelpRequest } from 'slices/goal/action';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    background: '#73BA9B',
    padding: '15px 10px',
    [theme.breakpoints.up('sm')]: {
      padding: '20px 10%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 10%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '20px 10%'
    }
  },
  headerIcon: {
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
    fill: '#FFFFFF'
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '41px',
    color: '#FFFFFF',
    margin: '10px 0 0 10px',
    [theme.breakpoints.up('sm')]: {
      margin: '10px 0 0 30px'
    },
    [theme.breakpoints.up('md')]: {
      margin: '10px 0 0 30px'
    },
    [theme.breakpoints.up('lg')]: {
      margin: '10px 0 0 30px'
    }
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  container: {
    padding: '20px 15px',
    [theme.breakpoints.up('sm')]: {
      padding: '20px 20%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 20%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '20px 20%'
    }
  },
  noteDesc: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '127.69%',
    color: '#37474F',
    margin: '10px 0 20px'
  },
  selectContacts: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    margin: '10px 0'
  },
  selectedNetwork: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '16px',
    color: '#F79221',
    paddingLeft: '20px'
  },
  buttonContainer: {
    margin: '70px 0 20px'
  },
  letter: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '23px',
    color: '#B3B3B3',
    margin: '10px 0'
  }
}));

type Props = {
  goal: Goal;
};

const ReviewSmallScreen: React.FC<Props> = ({ goal }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = useRouter();

  const loading: boolean = useSelector(
    (state: RootState) => state.goalRoot.goal.loading
  );

  const [actionType, setActionType] = useState('');
  const [selectedNetworks, setSelectedNetworks] = useState<Network[]>([]);

  /** Dialog */
  const [open, setOpen] = useState(false);

  const openDialog = (action: string) => {
    setActionType(action);
    if (action === 'send') {
      selectedNetworks.length > 0 && setOpen(true);
    } else {
      setOpen(true);
    }
  };

  function closeDialog() {
    setOpen(false);
  }

  const handleNetworkCallBack = (networks: Network[]) => {
    setSelectedNetworks(networks);
  };

  /** Theme */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [openNetworkDialog, setOpenNetworkDialog] = useState(false);

  const openNetworkDialogHandler = () => {
    setOpenNetworkDialog(true);
  };
  const closeNetworkDialogHandler = () => {
    setOpenNetworkDialog(false);
  };

  const networkListDialog = (
    <Dialog
      open={openNetworkDialog}
      keepMounted
      fullScreen={fullScreen}
      onClose={closeNetworkDialogHandler}>
      <DialogContent>
        <NetworkList
          close={closeNetworkDialogHandler}
          callback={networks => handleNetworkCallBack(networks)}
          title="Send help request to..."
        />
      </DialogContent>
    </Dialog>
  );

  const message = `I have commited to the goal “${goal.Name}” but I find
  it hard to “schedule a get-together at least every fortnight”. I
  would like to have your advice to help me achieve my goal. Feel free
  to reply this message directly or comment below the goal if you have
  an account. I have also attached the detail of goal :)`;

  const submitHandler = () => {
    if (selectedNetworks.length > 0) {
      const helpRequest: GoalHelp = {
        GoalId: goal.Id,
        Message: message,
        RecoveryPlanId: sessionStorage.getItem('RecoveryPlanId')!,
        NetworkContactIdList: selectedNetworks.map(network => {
          return network.Id;
        })
      };
      dispatch(sendHelpRequest(history, helpRequest));
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className={classes.header}>
        <IconButton
          style={{ padding: '0' }}
          onClick={() => openDialog('cancel')}>
          <KeyboardArrowLeft className={classes.headerIcon} />
        </IconButton>
        <span className={classes.headerText}>
          Your network is here to
          <br />
          help! You just need to let
          <br />
          them know.
        </span>
        <div
          style={{
            width: '100%',
            margin: '30px 0 10px',
            display: 'flex',
            justifyContent: 'center'
          }}>
          <img src="/images/goal/help_request.svg" alt="" />
        </div>
      </div>
      <div className={classes.container}>
        <div>
          <span className={classes.subTitle}>Send the help request to</span>
        </div>
        <div className={classes.noteDesc}>
          Please note: The whole goal will be shared to the selected
          people/services.
        </div>
        <div>
          <span className={classes.subTitle}>The message</span>
        </div>
        <div className={classes.selectContacts}>
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Person style={{ fill: '#37474F', marginRight: '10px' }} />
            <span>Select who to ask help from...</span>
          </div>
          <IconButton onClick={openNetworkDialogHandler}>
            <ArrowForwardIos style={{ fill: '#73BA9B' }} />
          </IconButton>
        </div>
        <div className={classes.selectedNetwork}>
          {selectedNetworks.map(network => {
            return network.Name + ', ';
          })}
        </div>
        <div className={classes.noteDesc}>
          To help others get to the core of the problem, try to describe the
          challenges you have acheiving this goal/step. What makes it hard to
          complete? What are the methods you have tried to overcome the
          challenges?
        </div>
        <div className={classes.letter}>{message}</div>
        <div className={classes.buttonContainer}>
          <Button type="primary" click={() => openDialog('send')}>
            Send Request
          </Button>
        </div>
      </div>
      {open && (
        <YesNoConfirmation
          open={open}
          close={closeDialog}
          action={
            actionType === 'cancel' ? () => history.goBack() : submitHandler
          }>
          {actionType === 'cancel' ? (
            <span className={classes.confirmTitle}>
              Are you sure you want to
              <br />
              leave this page?
            </span>
          ) : (
            <span className={classes.confirmTitle}>
              Are you sure you want to send
              <br />
              this help request?
            </span>
          )}
        </YesNoConfirmation>
      )}
      {openNetworkDialog && networkListDialog}
    </>
  );
};

export default ReviewSmallScreen;
