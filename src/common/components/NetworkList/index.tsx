import React, { useState, ChangeEvent } from 'react';
import getInitials from 'common/utils/getInitials';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { Network as NetworkType } from 'types/network';

import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme,
  Divider,
  IconButton,
  Grid,
  Tabs,
  Tab
} from '@material-ui/core';
import { Button } from 'common/components';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
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
  callback?: (networks: NetworkType[]) => void;
  title: string;
};

const NetworkList: React.FC<Props> = ({ close, callback, title }) => {
  const classes = useStyles();

  const networks: NetworkType[] = useSelector(
    (state: RootState) => state.networkRoot.network.networks
  );

  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType[]>([]);

  const handleSelectOne = (network: NetworkType) => {
    const selectedIndex = selectedNetwork.indexOf(network);
    let newSelectedNetwork: NetworkType[] = [];
    if (selectedIndex === -1) {
      newSelectedNetwork = newSelectedNetwork.concat(selectedNetwork, network);
    } else if (selectedIndex === 0) {
      newSelectedNetwork = newSelectedNetwork.concat(selectedNetwork.slice(1));
    } else if (selectedIndex === selectedNetwork!.length - 1) {
      newSelectedNetwork = newSelectedNetwork.concat(
        selectedNetwork.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedNetwork = newSelectedNetwork.concat(
        selectedNetwork.slice(0, selectedIndex),
        selectedNetwork.slice(selectedIndex + 1)
      );
    }

    setSelectedNetwork(newSelectedNetwork);
  };

  const handleDone = () => {
    const networkWithData: NetworkType[] = networks.filter(element =>
      selectedNetwork.includes(element)
    );
    if (callback) {
      callback(networkWithData);
    }
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
          <span className={classes.title}>{title}</span>
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
                        selected={selectedNetwork.indexOf(network) !== -1}
                        onClick={() => handleSelectOne(network)}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedNetwork.indexOf(network) !== -1}
                            color="primary"
                            value={selectedNetwork.indexOf(network) !== -1}
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
                        selected={selectedNetwork.indexOf(network) !== -1}
                        onClick={() => handleSelectOne(network)}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedNetwork.indexOf(network) !== -1}
                            color="primary"
                            value={selectedNetwork.indexOf(network) !== -1}
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

export default NetworkList;
