import React from 'react';
import { css } from '@emotion/core';
import { Dialog, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BarLoader from 'react-spinners/BarLoader';

const useStyles = makeStyles(() => ({
  loadingContainer: {
    padding: '0',
    backgroundColor: '#696969',
    '&.MuiDialogContent-root:first-child': {
      padding: '0'
    }
  }
}));

const override = css`
  display: block;
  margin: 0 auto;
`;

export default function Loader() {
  const classes = useStyles();
  return (
    <Dialog open>
      <DialogContent className={classes.loadingContainer}>
        <BarLoader
          css={override}
          height={8}
          width={100}
          color={'#FFFFFF'}
          loading
        />
      </DialogContent>
    </Dialog>
  );
}
