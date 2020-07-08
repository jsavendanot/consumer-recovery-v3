import React, { ChangeEvent, useContext } from 'react';
import { FocusArea } from 'types/other';

import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import GoalContext from '../../../../GoalContext';
import { GoalForm } from 'types/goal';
import produce from 'immer';

const useStyles = makeStyles(() => ({
  subTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '25px',
    color: '#003E1F',
    margin: '5px 0'
  },
  button: {
    width: '100%',
    height: '40px',
    borderRadius: '25px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    color: '#003E1F',
    border: '1.5px solid #003E1F',
    backgroundColor: '#FFFFFF',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#FFFFFF'
    },
    '&:active': {
      backgroundColor: '#FFFFFF'
    }
  },
  upload: {
    position: 'absolute',
    bottom: '18px'
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '196px'
  }
}));

type Props = {
  focusArea: FocusArea;
};

export const GoalImage: React.FC<Props> = ({ focusArea }) => {
  const classes = useStyles();
  const { goal, setGoal } = useContext(GoalContext!);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      // const imageType = event.target.files[0].type.replace('image/', '');
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = e => {
        setGoal(
          produce((draft: GoalForm) => {
            draft.image = e.target
              ? e.target?.result!.toString().split('base64,')[1]
              : '';
          })
        );
      };
    }
  };

  return (
    <div style={{ margin: '30px 0 20px' }}>
      <span className={classes.subTitle}>Goal Image</span>
      {focusArea && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px',
            backgroundColor: `${focusArea.color}`,
            position: 'relative'
          }}>
          {goal.image !== '' && goal.image !== null ? (
            <img
              src={'data:image/png;base64,' + goal.image}
              alt=""
              className={classes.image}
            />
          ) : (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
                backgroundColor: `${focusArea.color}`
              }}>
              <img
                src={'/images/areas/' + focusArea.image}
                alt=""
                style={{ width: 200, height: 160 }}
              />
            </div>
          )}
          <div className={classes.upload}>
            <input
              accept="image/*"
              type="file"
              onChange={handleInputChange}
              id="icon-button-file"
              style={{ display: 'none' }}
            />
            <label htmlFor="icon-button-file">
              <Button
                variant="contained"
                component="span"
                className={classes.button}
                size="large"
                color="primary">
                Change image
              </Button>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalImage;
