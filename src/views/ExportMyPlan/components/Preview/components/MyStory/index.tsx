import React from 'react';
import { Grid } from '@material-ui/core';
import { Story, Areas, Strengths } from './components';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { Strength } from 'types/story';
import { FocusArea } from 'types/other';

export const MyStory: React.FC = () => {
  const myStory: string = useSelector(
    (state: RootState) => state.story.story.Story
  );

  const myStrengths: Strength[] = useSelector(
    (state: RootState) => state.story.strengths
  );

  const myAreas: FocusArea[] = useSelector(
    (state: RootState) => state.story.focusAreas
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Story myStory={myStory} />
      </Grid>
      <Grid item xs={12}>
        <Strengths myStrengths={myStrengths} />
      </Grid>
      <Grid item xs={12}>
        <Areas myAreas={myAreas} />
      </Grid>
    </Grid>
  );
};

export default MyStory;
