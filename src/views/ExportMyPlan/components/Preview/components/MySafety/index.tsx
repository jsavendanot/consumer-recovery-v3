import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Staywell,
  StressMe,
  Difficulty,
  Strategy,
  UnwellHappen,
  UnwellNotHappen,
  Contact
} from './components';

export const MySafety: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Staywell />
      </Grid>
      <Grid item xs={12}>
        <StressMe />
      </Grid>
      <Grid item xs={12}>
        <Difficulty />
      </Grid>
      <Grid item xs={12}>
        <Strategy />
      </Grid>
      <Grid item xs={12}>
        <UnwellHappen />
      </Grid>
      <Grid item xs={12}>
        <UnwellNotHappen />
      </Grid>
      <Grid item xs={12}>
        <Contact />
      </Grid>
    </Grid>
  );
};

export default MySafety;
