import React, { useState } from 'react';
import clsx from 'clsx';
import useRouter from 'common/utils/useRouter';

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Theme
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/KeyboardArrowUp';

import { Button } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  container1: {
    [theme.breakpoints.up('xs')]: {
      padding: '0 20px 20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 10% 20px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 10% 10px'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 10% 10px'
    }
  },
  container2: {
    [theme.breakpoints.up('xs')]: {
      padding: '0 20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 10%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 10%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 20%'
    }
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '10px 0'
  },
  textNav: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B',
    margin: '10px 20px 0 0',
    [theme.breakpoints.up('sm')]: {
      fontSize: '25px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '32px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '32px'
    }
  },
  policyImage: {
    position: 'relative',
    left: '20%',
    zIndex: 20,
    top: '1px',
    width: '160px',
    height: '148px',
    [theme.breakpoints.up('md')]: {
      width: '252px',
      height: '232px'
    },
    [theme.breakpoints.up('lg')]: {
      width: '252px',
      height: '232px'
    },
    backgroundImage: 'url("/images/landing/policy.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain'
  },
  card: {
    position: 'relative',
    top: '-73px',
    [theme.breakpoints.up('md')]: {
      top: '-115px'
    },
    [theme.breakpoints.up('lg')]: {
      top: '-115px'
    },
    zIndex: 10,
    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px'
  },
  header: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '18px',
    color: '#73BA9B',
    textTransform: 'uppercase'
  },
  text: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '18px'
  },
  iconRotate: {
    transform: 'rotate(180deg)'
  },
  buttonContainer: {
    position: 'relative',
    top: '-55px'
  },
  cardActions: {
    justifyContent: 'center'
  }
}));

const SignupPolicy: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const [more, setMore] = useState(true);

  return (
    <>
      <Grid container className={classes.container1}>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <div className={classes.textContainer}>
            <span
              className={classes.textNav}
              onClick={() =>
                history.push(
                  `/profile/${sessionStorage.getItem('FirstName')}/create`
                )
              }>
              I've read it
            </span>
          </div>
        </Grid>
      </Grid>
      <Grid container className={classes.container2}>
        <Grid item xs={12}>
          <div className={classes.policyImage} />
          <Card className={classes.card}>
            <CardHeader
              title={
                <Typography variant="h2">
                  Your
                  <br />
                  information
                  <br />
                  is private!
                </Typography>
              }
            />
            <CardContent>
              <span className={classes.header}>Who are we?</span>
              <br />
              <span className={classes.text}>
                We are one of several services in the Murrumbidgee area who are
                part of the Mental Health Drug and Alcohol Alliance. These
                services work together to ensure your needs are met.
              </span>
              <br />
              {!more && (
                <>
                  <br />
                  <span className={classes.header}>
                    WHAT INFORMATION DO WE COLLECT ABOUT YOU?
                  </span>
                  <br />
                  <span className={classes.text}>
                    We keep your name and details on your Consumer Information
                    record. Other details such as your Care Plan and information
                    about the services you receive are updated regularly.
                  </span>
                  <br />
                  <br />
                  <span className={classes.header}>
                    WHY DO WE COLLECT YOUR INFORMATION?
                  </span>
                  <br />
                  <span className={classes.text}>
                    The information we collect helps us to keep updated
                    information about your needs. This helps us care for you in
                    the best possible way.
                  </span>
                  <br />
                  <br />
                  <span className={classes.header}>
                    WHO ELSE SEES YOUR INFORMATION?
                  </span>
                  <br />
                  <span className={classes.text}>
                    Your information can only be seen by the professionals in
                    the services involved in your care. We also use the
                    information to better manage and plan this service. We only
                    release information about you if you agree or if required by
                    law. Examples include: where you are at risk of harming
                    yourself or someone else; where a child is at risk of
                    neglect or abuse; if you disclose that you have committed or
                    are about to commit a serious crime.
                  </span>
                  <br />
                  <br />
                  <span className={classes.header}>
                    WHAT ARE YOUR RIGHTS ON WHO SEES YOUR INFORMATION?
                  </span>
                  <br />
                  <span className={classes.text}>
                    You have a say in what happens to your information. We rely
                    on the information you give us to help provide the right
                    care for you. You have a right to not share information or
                    restrict access to your consumer record, but it may affect
                    our ability to provide you with the best possible services.
                    Let us know if you wish to change or cancel your consent.
                  </span>
                  <br />
                  <br />
                  <span className={classes.header}>
                    HOW WILL YOUR INFORMATION BE PROTECTED?
                  </span>
                  <br />
                  <span className={classes.text}>
                    The privacy of your information is protected by law. We take
                    protecting the confidentiality of your information
                    seriously. We treat your information in the strictest
                    confidence and store it securely.
                  </span>
                  <br />
                  <br />
                  <span className={classes.header}>
                    CAN YOU ACCESS YOUR INFORMATION?
                  </span>
                  <br />
                  <span className={classes.text}>
                    Yes, you have a right to request access to your information,
                    and to ask for corrections to be made if necessary.
                  </span>
                  <br />
                  <br />
                  <span className={classes.header}>ANY OTHER QUESTIONS?</span>
                  <br />
                  <span className={classes.text}>
                    Please talk to one of our staff if you have further
                    questions or complaints about what happens to your
                    information while you are a consumer at our service, or if
                    you wish to access your record.
                  </span>
                </>
              )}
            </CardContent>
            <CardActions className={classes.cardActions}>
              <IconButton onClick={() => setMore(value => !value)}>
                <MoreIcon
                  fontSize="large"
                  className={clsx(more && classes.iconRotate)}
                />
              </IconButton>
            </CardActions>
          </Card>
          {!more && (
            <div className={classes.buttonContainer}>
              <Button
                type="primary"
                click={() =>
                  history.push(
                    `/profile/${sessionStorage.getItem('FirstName')}`
                  )
                }>
                I've read it
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default SignupPolicy;
