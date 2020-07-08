import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Input, Paper, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2, 2)
  }
}));

type Props = {
  text: string;
  change: (value: string) => void;
};

const EditStory: React.FC<Props> = ({ text, change }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={1}>
      <Input
        fullWidth
        disableUnderline
        multiline
        defaultValue={text}
        onChange={event => change(event.target.value)}
        inputProps={{ maxLength: 500 }}
      />
    </Paper>
  );
};

export default EditStory;
