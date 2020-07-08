import React, { useState, useEffect, ChangeEvent } from 'react';
import useRouter from 'common/utils/useRouter';
import uuid from 'uuid/v1';
import validate from 'validate.js';
import { useDispatch, useSelector } from 'react-redux';
import { addNetwork } from 'slices/network/action';
import { Network, Invitation } from 'types/network';
import { sendInvitation } from 'slices/network/invitation/action';

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  IconButton,
  TextField,
  Theme,
  Checkbox,
  Switch,
  Dialog,
  DialogContent
} from '@material-ui/core';
import { ArrowBackIos, Close } from '@material-ui/icons';

import { Button, Loader } from 'common/components';
import { Image } from '../components/components';
import { RootState } from 'reducer';
import SendAccess from './SendAccess';
import { fetchJournalsData } from 'slices/journey/action';
import { fetchGoals } from 'slices/goal/action';

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
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#73BA9B'
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px'
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
  askText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#37474F',
    cursor: 'pointer'
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
  callForSupport: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#37474F'
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
  }
}));

const schema = {
  Name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
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

const AddContact: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.networkRoot.network.loading
  );

  const [network, setNetwork] = useState<Network>({
    Id: uuid(),
    UserId: sessionStorage.getItem('UserId')!,
    ContactId: uuid(),
    Name: '',
    Email: '',
    Phone: '',
    CallForSupport: false,
    Address: '',
    Type:
      history.location.pathname.split('/')[3] === 'people'
        ? 'Person'
        : 'Organisation',
    Relationship: '',
    Image: '',
    ImageType: '',
    ImageUrl: ''
  });

  const [invitation, setInvitation] = useState<Invitation>({
    InvitationId: '',
    Name: '',
    EmailAddress: '',
    Subject: 'Invitation',
    Message: '',
    UserId: '',
    AcceptedOn: '',
    AccountType:
      history.location.pathname.split('/')[3] === 'people'
        ? 'Carer'
        : 'ServiceProvider',
    AllowRecPlanAccess: false,
    GoalsToShare: '',
    ShareAllGoals: true,
    JournalsToShare: '',
    ShareAllJournals: true,
    ShareMyStory: true,
    ShareSafetyPlan: true,
    ShareNetworkContacts: true,
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
    values: {},
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

      handleInvitationFields(
        'AccountType',
        event.target.value === 'Person' ? 'Carer' : 'ServiceProvider'
      );
    }

    if (event.target.name === 'Email') {
      handleInvitationFields('EmailAddress', event.target.value);
    }

    if (event.target.name === 'Name') {
      handleInvitationFields('Name', event.target.value);
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
      dispatch(addNetwork(history, network));
      invitation.AllowRecPlanAccess && dispatch(sendInvitation(invitation));
    }
  };

  useEffect(() => {
    dispatch(fetchGoals());
    dispatch(fetchJournalsData());
  }, [dispatch]);

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

  return (
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
              <span className={classes.headerText}>Add Contact</span>
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
                  value={network.Relationship}
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
                  value={network.Relationship}
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
                label={
                  network.Type === 'Person' ? (
                    <span>Enter name</span>
                  ) : (
                    <span>Enter service name</span>
                  )
                }
                name="Name"
                value={network.Name}
                className={classes.textField}
                onChange={handleChange}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            className={classes.flexContainer}
            style={{ alignItems: 'flex-start' }}>
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
                value={network.Phone}
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
                value={network.Address}
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
                value={network.Email}
                className={classes.textField}
                onChange={handleChange}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <div className={classes.flexContainer}>
            <div className={classes.labelContainer} />
            <div
              className={classes.textFieldContainer}
              style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={invitation.AllowRecPlanAccess}
                color="primary"
                value={invitation.AllowRecPlanAccess}
                onChange={() =>
                  handleInvitationFields(
                    'AllowRecPlanAccess',
                    !invitation.AllowRecPlanAccess
                  )
                }
              />
              <span
                className={classes.askText}
                onClick={() =>
                  handleInvitationFields(
                    'AllowRecPlanAccess',
                    !invitation.AllowRecPlanAccess
                  )
                }>
                Ask to join My network via email invitation
              </span>
              <IconButton onClick={() => setInviteBox(true)}>
                <img src="/images/network/ask-invite-icon.svg" alt="" />
              </IconButton>
            </div>
          </div>
        </Grid>

        {invitation.AllowRecPlanAccess && (
          <Grid item xs={12}>
            <SendAccess
              invitation={invitation}
              changeHandler={handleInvitationFields}
            />
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
    </>
  );
};

export default AddContact;
