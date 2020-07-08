import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';
import useRouter from 'common/utils/useRouter';

import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { Grid, IconButton, TextField, Switch } from '@material-ui/core';
import { Close, Email } from '@material-ui/icons';

import { Button } from 'common/components';
import { Invitation } from 'types/network';
import { sendInvitation } from 'slices/network/invitation/action';
import { Relationship, Access } from './components';

const useStyles = makeStyles(() => ({
  closeIcon: {
    position: 'absolute',
    right: '10px',
    top: '10px'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '35px',
    color: '#73BA9B'
  },
  text: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#73BA9B'
  },
  addText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#73BA9B',
    cursor: 'pointer'
  },
  desc: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '127.69%',
    color: '#323F45'
  },
  closeText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F',
    cursor: 'pointer'
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px 20px'
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: '5px',
    borderStyle: 'none'
  },
  emailText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#37474F'
  }
}));

const schema = {
  EmailAddress: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  AccountType: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    EmailAddress?: string;
    AccountType?: string;
  };
  touched: {
    EmailAddress?: boolean;
    AccountType?: boolean;
  };
  errors: {
    EmailAddress?: string[];
    AccountType?: string[];
  };
};

type Props = {
  close: () => void;
};

const InvitePeople: React.FC<Props> = ({ close }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = useRouter();

  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {
      AccountType:
        history.location.pathname.split('/')[2] === 'people'
          ? 'Carer'
          : 'ServiceProvider'
    },
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values, history.location.pathname]);

  const [invitation, setInvitation] = useState<Invitation>({
    InvitationId: '',
    Name: '',
    EmailAddress: '',
    Subject: 'Invitation',
    Message: '',
    UserId: '',
    AcceptedOn: '',
    AccountType:
      formState.values.AccountType === 'Carer' ? 'Carer' : 'ServiceProvider',
    AllowRecPlanAccess: true,
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

  /** Send invitation */
  const submitSendInvitation = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        EmailAddress: invitation.EmailAddress,
        AccountType: invitation.AccountType
      },
      touched: {
        ...formState.touched,
        EmailAddress: true,
        AccountType: true
      }
    }));

    if (formState.isValid) {
      dispatch(sendInvitation(invitation));
      close();
    }
  };

  const handleInvitationFields = (name: string, value: string | boolean) => {
    setInvitation(values => ({
      ...values,
      [name]: value
    }));
  };

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

    handleInvitationFields(event.target.name, event.target.value);
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  return (
    <div style={{ padding: '20px', height: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <IconButton className={classes.closeIcon} onClick={close}>
            <Close fontSize="large" style={{ fill: '#73BA9B' }} />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>Invite someone</span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.desc}>
            You can invite anyone you choose to join your network by sending
            them an invitation via email. Once they sign up to Jiemba, you will
            find them, and the contact details they choose to share, in your
            network.
          </span>
        </Grid>
        <Grid item xs={12} container alignItems="flex-end">
          <Grid item xs={5}>
            <span className={classes.text}>Email Address</span>
          </Grid>
          <Grid item xs={7}>
            <TextField
              error={hasError('EmailAddress')}
              fullWidth
              label="Enter email address"
              name="EmailAddress"
              autoComplete="off"
              value={formState.values.EmailAddress || ''}
              className={classes.textField}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container alignItems="flex-end">
          <Grid item xs={5}>
            <span className={classes.text}>Add this contact to</span>
          </Grid>
          <Grid item xs={7}>
            <TextField
              error={hasError('AccountType')}
              fullWidth
              label="Please select"
              name="AccountType"
              select
              autoComplete="off"
              SelectProps={{ native: true }}
              value={formState.values.AccountType}
              className={classes.textField}
              onChange={handleChange}>
              {['Carer', 'ServiceProvider'].map(accountType => (
                <option key={accountType} value={accountType}>
                  {accountType === 'Carer' && 'Person'}
                  {accountType === 'ServiceProvider' && 'Service'}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={4}>
            <span className={classes.text}>
              {formState.values.AccountType === 'Carer'
                ? 'Relationship'
                : 'Service type'}
            </span>
          </Grid>
          <Grid item xs={8}>
            {formState.values.AccountType === 'Carer' ? (
              <Relationship
                invitation={invitation}
                change={handleInvitationFields}
              />
            ) : (
              <TextField
                error={hasError('Relationship')}
                fullWidth
                label="Enter service type"
                name="Relationship"
                autoComplete="off"
                variant="outlined"
                value={invitation.Relationship || ''}
                className={classes.textField}
                onChange={handleChange}
                inputProps={{ maxLength: 80 }}
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={8}>
            <span className={classes.text}>
              Allow access to my recovery plan
            </span>
          </Grid>
          <Grid item xs={4} container justify="flex-end">
            <Switch
              checked={invitation.AllowRecPlanAccess}
              color="primary"
              edge="start"
              name="access"
              onChange={() =>
                handleInvitationFields(
                  'AllowRecPlanAccess',
                  !invitation.AllowRecPlanAccess
                )
              }
            />
          </Grid>
        </Grid>

        {invitation.AllowRecPlanAccess && (
          <Grid item xs={12}>
            <Access invitation={invitation} change={handleInvitationFields} />
          </Grid>
        )}
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <Button type="primary" click={submitSendInvitation}>
            <div className={classes.buttonContent}>
              <Email style={{ fill: '#FFFFFF', marginRight: '5px' }} />
              Send email invitation
            </div>
          </Button>
        </Grid>
        {/* <Grid item xs={12}>
          <Button type="secondary">
            <div className={classes.buttonContent}>
              <FileCopy style={{ marginRight: '5px' }} />
              Copy link
            </div>
          </Button>
        </Grid> */}
        <Grid item xs={12} container justify="center">
          <span className={classes.closeText} onClick={close}>
            Close
          </span>
        </Grid>
      </Grid>
    </div>
  );
};

export default InvitePeople;
