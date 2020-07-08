import React from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  text: {
    ontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#37474F',
    textTransform: 'capitalize'
  }
}));

type Props = {
  date: Date;
  onDatePrev: () => void;
  onDateNext: () => void;
};

const Toolbar: React.FC<Props> = ({ date, onDatePrev, onDateNext }: Props) => {
  const classes = useStyles();

  return (
    <Grid alignItems="center" container justify="space-around" spacing={3}>
      <Grid item>
        <KeyboardArrowLeft fontSize="large" onClick={onDatePrev} />
      </Grid>
      <Grid item>
        <span className={classes.text}>{moment(date).format('MMMM YYYY')}</span>
      </Grid>
      <Grid item>
        <KeyboardArrowRight fontSize="large" onClick={onDateNext} />
      </Grid>
    </Grid>
  );
};

export default Toolbar;
