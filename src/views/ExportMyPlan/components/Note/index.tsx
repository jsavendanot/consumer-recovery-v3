import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  noteText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F',
    textAlign: 'justify'
  }
}));

export const Note: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.noteText}>
      Please select the information you wish to export to PDF. Once you have
      created a PDF document, you can share it to anyone (via email) or simply
      save it to your phone or computer.
      <br />
      <br />
      Please note: Input from service providers will not be available to export
      to PDF if you have not approved it.
    </div>
  );
};

export default Note;
