import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useRouter from 'common/utils/useRouter';
import { removeJournal } from 'slices/journey/action';

import { makeStyles } from '@material-ui/styles';
import { Menu, MenuItem } from '@material-ui/core';
import { DeleteConfirmation } from 'common/components';

const useStyles = makeStyles(() => ({
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
  journalId: string;
  anchorEl: Element | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
};

export const ActionMenu: React.FC<Props> = ({
  journalId,
  anchorEl,
  setAnchorEl
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history, location } = useRouter();
  const open = Boolean(anchorEl);

  /** Navigation */
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    history.push(`${location.pathname}/edit`);
  };

  // const handleShare = () => {
  //   setAnchorEl(null);
  // };

  const handleRemoveJournal = (journalId: string) => {
    dispatch(removeJournal(journalId));
  };

  /** Dialog */
  const [openConfirm, setOpenConfirm] = useState(false);

  function handleClickOpen() {
    setOpenConfirm(true);
    setAnchorEl(null);
  }

  function handleClose() {
    setOpenConfirm(false);
  }

  return (
    <>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch'
          }
        }}>
        <MenuItem key="edit" onClick={handleEdit}>
          Edit
        </MenuItem>
        <MenuItem key="delete" onClick={handleClickOpen}>
          Delete
        </MenuItem>
      </Menu>
      {openConfirm && (
        <DeleteConfirmation
          open={openConfirm}
          close={handleClose}
          action={() => handleRemoveJournal(journalId)}>
          <span className={classes.title}>
            Are you sure you want to
            <br />
            delete this journal?
          </span>
        </DeleteConfirmation>
      )}
    </>
  );
};

export default ActionMenu;
