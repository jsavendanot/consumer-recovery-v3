import React from 'react';
import { Item } from 'types/safety';
import { makeStyles } from '@material-ui/styles';
import { List, ListItemText, ListItem } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  valueText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#37474F'
  },
  list: {
    padding: '10px 30px'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  }
}));

type Props = {
  items: Item[];
};

export const ListItems: React.FC<Props> = ({ items }) => {
  const classes = useStyles();

  return (
    <>
      <List className={classes.list}>
        {items.map(value => (
          <ListItem key={value.id}>
            <ListItemText style={{ background: '#FFFAE9', padding: '15px' }}>
              <span className={classes.valueText}>{value.name}</span>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ListItems;
