import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetworks } from 'slices/network/action';

import { makeStyles } from '@material-ui/styles';
import {
  Divider,
  Hidden,
  Theme,
  Button as MuiButton,
  Slide,
  Dialog,
  DialogContent,
  Grid,
  IconButton
} from '@material-ui/core';

import { Loader, Button, ConnectRequests } from 'common/components';
import { People, Services, ButtonTabs } from './components';
import { RootState } from 'reducer';
import { Add } from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions';
import { InvitePeople, PendingContacts } from './components/components';
import {
  fetchPendingContactFromInvitation,
  fetchConnectionRequests
} from 'slices/network/invitation/action';
import { Invitation } from 'types/network';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%'
  },
  divider: {
    backgroundColor: '#D5F2E3',
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.54), 0px 1px 10px 0px rgba(0,0,0,0.54)'
  },
  content: {
    // position: "absolute",
    zIndex: 20,
    paddingTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '58px',
      marginRight: '58px'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '158px',
      marginRight: '158px'
    }
  },
  headerTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '48px',
    lineHeight: '60px',
    color: '#37474F',
    textTransform: 'capitalize'
    // marginRight: '10%'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: '40px 0 20px',
    justifyContent: 'space-between',
    [theme.breakpoints.up('lg')]: {
      marginLeft: '158px',
      marginRight: '158px'
    }
  },
  button: {
    position: 'fixed',
    width: '67px',
    height: '67px',
    bottom: '4%',
    right: '2%',
    background: '#006633',
    borderRadius: '50%'
  },
  addIcon: {
    color: '#FFFFFF',
    fontSize: '40px'
  },
  addNetwork: {
    [theme.breakpoints.up('xs')]: {
      bottom: '0',
      right: '0',
      width: '100%',
      position: 'fixed',
      background: '#FFFFFF',
      borderRadius: '12px 12px 0px 0px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '20px',
      width: '400px',
      height: '180px',
      position: 'relative',
      background: '#FFFFFF'
    }
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttonContainer: {
    margin: '10px'
  },
  invitePeople: {
    [theme.breakpoints.up('xs')]: {
      bottom: '0',
      right: '0',
      width: '100%',
      height: '100%',
      position: 'fixed',
      background: '#FFFFFF',
      padding: '0'
    },
    [theme.breakpoints.up('sm')]: {
      width: '500px',
      height: '600px',
      position: 'relative',
      background: '#FFFFFF',
      padding: '0'
    }
  },
  footer: {
    marginTop: '20px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative'
  },
  footerImage: {
    position: 'relative',
    bottom: 0
  },
  addButtonContainer: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    [theme.breakpoints.up('sm')]: {
      right: '250px'
    }
  },
  invitationIcon: {
    fill: '#D5F2E3'
  },
  newInvitationContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  letterIcon: {
    marginBottom: 10,
    marginLeft: 25
  }
}));

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

const Network: React.FC<Props> = ({ match, history }) => {
  const classes = useStyles();
  const { tab } = match.params;
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.networkRoot.network.loading
  );

  const invitations: Invitation[] = useSelector(
    (state: RootState) => state.networkRoot.invitation.pendingContacts
  );

  useEffect(() => {
    dispatch(fetchNetworks());
    dispatch(fetchPendingContactFromInvitation());
    dispatch(fetchConnectionRequests());
  }, [dispatch]);

  /** Add network Dialog */
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  /** Invite people */
  const [open2, setOpen2] = useState(false);
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClickOpen2 = () => {
    handleClose();
    setOpen2(true);
  };

  const [open3, setOpen3] = useState(false);

  if (tab !== 'people' && tab !== 'services') {
    return <Redirect to="/networks/people" />;
  }

  const addContactDialog = (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}>
      <DialogContent className={classes.addNetwork}>
        <div className={classes.dialogContent}>
          <div className={classes.buttonContainer}>
            <Button type="primary" click={handleClickOpen2}>
              Invite Someone
            </Button>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              type="primary"
              click={() =>
                history.push(
                  `/networks/add/${history.location.pathname.split('/')[2]}`
                )
              }>
              Add Contact Manually
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const invitePeopleDialog = (
    <Dialog
      open={open2}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose2}>
      <DialogContent className={classes.invitePeople}>
        <InvitePeople close={handleClose2} />
      </DialogContent>
    </Dialog>
  );

  return (
    <div className={classes.root}>
      {loading && <Loader />}
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={12}>
          <Hidden lgUp>
            <ButtonTabs tabs={['people', 'services']} currentTab={tab} />
            <Divider className={classes.divider} />
            <div className={classes.content}>
              {tab === 'people' && <People />}
              {tab === 'services' && <Services />}
            </div>
            <div className={classes.content}>
              {invitations.length > 0 && (
                <PendingContacts invitations={invitations} />
              )}
            </div>
          </Hidden>
          <Hidden mdDown>
            <div className={classes.header}>
              <span className={classes.headerTitle}>My network</span>
              <div className={classes.newInvitationContainer}>
                <ButtonTabs tabs={['people', 'services']} currentTab={tab} />
                <IconButton
                  className={classes.letterIcon}
                  onClick={() => setOpen3(true)}>
                  <img src="/images/network/newInvitationIcon.svg" alt="" />
                </IconButton>
              </div>
            </div>
            <div className={classes.content}>
              {tab === 'people' && <People />}
              {tab === 'services' && <Services />}
            </div>
            <div className={classes.content}>
              {invitations.length > 0 && (
                <PendingContacts invitations={invitations} />
              )}
            </div>
          </Hidden>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.footer}>
            <div className={classes.footerImage}>
              {tab === 'people' && (
                <img src="/images/network/footer_image.svg" alt="" />
              )}
              {tab === 'services' && (
                <img src="/images/network/service-footer.svg" alt="" />
              )}
              <div className={classes.addButtonContainer}>
                <MuiButton className={classes.button} onClick={handleClickOpen}>
                  <Add className={classes.addIcon} />
                </MuiButton>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      {open && addContactDialog}
      {open2 && invitePeopleDialog}
      {open3 && <ConnectRequests open={open3} close={() => setOpen3(false)} />}
    </div>
  );
};

export default Network;
