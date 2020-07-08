import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import uuid from 'uuid';
import { createGalleryImage } from 'slices/gallery/action';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 10px',
    borderBottom: '1px solid #73BA9B',
    marginBottom: '10px'
  },
  headerText: {
    flexGrow: 1,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#73BA9B'
  },
  closeIcon: {
    padding: '0'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px 20px'
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F',
    textTransform: 'capitalize',
    cursor: 'pointer'
  },
  button: {
    background: '#FFFFFF',
    border: '1.5px solid #003E1F',
    boxSizing: 'border-box',
    borderRadius: '25px',
    padding: '10px 10px',
    width: '100%'
  },
  input: {
    display: 'none'
  }
}));

type Props = {
  close: () => void;
};

const AddPhoto: React.FC<Props> = ({ close }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let imageType = event.target.files[0].type.replace('image/', '');
      if (imageType === 'jpeg') {
        imageType = 'jpg';
      }
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = e => {
        close();
        dispatch(
          createGalleryImage({
            Id: uuid(),
            Data: e.target?.result!.toString().split('base64,')[1],
            ImageUrl: '',
            ImageType: imageType
          })
        );
      };
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.header}>
          <span className={classes.headerText}>Add photo?</span>
          <IconButton className={classes.closeIcon} onClick={close}>
            <Close fontSize="large" style={{ fill: '#73BA9B' }} />
          </IconButton>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.container}>
          <input
            accept="image/*"
            type="file"
            onChange={handleInputChange}
            id="icon-button-file"
            style={{ display: 'none' }}
          />
          <label htmlFor="icon-button-file" style={{ width: '100%' }}>
            <Button className={classes.button} component="span">
              <span className={classes.text}>Upload photo</span>
            </Button>
          </label>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.container} onClick={close}>
          <span className={classes.text}>Cancel</span>
        </div>
      </Grid>
    </Grid>
  );
};

export default AddPhoto;
