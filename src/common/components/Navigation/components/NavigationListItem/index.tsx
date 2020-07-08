/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import {
  ListItem,
  Button,
  colors,
  Theme,
  ButtonProps
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%'
  },
  buttonLeaf: {
    color: colors.blueGrey[800],
    padding: '14px 8px',
    justifyContent: 'center',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  expandIcon: {
    marginLeft: 'auto',
    height: 16,
    width: 16
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  buttonText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '15px',
    textAlign: 'center',
    color: '#D5F2E3',
    marginTop: '1px',
    textTransform: 'uppercase'
  },
  buttonTextActive: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '15px',
    textAlign: 'center',
    color: '#003E1F',
    marginTop: '5px',
    textTransform: 'uppercase'
  }
}));

type NavProps = {
  activeClassName: string;
  className: string;
  component: React.FC<any>;
  exact: boolean;
  to: string;
};

type Props = {
  depth: number;
  href: string;
  icon: string;
  iconActive: string;
  title: string;
};

const CustomRouterLink = forwardRef<HTMLDivElement, NavProps>((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const MyExtendedButton: React.FC<ButtonProps & NavProps> = (
  props: ButtonProps & NavProps
) => {
  const { children, ...buttonProps } = props;
  return <Button {...buttonProps}>{children}</Button>;
};

const NavigationListItem: React.FC<Props> = ({
  title,
  href,
  depth,
  iconActive
}) => {
  const classes = useStyles();

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = {
    paddingLeft
  };

  return (
    <ListItem className={classes.itemLeaf} disableGutters>
      <MyExtendedButton
        activeClassName={classes.active}
        className={classes.buttonLeaf}
        component={CustomRouterLink}
        exact
        style={style}
        to={href}>
        <div className={classes.buttonContent}>
          <>
            <img src={iconActive} alt="" />
            <span className={classes.buttonTextActive}>{title}</span>
          </>
        </div>
      </MyExtendedButton>
    </ListItem>
  );
};

export default NavigationListItem;
