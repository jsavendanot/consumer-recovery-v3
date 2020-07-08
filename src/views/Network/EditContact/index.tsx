import React, { useState, useEffect, ChangeEvent } from 'react';
import useRouter from 'common/utils/useRouter';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import validate from 'validate.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOtherSharedList, updateNetwork } from 'slices/network/action';
import { Network, Invitation } from 'types/network';

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  IconButton,
  TextField,
  Checkbox,
  Theme,
  Dialog,
  DialogContent,
  Switch
} from '@material-ui/core';
import { ArrowBackIos, Close } from '@material-ui/icons';

import { Button, Loader, SubmitConfirmation } from 'common/components';
import { Image } from '../components/components';
import { ManageAccess, SendAccess } from './components';
import { RootState } from 'reducer';
import { sendInvitation } from 'slices/network/invitation/action';
import {
  selectNetworkById,
  selectGoalSharedNetworksLenById,
  selectJournalSharedNetworksLenById,
  selectMyStorySharedNetworksLen,
  selectSafetySharedNetworksLen,
  selectNetworkSharedNetworksLen
} from 'selectors/network';

const useStyles = makeStyles((theme: Theme) => ({
  container1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  container2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    [theme.breakpoints.up('xs')]: {
      padding: '0'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 20%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 25%'
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 20px 10px',
    position: 'relative',
    [theme.breakpoints.up('lg')]: {
      padding: '20px 50px 10px'
    }
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
    fontSize: '28px',
    lineHeight: '35px',
    color: '#D5F2E3',
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
    fill: '#D5F2E3'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '30px 10px',
    marginBottom: '10px'
  },
  text: {
    fontFamily: 'Tajawal',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '22px',
    color: '#D5F2E3'
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#73BA9B'
  },
  value: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#37474F'
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px'
  },
  subContainer: {
    flexGrow: 1,
    textAlign: 'left'
  },
  textField: {
    background: '#D5F2E3',
    borderRadius: '5px',
    borderStyle: 'none'
  },
  labelContainer: {
    width: '40%',
    [theme.breakpoints.up('md')]: {
      width: '200px'
    }
  },
  textFieldContainer: {
    width: '60%',
    [theme.breakpoints.up('md')]: {
      width: '400px'
    }
  },
  buttonContainer: {
    [theme.breakpoints.up('xs')]: {
      width: '90%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  },
  infoBoxRoot: {
    width: '330px',
    boxShadow: '0px 10px 24px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center'
  },
  infoBoxTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '25px',
    color: '#73BA9B'
  },
  infoBoxBodyText: {
    width: '265px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F',
    textAlign: 'justify',
    margin: '20px 10px'
  },
  infoBoxClose: {
    margin: '25px 0',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F',
    textAlign: 'center',
    cursor: 'pointer'
  },
  callForSupport: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#37474F'
  },
  contactType: {
    width: '137px',
    fontFamily: 'Scada',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '17px',
    color: '#F79221',
    padding: '5px',
    border: '1px solid #F79221',
    boxSizing: 'border-box',
    borderRadius: '6px',
    textAlign: 'center'
  },
  resendInvitation: {
    marginLeft: '20px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#003E1F',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  }
}));

const schema = {
  Name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 30
    }
  },
  Phone: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 15,
      minimum: 10
    }
  },
  Address: {
    presence: false,
    length: {
      maximum: 500
    }
  },
  Relationship: {
    presence: false,
    length: {
      maximum: 200
    }
  }
};

const email_schema = {
  Email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 35
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    Email?: string;
    Name?: string;
    Phone?: string;
    Address?: string;
    Relationship?: string;
  };
  touched: {
    Email?: boolean;
    Name?: boolean;
    Phone?: boolean;
    Address?: boolean;
    Relationship?: boolean;
  };
  errors: {
    Email?: string[];
    Name?: string[];
    Phone?: string[];
    Address?: string[];
    Relationship?: string[];
  };
};

interface MatchParams {
  id: string;
}
type Props = RouteComponentProps<MatchParams>;

