/* eslint-disable react/no-multi-comp */
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useRouter from 'common/utils/useRouter';

import { makeStyles } from '@material-ui/styles';
import { List, Typography, Theme } from '@material-ui/core';

import { NavigationListItem } from './components';

type Page = {
  id: string;
  title: string;
  href: string;
  icon: string;
  iconActive: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(3)
  }
}));

type NavListProps = {
  depth: number;
  pages: Page[];
  router: RouteComponentProps;
};

const NavigationList: React.FC<NavListProps> = ({ pages, depth }) => {
  return (
    <List>
      {pages.map(page => {
        return (
          <NavigationListItem
            key={page.id}
            depth={depth}
            href={page.href}
            icon={page.icon}
            iconActive={page.iconActive}
            title={page.title}
          />
        );
      })}
    </List>
  );
};

type NavigationProps = {
  title: string;
  pages: Page[];
};

const Navigation: React.FC<NavigationProps> = (props: NavigationProps) => {
  const { title, pages } = props;

  const classes = useStyles();
  const router = useRouter();

  return (
    <div className={classes.root}>
      {title && <Typography variant="overline">{title}</Typography>}
      <NavigationList depth={0} pages={pages} router={router} />
    </div>
  );
};

export default Navigation;
