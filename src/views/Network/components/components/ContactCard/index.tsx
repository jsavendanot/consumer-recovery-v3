import React, { useState } from 'react';
import useRouter from 'common/utils/useRouter';

import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Avatar,
  IconButton,
  Button as MuiButton,
  Theme,
  Dialog,
  DialogContent
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteContact, disconnectContact } from 'slices/network/action';
import {
  KeyboardArrowDown,
  Edit,
  DeleteOutline,
  Close
} from '@material-ui/icons';
import { Network } from 'types/network';
import clsx from 'clsx';
import { SubmitConfirmation } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    height: 60,
    width: 60,
    cursor: 'pointer'
  },
  networkBox: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px'
  },
  name: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '25px',
    color: '#003E1F',
    textAlign: 'left',
    marginLeft: '20px',
    width: '100%',
    wordWrap: 'break-word'
  },
  phone: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '23px',
    color: '#73BA9B',
    textAlign: 'left',
    marginLeft: '20px',
    width: '100%',
    overflowWrap: 'break-word'
  },
  card: {
    borderRadius: '11px',
    width: '100%',
    margin: '15px 0',
    [theme.breakpoints.up('xs')]: {
      width: '95%',
      height: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '600px',
      minHeight: '100px'
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: '100px'
    }
  },
  moreInfo: {
    borderTop: '1px solid #D5F2E3',
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '3px'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  iconRotate: {
    transform: 'rotate(180deg)'
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: '20px 0 15px'
  },
  buttonDisconnect: {
    padding: '5px 10px',
    border: '1px solid #F79221',
    boxSizing: 'border-box',
    borderRadius: '33px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#F79221'
  },
  buttonDelete: {
    padding: '5px 10px',
    border: '1px solid #73BA9B',
    boxSizing: 'border-box',
    borderRadius: '33px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  buttonEdit: {
    padding: '5px 20px',
    border: '1px solid #73BA9B',
    boxSizing: 'border-box',
    borderRadius: '33px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  summaryContainer: {
    width: '60%',
    height: 110
  },
  summary: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  infoBoxRoot: {
    width: '330px',
    boxShadow: '0px 10px 24px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center'
  },
  infoBoxTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '25px',
    color: '#73BA9B'
  },
  infoBoxBodyText: {
    width: '265px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F',
    textAlign: 'justify',
    margin: '20px 10px'
  },
  infoBoxClose: {
    margin: '25px 0',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F',
    textAlign: 'center',
    cursor: 'pointer'
  }
}));

type Props = {
  network: Network;
};

