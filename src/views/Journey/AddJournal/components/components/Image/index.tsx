import React, { useContext, ChangeEvent } from 'react';
import { PhotoCamera, Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Button, IconButton } from '@material-ui/core';
import JournalContext from 'views/Journey/AddJournal/JournalContext';
import produce from 'immer';
import { JournalForm } from 'types/journey';

const useStyles = makeStyles(() => ({
  imageButton: {
    width: '100%',
    padding: '10px',
    border: '1px solid #73BA9B',
    boxSizing: 'border-box',
    borderRadius: '11px',
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#73BA9B'
  },
  deleteIcon: {
    position: 'absolute',
    cursor: 'pointer',
    fill: '#003E1F',
    right: '0px',
    top: '0px'
  },
  imageContainer: {
    position: 'relative',
    width: '100%'
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '196px'
  }
}));

type Props = {};
export const Image: React.FC<Props> = () => {
  const classes = useStyles();
  const { journal, setJournal } = useContext(JournalContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let imageType = event.target.files[0].type.replace('image/', '');
      if (imageType === 'jpeg') {
        imageType = 'jpg';
      }
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = e => {
        setJournal(
          produce((draft: JournalForm) => {
            draft.image = e.target
              ? e.target?.result!.toString().split('base64,')[1]
              : '';
            draft.imageType = imageType;
          })
        );
      };
    }
  };

  const handleDeleteClick = () => {
    setJournal(
      produce((draft: JournalForm) => {
        draft.image = '';
      })
    );
  };

  return (
    <>
      {journal.image !== '' ? (
        <div className={classes.imageContainer}>
          <IconButton
            onClick={handleDeleteClick}
            className={classes.deleteIcon}>
            <Delete fontSize="large" />
          </IconButton>
          <img
            src={'data:image/png;base64,' + journal.image}
            alt=""
            className={classes.image}
          />
        </div>
      ) : (
        <div>
          <input
            accept="image/*"
            type="file"
            onChange={handleInputChange}
            id="icon-button-file"
            style={{ display: 'none' }}
          />
          <label htmlFor="icon-button-file">
            <Button
              variant="contained"
              component="span"
              className={classes.imageButton}
              size="large">
              <PhotoCamera style={{ fill: '#73BA9B', marginRight: '10px' }} />
              Add image
            </Button>
          </label>
        </div>
      )}
    </>
  );
};

export default Image;
