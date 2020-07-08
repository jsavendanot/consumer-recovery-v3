import React from 'react';
import clsx from 'clsx';
import { Item } from 'types/safety';

import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  Tooltip,
  Theme
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    border: `2px solid ${theme.palette.divider}`
  },
  checkbox: {
    marginRight: theme.spacing(1)
  }
}));

type Props = {
  className: string;
  title: string;
  values: Item[];
};

const SafetyCard: React.FC<Props> = ({ className, title, values }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <CardHeader title={title} />
      <List>
        {values.map((todo, i) => (
          <ListItem key={i}>
            <ListItemIcon>
              <Checkbox className={classes.checkbox} color="primary" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body1">{todo}</Typography>
            </ListItemText>
            <Tooltip title="delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default SafetyCard;
