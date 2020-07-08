import React, { Suspense } from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  LinearProgress,
  Theme,
  Dialog,
  DialogContent,
  useMediaQuery
} from '@material-ui/core';
import { css } from '@emotion/core';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

const override = css`
  display: block;
  margin: 0 auto;
`;

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    minHeight: '100%',
    paddingTop: 20,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    },
    background: '#D5F2E3'
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D5F2E3'
  }
}));

const AuthLayout: React.FC<RouteConfigComponentProps> = ({ route }) => {
  const classes = useStyles();
  /** Theme */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.up('xs'));

  return (
    <main className={classes.content}>
      <Suspense fallback={<LinearProgress />}>
        {route && renderRoutes(route.routes)}
        <Dialog open keepMounted fullScreen={fullScreen}>
          <DialogContent className={classes.loadingContainer}>
            <ClimbingBoxLoader
              css={override}
              size={20}
              color={'rgb(0, 62, 31)'}
              loading
            />
          </DialogContent>
        </Dialog>
      </Suspense>
    </main>
  );
};

export default AuthLayout;
