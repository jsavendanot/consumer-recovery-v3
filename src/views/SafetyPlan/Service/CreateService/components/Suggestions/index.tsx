import React, { useState } from 'react';

import getInitials from 'common/utils/getInitials';
import { Network } from 'types/network';

import { makeStyles } from '@material-ui/styles';
import {
  IconButton,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Avatar
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Button } from 'common/components';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

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
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#37474F'
  },
  iconButton: {
    position: 'absolute',
    top: '4px',
    right: '-7px',
    padding: '0'
  },
  divider: {
    backgroundColor: '#73BA9B'
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
  }
}));

type Props = {
  type: string;
  close: () => void;
  done: (suggestedNetworks: Network[]) => void;
  contacts: Network[];
};

const Suggestions: React.FC<Props> = ({ done, close, type, contacts }) => {
  const classes = useStyles();

  const networks: Network[] = useSelector(
    (state: RootState) => state.networkRoot.network.networks
  );

  const [selectedNetwork, setSelectedNetwork] = useState<string[]>([
    ...contacts.map(item => item.Id)
  ]);

  const handleSelectOne = (network: string) => {
    const selectedIndex = selectedNetwork.indexOf(network);
    let newSelectedNetwork: string[] = [];

    if (selectedIndex === -1) {
      newSelectedNetwork = newSelectedNetwork.concat(selectedNetwork, network);
    } else if (selectedIndex === 0) {
      newSelectedNetwork = newSelectedNetwork.concat(selectedNetwork.slice(1));
    } else if (selectedIndex === selectedNetwork.length - 1) {
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
    done(networks.filter(item => selectedNetwork.includes(item.Id)));
    close();
  };

  return (
    <>
      <div className={classes.header}>
        <span className={classes.title}>
          {type === 'Person'
            ? 'People I can contact for support'
            : 'Service I can contact for support'}
        </span>
        <IconButton className={classes.iconButton} onClick={close}>
          <CloseIcon fontSize="large" style={{ fill: '#73BA9B' }} />
        </IconButton>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.body}>
        <Table>
          <TableBody>
            {networks &&
              networks
                .filter(item => item.Type === type)
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
                        <Avatar className={classes.avatar} src={network.Image}>
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
      </div>
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
    </>
  );
};

export default Suggestions;
