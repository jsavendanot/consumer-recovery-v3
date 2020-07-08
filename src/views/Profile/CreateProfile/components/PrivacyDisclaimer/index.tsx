import React, { Dispatch, SetStateAction, useState } from 'react';
import useRouter from 'common/utils/useRouter';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Theme,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Typography,
  IconButton
} from '@material-ui/core';
import { ArrowBackIos, KeyboardArrowUp } from '@material-ui/icons/';
import clsx from 'clsx';
import { Button } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: '#D5F2E3',
    [theme.breakpoints.up('xs')]: {
      padding: '20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '20px 15%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 20%'
    }
  },
  arrowContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  backArrow: {
    fontSize: '38px',
    [theme.breakpoints.up('md')]: {
      fontSize: '50px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '50px'
    },
    fill: '#73BA9B'
  },
  navigation: {
    paddingTop: '40px',
    height: '183px'
  },
  activeText: {
    cursor: 'pointer',
    fontFamily: 'Tajawal',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
    lineHeight: '22px',
    color: '#73BA9B',
    [theme.breakpoints.up('md')]: {
      fontSize: '30px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '35px'
    }
  },
  title: {
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
  policyImage: {
    position: 'relative',
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
    }
  },
  iconRotate: {
    transform: 'rotate(180deg)'
  },
  buttonContainer: {
    [theme.breakpoints.up('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    },
    position: 'relative',
    top: '-55px'
  },
  cardActions: {
    justifyContent: 'center'
  }
}));

type Props = {
  setReadPrivacy: Dispatch<SetStateAction<boolean>>;
};

const PrivacyDisclaimer: React.FC<Props> = ({ setReadPrivacy }) => {
  const classes = useStyles();
  const { history } = useRouter();

  const [more, setMore] = useState(false);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        container
        className={classes.navigation}
        style={{ background: '#D5F2E3' }}>
        <Grid item xs={3}>
          <div className={classes.arrowContainer}>
            <IconButton
              style={{ padding: '0' }}
              onClick={() => history.push('/goals/current')}>
              <ArrowBackIos className={classes.backArrow} />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={4}>
          <div className={classes.arrowContainer}>
            <span
              className={classes.activeText}
              onClick={() => setReadPrivacy(true)}>
              I've read it
            </span>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          className={classes.container}
          justify="center">
          <img
            src="/images/landing/policy.svg"
            alt=""
            className={classes.policyImage}
          />
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
              <span className={classes.title}>Who are we?</span>
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
                  <span className={classes.title}>
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
                  <span className={classes.title}>
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
                  <span className={classes.title}>
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
                  <span className={classes.title}>
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
                  <span className={classes.title}>
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
                  <span className={classes.title}>
                    CAN YOU ACCESS YOUR INFORMATION?
                  </span>
                  <br />
                  <span className={classes.text}>
                    Yes, you have a right to request access to your information,
                    and to ask for corrections to be made if necessary.
                  </span>
                  <br />
                  <br />
                  <span className={classes.title}>ANY OTHER QUESTIONS?</span>
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
                <KeyboardArrowUp
                  fontSize="large"
                  className={clsx(more && classes.iconRotate)}
                />
              </IconButton>
            </CardActions>
          </Card>
          {!more && (
            <div className={classes.buttonContainer}>
              <Button type="primary" click={() => setReadPrivacy(true)}>
                I've read it
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PrivacyDisclaimer;
