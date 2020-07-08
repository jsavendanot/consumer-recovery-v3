import React, { Dispatch, SetStateAction, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Grid,
  IconButton,
  Theme,
  useMediaQuery,
  Dialog,
  DialogContent
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Network } from 'types/network';
import {
  ArrowBackIos,
  DeleteOutline,
  AddCircleOutline
} from '@material-ui/icons';
import { NetworkList, Loader } from 'common/components';
import { updateEmergencyContacts } from 'slices/safety/support/action';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  header: {
    padding: '20px 0',
    backgroundColor: '#73BA9B'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
    color: '#D5F2E3'
  },
  nameText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F'
  },
  addText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#73BA9B'
  },
  number: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '35px',
    color: '#F79221'
  },
  saveButtonText: {
    fontFamily: 'Tajawal',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#D5F2E3',
    cursor: 'pointer'
  },
  editDiv: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '41px',
    height: '41px',
    backgroundColor: '#D5F2E3',
    borderRadius: '25px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    cursor: 'pointer'
  },
  note: {
    padding: '15px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F'
  }
}));

type Props = {
  close: () => void;
  setEdit: Dispatch<SetStateAction<boolean>>;
};

const EditEmergency: React.FC<Props> = ({ close, setEdit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.safetyRoot.safety.loading
  );

  const [emergencyNetworks, setEmergencyNetworks] = useState<Network[]>(
    JSON.parse(sessionStorage.getItem('emergency')!)
  );

  /** Theme */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleNetworkCallBack = (networks: Network[]) => {
    networks.forEach(item => {
      if (!emergencyNetworks.some(network => network.Id === item.Id)) {
        setEmergencyNetworks(value => [...value, item]);
      }
    });
  };

  const handleDeleteButtonClick = (id: string) => {
    const updatedEmergencyNetwork = emergencyNetworks.filter(
      item => item.Id !== id
    );
    setEmergencyNetworks(updatedEmergencyNetwork);
  };

  const handleSaveButtonClick = async () => {
    await dispatch(updateEmergencyContacts(emergencyNetworks));
    setEdit(false);
  };

  const networkListDialog = (
    <Dialog
      open={open}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleClose}>
      <DialogContent>
        <NetworkList
          close={handleClose}
          callback={networks => handleNetworkCallBack(networks)}
          title="Add to Click to Call"
        />
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {loading && <Loader />}
      <Grid container justify="center">
        <Grid item xs={12} container className={classes.header}>
          <Grid item xs={2} container justify="center" alignItems="center">
            <IconButton style={{ padding: '0' }} onClick={() => setEdit(false)}>
              <ArrowBackIos style={{ fill: '#D5F2E3', cursor: 'pointer' }} />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <span className={classes.title}>Edit Click to Call</span>
          </Grid>
          <Grid item xs={2} container alignItems="center">
            <span
              className={classes.saveButtonText}
              onClick={handleSaveButtonClick}>
              Save
            </span>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
          <div className={classes.note}>
            You can arrange, add, and delete contacts for your Click to Call
            list. To make the contacts more visible at emergency, we recommend
            to not have more than 5 contacts here.
          </div>
        </Grid>
        <div style={{ padding: '20px' }}>
          <Grid item xs={12} container justify="center" spacing={2}>
            {emergencyNetworks.map((network, index) => {
              return (
                <Grid item xs={10} container alignItems="flex-end" key={index}>
                  <Grid item xs={10} container direction="column">
                    <span className={classes.nameText}>{network.Name}</span>
                    <span>
                      <a
                        className={classes.number}
                        href={`tel:61${network.Phone}`}>
                        {network.Phone}
                      </a>
                    </span>
                  </Grid>
                  <Grid item xs={2} container justify="flex-end">
                    <IconButton
                      onClick={() => handleDeleteButtonClick(network.Id)}>
                      <DeleteOutline
                        fontSize="large"
                        style={{ fill: '#73BA9B', cursor: 'pointer' }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              );
            })}
            <Grid item xs={10} container direction="column">
              <span className={classes.nameText}>Emergency services</span>
              <span>
                <a className={classes.number} href="tel:61000">
                  000
                </a>
              </span>
            </Grid>
            <Grid item xs={10} container direction="column">
              <span className={classes.nameText}>AccessLine</span>
              <span>
                <a className={classes.number} href="tel:611800800944">
                  1800 800 944
                </a>
              </span>
            </Grid>
            <Grid item xs={10} container direction="column">
              <span className={classes.nameText}>LifeLine</span>
              <span>
                <a className={classes.number} href="tel:61131114">
                  13 11 14
                </a>
              </span>
            </Grid>
            <Grid item xs={10} container direction="column">
              <span className={classes.nameText}>
                Suicide Call Back Service
              </span>
              <span>
                <a className={classes.number} href="tel:61130659467">
                  1300 659 467
                </a>
              </span>
            </Grid>
            <Grid item xs={10} container alignItems="center" justify="center">
              <IconButton onClick={() => setOpen(true)}>
                <AddCircleOutline style={{ fill: '#73BA9B' }} />
              </IconButton>
              <span className={classes.addText}>Add</span>
            </Grid>
          </Grid>
        </div>
      </Grid>
      {open && networkListDialog}
    </>
  );
};

export default EditEmergency;
