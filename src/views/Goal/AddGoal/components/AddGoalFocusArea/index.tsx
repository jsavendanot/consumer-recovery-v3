import React, { useState } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { FocusArea } from 'types/other';

import { makeStyles } from '@material-ui/styles';
import { IconButton, Theme } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';

import { Button } from 'common/components';
const useStyles = makeStyles((theme: Theme) => ({
  container1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    [theme.breakpoints.up('xs')]: {
      padding: '20px 20px'
    },
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
  container2: {
    display: 'flex',
    // alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('xs')]: {
      padding: '0 20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 20%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 20%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 25%',
      paddingTop: '35px',
      paddingBottom: '10px',
    }
  },
  container3: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
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
    fill: '#6FBC9E'
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0px'
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '28px',
    color: '#73BA9B',
    marginLeft: '15px',
    marginTop: '5px',
    [theme.breakpoints.up('lg')]: {
      fontSize: '34px',
      color: '#003E1F'
    }
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 10px'
  },
  buttonContainer: {
    width: '100%',
    padding: '20px 0'
  },
  areaName: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '35px',
    color: '#003E1F'
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: '20px 20px'
  },
  details: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '23px',
    color: '#323F45'
  },
  image: {
    height: '200px',
    width: '200px',
    [theme.breakpoints.up('sm')]: {
      height: '250px',
      width: '250px'
    },
    [theme.breakpoints.up('lg')]: {
      height: '100%',
      width: '40em'
    }
  }
}));

interface MatchParams {
  areaId: string;
}
type Props = RouteComponentProps<MatchParams>;

const AddGoalFocusArea: React.FC<Props> = ({ match, history }) => {
  const classes = useStyles();
  const { areaId } = match.params;

  const [focusAreas] = useState<FocusArea[]>(
    JSON.parse(sessionStorage.getItem('focusAreas')!)
  );

  const [focusArea] = useState<FocusArea>(
    focusAreas.find(area => area.id === areaId)!
  );

  return focusArea ? (
    <>
      {focusArea ? (
        <div
          className={classes.container1}
          style={{ backgroundColor: focusArea.color }}>
          <IconButton
            style={{ padding: '0' }}
            onClick={() => history.push('/create/goal')}>
            <ArrowBackIos className={classes.backArrow} />
          </IconButton>
          <span className={classes.headerText}>{focusArea.name}</span>
        </div>
      ) : (
          <div
            className={classes.container1}
            style={{ backgroundColor: '#FFFFFF' }}>
            <IconButton
              style={{ padding: '0' }}
              onClick={() => history.push('/create/goal')}>
              <ArrowBackIos className={classes.backArrow} />
            </IconButton>
          </div>
        )}
      {focusArea && (
        <div
          className={classes.container3}
          style={{ backgroundColor: focusArea.color }}>
          <img
            srcSet={`/images/areas/${focusArea.image}`}
            alt=""
            className={classes.image}
          />
        </div>
      )}

      <div className={classes.container2}>
        {focusArea && (
          <div className={classes.textContainer}>
            <span className={classes.areaName}>{focusArea.name}</span>
          </div>
        )}
        {focusArea && (
          <div className={classes.textContainer}>
            <span className={classes.details}>{focusArea.description}</span>
          </div>
        )}
        <div className={classes.buttonContainer}>
          <Button
            type="primary"
            click={() => history.push(`${history.location.pathname}/form`)}>
            Create goal
          </Button>
        </div>
      </div>
    </>
  ) : (
      <Redirect to="/create/goal" />
    );
};

export default AddGoalFocusArea;
