import React, { useState } from 'react';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';
import { useDispatch, useSelector } from 'react-redux';
import {
  stopSharingJournals,
  startSharingJournals
} from 'slices/network/access/journals/action';

import { makeStyles } from '@material-ui/styles';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  InputAdornment,
  Theme
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { Button } from 'common/components';
import { Journal, JournalShareNetwork } from 'types/journey';
import { Network } from 'types/network';
import { RootState } from 'reducer';

const useStyles = makeStyles((theme: Theme) => ({
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '35px',
    color: '#73BA9B'
  },
  cancelText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F'
  },
  tableContainer: {
    overflowY: 'auto',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      height: '63vh',
      maxHeight: '63vh'
    },
    [theme.breakpoints.up('sm')]: {
      width: '60%',
      height: '63vh',
      maxHeight: '63vh'
    },
    [theme.breakpoints.up('md')]: {
      width: '55vw',
      height: '55vh',
      maxHeight: '55vh'
    },
    [theme.breakpoints.up('lg')]: {
      width: '40vw',
      height: '40vh',
      maxHeight: '40vh'
    }
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    [theme.breakpoints.up('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '60%'
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%'
    }
  },
  searchContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('xs')]: {
      paddingLeft: '15px'
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '15px'
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '50px'
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-start'
    }
  },
  textField: {
    [theme.breakpoints.up('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '60%'
    },
    [theme.breakpoints.up('md')]: {
      width: '60%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%'
    }
  },
  goalName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#37474F'
  }
}));

const override = css`
  display: block;
  margin: 0 auto;
`;

type Props = {
  network: Network;
  close: () => void;
};

const AccessJournals: React.FC<Props> = (props: Props) => {
  const { network, close } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const journalsState: Journal[] = useSelector(
    (state: RootState) => state.journeyRoot.journey.journals
  );

  const currentSharedJournals: JournalShareNetwork[] = useSelector(
    (state: RootState) =>
      state.journeyRoot.journeyShare.share.filter(
        item => item.SharedWithNetworkContactId === network.Id
      )
  );

  const [addedJournals, setAddedJournals] = useState<Journal[]>([]);
  const [deletedJournals, setDeletedJournals] = useState<Journal[]>([]);

  const handleAddJournals = (journal: Journal) => {
    if (!currentSharedJournals.some(item => item.JournalId === journal.Id)) {
      setAddedJournals(value => [...value, journal]);
    } else {
      const index = deletedJournals.indexOf(journal);
      if (index !== -1) {
        setDeletedJournals(
          deletedJournals.filter(value => value.Id !== journal.Id)
        );
      }
    }
  };

  const handleDeleteJournals = (journal: Journal) => {
    if (currentSharedJournals.some(item => item.JournalId === journal.Id)) {
      setDeletedJournals(value => [...value, journal]);
    } else {
      const index = addedJournals.indexOf(journal);
      if (index !== -1) {
        setAddedJournals(
          addedJournals.filter(value => value.Id !== journal.Id)
        );
      }
    }
  };

  const [selectedValue, setSelectedValue] = useState<Journal[]>(
    journalsState.filter(item =>
      currentSharedJournals.find(step => step.JournalId === item.Id)
    )
  );

  const handleSelectOne = (journal: Journal) => {
    const selectedIndex = selectedValue.indexOf(journal);
    let newSelectedValues: Journal[] = [];
    if (selectedIndex === -1) {
      handleAddJournals(journal);
      newSelectedValues = newSelectedValues.concat(selectedValue, journal);
    } else if (selectedIndex === 0) {
      handleDeleteJournals(journal);
      newSelectedValues = newSelectedValues.concat(selectedValue.slice(1));
    } else if (selectedIndex === selectedValue!.length - 1) {
      handleDeleteJournals(journal);
      newSelectedValues = newSelectedValues.concat(selectedValue.slice(0, -1));
    } else if (selectedIndex > 0) {
      handleDeleteJournals(journal);
      newSelectedValues = newSelectedValues.concat(
        selectedValue.slice(0, selectedIndex),
        selectedValue.slice(selectedIndex + 1)
      );
    }

    setSelectedValue(newSelectedValues);
  };

  const handleCallBack = () => {
    dispatch(startSharingJournals(addedJournals, network));
    dispatch(stopSharingJournals(deletedJournals, network));
    close();
  };

  const loading = (
    <BarLoader
      css={override}
      height={8}
      width={100}
      color={'#F79221'}
      loading
    />
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <div style={{ margin: '10px 0', padding: '10px' }}>
        <span className={classes.title}>Specific journals....</span>
      </div>
      <div className={classes.searchContainer}>
        <TextField
          className={classes.textField}
          id="input-with-icon-textfield"
          label=""
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </div>
      <div
        style={{
          margin: '20px 0',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
        <div className={classes.tableContainer}>
          {journalsState.length === 0 ? (
            loading
          ) : (
            <Table>
              <TableBody>
                {journalsState
                  .filter(journal => journal.VisibleTo === 'SpecificPeople')
                  .map(journal => (
                    <TableRow
                      hover
                      key={journal.Id}
                      selected={selectedValue.indexOf(journal) !== -1}
                      onClick={event => handleSelectOne(journal)}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedValue.indexOf(journal) !== -1}
                          color="primary"
                          value={selectedValue.indexOf(journal) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <span className={classes.goalName}>
                            {journal.Message}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <span className={classes.cancelText} onClick={close}>
            Cancel
          </span>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Button type="extra" click={handleCallBack}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessJournals;
