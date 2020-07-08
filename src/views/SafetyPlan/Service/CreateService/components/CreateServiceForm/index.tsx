import React, { useState, ChangeEvent } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid, Divider, Tabs, Tab, colors, Theme } from '@material-ui/core';

import AddSupport from './AddSupport';
import Record from './Record';
import Navigation from '../Navigation';
import { Network } from 'types/network';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    [theme.breakpoints.up('xs')]: {
      padding: '5px 20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '10px 20%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '10px 20%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '20px 30%'
    }
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '37px',
    color: '#FFFFFF'
  },
  titleContainer: {
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center'
    }
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '23px',
    color: '#73BA9B',
    marginBottom: '20px'
  },
  text: {
    fontFamily: 'Tajawal',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#006633',
    textTransform: 'capitalize'
  },
  tabs: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#fa9419'
    }
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

type Props = {
  back: () => void;
  emergencyList: Network[];
  addToEmergencyList: (network: Network) => void;
  removeFromEmergencyList: (id: string) => void;
  changeAccountType: (id: string) => void;
  selectTab: (value: string) => void;
  openSuggestion: () => void;
  save: () => void;
};

const Form1: React.FC<Props> = ({
  back,
  selectTab,
  emergencyList,
  addToEmergencyList,
  removeFromEmergencyList,
  changeAccountType,
  openSuggestion,
  save
}) => {
  const classes = useStyles();

  /** Tabs */
  const [tab, setTab] = useState('Person');

  const tabs = [
    { value: 'Person', label: 'People' },
    { value: 'Organisation', label: 'Services' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string) => {
    value === 'Person' ? setTab('Person') : setTab('Organisation');
    selectTab(value);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ background: '#73BA9B' }}>
          <Navigation back={back} done={save} active />
        </Grid>
        <Grid item xs={12} style={{ background: '#73BA9B' }}>
          <div className={classes.titleContainer}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAADg0lEQVRYhb2Yz2tcVRTHP3eYYk0m1Vqkq/iLNEVqbUUrhYKtdGEtuJC40IpCi5IG/wAp4qYbUYhKEBt0J/4DLrSgGw0W24XRqsUGuygVNa20lcQmrdH5uHhnyGs6mXlvMnpgeNxz7/me77v3vHPOnUQJUXuAx4BHgS3AILAG6AEuAxeAH4GvgM9SSt+UwS9KYlB9X52xnJxSR9TV3SCxVn1X/SfA6+ox9VV1t9qv9qop1t6vPqOOq9M5Uj+rQyshskM9F2DX1CPqhhL2VXVIncyR+lCtlSXydBBQ/VK9t/TbLGJV1OHcEX+tri9DpHEso2q1UyJLcDeqpwP3O7WvncGO3I4c6gaJJfi3qz8E/kdqZbmFa3MxMtptIjk/d6u/h5/Dyy06kouRrhxNC0K71L/VBXXz0snBmLy2kmAtSWgsXv7jhi7FxHvAi8B4SmmkAFAfsKfFkk9SSlfaYKwDzgK9wAMppZNE0poxS2iF8kjsZCu5qyBOY3feaiieDMWxIgBNyIxE8Od/zb+SG3EeDIxzAFWyogdwtCiZJTKXUrrcoe0kcB7oVzdUyKovwPEOATuWlJLAiRhurQIDMZjqEPMldTfwC3A0pTRR0r7hdwB1Ls7t5qLWEfTH1UvqH0uC94OiMRNYL4fd6xVgVegXigKklK6klLanlG5LKd0K3AK8EdPPAc8XxQKuxvOmCtDIB+VK+/XkZoBDZEcF8EQJ80bB/LMCTMegv1MyQaieI7OuhOkd8fytApyOwX0rIaP2Ao2kebaEacPvVD6Axks43qR+qx5Qt6t71E8Dp64+UhCnpv5lVjDXoG4NkGkLVmt1vzrfpAzMqAdKvNS+sJvIK0+F8qkSQDX1cfUFs7Zyr+26txsxPg+/B/PKkVBOlskRKxF1Z/i8eN1LqKtd7PKG/wciqyLmVF9ptmAoJmfVjf8xmXfC1xmXu+BFKlf9yaLXifJE9oePefXhVgtrLl66vlfv6TKR4fiU6+q+Igbrg4hmXfzOLpCo5o6m3jROWhj3md1rNGvUx8x61k6I7FJPBtZcoR1pAlJRD8e2NgJ7TH1ITW1sa+qz6hcuyhl1Wyu7lqABvBl4DdibW3+BrDOcAi4C82TV905gE7CNxdbkEvAmMJpSuko3RN2ivm3290Y7WVAn1IOWyMptd2YZYoNkvfMAWWPVA8wCv5Lt1omU0mxZ3H8BUI9TUCiRnwoAAAAASUVORK5CYII="
              alt=""
              style={{ marginRight: '20px' }}
            />
            <span className={classes.title}>
              People or services who I can contact for support
            </span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Tabs
                className={classes.tabs}
                onChange={handleTabsChange}
                scrollButtons="auto"
                value={tab}
                variant="scrollable">
                {tabs.map(tab => (
                  <Tab
                    key={tab.value}
                    label={<span className={classes.text}>{tab.label}</span>}
                    value={tab.value}
                  />
                ))}
              </Tabs>
              <Divider className={classes.divider} />
              <div className={classes.content}>
                {tab === 'Person' && (
                  <>
                    <span className={classes.label}>
                      People who I can contact for support if I need immediate
                      help.
                    </span>
                    <div style={{ margin: '20px 0' }}>
                      {emergencyList
                        .filter(item => item.Type === 'Person')
                        .map((value, index) => {
                          return (
                            <Record
                              value={value}
                              key={index}
                              remove={removeFromEmergencyList}
                              changeAccountType={changeAccountType}
                            />
                          );
                        })}
                    </div>
                    <AddSupport
                      addToList={addToEmergencyList}
                      openSuggestion={openSuggestion}
                      type="Person"
                    />
                  </>
                )}
                {tab === 'Organisation' && (
                  <>
                    <span className={classes.label}>
                      Services that I can contact for support if I need
                      immediate help.
                    </span>
                    <div style={{ margin: '20px 0' }}>
                      {emergencyList
                        .filter(item => item.Type === 'Organisation')
                        .map((value, index) => {
                          return (
                            <Record
                              value={value}
                              key={index}
                              remove={removeFromEmergencyList}
                              changeAccountType={changeAccountType}
                            />
                          );
                        })}
                    </div>
                    <AddSupport
                      addToList={addToEmergencyList}
                      openSuggestion={openSuggestion}
                      type="Organisation"
                    />
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Form1;
