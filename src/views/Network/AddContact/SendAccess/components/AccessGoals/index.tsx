import React, { useState } from 'react';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';
import { useSelector } from 'react-redux';

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
import { RootState } from 'reducer';
import { Goal } from 'types/goal';

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
    color: '#003E1F',
    cursor: 'pointer'
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
  callBback: (goals: Goal[]) => void;
  close: () => void;
};

const AccessGoals: React.FC<Props> = ({ close, callBback }) => {
  const classes = useStyles();

  const goals: Goal[] = useSelector(
    (state: RootState) => state.goalRoot.goal.goals
  );

  const [selectedValue, setSelectedValue] = useState<Goal[]>([]);

  const handleSelectOne = (goal: Goal) => {
    const selectedIndex = selectedValue.indexOf(goal);
    let newSelectedValues: Goal[] = [];
    if (selectedIndex === -1) {
      newSelectedValues = newSelectedValues.concat(selectedValue, goal);
    } else if (selectedIndex === 0) {
      newSelectedValues = newSelectedValues.concat(selectedValue.slice(1));
    } else if (selectedIndex === selectedValue!.length - 1) {
      newSelectedValues = newSelectedValues.concat(selectedValue.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedValues = newSelectedValues.concat(
        selectedValue.slice(0, selectedIndex),
        selectedValue.slice(selectedIndex + 1)
      );
    }

    setSelectedValue(newSelectedValues);
  };

  const callBackHandler = () => {
    callBback(selectedValue);
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
        <span className={classes.title}>Specific goals....</span>
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
          {goals.length === 0 ? (
            loading
          ) : (
            <Table>
              <TableBody>
                {goals
                  .filter(goal => goal.VisibleTo === 'SpecificPeople')
                  .map(goal => (
                    <TableRow
                      hover
                      key={goal.Id}
                      selected={selectedValue.indexOf(goal) !== -1}
                      onClick={event => handleSelectOne(goal)}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedValue.indexOf(goal) !== -1}
                          color="primary"
                          value={selectedValue.indexOf(goal) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <span className={classes.goalName}>{goal.Name}</span>
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
          <Button type="extra" click={callBackHandler}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessGoals;
