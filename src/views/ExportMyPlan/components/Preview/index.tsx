import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Header,
  MyStory,
  MyGoals,
  MySteps,
  MySafety,
  People,
  Services
} from './components';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import { ExportFilterType } from 'types/export';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    boxShadow:
      '0px 2px 4px rgba(0, 0, 0, 0.24), 0px 2px 8px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10px'
  },
  defaultHeight: {
    height: '600px'
  },
  noteText: {
    width: '319px'
  },
  content: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: '10px'
  }
}));

type Props = {
  preview: boolean;
  filters: ExportFilterType;
};

export const Preview: React.FC<Props> = ({ preview, filters }, ref) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, !preview && classes.defaultHeight)}
      ref={ref}>
      {!preview ? (
        <div className={classes.noteText}>
          To see the preview of the document, select the content you want to
          export from the left panel and press ‘Generate document’.
        </div>
      ) : (
        <div className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Header />
            </Grid>
            {filters.story && (
              <Grid item xs={12}>
                <MyStory />
              </Grid>
            )}
            {filters.goal !== '' && (
              <Grid item xs={12}>
                <MyGoals />
              </Grid>
            )}
            {filters.goal && (
              <Grid item xs={12}>
                <MySteps />
              </Grid>
            )}
            {filters.safety && (
              <Grid item xs={12}>
                <MySafety />
              </Grid>
            )}
            {(filters.network === 'people' || filters.network === 'all') && (
              <Grid item xs={12}>
                <People />
              </Grid>
            )}
            {(filters.network === 'services' || filters.network === 'all') && (
              <Grid item xs={12}>
                <Services />
              </Grid>
            )}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default forwardRef(Preview);
