import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from 'common/components';

const useStyles = makeStyles(() => ({
  container: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '35px',
    color: '#73BA9B'
  }
}));

const AddStep: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <span className={classes.title}>Add a step</span>
      <div>enter step name</div>
      <div>
        <div>
          <span>Repeat</span>
          <div>toggle</div>
        </div>
        <div>
          <span>Date/Time</span>
          <div>toggle</div>
        </div>
      </div>
      <div>
        <span>Cancel</span>
        <Button type="extra">Add</Button>
      </div>
    </div>
  );
};

export default AddStep;
