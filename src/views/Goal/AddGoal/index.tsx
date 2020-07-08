import React, { useState } from 'react';
import useRouter from 'common/utils/useRouter';
import { FocusArea as FocusAreaType } from 'types/other';

import { IconButton, Theme, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowBackIos } from '@material-ui/icons';

import { FocusArea } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  container1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('xs')]: {
      padding: '20px 20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '20px 10%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 10% 10px'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '20px 10% 10px'
    }
  },
  container2: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
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
      padding: '0 10%'
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
    fill: '#6FBC9E'
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '28px',
    color: '#73BA9B',
    marginLeft: '140px',
    marginTop: '5px',
    [theme.breakpoints.up('lg')]: {
      fontSize: '34px',
      color: '#003E1F'
    }
  }
}));

const AddGoal: React.FC = () => {
  const classes = useStyles();
  const { history, location } = useRouter();

  const [focusAreas] = useState<FocusAreaType[]>(
    JSON.parse(sessionStorage.getItem('focusAreas')!)
  );

  const selectFocusArea = (id: string) => {
    history.push(`${location.pathname}/${id}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#D5F2E3' }}>
      <div className={classes.container1}>
        <>
          <IconButton
            style={{ padding: '0' }}
            onClick={() => history.push('/goals/current')}>
            <ArrowBackIos className={classes.backArrow} />
          </IconButton>
          <span className={classes.headerText}>Pick an area</span>
        </>
      </div>
      <div className={classes.container2}>
        <Grid container>
          <Grid item lg={2}></Grid>
          <Grid item lg={8}>
            <Grid container>
              {focusAreas.map(area => {
                return (
                  <Grid item xs={6} md={4} lg={3} key={area.id}>
                    <FocusArea
                      id={area.id}
                      name={area.name}
                      color={area.color}
                      image={area.image}
                      click={id => selectFocusArea(id)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item lg={2}></Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddGoal;
