import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid, Divider, Checkbox } from '@material-ui/core';
import { Profile } from 'types/profile';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  container2: {
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
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '22px',
    color: '#003E1F'
  },
  subTitle2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '23px',
    color: '#73BA9B'
  },
  value: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#323F45'
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
  }
}));

type Props = {
  profile: Profile;
};
export const Health: React.FC<Props> = ({ profile }) => {
  const classes = useStyles();

  const [treatment, setTreatment] = useState(false);

  return (
    <Grid container className={classes.container2}>
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
            <span className={classes.value}>...</span>
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Practice name</span>
          </div>
          <div className={classes.subContainer}>
            <span className={classes.value}>...</span>
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Phone</span>
          </div>
          <div className={classes.subContainer}>
            <span className={classes.value}>...</span>
          </div>
        </div>
        <div className={classes.tabTitleContainer}>
          <div className={classes.subContainer}>
            <span className={classes.title2}>Address</span>
          </div>
          <div className={classes.subContainer}>
            <span className={classes.value}>...</span>
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
            <span className={classes.subTitle}>
              “I have a current GP Mental Health Treatment Plan.”
            </span>
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
                  {profile?.MedicalRecordNumber}
                </span>
              </div>
            </div>
            <div className={classes.tabTitleContainer}>
              <div className={classes.subContainer}>
                <span className={classes.title2}>Expiry</span>
              </div>
              <div className={classes.subContainer}>
                <span className={classes.value}>
                  {moment(profile?.AdditionalInformation).format('LL')}
                </span>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Health;
