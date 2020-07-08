import React, { useState } from 'react';
import { Image } from 'types/gallery';

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  IconButton,
  Dialog,
  DialogContent,
  Slide,
  Theme
} from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';

import { Navigation, SetPhoto } from './components';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { DeleteConfirmation } from 'common/components';
import { deleteGalleryImage } from 'slices/gallery/action';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    padding: '10px 10px',
    marginBottom: '10px',
    textAlign: 'right'
  },
  footer: {
    position: 'absolute',
    bottom: '0',
    padding: '10px 0',
    borderTop: '1px solid #FFFFFF',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  closeIcon: {
    padding: '0',
    margin: '5px'
  },
  deleteIcon: {
    marginRight: '8px'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px 20px'
  },
  footerText: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '23px',
    color: '#FFFFFF',
    marginLeft: '10px',
    cursor: 'pointer'
  },
  image: {
    padding: '15px',
    objectFit: 'cover',
    width: '100%',
    height: '400px'
  },
  navigation: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: '30px'
  },
  setPhoto: {
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
      width: '300px'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '10px',
      width: '300px'
    }
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

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

type Props = {
  close: () => void;
  imageId: string;
};

const ShowImage: React.FC<Props> = ({ imageId, close }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const images: Image[] = useSelector(
    (state: RootState) => state.gallery.images
  );

  const image: Image = useSelector(
    (state: RootState) =>
      state.gallery.images.find(item => item.Id === imageId)!
  );

  const [index, setIndex] = useState(
    images.findIndex(item => item.Id === imageId)
  );
  const [currentImage, setCurrentImage] = useState<Image>(image);

  /** Set photo Dialog */
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    close();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  /** Delete photo Dialog */
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleDeleteEvent = () => {
    dispatch(deleteGalleryImage(currentImage.Id));
    close();
  };

  const next = () => {
    const nextIndex = index < images.length - 1 ? index + 1 : index;
    setCurrentImage(images[nextIndex]);
    setIndex(nextIndex);
  };

  const back = () => {
    const nextIndex = index > 0 ? index - 1 : 0;
    setCurrentImage(images[nextIndex]);
    setIndex(nextIndex);
  };

  const closeDialog = () => {
    setIndex(-1);
    close();
  };

  const setPhotoDialog = (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}>
      <DialogContent className={classes.setPhoto}>
        <SetPhoto close={handleClose} image={currentImage} />
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.header}>
            <IconButton className={classes.closeIcon} onClick={closeDialog}>
              <Close fontSize="large" style={{ fill: '#FFFFFF' }} />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            {index < 0 && image ? (
              <img src={image.ImageUrl} alt="" className={classes.image} />
            ) : (
              <img
                src={currentImage.ImageUrl}
                alt=""
                className={classes.image}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.navigation}>
            <Navigation
              back={back}
              next={next}
              index={index}
              totalImagesLen={images.length}
            />
          </div>
        </Grid>
        <Grid item xs={12} container justify="center">
          <div className={classes.footer}>
            <span className={classes.footerText} onClick={handleClickOpen}>
              Set photo as ...
            </span>
            <IconButton
              className={classes.deleteIcon}
              onClick={handleClickOpen2}>
              <Delete fontSize="large" style={{ fill: '#FFFFFF' }} />
            </IconButton>
          </div>
        </Grid>
        {open && setPhotoDialog}
      </Grid>
      {open2 && (
        <DeleteConfirmation
          open={open2}
          close={handleClose2}
          action={handleDeleteEvent}
          donRedirect>
          <span className={classes.title}>
            Are you sure you want to
            <br />
            delete this photo?
          </span>
        </DeleteConfirmation>
      )}
    </>
  );
};

export default ShowImage;
