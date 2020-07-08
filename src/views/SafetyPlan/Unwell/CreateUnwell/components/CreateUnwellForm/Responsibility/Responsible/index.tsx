import React, { useState, ChangeEvent } from 'react';
import { Network } from 'types/network';

import getInitials from 'common/utils/getInitials';
import { makeStyles } from '@material-ui/styles';
import {
  IconButton,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Avatar,
  Grid,
  Tabs,
  Tab
} from '@material-ui/core';

import { Button } from 'common/components';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { Close } from '@material-ui/icons';
import { Unwell } from 'types/safety';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '20px 0',
    position: 'relative'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '37px',
    color: '#73BA9B',
    marginTop: '30px'
  },
  body: {
    height: '420px',
    maxHeight: '420px',
    overflowY: 'auto',
    padding: '10px'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '2px 0'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px'
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
  iconButton: {
    position: 'absolute',
    top: '4px',
    right: '-7px',
    padding: '0'
  },
  divider: {
    backgroundColor: 'rgba(115, 186, 155, 0.5)'
  },
  textButton: {
    cursor: 'pointer',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F'
  },
  footerContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: '8px'
  },
  tabs: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#fa9419'
    }
  }
}));

type Props = {
  close: () => void;
  add: (person: Network | undefined) => void;
  value: Unwell;
};

const Responsible: React.FC<Props> = ({ add, close, value }) => {
  const classes = useStyles();

  const networks: Network[] = useSelector(
    (state: RootState) => state.networkRoot.network.networks
  );

  const [selectedNetwork, setSelectedNetwork] = useState(
    value.NetworkContactIdResponsible ? value.NetworkContactIdResponsible : ''
  );

  const handleSelectOne = (id: string) => {
    const selectedIndex = selectedNetwork.indexOf(id);
    if (selectedIndex === -1) {
      setSelectedNetwork(id);
    } else if (selectedIndex === 0) {
      setSelectedNetwork('');
    }
  };

  const handleDone = () => {
    const person = networks.find(n => n.Id === selectedNetwork);
    add(person);
    close();
  };

  /** Tabs */
  const [tab, setTab] = useState('Person');

  const tabs = [
    { value: 'Person', label: 'People' },
    { value: 'Organisation', label: 'Services' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string) => {
    value === 'Person' ? setTab('Person') : setTab('Organisation');
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.header}>
          <span className={classes.title}>
            Select one person or service from your network
          </span>
          <IconButton className={classes.iconButton} onClick={close}>
            <Close fontSize="large" style={{ fill: '#73BA9B' }} />
          </IconButton>
        </div>
      </Grid>
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
        <div className={classes.body}>
          {tab === 'Person' && (
            <Table>
              <TableBody>
                {networks &&
                  networks
                    .filter(
                      item =>
                        item.Type === 'Person' && item.Status === 'Connected'
                    )
                    .map(network => (
                      <TableRow
                        hover
                        key={network.Id}
                        selected={selectedNetwork.indexOf(network.Id) !== -1}
                        onClick={() => handleSelectOne(network.Id)}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedNetwork.indexOf(network.Id) !== -1}
                            color="primary"
                            value={selectedNetwork.indexOf(network.Id) !== -1}
                          />
                        </TableCell>
                        <TableCell>
                          <div className={classes.nameCell}>
                            <Avatar
                              className={classes.avatar}
                              src={network.Image}>
                              {getInitials(network.Name)}
                            </Avatar>
                            <div>
                              <div>{network.Name}</div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          )}
          {tab === 'Organisation' && (
            <Table>
              <TableBody>
                {networks &&
                  networks
                    .filter(
                      item =>
                        item.Type === 'Organisation' &&
                        item.Status === 'Connected'
                    )
                    .map(network => (
                      <TableRow
                        hover
                        key={network.Id}
                        selected={selectedNetwork.indexOf(network.Id) !== -1}
                        onClick={() => handleSelectOne(network.Id)}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedNetwork.indexOf(network.Id) !== -1}
                            color="primary"
                            value={selectedNetwork.indexOf(network.Id) !== -1}
                          />
                        </TableCell>
                        <TableCell>
                          <div className={classes.nameCell}>
                            <Avatar
                              className={classes.avatar}
                              src={network.Image}>
                              {getInitials(network.Name)}
                            </Avatar>
                            <div>
                              <div>{network.Name}</div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.divider} />
        <div className={classes.footer}>
          <div className={classes.footerContent}>
            <span className={classes.textButton} onClick={close}>
              Cancel
            </span>
          </div>
          <div className={classes.footerContent}>
            <Button type="extra" click={handleDone}>
              Done
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Responsible;
