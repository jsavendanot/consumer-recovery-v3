import React from 'react';
import { makeStyles } from '@material-ui/styles';
import useRouter from 'common/utils/useRouter';
import { Theme } from '@material-ui/core';
import { ButtonTab } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  tabMenuContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    // [theme.breakpoints.up('lg')]: {
    //   marginRight: '50px'
    // }
  },
  tabContainer: {
    background: '#F8F8F8',
    boxShadow: 'inset 0px 0px 3px rgba(0, 0, 0, 0.25)',
    borderRadius: '20px',
    margin: '10px 0',
    height: 33,
    [theme.breakpoints.up('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '70%'
    },
    [theme.breakpoints.up('md')]: {
      width: '70%'
    },
    [theme.breakpoints.up('lg')]: {
      width: 444
    }
  },
  buttonStyle1: {
    width: '33%'
  },
  buttonStyle2: {
    width: '50%'
  }
}));

export type Props = {
  tabs: string[];
  menu: string;
  setMenu: (menu: string) => void;
};
export const ButtonTabs: React.FC<Props> = ({ tabs, menu, setMenu }) => {
  const classes = useStyles();
  const { history } = useRouter();

  const handleTabsChange = (value: string) => {
    setMenu(value);
    history.push(value);
  };

  return (
    <div className={classes.tabMenuContainer}>
      <div className={classes.tabContainer}>
        {tabs.map(tab => {
          return (
            <ButtonTab
              key={tab}
              name={tab}
              className={
                tabs.length === 3 ? classes.buttonStyle1 : classes.buttonStyle2
              }
              active={menu === tab}
              click={() => handleTabsChange(tab)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ButtonTabs;
