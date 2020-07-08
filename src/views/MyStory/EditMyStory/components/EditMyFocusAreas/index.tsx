import React from 'react';
import useRouter from 'common/utils/useRouter';
import { FocusArea } from 'types/other';

import { makeStyles } from '@material-ui/styles';
import { Grid, Theme, IconButton } from '@material-ui/core';
import { AddCircleOutlined, Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px'
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
    borderRadius: '12px',
    position: 'relative',
    textAlign: 'center'
  },
  boxTitle: {
    background: '#FFFFFF',
    // border: '1.5px solid #73BA9B',
    boxSizing: 'border-box',
    borderRadius: '12px',
    padding: '10px 5px',
    textAlign: 'center',
    position: 'relative',
    bottom: '0',
    width: '100%',
    marginTop: -4,
    height: 61,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    textAlign: 'center',
    color: '#003E1F'
  },
  imageContainer: {
    boxSizing: 'border-box'
  },
  image: {
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '74%',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    }
  },
  cardTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '35px',
    color: '#73BA9B'
  },
  iconButton: {
    position: 'absolute',
    top: '-5px',
    right: '-2px'
  },
  addMoreText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#73BA9B',
    cursor: 'pointer'
  }
}));

type Props = {
  myFocusAreas: FocusArea[];
  onDeleteFocusAreas: (id: string) => void;
};

const EditMyFocusAreas: React.FC<Props> = ({
  myFocusAreas,
  onDeleteFocusAreas
}) => {
  const classes = useStyles();
  const { history } = useRouter();

  return (
    <div>
      <Grid container>
        {myFocusAreas.map(area => {
          return (
            <Grid item xs={6} sm={6} md={4} lg={3} key={area.id}>
              <div className={classes.container}>
                <div
                  className={classes.box}
                  style={{ background: `${area.color}` }}>
                  <div className={classes.imageContainer}>
                    <img
                      src={'/images/areas/' + area.image}
                      className={classes.image}
                      alt=""
                    />
                  </div>
                  <div className={classes.boxTitle}>
                    <span className={classes.title}>{area.name}</span>
                  </div>
                  <IconButton
                    onClick={() => onDeleteFocusAreas(area.id)}
                    style={{
                      fill: '#73BA9B',
                      position: 'absolute',
                      top: '0px',
                      right: '0px',
                      cursor: 'pointer'
                    }}>
                    <Delete
                      style={{
                        fill: '#73BA9B'
                      }}
                    />
                  </IconButton>
                </div>
              </div>
            </Grid>
          );
        })}
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={3}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 0'
            }}
            onClick={() => history.push('/story/focusareas')}>
            <IconButton>
              <AddCircleOutlined style={{ fill: '#73BA9B' }} />
            </IconButton>
            <span className={classes.addMoreText}>Add more</span>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditMyFocusAreas;
