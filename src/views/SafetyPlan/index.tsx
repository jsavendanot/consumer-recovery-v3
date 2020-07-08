import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { fetchNetworks } from 'slices/network/action';
import {
  fetchSafetyPlanServices,
  resetAllSafetyPlanServices
} from 'slices/safety/action';

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Theme,
  Hidden,
  Dialog,
  DialogContent,
  Button as MuiButton
} from '@material-ui/core';

import { Button, Loader } from 'common/components';
import { RouteComponentProps } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  headerTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '48px',
    lineHeight: '60px',
    color: '#37474F',
    textTransform: 'capitalize'
    // marginRight: '10%'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: '40px 0 20px',
    justifyContent: 'space-between',
    [theme.breakpoints.up('xs')]: {
      marginLeft: '5px',
      marginRight: '5px'
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '48px',
      marginRight: '48px'
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '158px',
      marginRight: '158px'
    }
  },
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '158px',
      paddingRight: '158px',
      paddingBottom: '40px'
    }
  },
  staywell: {
    cursor: 'pointer',
    backgroundColor: '#BDEEFF',
    borderRadius: '10px',
    padding: '15px 5px 0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      // width: 169,
      height: 232,
      padding: '15px 5px 0'
    },
    [theme.breakpoints.up('sm')]: {
      // width: 240,
      height: 330,
      padding: '20px 10px 0'
    },
    [theme.breakpoints.up('md')]: {
      // width: 340,
      height: 360,
      padding: '25px 15px 0'
    },
    [theme.breakpoints.up('lg')]: {
      // width: 305,
      height: 360,
      padding: '25px 15px 0'
    }
  },
  stress: {
    cursor: 'pointer',
    backgroundColor: '#196386',
    borderRadius: '10px',
    padding: '15px 5px 0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      // width: 169,
      height: 232,
      padding: '15px 5px 0'
    },
    [theme.breakpoints.up('sm')]: {
      // width: 240,
      height: 330,
      padding: '20px 10px 0'
    },
    [theme.breakpoints.up('md')]: {
      // width: 340,
      height: 360,
      padding: '25px 15px 0'
    },
    [theme.breakpoints.up('lg')]: {
      // width: 305,
      height: 360,
      padding: '25px 15px 0'
    }
  },
  warningsign: {
    cursor: 'pointer',
    backgroundColor: '#FFE566',
    borderRadius: '10px',
    padding: '15px 5px 0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      // width: 346,
      height: 232,
      padding: '15px 5px 0'
    },
    [theme.breakpoints.up('sm')]: {
      // width: 240,
      height: 330,
      padding: '20px 10px 0'
    },
    [theme.breakpoints.up('md')]: {
      // width: 340,
      height: 360,
      padding: '25px 15px 0'
    },
    [theme.breakpoints.up('lg')]: {
      // width: 620,
      height: 360,
      padding: '25px 15px 0'
    }
  },
  unwell: {
    cursor: 'pointer',
    backgroundColor: '#FFE566',
    borderRadius: '10px',
    padding: '15px 5px 0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      // width: 346,
      height: 232,
      padding: '15px 5px 0'
    },
    [theme.breakpoints.up('sm')]: {
      // width: 240,
      height: 330,
      padding: '20px 10px 0'
    },
    [theme.breakpoints.up('md')]: {
      // width: 340,
      height: 360,
      padding: '25px 15px 0'
    },
    [theme.breakpoints.up('lg')]: {
      // width: 620,
      height: 360,
      padding: '25px 15px 0'
    }
  },
  service: {
    cursor: 'pointer',
    backgroundColor: '#D5F2E3',
    borderRadius: '10px',
    padding: '15px 5px 0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      // width: 346,
      height: 232,
      padding: '15px 5px 0'
    },
    [theme.breakpoints.up('sm')]: {
      // width: 509,
      height: 330,
      padding: '20px 10px 0'
    },
    [theme.breakpoints.up('md')]: {
      // width: 700,
      height: 360,
      padding: '25px 15px 0'
    },
    [theme.breakpoints.up('lg')]: {
      // width: 620,
      height: 360,
      padding: '25px 15px 0'
    }
  },
  staywellItem: {
    display: 'flex',
    padding: '1%',
    alignItems: 'flex-end',
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'flex-end'
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end'
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end'
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-end'
    }
  },
  stressItem: {
    display: 'flex',
    padding: '1%',
    alignItems: 'flex-end',
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'flex-start'
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start'
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start'
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-start'
    }
  },
  warningsignItem: {
    display: 'flex',
    padding: '1%',
    alignItems: 'flex-end',
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end'
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end'
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center'
    }
  },
  unwellItem: {
    display: 'flex',
    padding: '1%',
    alignItems: 'flex-end',
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start'
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start'
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center'
    }
  },
  serviceItem: {
    display: 'flex',
    padding: '1%',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  createItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('xs')]: {
      padding: '20px 70px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '20px 25%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 30%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '20px 30%'
    }
  },
  info: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '23px',
    color: '#B3B3B3',
    marginTop: '10px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#37474F',
    [theme.breakpoints.up('xs')]: {
      fontSize: '20px',
      lineHeight: '25px'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '20px',
      lineHeight: '25px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
      lineHeight: '25px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '20px',
      lineHeight: '25px'
    }
  },
  numberIcon: {
    width: 21,
    height: 21,
    marginRight: '13px',
    [theme.breakpoints.up('xs')]: {
      width: 21,
      height: 21
    },
    [theme.breakpoints.up('sm')]: {
      width: 31,
      height: 31
    },
    [theme.breakpoints.up('md')]: {
      width: 31,
      height: 31
    },
    [theme.breakpoints.up('lg')]: {
      width: 31,
      height: 31
    }
  },
  stayWellImage: {
    position: 'absolute',
    [theme.breakpoints.up('xs')]: {
      width: 133,
      height: 127,
      bottom: '51px',
      left: 10
    },
    [theme.breakpoints.up('sm')]: {
      width: 192,
      height: 216,
      bottom: '61px',
      left: '26px'
    },
    [theme.breakpoints.up('md')]: {
      left: 37,
      width: 274,
      bottom: 60,
      height: 250
    },
    [theme.breakpoints.up('lg')]: {
      left: '10%',
      width: '80%',
      bottom: 50,
      height: 268
    }
  },
  stessImage: {
    position: 'absolute',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      height: 144,
      bottom: '16px',
      left: '0'
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      height: 207,
      bottom: 38,
      left: 0
    },
    [theme.breakpoints.up('md')]: {
      left: 29,
      width: 290,
      bottom: 63,
      height: 240
    },
    [theme.breakpoints.up('lg')]: {
      left: 0,
      width: '100%',
      bottom: 50,
      height: 240
    }
  },
  warningsignsImage1: {
    position: 'absolute',
    [theme.breakpoints.up('xs')]: {
      content: 'url(/images/safety/warningsign1.svg)',
      width: '100%',
      height: 84,
      top: 65,
      left: 0
    },
    [theme.breakpoints.up('sm')]: {
      content: 'url(/images/safety/warningsign1_bigger.svg)',
      width: 205,
      height: 128,
      top: 41,
      left: 17
    },
    [theme.breakpoints.up('md')]: {
      content: 'url(/images/safety/warningsign1_bigger.svg)',
      width: '100%',
      height: 160,
      top: 85
      // left: 17
    },
    [theme.breakpoints.up('lg')]: {
      content: 'url(/images/safety/warningsign1.svg)',
      width: '90%',
      height: 140,
      top: 80,
      left: '6%'
    }
  },
  warningsignsImage2: {
    position: 'absolute',
    objectFit: 'cover',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      height: 84,
      bottom: '-2px',
      left: '0'
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      height: 84,
      bottom: '0px',
      left: '0'
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
      height: 113,
      bottom: 0,
      left: '0'
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
      height: '32%',
      bottom: '0%',
      left: '0'
    }
  },
  unwellImage1: {
    position: 'absolute',
    [theme.breakpoints.up('xs')]: {
      width: 121,
      height: 68,
      bottom: 30,
      left: 35
    },
    [theme.breakpoints.up('sm')]: {
      width: 129,
      height: 78,
      bottom: 40,
      left: 0
    },
    [theme.breakpoints.up('md')]: {
      left: 0,
      width: 168,
      bottom: 70,
      height: 110
    },
    [theme.breakpoints.up('lg')]: {
      left: '3%',
      width: '43%',
      bottom: 53,
      height: '37%'
    }
  },
  unwellImage2: {
    position: 'absolute',
    [theme.breakpoints.up('xs')]: {
      width: 90,
      height: 119,
      bottom: 30,
      right: 50
    },
    [theme.breakpoints.up('sm')]: {
      width: 100,
      height: 130,
      bottom: 40,
      right: 0
    },
    [theme.breakpoints.up('md')]: {
      right: 0,
      width: 154,
      bottom: 78,
      height: 177
    },
    [theme.breakpoints.up('lg')]: {
      right: '3%',
      width: '40%',
      bottom: 56,
      height: '60%'
    }
  },
  serviceImage: {
    position: 'absolute',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      height: 114,
      bottom: 15,
      left: 0
    },
    [theme.breakpoints.up('sm')]: {
      left: 0,
      width: '100%',
      bottom: 15,
      height: 215
    },
    [theme.breakpoints.up('md')]: {
      left: 0,
      width: '90%',
      bottom: 15,
      height: '70%'
    },
    [theme.breakpoints.up('lg')]: {
      left: 0,
      width: '90%',
      bottom: 15,
      height: '70%'
    }
  },
  resetContainer: {
    margin: '10px 0',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    }
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  // headerTitle: {
  //   marginTop: '30px',
  //   fontFamily: 'Scada',
  //   fontStyle: 'normal',
  //   fontWeight: 'bold',
  //   fontSize: '48px',
  //   lineHeight: '60px',
  //   color: '#37474F',
  //   textTransform: 'capitalize',
  //   marginLeft: '8%'
  // },
  buttonContainer: {
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'space-around'
  },
  cancelText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F',
    cursor: 'pointer'
  },
  submitText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#FFFFFF'
  },
  submitButton: {
    background: '#F79221',
    borderRadius: '25px'
  }
}));

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

