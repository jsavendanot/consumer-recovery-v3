import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import { makeStyles } from '@material-ui/styles';
import { Grid, Divider, Checkbox, TextField } from '@material-ui/core';
import { Profile } from 'types/profile';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  divider: {
    border: '1px solid #73BA9B',
    margin: '10px 0 20px'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  title2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    color: 'rgba(115, 186, 155, 0.7)'
  },
  value: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#323F45'
  },
  value2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '127.69%',
    color: '#37474F'
  },
  tabTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0'
  },
  tabTitleContainer2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '10px 0'
  },
  subContainer: {
    width: '50%',
    textAlign: 'left'
  },
  subContainer2: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  image: {
    marginRight: '10px'
  },
  textField: {
    background: '#FFFFFF',
    borderRadius: '5px',
    borderStyle: 'none',
    width: '100%',
    '& .MuiInput-underline:after': {
      borderBottomColor: '#73BA9B'
    }
  },
  subTitle2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '23px',
    color: '#73BA9B'
  }
}));

const schema = {
  MedicalRecordNumber: {
    length: {
      maximum: 16
    }
  },
  AdditionalInformation: {
    length: {
      maximum: 10
    }
  },
  name: {
    length: {
      maximum: 64
    }
  },
  practiceName: {
    length: {
      maximum: 164
    }
  },
  phone: {
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 15,
      minimum: 7
    }
  },
  address: {
    length: {
      maximum: 364
    }
  },
  additional: {
    length: {
      maximum: 564
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    MedicalRecordNumber?: string;
    AdditionalInformation?: string;
    name?: string;
    practiceName?: string;
    phone?: string;
    address?: string;
    additional?: string;
  };
  touched: {
    MedicalRecordNumber?: boolean;
    AdditionalInformation?: boolean;
    name?: boolean;
    practiceName?: boolean;
    phone?: boolean;
    address?: boolean;
    additional?: boolean;
  };
  errors: {
    MedicalRecordNumber?: string[];
    AdditionalInformation?: string[];
    name?: string[];
    practiceName?: string[];
    phone?: string[];
    address?: string[];
    additional?: string[];
  };
};

type Props = {
  profile: Profile;
  setProfile: (name: string, value: string) => void;
};

const Health: React.FC<Props> = ({ profile, setProfile }) => {
  const classes = useStyles();

  const [treatment, setTreatment] = useState(true);

  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {},
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
  }, [formState.values]);

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
    if (
      event.target.name === 'MedicalRecordNumber' ||
      event.target.name === 'AdditionalInformation'
    ) {
      setProfile(event.target.name, event.target.value);
    }
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <div className={classes.tabTitleContainer}>
          <span className={classes.title}>General Practitioner</span>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Name</span>
          </div>
          <div className={classes.subContainer}>
            <TextField
              error={hasError('name')}
              helperText={
                hasError('name')
                  ? formState.errors.name && formState.errors.name[0]
                  : null
              }
              label=""
              name="name"
              type="text"
              autoComplete="off"
              value={formState.values.name || ''}
              placeholder="type here"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Practice name</span>
          </div>
          <div className={classes.subContainer}>
            <TextField
              error={hasError('practiceName')}
              helperText={
                hasError('practiceName')
                  ? formState.errors.practiceName &&
                    formState.errors.practiceName[0]
                  : null
              }
              label=""
              name="practiceName"
              type="text"
              autoComplete="off"
              value={formState.values.practiceName || ''}
              placeholder="type here"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Phone</span>
          </div>
          <div className={classes.subContainer}>
            <TextField
              error={hasError('phone')}
              helperText={
                hasError('phone')
                  ? formState.errors.phone && formState.errors.phone[0]
                  : null
              }
              label=""
              name="phone"
              type="text"
              autoComplete="off"
              value={formState.values.phone || ''}
              placeholder="type here"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Address</span>
          </div>
          <div className={classes.subContainer}>
            <TextField
              error={hasError('address')}
              helperText={
                hasError('address')
                  ? formState.errors.address && formState.errors.address[0]
                  : null
              }
              label=""
              name="address"
              type="text"
              autoComplete="off"
              value={formState.values.address || ''}
              placeholder="type here"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} style={{ margin: '15px 0' }}>
        <div className={classes.tabTitleContainer}>
          <Checkbox
            color="primary"
            value="treatment"
            checked={treatment}
            onChange={() => setTreatment(value => !value)}
          />
          <div style={{ flexGrow: 1 }}>
            <span>“I have a current GP Mental Health Treatment Plan.”</span>
          </div>
        </div>
      </Grid>
      {treatment && (
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.tabTitleContainer}>
              <span className={classes.title}>Health care details</span>
            </div>
            <Divider className={classes.divider} />
            <div className={classes.tabTitleContainer2}>
              <span className={classes.subTitle2}>Medicare card</span>
            </div>
            <div className={classes.tabTitleContainer}>
              <div className={classes.subContainer}>
                <span className={classes.title2}>Card number</span>
              </div>
              <div className={classes.subContainer}>
                <span className={classes.value}>
                  <TextField
                    error={hasError('MedicalRecordNumber')}
                    helperText={
                      hasError('MedicalRecordNumber')
                        ? formState.errors.MedicalRecordNumber &&
                          formState.errors.MedicalRecordNumber[0]
                        : null
                    }
                    label=""
                    name="MedicalRecordNumber"
                    type="text"
                    autoComplete="off"
                    value={
                      profile.MedicalRecordNumber
                        ? profile.MedicalRecordNumber
                        : ''
                    }
                    placeholder="type here"
                    className={classes.textField}
                    onChange={handleChange}
                    inputProps={{ maxLength: 16 }}
                  />
                </span>
              </div>
            </div>
            <div className={classes.tabTitleContainer}>
              <div className={classes.subContainer}>
                <span className={classes.title2}>Expiry</span>
              </div>
              <div className={classes.subContainer}>
                <span className={classes.value}>
                  <TextField
                    error={hasError('AdditionalInformation')}
                    helperText={
                      hasError('AdditionalInformation')
                        ? formState.errors.AdditionalInformation &&
                          formState.errors.AdditionalInformation[0]
                        : null
                    }
                    label=""
                    name="AdditionalInformation"
                    type="text"
                    autoComplete="off"
                    value={
                      profile.AdditionalInformation
                        ? profile.AdditionalInformation
                        : ''
                    }
                    placeholder="dd/mm/yyyy"
                    className={classes.textField}
                    onChange={handleChange}
                    inputProps={{ maxLength: 10 }}
                  />
                </span>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
      <Grid container style={{ marginBottom: '20px' }}>
        <Grid item xs={12}>
          <div className={classes.tabTitleContainer}>
            <span className={classes.title}>Additional information</span>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.tabTitleContainer2}>
            <TextField
              error={hasError('additional')}
              helperText={
                hasError('additional')
                  ? formState.errors.additional &&
                    formState.errors.additional[0]
                  : null
              }
              label=""
              name="additional"
              type="text"
              multiline
              autoComplete="off"
              value={formState.values.additional || ''}
              placeholder="Enter information you would like services to know about you."
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Health;
