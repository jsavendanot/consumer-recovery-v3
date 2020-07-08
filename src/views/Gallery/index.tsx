import React, { useState, useEffect } from 'react';
import useRouter from 'common/utils/useRouter';
import { Image } from 'types/gallery';

import {
  Grid,
  IconButton,
  Dialog,
  DialogContent,
  Slide,
  Theme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add, ArrowBackIos } from '@material-ui/icons';

import { AddPhoto, ShowImage } from './components';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { Loader } from 'common/components';
import { fetchGalleryImages } from 'slices/gallery/action';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 20px',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '50px'
    }
  },
  headerText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '35px',
    color: '#37474F',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      fontSize: '28px',
      lineHeight: '35px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '30px',
      lineHeight: '35px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '35px',
      lineHeight: '35px'
    }
  },
  backArrow: {
    fontSize: '42px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '52px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '52px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '52px'
    },
    marginTop: '12px',
    fill: '#6FBC9E'
  },
  addIcon: {
    margin: '5px 10px'
  },
  image: {
    padding: '15px',
    objectFit: 'cover',
    width: '180px',
    height: '180px',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      width: '210px',
      height: '210px'
    },
    [theme.breakpoints.up('md')]: {
      width: '230px',
      height: '230px'
    },
    [theme.breakpoints.up('lg')]: {
      width: '240px',
      height: '240px'
    }
  },
  addPhoto: {
    [theme.breakpoints.down('xs')]: {
      bottom: '0',
      right: '0',
      width: '100%',
      position: 'fixed',
      background: '#FFFFFF',
      borderRadius: '12px 12px 0px 0px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '10px',
      width: '400px',
      height: '220px'
    }
  },
  showPhoto: {
    [theme.breakpoints.down('xs')]: {
      bottom: '0',
      right: '0',
      width: '100%',
      height: '100%',
      position: 'fixed',
      background: '#000000',
      padding: '0'
    },
    [theme.breakpoints.up('sm')]: {
      background: '#000000',
      padding: '10px',
      width: '500px',
      height: '700px'
    },
    [theme.breakpoints.up('lg')]: {
      background: '#000000',
      padding: '10px',
      width: '600px',
      height: '700px'
    }
  }
}));

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

const Gallery: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.gallery.loading
  );

  const images: Image[] = useSelector(
    (state: RootState) => state.gallery.images
  );

  useEffect(() => {
    if (images.length === 0) {
      dispatch(fetchGalleryImages());
    }
  }, [dispatch, images.length]);

  /** Add photo Dialog */
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [selectedImage, setSelectedImage] = useState('');

  /** Show photo dialog */
  const [open2, setOpen2] = useState(false);
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClickOpen2 = (Id: string) => {
    setSelectedImage(Id);
    setOpen2(true);
  };

  const addPhotoDialog = (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}>
      <DialogContent className={classes.addPhoto}>
        <AddPhoto close={handleClose} />
      </DialogContent>
    </Dialog>
  );

  const showImageDialog = (
    <Dialog open={open2} keepMounted onClose={handleClose2}>
      <DialogContent className={classes.showPhoto}>
        <ShowImage close={handleClose2} imageId={selectedImage} />
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {loading && <Loader />}
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.header}>
            <IconButton
              style={{ padding: '0' }}
              onClick={() => history.goBack()}>
              <ArrowBackIos className={classes.backArrow} />
            </IconButton>
            <span className={classes.headerText}>My gallery</span>
            <IconButton className={classes.addIcon} onClick={handleClickOpen}>
              <Add fontSize="large" />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={11}>
          <Grid container>
            {images.map(image => {
              return (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  container
                  justify="center"
                  spacing={2}
                  key={image.Id}>
                  <img
                    src={image.ImageUrl}
                    alt=""
                    className={classes.image}
                    onClick={() => handleClickOpen2(image.Id)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        {open && addPhotoDialog}
        {open2 && showImageDialog}
      </Grid>
    </>
  );
};

export default Gallery;