const EditContact: React.FC<Props> = ({ match }) => {
  const { id } = match.params;
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.networkRoot.network.loading
  );

  const selectedNetwork: Network = useSelector(
    (state: RootState) => selectNetworkById(state, id)!
  );

  const [network, setNetwork] = useState(selectedNetwork);

  // Access
  const goalSharedNetworksLen: number = useSelector(
    (state: RootState) => selectGoalSharedNetworksLenById(state, id)!
  );

  const journeySharedNetworksLen: number = useSelector(
    (state: RootState) => selectJournalSharedNetworksLenById(state, id)!
  );

  const myStorySharedNetworksLen: number = useSelector(
    (state: RootState) => selectMyStorySharedNetworksLen(state)!
  );

  const safetySharedNetworksLen: number = useSelector(
    (state: RootState) => selectSafetySharedNetworksLen(state)!
  );

  const networkSharedNetworksLen: number = useSelector(
    (state: RootState) => selectNetworkSharedNetworksLen(state)!
  );

  const [accessState, setAccessState] = useState({
    goal: false,
    journey: false,
    story: false,
    safety: false,
    network: false
  });

  useEffect(() => {
    setAccessState(values => ({
      ...values,
      goal: goalSharedNetworksLen > 0,
      journey: journeySharedNetworksLen > 0,
      story: myStorySharedNetworksLen > 0,
      safety: safetySharedNetworksLen > 0,
      network: networkSharedNetworksLen > 0
    }));
  }, [
    goalSharedNetworksLen,
    journeySharedNetworksLen,
    myStorySharedNetworksLen,
    safetySharedNetworksLen,
    networkSharedNetworksLen
  ]);

  // Invitation
  const [invitation, setInvitation] = useState<Invitation>({
    InvitationId: '',
    Name: '',
    EmailAddress: '',
    Subject: 'Invitation',
    Message: '',
    UserId: '',
    AcceptedOn: '',
    AccountType: '',
    AllowRecPlanAccess:
      network.Status !== 'Connected' && network.Status !== 'Disconnected',
    GoalsToShare: '',
    ShareAllGoals: false,
    JournalsToShare: '',
    ShareAllJournals: false,
    ShareMyStory: false,
    ShareSafetyPlan: false,
    ShareNetworkContacts: false,
    Relationship: '',
    SharingPurpose: '',
    InvitationCode: '',
    CreatedOn: ''
  });

  const handleInvitationFields = (name: string, value: string | boolean) => {
    setInvitation(values => ({
      ...values,
      [name]: value
    }));
  };

  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {
      Email: network.Email,
      Name: network.Name,
      Phone: network.Phone,
      Address: network.Address,
      Relationship: network.Relationship
    },
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(
      formState.values,
      invitation.AllowRecPlanAccess ? { ...schema, ...email_schema } : schema
    );

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values, invitation.AllowRecPlanAccess]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));

    if (event.target.name === 'Type') {
      setNetwork(value => ({
        ...value,
        Relationship: ''
      }));
    }

    setNetwork(value => ({
      ...value,
      [event.target.name]: event.target.value
    }));
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  const handleSubmit = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        Email: network.Email,
        Name: network.Name,
        Phone: network.Phone,
        Address: network.Address,
        Relationship: network.Relationship
      },
      touched: {
        ...formState.touched,
        Email: true,
        Name: true,
        Phone: true,
        Address: true,
        Relationship: true
      }
    }));

    if (formState.isValid) {
      dispatch(updateNetwork(history, network, accessState));
      invitation.AllowRecPlanAccess &&
        dispatch(
          sendInvitation({
            ...invitation,
            Name: network.Name,
            EmailAddress: network.Email,
            AccountType: network.Type === 'Person' ? 'Carer' : 'ServiceProvider'
          })
        );
    }
  };

  const giveAllAccessToTheContact = () => {
    dispatch(
      updateNetwork(history, network, {
        goal: true,
        journey: true,
        story: true,
        safety: true,
        network: true
      })
    );
  };

  useEffect(() => {
    (network.Status === 'Connected' || network.Status === 'Disconnected') &&
      dispatch(fetchOtherSharedList());
  }, [dispatch, network.Status]);

  /** Info box  */
  const [inviteBox, setInviteBox] = useState(false);

  const inviteBoxDialog = (
    <Dialog open={inviteBox} onClose={() => setInviteBox(false)}>
      <DialogContent className={classes.infoBoxRoot}>
        <div>
          <div style={{ textAlign: 'right' }}>
            <IconButton
              onClick={() => setInviteBox(false)}
              style={{ position: 'relative', right: '0' }}>
              <Close style={{ fill: '#73BA9B' }} />
            </IconButton>
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
            <img
              src="/images/network/ask-invite-icon2.svg"
              alt=""
              style={{
                width: '36px',
                height: '36px',
                marginRight: '20px'
              }}
            />
            <div className={classes.infoBoxTitle}>
              Inviting someone to connect on Jiemba
            </div>
          </div>
          <div className={classes.infoBoxBodyText}>
            Inviting someone to connect on Jiemba means they will be able to
            access your wellness plan once they accept you invitation. Check the
            checkbox to select what you want to share. You cna change this
            anytime.
          </div>
          <div
            className={classes.infoBoxClose}
            onClick={() => setInviteBox(false)}>
            Close
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  /** Dialog */
  const [resendConfirm, setResendConfirm] = useState(false);

  const resendEmailHandler = () => {
    dispatch(
      sendInvitation({
        ...invitation,
        Name: network.Name,
        EmailAddress: network.Email,
        AccountType: network.Type === 'Person' ? 'Carer' : 'ServiceProvider'
      })
    );
  };

  const resendConfirmDialog = (
    <SubmitConfirmation
      open={resendConfirm}
      close={() => setResendConfirm(false)}
      action={resendEmailHandler}
      donRedirect>
      <span className={classes.confirmTitle}>
        Are you sure you want to
        <br />
        resend email invitation?
      </span>
    </SubmitConfirmation>
  );

  return network ? (
    <>
      {loading && <Loader />}
      <Grid container className={classes.container1}>
        <Grid item xs={12} style={{ background: '#73BA9B' }}>
          <div className={classes.header}>
            <div className={classes.headerContent}>
              <IconButton
                style={{ padding: '0' }}
                onClick={() => history.goBack()}>
                <ArrowBackIos className={classes.backArrow} />
              </IconButton>
              <span className={classes.headerText}>Edit Contact</span>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container className={classes.container2}>
        <Grid item xs={12}>
          <div className={classes.flexContainer} style={{ marginTop: '20px' }}>
            <div className={classes.labelContainer}>
              <span className={classes.label}>Save this contact to</span>
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                error={hasError('Type')}
                fullWidth
                label="Please select"
                name="Type"
                select
                autoComplete="off"
                SelectProps={{ native: true }}
                value={network.Type}
                className={classes.textField}
                variant="outlined"
                onChange={handleChange}>
                {['Person', 'Organisation'].map(type => (
                  <option key={type} value={type}>
                    {type === 'Person' && 'People'}
                    {type === 'Organisation' && 'Services'}
                  </option>
                ))}
              </TextField>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.avatarContainer}>
            <Image network={network} setNetwork={setNetwork} />
          </div>
        </Grid>
        <Grid item xs={12}>
          {network.Type === 'Person' ? (
            <div className={classes.flexContainer}>
              <div className={classes.labelContainer}>
                <span className={classes.label}>Relationship</span>
              </div>
              <div className={classes.textFieldContainer}>
                <TextField
                  error={hasError('Relationship')}
                  fullWidth
                  label="Please select"
                  name="Relationship"
                  select
                  autoComplete="off"
                  SelectProps={{ native: true }}
                  value={network.Relationship || ''}
                  className={classes.textField}
                  variant="outlined"
                  onChange={handleChange}>
                  {[
                    '',
                    'Parent',
                    'Spouse',
                    'Child',
                    'Partner',
                    'Grandparent',
                    'Sibling',
                    'Friend',
                    'other'
                  ].map(relation => (
                    <option key={relation} value={relation}>
                      {relation}
                    </option>
                  ))}
                </TextField>
              </div>
            </div>
          ) : (
            <div className={classes.flexContainer}>
              <div className={classes.labelContainer}>
                <span className={classes.label}>Service Type</span>
              </div>
              <div className={classes.textFieldContainer}>
                <TextField
                  error={hasError('Relationship')}
                  autoComplete="off"
                  fullWidth
                  variant="outlined"
                  label="Enter service type"
                  name="Relationship"
                  value={network.Relationship || ''}
                  className={classes.textField}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          <div className={classes.flexContainer}>
            <div className={classes.labelContainer}>
              <span className={classes.label}>Name</span>
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                error={hasError('Name')}
                autoComplete="off"
                fullWidth
                variant="outlined"
                label="Enter your name"
                name="Name"
                value={network.Name || ''}
                className={classes.textField}
                onChange={handleChange}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.flexContainer}>
            <div className={classes.labelContainer}>
              <span className={classes.label}>Phone</span>
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                error={hasError('Phone')}
                fullWidth
                variant="outlined"
                label="Enter phone number"
                name="Phone"
                autoComplete="off"
                value={network.Phone || ''}
                className={classes.textField}
                onChange={handleChange}
              />
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: '10px 0'
                }}>
                <div
                  className={classes.callForSupport}
                  style={{ width: '80%' }}>
                  Show this contact in Safety Plan and Emergency Click-to-Call
                </div>
                <Switch
                  checked={network.CallForSupport}
                  color="primary"
                  edge="start"
                  name="CallForSupport"
                  onChange={() =>
                    setNetwork(value => ({
                      ...value,
                      CallForSupport: !network.CallForSupport
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.flexContainer}>
            <div className={classes.labelContainer}>
              <span className={classes.label}>Address</span>
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                error={hasError('Address')}
                fullWidth
                variant="outlined"
                label="Enter address"
                name="Address"
                autoComplete="off"
                value={network.Address || ''}
                className={classes.textField}
                onChange={handleChange}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.flexContainer}>
            <div className={classes.labelContainer}>
              <span className={classes.label}>Email</span>
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                error={hasError('Email')}
                fullWidth
                variant="outlined"
                label="Enter email"
                name="Email"
                autoComplete="off"
                value={network.Email || ''}
                className={classes.textField}
                onChange={handleChange}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <div className={classes.flexContainer}>
            <div className={classes.labelContainer} />
            <div className={classes.textFieldContainer}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={invitation.AllowRecPlanAccess}
                  color="primary"
                  value={invitation.AllowRecPlanAccess}
                  disabled={
                    network.Status === 'Connected' ||
                    network.Status === 'Disconnected'
                  }
                  onChange={() =>
                    handleInvitationFields(
                      'AllowRecPlanAccess',
                      !invitation.AllowRecPlanAccess
                    )
                  }
                />
                <span
                  className={classes.value}
                  onClick={() =>
                    handleInvitationFields(
                      'AllowRecPlanAccess',
                      !invitation.AllowRecPlanAccess
                    )
                  }>
                  Invite this contact to connect on Jiemba
                </span>
                <IconButton onClick={() => setInviteBox(true)}>
                  <img src="/images/network/ask-invite-icon.svg" alt="" />
                </IconButton>
              </div>
              {(network.Status === 'Pending' ||
                network.Status === 'Disconnected') && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {network.Status === 'Pending' && (
                    <div className={classes.contactType}>
                      Pending to connect
                    </div>
                  )}
                  {network.Status === 'Disconnected' && (
                    <div className={classes.contactType}>Disconnected</div>
                  )}
                  <div
                    className={classes.resendInvitation}
                    onClick={giveAllAccessToTheContact}>
                    Reconnect
                  </div>
                </div>
              )}
              {network.Status === 'Connected' && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    className={classes.contactType}
                    style={{ backgroundColor: '#F79221', color: '#FFFFFF' }}>
                    Connected
                  </div>
                </div>
              )}
            </div>
          </div>
        </Grid>
        {!loading && (
          <Grid item xs={12}>
            {(network.Status === 'Connected' ||
              network.Status === 'Disconnected') && (
              <ManageAccess
                network={network!}
                accessState={accessState}
                setAccessState={setAccessState}
              />
            )}
            {invitation.AllowRecPlanAccess &&
              (network.Status === 'Pending' || network.Status === '') && (
                <SendAccess
                  invitation={invitation}
                  changeHandler={handleInvitationFields}
                />
              )}
          </Grid>
        )}

        <Grid
          item
          xs={12}
          container
          justify="center"
          style={{ margin: '30px 0' }}>
          <div className={classes.buttonContainer}>
            <Button type="primary" click={handleSubmit}>
              Save contact
            </Button>
          </div>
        </Grid>
      </Grid>
      {inviteBox && inviteBoxDialog}
      {resendConfirm && resendConfirmDialog}
    </>
  ) : (
    <Redirect to="/networks/people" />
  );
};

export default EditContact;
