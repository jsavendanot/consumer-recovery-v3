import React, { useState } from 'react';
import useRouter from 'common/utils/useRouter';
import { Menu, MenuItem } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createStaywell } from 'slices/safety/staywell/action';
import { DeleteConfirmation } from 'common/components';
import { makeStyles } from '@material-ui/styles';
import { createStress } from 'slices/safety/stress/action';
import {
  createWarningSignDiff,
  createWarningSignStr
} from 'slices/safety/warning/action';
import { createUnwell, createUnwellNot } from 'slices/safety/unwell/action';
import { deleteAllEmergencyContacts } from 'slices/safety/support/action';

const useStyles = makeStyles(() => ({
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  }
}));

type Props = {
  type: 'staywell' | 'stress' | 'warningsign' | 'unwell' | 'service';
  anchorEl: Element | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
};

export const ActionMenu: React.FC<Props> = ({
  type,
  anchorEl,
  setAnchorEl
}) => {
  const classes = useStyles();
  const open = Boolean(anchorEl);
  const { history } = useRouter();
  const dispatch = useDispatch();

  /** Navigation */
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    history.push(`/safety/${type}/create`);
  };

  const deleteHandler = () => {
    type === 'staywell' && dispatch(createStaywell([]));
    type === 'stress' && dispatch(createStress([]));
    type === 'warningsign' && dispatch(createWarningSignDiff([]));
    type === 'warningsign' && dispatch(createWarningSignStr([]));
    type === 'unwell' && dispatch(createUnwell([]));
    type === 'unwell' && dispatch(createUnwellNot([]));
    type === 'service' && dispatch(deleteAllEmergencyContacts());
  };

  /** Dialog */
  const [openConfirm, setOpenConfirm] = useState(false);

  function handleClickOpen() {
    setAnchorEl(null);
    setOpenConfirm(true);
  }

  function handleClose() {
    setOpenConfirm(false);
  }

  const confirmDialog = (
    <DeleteConfirmation
      open={openConfirm}
      close={handleClose}
      action={deleteHandler}
      donRedirect>
      <span className={classes.confirmTitle}>
        Are you sure you want to
        <br />
        delete this safety plan?
      </span>
    </DeleteConfirmation>
  );

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
      {openConfirm && confirmDialog}
    </>
  );
};

export default ActionMenu;
