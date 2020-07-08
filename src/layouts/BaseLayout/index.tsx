import React, { Suspense } from 'react';
import useRouter from 'common/utils/useRouter';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  content: {
    background: '#FFFFFF',
    minHeight: '100vh'
  },
  contentWithBackground: {
    backgroundColor: '#D5F2E3'
  }
}));

const BaseLayout: React.FC<RouteConfigComponentProps> = ({ route }) => {
  const classes = useStyles();
  const { history } = useRouter();

  let menu = '';
  if (history.location.pathname.includes('/errors')) {
    menu = 'errors';
  }

  return (
    <main
      className={clsx(
        classes.content,
        menu === 'errors' && classes.contentWithBackground
      )}>
      <Suspense fallback={<LinearProgress />}>
        {route && renderRoutes(route.routes)}
      </Suspense>
    </main>
  );
};

export default BaseLayout;
