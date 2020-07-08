import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Unwell } from 'types/safety';

import { makeStyles } from '@material-ui/styles';
import { Grid, Divider, Tabs, Tab, colors, Theme } from '@material-ui/core';
import { Block, CheckCircle } from '@material-ui/icons';

import Responsibility from './Responsibility';
import Record from './Record';
import Navigation from '../Navigation';
import { FormStateType } from '../..';

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
    color: '#73BA9B'
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
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    [theme.breakpoints.up('xs')]: {
      padding: '5px 40px'
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
  },
  flexTabContent: {
    display: 'flex',
    alignItems: 'center'
  }
}));

type Props = {
  unwell: Unwell;
  setUnwell: Dispatch<SetStateAction<Unwell>>;
  unwellNot: Unwell;
  setUnwellNot: React.Dispatch<React.SetStateAction<Unwell>>;
  formStatePleaseDo: FormStateType;
  setFormStatePleaseDo: Dispatch<SetStateAction<FormStateType>>;
  formStateDoNotDo: FormStateType;
  setFormStateDoNotDo: Dispatch<SetStateAction<FormStateType>>;
  back: () => void;
  pleaseDo: Unwell[];
  doNotDo: Unwell[];
  selectTab: (value: string) => void;
  addToPleaseDo: (value: Unwell) => void;
  addToDoNotDo: (value: Unwell) => void;
  removeFromPleaseDo: (id: string) => void;
  removeFromDoNotDo: (id: string) => void;
  next: () => void;
};

const CreateUnwellForm: React.FC<Props> = ({
  unwell,
  setUnwell,
  unwellNot,
  setUnwellNot,
  formStatePleaseDo,
  setFormStatePleaseDo,
  formStateDoNotDo,
  setFormStateDoNotDo,
  back,
  selectTab,
  pleaseDo,
  doNotDo,
  addToPleaseDo,
  addToDoNotDo,
  removeFromPleaseDo,
  removeFromDoNotDo,
  next
}) => {
  const classes = useStyles();

  /** Tabs */
  const [tab, setTab] = useState('pleasedo');

  const tabs = [
    {
      value: 'pleasedo',
      label: 'Please do',
      logo: <CheckCircle style={{ fill: '#41C04E', marginRight: '5px' }} />
    },
    {
      value: 'dontdo',
      label: `Please don't`,
      logo: <Block style={{ fill: '#B50000', marginRight: '5px' }} />
    }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string) => {
    selectTab(value);
    value === 'pleasedo' ? setTab('pleasedo') : setTab('dontdo');
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ background: '#73BA9B' }}>
          <Navigation back={back} next={next} active />
        </Grid>
        <Grid item xs={12} style={{ background: '#73BA9B' }}>
          <div className={classes.titleContainer}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAABmJLR0QA/wD/AP+gvaeTAAADY0lEQVRYhbWYzWtcVRiHn3NJsKRpNRQtfiFqmlA1RtC6aBetGBBdiBLFr4XYTVr8A8SPuujGjVEJYopupOjKlQsX4karJVawftRig11IBZHWqnTUtqbmcXHfy1yHmcy9k+kLl5lzzvv+znPOPZ83UcPUIeAe4C5gEhgD1gNDwO/ASeB7YAH4KKX0VR39qhBj6lvqGevZUXW3uqYfECPqG+q/Ib6sHlT3qHer16pr1RS+t6qPqfvUX0pQP6nTqwHZpp4IsfPqvLqpRvyAOq0eLkG9ow7XBXk0AFQ/UzfXbk1TK1NnSq/4S3VjHZDitcyqA72CtOiOq8dC91t1XbeAbaUeebYfEC36l6vfhf77atbJcaQ0Rmb7DVKq53r1VNSzt5PTfGmM9OXVrAC0Q72gLqkTrYVjUXh+NYO1JtBcNP6D1oI3o2B+FeLXqA/H03X6qhvUhvnaNVlkro1pt1xnHWkRHlQXSuvJaMW4ondeLTIejIyDvYCExsv+36rC3B7+J1rpXugR5N7o1Qs9wCSb28amjHz3Bfi8B5ArgbeBBNTu2ZSSwKFI3pYBRSsWa4JkwH7gCuAL4N26MC31jmbASCR+rSnyHDAF/AE8Aiz1CHM6fi/LgMFIVBZT7wRejOTOlNKPPYIAnIvfSzLgr0hU2tpjDXmPvBGfAg11Crip5LZVvboiTLFh/onNnXRixZAmzI1Ws5mKesWC+/QAcAwYB24BjlSIPwW0q2gr8GT83wMcqAIT9QIsoj4TZPsqBrc19ake1plh9R/zDXN9BnwYZQ94kXfrNnY/+dhbSCmdKQiPRose6lVVvUqdimeoYszHUe+ucubuyDxsp9NXn03dHnWetnwEVdfYPOVVmgWrBBlUv476nm/nMB2FDXX8IsO8HnUdt9MFT90fTj9Y9TpRH6SYdWfNV/KOjsM2L11H1Bv6DDITU3lZfbxKwMYA0fwUv70PEAOlV7PcdpysELzO/F6j+aFpTt3QI8gO9ZvQ+rtSj7QRydS90a3FwJ5T71BTl9hh9Qn1E5t2XN2yUtyKoiE8AbwE3FfyP0l+MlwkP4+cJd99rwNuBrbQPJr8BrwCzKaUztEPUyfV18w/b3SzJfWAustud+qSde2ZDmBj5GfnUeBS8i9XDeBn8t46lFJq1NX9D4UwRpKk4mX3AAAAAElFTkSuQmCC"
              alt=""
              style={{ marginRight: '20px' }}
            />
            <span className={classes.title}>
              If I become unwell, I would like others to...
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
                    label={
                      <span className={classes.text}>
                        <div className={classes.flexTabContent}>
                          {tab.logo}
                          {tab.label}
                        </div>
                      </span>
                    }
                    value={tab.value}
                  />
                ))}
              </Tabs>
              <Divider className={classes.divider} />
              <div className={classes.content}>
                {tab === 'pleasedo' && (
                  <>
                    <span className={classes.label}>
                      What are the things you or others may notice when you are
                      unwell?
                    </span>
                    <div style={{ margin: '20px 0' }}>
                      {pleaseDo.map((value, index) => {
                        return (
                          <Record
                            value={value}
                            key={index}
                            setValue={setUnwell}
                            remove={removeFromPleaseDo}
                          />
                        );
                      })}
                    </div>
                    <Responsibility
                      formState={formStatePleaseDo}
                      setFormState={setFormStatePleaseDo}
                      value={unwell}
                      setValue={setUnwell}
                      addToList={addToPleaseDo}
                    />
                  </>
                )}
                {tab === 'dontdo' && (
                  <>
                    <span className={classes.label}>
                      If I become unwell, I do not want the following to happen
                    </span>
                    <div style={{ margin: '20px 0' }}>
                      {doNotDo.map((value, index) => {
                        return (
                          <Record
                            value={value}
                            key={index}
                            setValue={setUnwellNot}
                            remove={removeFromDoNotDo}
                          />
                        );
                      })}
                    </div>
                    <Responsibility
                      formState={formStateDoNotDo}
                      setFormState={setFormStateDoNotDo}
                      value={unwellNot}
                      setValue={setUnwellNot}
                      addToList={addToDoNotDo}
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

export default CreateUnwellForm;
