import React from 'react';
import { Strength } from 'types/story';

import { makeStyles } from '@material-ui/styles';
import { Delete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px 0'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0'
  },
  text: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#323F45'
  }
}));

type Props = {
  strengths: Strength[];
  remove: (id: string) => void;
};

const EditMyStrengths: React.FC<Props> = ({ strengths, remove }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {strengths.map(strength => {
        return (
          <div className={classes.row} key={strength.id}>
            <div
              style={{
                width: '100%',
                background: '#FFFAE9',
                borderRadius: '4px',
                padding: '10px'
              }}>
              <span className={classes.text}>{strength.name}</span>
            </div>
            <IconButton
              onClick={() => remove(strength.id)}
              style={{ marginLeft: '10px' }}>
              <Delete
                style={{
                  fill: '#73BA9B',
                  cursor: 'pointer'
                }}
              />
            </IconButton>
          </div>
        );
      })}
    </div>
  );
};

export default EditMyStrengths;
