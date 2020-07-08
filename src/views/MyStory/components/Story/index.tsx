import React from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  story: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '23px',
    color: '#323F45'
  }
}));

type Props = {
  storyText: string;
};

const Story: React.FC<Props> = ({ storyText }) => {
  const classes = useStyles();
  return <span className={classes.story}>{storyText}</span>;
};

export default Story;
