import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import useRouter from 'common/utils/useRouter';
import { Theme } from '@material-ui/core';
import { ButtonTab } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  tabMenuContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px'
  },
  tabContainer: {
    background: '#D5F2E3',
    boxShadow: 'inset 0px 0px 3px rgba(0, 0, 0, 0.25)',
    borderRadius: '20px',
    margin: '10px 0',
    height: '33px',
    [theme.breakpoints.up('xs')]: {
      width: '90%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '60%'
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '350px'
    }
  },
  button: {
    width: '50%'
  }
}));

export type Props = {
  currentTab: string;
  tabs: string[];
};
export const ButtonTabs: React.FC<Props> = ({ tabs, currentTab }) => {
  const classes = useStyles();
  const { history } = useRouter();

  const [menu, setMenu] = useState(currentTab);

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
              className={classes.button}
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
