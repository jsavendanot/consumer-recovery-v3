import React, { useState, MouseEvent } from 'react';

import { makeStyles } from '@material-ui/styles';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { Phone, MoreVert } from '@material-ui/icons';
import { Network } from 'types/network';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
  },
  subContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#F79221',
    marginRight: '5px'
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#37474F'
  },
  moreIcon: {
    margin: '10px'
  }
}));

type Props = {
  value: Network;
  remove: (id: string) => void;
  changeAccountType: (id: string) => void;
};

const Record: React.FC<Props> = ({ value, remove, changeAccountType }) => {
  const classes = useStyles();

  /** Navigation */
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleMenuClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const moveHandler = () => {
    changeAccountType(value.Id);
    setAnchorEl(null);
  };

  const deleteHandler = () => {
    remove(value.Id);
    setAnchorEl(null);
  };

  const menus = (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      PaperProps={{
        style: {
          maxHeight: 48 * 4.5,
          width: '20ch'
        }
      }}>
      <MenuItem key="delete" onClick={deleteHandler}>
        Delete
      </MenuItem>
      <MenuItem key="move" onClick={moveHandler}>
        {value.Type === 'Person' ? 'Move to Services' : 'Move to People'}
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.container}>
      <div
        style={{
          flexGrow: 1,
          alignItems: 'flex-start',
          flexDirection: 'column',
          padding: '10px',
          backgroundColor: '#FFFAE9'
        }}>
        <div className={classes.subContainer}>
          <span className={classes.text}>{value.Name},&nbsp;</span>
        </div>
        <div className={classes.subContainer}>
          <IconButton style={{ padding: '0', margin: '0 5px' }}>
            <Phone style={{ fill: '#73BA9B' }} />
          </IconButton>
          <span className={classes.label}>{value.Phone},&nbsp;</span>
        </div>
      </div>
      <div style={{ backgroundColor: '#FFFAE9' }}>
        <IconButton
          className={classes.moreIcon}
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}>
          <MoreVert style={{ fill: '#73BA9B' }} />
        </IconButton>
        {menus}
      </div>
    </div>
  );
};

export default Record;
