import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  operations: {
    display: 'flex',
    flexDirection: 'column'
  },
  operation: {
    width: '45px',
    height: '45px',
    background: '#003E1F',
    borderRadius: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  }
}));

type Props = {
  save: () => void;
  email: () => void;
};

export const Operations: React.FC<Props> = ({ save, email }) => {
  const classes = useStyles();
  return (
    <div className={classes.operations}>
      <IconButton onClick={save} style={{ marginBottom: '38px' }}>
        <div className={classes.operation}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEJSURBVHgB7ZZ9EYJAEMUXxwCaQCKoCTCBYwNNYAQlgglooCbQBkoDsQEJPN8JKjJ3sMuHf/GbeXOzx3KP+4aoowEcU6VSyqUqjTlOJMnXRoGqzkZi5Kn6WA37udhNywiaEQ8PCjLxFoZ6SP0ysw/c8UfDpjyjYY/aQxvO/2WmGWYD2zAO8FVL4jFi5tnN6HfSG6HtYezMjNygBTSBVpRsfjZ9Qa42mmKjxmkcYsUeUV7pe/IUIumZnzF6kcY75vsis7ulPqQWzFxhfS2zNebI0QdsDvYdJjEbQydKVuL77juToGf51RiV5HvQxdA7G1HhUzS0hx4l4nDIt2374fGoHjG2BXuVdoh4Aq1oFIUTHYbkAAAAAElFTkSuQmCC"
            alt="save"
          />
        </div>
      </IconButton>
    </div>
  );
};

export default Operations;
