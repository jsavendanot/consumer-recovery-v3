import React, { Dispatch, SetStateAction, useState, MouseEvent } from 'react';
import { Unwell } from 'types/safety';

import { makeStyles } from '@material-ui/styles';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { People, MoreVert } from '@material-ui/icons';
import { Network } from 'types/network';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    backgroundColor: '#FFFAE9',
    marginBottom: '20px'
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
  value: Unwell;
  setValue: Dispatch<SetStateAction<Unwell>>;
  remove: (id: string) => void;
};

const Record: React.FC<Props> = ({ value, setValue, remove }) => {
  const classes = useStyles();

  const networks: Network[] = useSelector(
    (state: RootState) => state.networkRoot.network.networks
  );

  /** Navigation */
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleMenuClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const editHandler = () => {
    setValue(value);
    setAnchorEl(null);
  };

  const deleteHandler = () => {
    remove(value.UnwellId);
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
      <MenuItem key="edit" onClick={editHandler}>
        Edit
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.container}>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          padding: '10px'
        }}>
        <div className={classes.subContainer}>
          <span className={classes.text}>{value.Name}</span>
        </div>
        <div className={classes.subContainer}>
          <IconButton style={{ padding: '0', margin: '0 5px' }}>
            <People style={{ fill: '#73BA9B' }} />
          </IconButton>
          <span className={classes.label}>
            {
              networks.find(
                item => item.Id === value.NetworkContactIdResponsible
              )?.Name
            }
          </span>
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
