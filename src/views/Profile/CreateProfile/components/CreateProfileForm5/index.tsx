import React from 'react';
import useRouter from 'common/utils/useRouter';
import { useDispatch } from 'react-redux';
import { verifyProfile } from 'slices/profile/action';

import { makeStyles } from '@material-ui/styles';
import { Grid, Hidden, Theme } from '@material-ui/core';

import Navigation from '../Navigation';
import { Button } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    [theme.breakpoints.up('xs')]: {
      padding: '0 20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 20%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 30%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 30%'
    }
  },
  title: {
    position: 'relative',
    top: '0px',
    zIndex: 0,
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '37px',
    color: '#FFFFFF',
  },
  titleContainer: {
    padding: '10px 20px',
    display: 'flex',
    marginBottom: 64,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '120px',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center'
    }
  },
  formGroup: {
    marginTop: '39px',
    padding: '0 22px'
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#323F45',
    [theme.breakpoints.up('md')]: {
      fontSize: '18px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '20px'
    }
  },
  buttonContainer: {
    padding: '0 20px',
    marginTop: '40px'
  },
  text: {
    fontFamily: 'Tajawal',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F',
    cursor: 'pointer'
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px'
  },
  image: {
    position: 'absolute',
    right: '0',
    zIndex: 20,
    top: '-100px',
    [theme.breakpoints.up('sm')]: {
      top: '-75px'
    },
    [theme.breakpoints.up('md')]: {
      top: '-77px'
    },
    [theme.breakpoints.up('lg')]: {
      top: '-45px'
    }
  }
}));

type Props = {
  index: number;
  next: () => void;
  back: () => void;
};

const CreateProfileForm5: React.FC<Props> = ({ index, next, back }) => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const handleSkip = () => {
    history.push('/goals/current');
  };

  const handleComplete = () => {
    dispatch(verifyProfile());
    history.push(`/profile/${sessionStorage.getItem('FirstName')}/edit`);
  };

  return (
    <Grid container>
      <Grid item xs={12} style={{ background: '#73BA9B' }}>
        <Navigation current={index} active next={next} back={back} />
      </Grid>
      <Grid
        item
        xs={12}
        style={{ background: '#73BA9B', position: 'relative' }}>
        <img
          src="/images/profile/image_form5.svg"
          alt=""
          className={classes.image}
        />
      </Grid>
      <Grid item xs={12} style={{ background: '#73BA9B' }}>
        <div className={classes.titleContainer}>
          <Hidden smUp>
            <span className={classes.title}>
              Well done! You have completed 50% of your profile!
            </span>
          </Hidden>
          <Hidden xsDown>
            <span className={classes.title}>
              Well done!
              <br />
              You have completed 50% of your
              <br />
              profile!
            </span>
          </Hidden>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <div className={classes.formGroup}>
              <Hidden smUp>
                <span className={classes.label}>
                  You can continue to complete the rest or click “skip” and
                  start exploring this amazing platform.
                </span>
              </Hidden>
              <Hidden xsDown>
                <span className={classes.label}>
                  You can continue to complete the rest or click “skip” and
                  start exploring this amazing platform.
                </span>
              </Hidden>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.textContainer} onClick={handleSkip}>
              <span className={classes.text}>Skip</span>
            </div>
          </Grid>
          <Grid item xs={12} onClick={handleComplete}>
            <div className={classes.buttonContainer}>
              <Button type="primary">Complete my profile</Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateProfileForm5;