const ContactCard: React.FC<Props> = ({ network }) => {
  const classes = useStyles();
  const { history, location } = useRouter();
  const dispatch = useDispatch();

  const [more, setMore] = useState(false);
  const [action, setAction] = useState('');

  const deleteHandler = () => {
    dispatch(deleteContact(network));
  };

  const disconnectHandler = () => {
    dispatch(disconnectContact(network));
  };

  /** Dialog */
  const [openConfirm, setOpenConfirm] = useState(false);

  function handleClickOpen(action: string) {
    setOpenConfirm(true);
    setAction(action);
  }

  function handleClose() {
    setOpenConfirm(false);
  }

  const confirmDialog = (
    <SubmitConfirmation
      open={openConfirm}
      close={handleClose}
      action={action === 'delete' ? deleteHandler : disconnectHandler}
      donRedirect>
      {action === 'delete' ? (
        <span className={classes.confirmTitle}>
          Are you sure you want to
          <br />
          delete this contact?
        </span>
      ) : (
        <span className={classes.confirmTitle}>
          Are you sure you want to
          <br />
          disconnect this contact?
        </span>
      )}
    </SubmitConfirmation>
  );

  /** Info box  */
  const [connectedBox, setConnectedBox] = useState(false);

  const connectedBoxDialog = (
    <Dialog open={connectedBox} onClose={() => setConnectedBox(false)}>
      <DialogContent className={classes.infoBoxRoot}>
        <div>
          <div style={{ textAlign: 'right' }}>
            <IconButton
              onClick={() => setConnectedBox(false)}
              style={{ position: 'relative', right: '0' }}>
              <Close style={{ fill: '#73BA9B' }} />
            </IconButton>
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
            <img
              src="/images/network/connected-icon.svg"
              alt=""
              style={{
                width: '36px',
                height: '36px',
                marginRight: '20px'
              }}
            />
            <div className={classes.infoBoxTitle}>
              This contact is connected with you on Jiemba
            </div>
          </div>
          <div className={classes.infoBoxBodyText}>
            This means this contact is also using Jiemba and is able to see the
            information of your choice. You can change what you want to share by
            editing this contact.
          </div>
          <div
            className={classes.infoBoxClose}
            onClick={() => setConnectedBox(false)}>
            Close
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const [pendingBox, setPendingBox] = useState(false);

  const pendingBoxDialog = (
    <Dialog open={pendingBox} onClose={() => setPendingBox(false)}>
      <DialogContent className={classes.infoBoxRoot}>
        <div>
          <div style={{ textAlign: 'right' }}>
            <IconButton
              onClick={() => setPendingBox(false)}
              style={{ position: 'relative', right: '0' }}>
              <Close style={{ fill: '#73BA9B' }} />
            </IconButton>
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
            <img
              src="/images/network/pending-icon.svg"
              alt=""
              style={{
                width: '36px',
                height: '36px',
                marginRight: '20px'
              }}
            />
            <div className={classes.infoBoxTitle}>Pending connection</div>
          </div>
          <div className={classes.infoBoxBodyText}>
            This means this contact has received your invitation to connect on
            Jiemba but hasn’t signed up or accepted the invitation. You can
            resend the invitation by editing this contact.
          </div>
          <div
            className={classes.infoBoxClose}
            onClick={() => setPendingBox(false)}>
            Close
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <Card className={classes.card}>
        <CardContent style={{ padding: '0', height: '100%' }}>
          <div className={classes.networkBox}>
            <Avatar
              alt=""
              className={classes.avatar}
              src={network.Image}
              onClick={() => setMore(value => !value)}
            />
            <div className={classes.summaryContainer}>
              <div className={classes.summary}>
                <div className={classes.name}>{network.Name}</div>
                <a className={classes.phone} href={`tel:61${network.Phone}`}>
                  {network.Phone}
                </a>
                <div className={classes.phone}>{network.Email}</div>
              </div>
            </div>
            <div className={classes.iconContainer}>
              {network.Status === 'Connected' && (
                <IconButton
                  style={{ margin: '5px 0 5px 5px' }}
                  onClick={() => setConnectedBox(true)}>
                  <img src="/images/network/connected-icon.svg" alt="" />
                </IconButton>
              )}
              {network.Status === 'Pending' && (
                <IconButton
                  style={{ margin: '5px 0 5px 5px', padding: '10px 15px' }}
                  onClick={() => setPendingBox(true)}>
                  <img src="/images/network/pending-icon.svg" alt="" />
                </IconButton>
              )}
              <IconButton onClick={() => setMore(value => !value)}>
                <KeyboardArrowDown
                  fontSize="large"
                  className={clsx(more && classes.iconRotate)}
                />
              </IconButton>
            </div>
          </div>
          {more && (
            <div className={classes.moreInfo}>
              <div style={{ flexGrow: 1, padding: '2px 15px' }}>
                <div className={classes.title}>
                  {network.Type === 'Person' ? 'Relationship' : 'Service type'}
                </div>
              </div>
              <div style={{ flexGrow: 1, padding: '2px 15px' }}>
                <div>{network.Relationship}</div>
              </div>
            </div>
          )}
          {more && (
            <div className={classes.buttonContainer}>
              <div style={{ flexGrow: 1, padding: '2px 15px' }}>
                {network.Status === 'Connected' ? (
                  <MuiButton
                    className={classes.buttonDisconnect}
                    onClick={() => handleClickOpen('disconnect')}>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAsVBMVEUAAAD/gAD/nyD/ixf/lSv/iSfxjhzylBvzlyP1jx/1kx33kSL4lCL4kCH5lCT5kyL0jyD2kyP3kiH3kyD4lCH2kiL3kyH4kSH4kyL4kSH4kyD3kSL3kSH3kSL3kiL4kiH3kSL3kiL3kiL3kiH4kiH4kiH4kSH4kyL2kiH3kiH3kiH3kiH2kiH3kiH3kyH3kiH3kiH3kiH3kiH3kiH3kiH4kiH3kiH3kiH3kiH3kiH///9uiRVsAAAAOXRSTlMAAggLDA0SExYZGh4mJystMDs9QEVZY2ZqbW95e4CBjJeYn6Gqq6yusLe7v9HT3d7i4+Xm5+719vfBjhfkAAAAAWJLR0Q6TgnE+gAAAKpJREFUGNN9kdcWgjAQRAdEjL1jAcWGoiDYYf//x8QgMaiHecmem8kmOwGEqA9Z9WUpgzOxo+x3Sgqnt5qw6uGcw0HUkxp0HsMENu4TFKhsuYdENmC/VtfSABYSlwd4aRUyrIl82ekTrXClTb6dQ5cEOr/w73EWfF8UMEAz808ytaIB0IqMZMxWNJKY6m95IOO4/YGLk55G5x7VjDXj7jvkytkQzqr4Dl49AW5OG6zewGwIAAAAAElFTkSuQmCC"
                      alt=""
                      style={{ marginRight: '10px' }}
                    />
                    Disconnect
                  </MuiButton>
                ) : (
                  <MuiButton
                    className={classes.buttonDelete}
                    onClick={() => handleClickOpen('delete')}>
                    <DeleteOutline
                      style={{ fill: '#73BA9B', marginRight: '5px' }}
                    />
                    Delete
                  </MuiButton>
                )}
              </div>
              <div style={{ flexGrow: 1, padding: '2px 15px' }}>
                <MuiButton
                  className={classes.buttonEdit}
                  onClick={() =>
                    history.push(`${location.pathname}/${network.Id}/edit`)
                  }>
                  <Edit style={{ fill: '#73BA9B', marginRight: '10px' }} />
                  Edit
                </MuiButton>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {openConfirm && confirmDialog}
      {connectedBox && connectedBoxDialog}
      {pendingBox && pendingBoxDialog}
    </>
  );
};

export default ContactCard;