const SafetyPlan: React.FC<Props> = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.safetyRoot.safety.loading
  );

  const staywellLen: number = useSelector(
    (state: RootState) => state.safetyRoot.staywell.items.length
  );

  const stressLen: number = useSelector(
    (state: RootState) => state.safetyRoot.stress.items.length
  );

  const warningLen: number = useSelector(
    (state: RootState) => state.safetyRoot.warning.difficulties.length
  );

  const unwellLen: number = useSelector(
    (state: RootState) => state.safetyRoot.unwell.pleaseDo.length
  );

  const supportLen: number = useSelector(
    (state: RootState) => state.safetyRoot.support.emergencyNetworks.length
  );

  useEffect(() => {
    dispatch(fetchSafetyPlanServices());
  }, [dispatch]);

  const networksLen: number = useSelector(
    (state: RootState) => state.networkRoot.network.networks.length
  );

  const resetHandler = () => {
    dispatch(resetAllSafetyPlanServices());
  };

  useEffect(() => {
    if (networksLen === 0) {
      dispatch(fetchNetworks());
    }
  }, [dispatch, networksLen]);

  /** Dialog */
  const [openConfirm, setOpenConfirm] = useState(false);

  function handleClickOpen() {
    setOpenConfirm(true);
  }

  function handleClose() {
    setOpenConfirm(false);
  }

  const confirmDialog = (
    <Dialog open={openConfirm} onClose={handleClose}>
      <DialogContent>
        <div style={{ padding: '10px' }}>
          <span className={classes.confirmTitle}>
            Your Safety Plan will be
            <br />
            back to empty if being reset.
          </span>
          <div className={classes.buttonContainer}>
            <span className={classes.cancelText} onClick={handleClose}>
              Cancel
            </span>
            <MuiButton className={classes.submitButton} onClick={resetHandler}>
              <span className={classes.submitText}>Reset</span>
            </MuiButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {loading && <Loader />}
      <Grid container>
        <Hidden mdDown>
          <div className={classes.header}>
            <span className={classes.headerTitle}>My Safety Plans</span>
          </div>
        </Hidden>
        {staywellLen === 0 && (
          <Grid
            item
            xs={12}
            container
            justify="center"
            style={{ margin: '10px 0' }}>
            <Grid
              item
              xs={10}
              sm={6}
              lg={4}
              container
              justify="center"
              direction="column">
              <span className={classes.info}>
                Your Safety Plan is still blank. Create your Safety Plan and
                make this page more alive!
              </span>
              <Button
                type="secondary"
                click={() => history.push('/safety/staywell/create')}>
                Create my safety plan
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid container className={classes.container}>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={3}
            className={classes.staywellItem}>
            {staywellLen > 0 ? (
              <div
                className={classes.staywell}
                style={{ position: 'relative' }}
                onClick={() => history.push('/safety/staywell')}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAABrVBMVEUAAAAAAACAAABVVQBAQEBAQCBVORxNMxpVMyJQQCBJPSRONyFKNStMOSZJNyRNNidOOSNMNylKNihOOydLOilPOShPOCVOOiVLOShNOCZMOCRNNydMOSZNOSVONyZOOSZNOCZONyZOOCdOOSZMOCVOOCdMNyZNOCZOOCZMOCZONyZNOCZMOCZOOSVNOCdNOSZNOCZONyVNOCZNOCVNOCZNOCZNOCZNOSZNOCZNNyZNOCZNOCdOOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZOOSdOOihPOihQOyhRPCtSPSxTPixVQC5WQS9WQzFZRDJZRjNdSjddSzdfTDlgTTpiTz1jUD5pVkRuW0lvXUpxX0xyYE50Yk93ZVJ3ZVOCcl6EdGGFdWKPf2yVhnKVhnOVh3SZi3eajXmlmISsnoqtoIyvoo6yppKzqJO6rpq9sp3AtaDDuaTFuqXIvanOw6/Oxa/PxrHRyLPSyrTUy7XUzLbY0Lrh2cPi2sTi2sXl3cfm3sno4Mrr483s5dDt59Hx69Xy69Xz7df07tj48dv48tz5893///+XijChAAAARnRSTlMAAQIDBAgJCg8QFRcYGxwhJCUmJywtNz5HSU1PUVpmbHFzdnl8g4aIjZOUnKerrLC1uL6/xMnKy9DY3OHj5PP2+fr7/P3+AuG9HgAAAAFiS0dEjoIFs28AAAEwSURBVBjTXdFlVwJBFAbgi64dmNgtdgd2s6+CHWBirmIHtqLYsbr/2Rl2wcO+H+bMfc7MmbhEaqKyCsxFeYkUktSaPvCIllxDEMPMgxhZde/vbU4CzXGaCnWwb78qPPLJHLqSVa7EzBWjz6cXNr6toSOGaybG7ln9uIglvuFrGdVMDe04ZNXNNFRWfKNDaUQmOGW+2CVprLhRQVSGXbU6CvAdOonqca7jn3Exglrh1bGyACO14FbPDiRQLc50LNutAhVD0vEl2ohSMPXOz/FImPf4OG+hlL2nATt8p/8Hj9nserg3nnH6AE5Z9cHDHvY8619MlA/bwa92CcXrQGO4+oUlVqxcfHN8kGxoig70IbsbmHBtrDuB/nLhv2mRhRaRH9lTZQztJsWacjKSgo38A1lJk5FhBU51AAAAAElFTkSuQmCC"
                  alt=""
                  className={classes.numberIcon}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    height: '38%',
                    backgroundColor: '#52CAFF',
                    borderRadius: '0 0 10px 10px'
                  }}
                />
                <img
                  src="/images/safety/staywell.svg"
                  alt=""
                  className={classes.stayWellImage}
                />
                <span className={classes.title}>Things I do to stay well</span>
              </div>
            ) : (
              <div
                className={classes.staywell}
                onClick={() => history.push('/safety/staywell/create')}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAABrVBMVEUAAAAAAACAAABVVQBAQEBAQCBVORxNMxpVMyJQQCBJPSRONyFKNStMOSZJNyRNNidOOSNMNylKNihOOydLOilPOShPOCVOOiVLOShNOCZMOCRNNydMOSZNOSVONyZOOSZNOCZONyZOOCdOOSZMOCVOOCdMNyZNOCZOOCZMOCZONyZNOCZMOCZOOSVNOCdNOSZNOCZONyVNOCZNOCVNOCZNOCZNOCZNOSZNOCZNNyZNOCZNOCdOOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZOOSdOOihPOihQOyhRPCtSPSxTPixVQC5WQS9WQzFZRDJZRjNdSjddSzdfTDlgTTpiTz1jUD5pVkRuW0lvXUpxX0xyYE50Yk93ZVJ3ZVOCcl6EdGGFdWKPf2yVhnKVhnOVh3SZi3eajXmlmISsnoqtoIyvoo6yppKzqJO6rpq9sp3AtaDDuaTFuqXIvanOw6/Oxa/PxrHRyLPSyrTUy7XUzLbY0Lrh2cPi2sTi2sXl3cfm3sno4Mrr483s5dDt59Hx69Xy69Xz7df07tj48dv48tz5893///+XijChAAAARnRSTlMAAQIDBAgJCg8QFRcYGxwhJCUmJywtNz5HSU1PUVpmbHFzdnl8g4aIjZOUnKerrLC1uL6/xMnKy9DY3OHj5PP2+fr7/P3+AuG9HgAAAAFiS0dEjoIFs28AAAEwSURBVBjTXdFlVwJBFAbgi64dmNgtdgd2s6+CHWBirmIHtqLYsbr/2Rl2wcO+H+bMfc7MmbhEaqKyCsxFeYkUktSaPvCIllxDEMPMgxhZde/vbU4CzXGaCnWwb78qPPLJHLqSVa7EzBWjz6cXNr6toSOGaybG7ln9uIglvuFrGdVMDe04ZNXNNFRWfKNDaUQmOGW+2CVprLhRQVSGXbU6CvAdOonqca7jn3Exglrh1bGyACO14FbPDiRQLc50LNutAhVD0vEl2ohSMPXOz/FImPf4OG+hlL2nATt8p/8Hj9nserg3nnH6AE5Z9cHDHvY8619MlA/bwa92CcXrQGO4+oUlVqxcfHN8kGxoig70IbsbmHBtrDuB/nLhv2mRhRaRH9lTZQztJsWacjKSgo38A1lJk5FhBU51AAAAAElFTkSuQmCC"
                  alt=""
                  className={classes.numberIcon}
                />
                <span className={classes.title}>Things I do to stay well</span>
              </div>
            )}
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={3} className={classes.stressItem}>
            {stressLen > 0 ? (
              <div
                className={classes.stress}
                style={{ position: 'relative' }}
                onClick={() => history.push('/safety/stress')}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAABZVBMVEUAAAAAAACAAABVVQBAQEBmMzNVMyJQQCBHOStRNihQOChONidNOiZOOiVNOSRNNidMOSZOOCVNOSVNOCZOOCdNOSdNOCZOOCZMOCZNOCZOOCVNOCZNNyZNOSZNOCZNOCZNOCZNOCZNOCZNNyZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZOOSdOOihPOilQPClRPSpSPStTPixUQC5XQzFYQzJdSjdfTDlkUT5kUT9pV0RuXEl3ZVJ3ZVN4Z1N6ald9bFmBcF6Hd2SRgm+Sg2+VhnKajHiajXmhk3+ll4SnmoWpnIisnoqtoIyvoY6voo65rpq7r5u+sp6+s5/AtaDAtaHCt6LCuKPDuaTHvKfHvKjIvanLwKvQx7LRyLPSyrTUzLbZ0Lvd1L/g2MPj28Xk3Mfm3cjo4Mrp4Mvq4szq5M7s5tDz7df17tn279r28Nv38dr48dv48tz5893///8AyCq3AAAALXRSTlMAAQIDBAUPEBITIDQ1Pj9CQ1JaZHaLjI2ao6Str7S1vsTS1tjk5ev29/j8/f6qtfjIAAAAAWJLR0R2MWPJQQAAATJJREFUGBldwQc3gmEABeBLKDsjM/uTjKvMyN4qe2Wv7FXS/f/6vDiO54GR5/Z4W5vqKp34w1Fl0fB7XPhR2EJORo8vT7bnArRKYBR2cDye0ZfEDP2lsOW1cOpJqfON2M6D9L5EXxGyqjj+KM1ycJhDh9LHAhsB5FuMSzo7SWfWGUpJzyN9xYCbkxkZr+SNpAhrgRpG9S3O4IukK7YDXh7JuA5xRVlv/d05aOWFvuwNcz4pW4hONPNUtrV+rr7Llg72OFDHLWXtc2BXxi0toJJzktJj3NC3TdYDTn8gId2Ti8tZd1IyzAoAHk6ndBc2ElKMbQ4Ark4ufejXQaCnHLaSLi48y0jGAqyGUebjSOTqTenbzQn2VuNHUWMfydEgyTY3/iiuafez12qoyMV/BQ78+gQfOG3S/cI1QgAAAABJRU5ErkJggg=="
                  alt=""
                  className={classes.numberIcon}
                />
                <img
                  src="/images/safety/stress.svg"
                  alt=""
                  className={classes.stessImage}
                />
                <span className={classes.title} style={{ color: '#FFFFFF' }}>
                  Things that stress me
                </span>
              </div>
            ) : (
              <div
                className={classes.stress}
                onClick={() => history.push('/safety/stress/create')}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAABZVBMVEUAAAAAAACAAABVVQBAQEBmMzNVMyJQQCBHOStRNihQOChONidNOiZOOiVNOSRNNidMOSZOOCVNOSVNOCZOOCdNOSdNOCZOOCZMOCZNOCZOOCVNOCZNNyZNOSZNOCZNOCZNOCZNOCZNOCZNNyZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZOOSdOOihPOilQPClRPSpSPStTPixUQC5XQzFYQzJdSjdfTDlkUT5kUT9pV0RuXEl3ZVJ3ZVN4Z1N6ald9bFmBcF6Hd2SRgm+Sg2+VhnKajHiajXmhk3+ll4SnmoWpnIisnoqtoIyvoY6voo65rpq7r5u+sp6+s5/AtaDAtaHCt6LCuKPDuaTHvKfHvKjIvanLwKvQx7LRyLPSyrTUzLbZ0Lvd1L/g2MPj28Xk3Mfm3cjo4Mrp4Mvq4szq5M7s5tDz7df17tn279r28Nv38dr48dv48tz5893///8AyCq3AAAALXRSTlMAAQIDBAUPEBITIDQ1Pj9CQ1JaZHaLjI2ao6Str7S1vsTS1tjk5ev29/j8/f6qtfjIAAAAAWJLR0R2MWPJQQAAATJJREFUGBldwQc3gmEABeBLKDsjM/uTjKvMyN4qe2Wv7FXS/f/6vDiO54GR5/Z4W5vqKp34w1Fl0fB7XPhR2EJORo8vT7bnArRKYBR2cDye0ZfEDP2lsOW1cOpJqfON2M6D9L5EXxGyqjj+KM1ycJhDh9LHAhsB5FuMSzo7SWfWGUpJzyN9xYCbkxkZr+SNpAhrgRpG9S3O4IukK7YDXh7JuA5xRVlv/d05aOWFvuwNcz4pW4hONPNUtrV+rr7Llg72OFDHLWXtc2BXxi0toJJzktJj3NC3TdYDTn8gId2Ti8tZd1IyzAoAHk6ndBc2ElKMbQ4Ark4ufejXQaCnHLaSLi48y0jGAqyGUebjSOTqTenbzQn2VuNHUWMfydEgyTY3/iiuafez12qoyMV/BQ78+gQfOG3S/cI1QgAAAABJRU5ErkJggg=="
                  alt=""
                  className={classes.numberIcon}
                />
                <span className={classes.title} style={{ color: '#FFFFFF' }}>
                  Things that stress me
                </span>
              </div>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            className={classes.warningsignItem}>
            {warningLen > 0 ? (
              <div
                className={classes.warningsign}
                style={{ position: 'relative' }}
                onClick={() => history.push('/safety/warningsign')}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAB+FBMVEUAAACAAABVVQBmMzNVKytJSSRAQCBVORxGLi5VQCtVMyJQQCBRNihNMyZONyFNNidNOSZPOShKOiVOOSRONidPOCVNNyROOSdONiVNOSVMNyVMNyZNOCVNOCdNNyZNOCZMOCVONydOOCZNOSVNOCVOOCVNNydNOSZMNyVNOSZNOCdNOCZNOCdNOCZNOCZMOCZNNyZNOCZNOCZNOSZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNNyZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZOOSdOOihQOyhQPClRPCtRPSpSPCtSPSxTPy1VQC5YQzJaRzRdSjddSzddSzhhTTxjUD5kUT5kUT9qWEVrWUZuW0luXElvXUpwXkpwX0t0YU90Yk91Y1B4aFR6ald8bFl/b1yAb12EdGGGdmOIeWWKemeMfWmNfWmPf2yQgG2Sg2+UhHCXinWcjXqekHyfkX6gkn+jlYGsn4uyp5KzqJO0qZS3rJe7sJy+s5/Ct6LCuKPEuaXFu6XHvKjIvanLwKvMwazNwq7Oxa/PxrHTyrTXzrna0bzb077d1b/f18Lh2cPi2sXk3Mfl3cfm3cjm3sno4Mrp4Mvq4szq5M7r483r5M/s5dDx69Xz7Nb07tj17tn279r28Nv48dv48tz5893///9tjNOwAAAARnRSTlMAAgMFBgcICQsMDxATFBchKC0wMTQ3RkhLTGFrbnd4enx9gIKWl5iZnaKlqKyzt7vBw8jL29/i5Ofp6u3u7/Hy8/T4+vz9dZxaWgAAAAFiS0dEp8C3KwMAAAFOSURBVBgZZcGHO9QBHAfgLxkn+5CS7B2FHNnzPmeHMsNVZmVmyyYnKzMq4058/k6/+z3HPQ/vK3YOco93SMprfVF6YpCb2HnGFgMohSIz2EFstDqUDSz9uTLvzXQASQ9F5ZONT7u0Wa5DsrMoXNPw2cLNYdUs9xsQJYpQtJ6Ta0ajsc2AIXKrQq8VeZCNdaosX/HxL8lRJIg8QitVZ934ck7FoSHfRcIwRquTNgxaqGqBVqIxTasfAGrHLFT04LHE4DutTk0rU28xQkUvnkg4xnljEW8uSL6HnwSinTe2gX/kb0OBizjlYoPk5U/yagL1l+Q4notIBD6YyXk0djWjfIH8Va33FxGNDn3/eTE32NM/uUMeNSFOrHzz0HlAm9V3SHUVVUAGqr6ZzsjjuS7gpYfYeMWXAKipBJDzzFHsfCJfFQJZL566y10aJ7l1DSQAmmJYoZeyAAAAAElFTkSuQmCC"
                  alt=""
                  className={classes.numberIcon}
                />
                <div className={classes.warningsignsImage1} />
                <img
                  src="/images/safety/warningsign2.svg"
                  alt=""
                  className={classes.warningsignsImage2}
                />
                <span className={classes.title}>
                  Warning signs I may be having difficulty
                </span>
              </div>
            ) : (
              <div
                className={classes.warningsign}
                onClick={() => history.push('/safety/warningsign/create')}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAB+FBMVEUAAACAAABVVQBmMzNVKytJSSRAQCBVORxGLi5VQCtVMyJQQCBRNihNMyZONyFNNidNOSZPOShKOiVOOSRONidPOCVNNyROOSdONiVNOSVMNyVMNyZNOCVNOCdNNyZNOCZMOCVONydOOCZNOSVNOCVOOCVNNydNOSZMNyVNOSZNOCdNOCZNOCdNOCZNOCZMOCZNNyZNOCZNOCZNOSZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNNyZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZOOSdOOihQOyhQPClRPCtRPSpSPCtSPSxTPy1VQC5YQzJaRzRdSjddSzddSzhhTTxjUD5kUT5kUT9qWEVrWUZuW0luXElvXUpwXkpwX0t0YU90Yk91Y1B4aFR6ald8bFl/b1yAb12EdGGGdmOIeWWKemeMfWmNfWmPf2yQgG2Sg2+UhHCXinWcjXqekHyfkX6gkn+jlYGsn4uyp5KzqJO0qZS3rJe7sJy+s5/Ct6LCuKPEuaXFu6XHvKjIvanLwKvMwazNwq7Oxa/PxrHTyrTXzrna0bzb077d1b/f18Lh2cPi2sXk3Mfl3cfm3cjm3sno4Mrp4Mvq4szq5M7r483r5M/s5dDx69Xz7Nb07tj17tn279r28Nv48dv48tz5893///9tjNOwAAAARnRSTlMAAgMFBgcICQsMDxATFBchKC0wMTQ3RkhLTGFrbnd4enx9gIKWl5iZnaKlqKyzt7vBw8jL29/i5Ofp6u3u7/Hy8/T4+vz9dZxaWgAAAAFiS0dEp8C3KwMAAAFOSURBVBgZZcGHO9QBHAfgLxkn+5CS7B2FHNnzPmeHMsNVZmVmyyYnKzMq4058/k6/+z3HPQ/vK3YOco93SMprfVF6YpCb2HnGFgMohSIz2EFstDqUDSz9uTLvzXQASQ9F5ZONT7u0Wa5DsrMoXNPw2cLNYdUs9xsQJYpQtJ6Ta0ajsc2AIXKrQq8VeZCNdaosX/HxL8lRJIg8QitVZ934ck7FoSHfRcIwRquTNgxaqGqBVqIxTasfAGrHLFT04LHE4DutTk0rU28xQkUvnkg4xnljEW8uSL6HnwSinTe2gX/kb0OBizjlYoPk5U/yagL1l+Q4notIBD6YyXk0djWjfIH8Va33FxGNDn3/eTE32NM/uUMeNSFOrHzz0HlAm9V3SHUVVUAGqr6ZzsjjuS7gpYfYeMWXAKipBJDzzFHsfCJfFQJZL566y10aJ7l1DSQAmmJYoZeyAAAAAElFTkSuQmCC"
                  alt=""
                  className={classes.numberIcon}
                />
                <span className={classes.title}>
                  Warning signs I may be having difficulty
                </span>
              </div>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            className={classes.unwellItem}>
            {unwellLen > 0 ? (
              <div
                className={classes.unwell}
                style={{ position: 'relative' }}
                onClick={() => history.push('/safety/unwell')}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAABzlBMVEUAAAAAAACAAABAQEBmMzNVKytNMxpOOydLPC1RNihROiNSMylJNyRKOilLNSZMNylKNihNOSZPNyRONydKOiVPOCVNNyRPOShMOChONyVNOCZOOCVONydOOCdONyZNNyVONydNNyZNOSZNOSdNOCZOOCZNOCZNOCdONyZNOSZNOCZOOCVMOCZNOCZNOCZNOSZNOSdNOSZNNyZOOSZNOCZNOCVNOCZNOCZNOCZNOCZNOCZNOCZOOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZOOihPOihQOihQOyhQOylRPSpTPixUQC5XQzFZRDJZRTJaRTNaRjNcRzVdSjdeSzlgTjthTTxkUT9lUkBmU0BoVUNpV0RuW0lyX01yYE5zYU91Y1B4Z1N6aVZ9bFmAb12BcF6BcV6GdmONfmqPf2yQgG2VhnKXinWbjnqekH2gkn+jlYGkl4Oll4Som4epnIirnYmsn4utoIy0qJS1qpW3rJfCt6LEuaXHvKfHvKjKv6rMwq3Nwq7Uy7XWzLjWzbnXzrng2MPi2sXk3Mfm3cjp4Mvq5M7r483s5tDt59Hw6tTx69Xy69Xz7Nb17tn279r28Nv48dv48tz5893///8HKBBCAAAARHRSTlMAAQIEBQYKDRETFhkcHyIlJigqLjA3ODpARUlSXGlzdH2Bh4uMjY6RlJmbpKeprbS5vcHCw9PV3t/g6fDw9/j5+vv8/urxAvAAAAABYktHRJkB1jaoAAABR0lEQVQYGQXB21ISAQAA0LMX1kCUcDFEK3Wyi0091sf3Az3y0liDo10GBRVxgwXNBbZzAsBaK04Wi/ktIADN580ETC8HCwgQ7B9G4V69WjzcZCa9DAHhcSc62t+E8uL8+uH0iojDl9VPr9aQz8p0ZzndyB5Ftt8ln3fg79cfa624fT+rDoVeBG/bsPw+hfD9etoRNrbWD0Cvn4DakVTY0HkCw5PGM2BbIwrrmjD95kMIPG1Wa2FFjLKXHXcAaqphaYXzn503AJZW8aMF+u6+eHRafKTMzePc6JD9PfRH7RQ3eT6PR4vL8ZYDGNvcxcBY+HBV/CoBYHRWDEXuW3klBVuv08ikO/8zFCmW6fWqGaFSidx2x3e9lYhpsZGNojihHJ1159nJPwLYPmiI02SZTxQXvwsEINxtNSqYjQcTEAAk9WQ1zwH+A0wtgrkOvSa2AAAAAElFTkSuQmCC"
                  alt=""
                  className={classes.numberIcon}
                />
                <img
                  src="/images/safety/unwell1.svg"
                  alt=""
                  className={classes.unwellImage1}
                />
                <img
                  src="/images/safety/unwell2.svg"
                  alt=""
                  className={classes.unwellImage2}
                />
                <span className={classes.title}>
                  If I become unwell, I would like others to...
                </span>
              </div>
            ) : (
              <div
                className={classes.unwell}
                onClick={() => history.push('/safety/unwell/create')}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAABzlBMVEUAAAAAAACAAABAQEBmMzNVKytNMxpOOydLPC1RNihROiNSMylJNyRKOilLNSZMNylKNihNOSZPNyRONydKOiVPOCVNNyRPOShMOChONyVNOCZOOCVONydOOCdONyZNNyVONydNNyZNOSZNOSdNOCZOOCZNOCZNOCdONyZNOSZNOCZOOCVMOCZNOCZNOCZNOSZNOSdNOSZNNyZOOSZNOCZNOCVNOCZNOCZNOCZNOCZNOCZNOCZOOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZNOCZOOihPOihQOihQOyhQOylRPSpTPixUQC5XQzFZRDJZRTJaRTNaRjNcRzVdSjdeSzlgTjthTTxkUT9lUkBmU0BoVUNpV0RuW0lyX01yYE5zYU91Y1B4Z1N6aVZ9bFmAb12BcF6BcV6GdmONfmqPf2yQgG2VhnKXinWbjnqekH2gkn+jlYGkl4Oll4Som4epnIirnYmsn4utoIy0qJS1qpW3rJfCt6LEuaXHvKfHvKjKv6rMwq3Nwq7Uy7XWzLjWzbnXzrng2MPi2sXk3Mfm3cjp4Mvq5M7r483s5tDt59Hw6tTx69Xy69Xz7Nb17tn279r28Nv48dv48tz5893///8HKBBCAAAARHRSTlMAAQIEBQYKDRETFhkcHyIlJigqLjA3ODpARUlSXGlzdH2Bh4uMjY6RlJmbpKeprbS5vcHCw9PV3t/g6fDw9/j5+vv8/urxAvAAAAABYktHRJkB1jaoAAABR0lEQVQYGQXB21ISAQAA0LMX1kCUcDFEK3Wyi0091sf3Az3y0liDo10GBRVxgwXNBbZzAsBaK04Wi/ktIADN580ETC8HCwgQ7B9G4V69WjzcZCa9DAHhcSc62t+E8uL8+uH0iojDl9VPr9aQz8p0ZzndyB5Ftt8ln3fg79cfa624fT+rDoVeBG/bsPw+hfD9etoRNrbWD0Cvn4DakVTY0HkCw5PGM2BbIwrrmjD95kMIPG1Wa2FFjLKXHXcAaqphaYXzn503AJZW8aMF+u6+eHRafKTMzePc6JD9PfRH7RQ3eT6PR4vL8ZYDGNvcxcBY+HBV/CoBYHRWDEXuW3klBVuv08ikO/8zFCmW6fWqGaFSidx2x3e9lYhpsZGNojihHJ1159nJPwLYPmiI02SZTxQXvwsEINxtNSqYjQcTEAAk9WQ1zwH+A0wtgrkOvSa2AAAAAElFTkSuQmCC"
                  alt=""
                  className={classes.numberIcon}
                />
                <span className={classes.title}>
                  If I become unwell, I would like others to...
                </span>
              </div>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            className={classes.serviceItem}>
            {supportLen > 0 ? (
              <div
                className={classes.service}
                style={{ position: 'relative' }}
                onClick={() => history.push('/safety/service')}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAMAAACeyVWkAAABIFBMVEUAAABLNSZQOiROOSNMNylONydMNiZLOShOOSdNOCZMNyZNNyZNOSVOOCdOOSVNOCdNOCZOOCZNNydNOCZNOCZNOCZNOCZNOSZNOCZNNyZNOCZNOCZNOCZNOCZNOCZNOCZNOCZQOyhSPStTPy1UQC5VQS9XQjBaRTNdSjdnVEJrWEVyX013ZVN5aVV6ald+blqAb12GdmKGdmOHd2SIeWWLe2eMfWmNfmqTg3CVhnOVh3SWiHSdj3uekHyekH2fkX6qnYmxpZG3rJe5rZm6rpq/tJ/BtqHCuKPKv6rLwKvMwazMwq3PxrDUy7XWzbnY0Lrf18Ln38ro4Mrp4Mvp4czq4szr483t59Hv6dPy69X07tj17tn48dv48tz5893////FfsjFAAAAIHRSTlMAIiMkJS4vR0hJSoGCg6usra7Gx8jk5ebn7/Dx+Pn8/k0HXDAAAAABYktHRF9z0VEtAAABHklEQVQYGUXBiVoBYRgG0A+RfUuEmLeaSpsSypb2Iq3ToOJ/7/8yGmY8zhGbL5LKFDKpiE+WVhJwaHGPOIJ56O2BMTEGLR25gMwFi6iNaBtWUQyIxZPHteJzZ+aGqoucW0QSqCmygVK5XL4g1TliIj5td0SygTptpq55JYI2LQ3U6WgiLCkMaGng6P71hzN9rMkGTFpuYdl7pMVAWgqYcGY8NjrYNkj+YVMyMOhQJTyR/MK6pPDChQPckewhKRG0aPn8JT+28E6yiZD4NH1ITg/3z053UCP5rWtekTiqinxrnxxfPkxJVUFURDw5dBUX1BWyLrEEiqiatJkVFP0y589Bb/aNidFr6siuisMd02DToi5Z8oaT6UI6GfLK3D8251XYGt9qwgAAAABJRU5ErkJggg=="
                  alt=""
                  className={classes.numberIcon}
                />
                <img
                  src="/images/safety/service.svg"
                  alt=""
                  className={classes.serviceImage}
                />
                <span className={classes.title}>
                  People or services who I can contact for support
                </span>
              </div>
            ) : (
              <div
                className={classes.service}
                onClick={() => history.push('/safety/service/create')}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAMAAACeyVWkAAABIFBMVEUAAABLNSZQOiROOSNMNylONydMNiZLOShOOSdNOCZMNyZNNyZNOSVOOCdOOSVNOCdNOCZOOCZNNydNOCZNOCZNOCZNOCZNOSZNOCZNNyZNOCZNOCZNOCZNOCZNOCZNOCZNOCZQOyhSPStTPy1UQC5VQS9XQjBaRTNdSjdnVEJrWEVyX013ZVN5aVV6ald+blqAb12GdmKGdmOHd2SIeWWLe2eMfWmNfmqTg3CVhnOVh3SWiHSdj3uekHyekH2fkX6qnYmxpZG3rJe5rZm6rpq/tJ/BtqHCuKPKv6rLwKvMwazMwq3PxrDUy7XWzbnY0Lrf18Ln38ro4Mrp4Mvp4czq4szr483t59Hv6dPy69X07tj17tn48dv48tz5893////FfsjFAAAAIHRSTlMAIiMkJS4vR0hJSoGCg6usra7Gx8jk5ebn7/Dx+Pn8/k0HXDAAAAABYktHRF9z0VEtAAABHklEQVQYGUXBiVoBYRgG0A+RfUuEmLeaSpsSypb2Iq3ToOJ/7/8yGmY8zhGbL5LKFDKpiE+WVhJwaHGPOIJ56O2BMTEGLR25gMwFi6iNaBtWUQyIxZPHteJzZ+aGqoucW0QSqCmygVK5XL4g1TliIj5td0SygTptpq55JYI2LQ3U6WgiLCkMaGng6P71hzN9rMkGTFpuYdl7pMVAWgqYcGY8NjrYNkj+YVMyMOhQJTyR/MK6pPDChQPckewhKRG0aPn8JT+28E6yiZD4NH1ITg/3z053UCP5rWtekTiqinxrnxxfPkxJVUFURDw5dBUX1BWyLrEEiqiatJkVFP0y589Bb/aNidFr6siuisMd02DToi5Z8oaT6UI6GfLK3D8251XYGt9qwgAAAABJRU5ErkJggg=="
                  alt=""
                  className={classes.numberIcon}
                />
                <span className={classes.title}>
                  People or services who I can contact for support
                </span>
              </div>
            )}
          </Grid>
          {(staywellLen > 0 ||
            stressLen > 0 ||
            warningLen > 0 ||
            unwellLen > 0 ||
            supportLen > 0) && (
            <Grid container justify="center">
              <Grid item lg={4} />
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                container
                style={{ marginTop: '10px', marginBottom: '20px' }}
                justify="center">
                <Button type="secondary" click={handleClickOpen}>
                  Reset my safety plan
                </Button>
                {openConfirm && confirmDialog}
              </Grid>
              <Grid item lg={4}></Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default SafetyPlan;
