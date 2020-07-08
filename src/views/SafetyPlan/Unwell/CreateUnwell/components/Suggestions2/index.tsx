import React, { useState } from 'react';
import { Suggestion } from 'types/safety';

import { makeStyles } from '@material-ui/styles';
import {
  IconButton,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Button } from 'common/components';

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
    marginTop: '5px'
  },
  body: {
    height: '300px',
    maxHeight: '300px',
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
    flexDirection: 'column',
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
    color: '#003E1F',
    marginTop: '30px'
  }
}));

type Props = {
  close: () => void;
  add: (suggestion: Suggestion[]) => void;
};

const Suggestions2: React.FC<Props> = ({ close, add }) => {
  const classes = useStyles();

  const [suggestions] = useState<Suggestion[]>([
    { id: '1', name: 'Work to be contacted' },
    {
      id: '2',
      name: 'My children to be cared for by a particular person (specific)'
    },
    {
      id: '3',
      name: 'My children to be cared for by a particular person (specify)'
    },
    {
      id: '4',
      name: 'To be cared for by a worker of a specific gender (specific)'
    },
    {
      id: '5',
      name: 'To be given a certain medication, if at all avoidable (specific)'
    }
  ]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectOne = (id: string) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems: string[] = [];

    if (selectedIndex === -1) {
      newSelectedItems = newSelectedItems.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedItems = newSelectedItems.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    setSelectedItems(newSelectedItems);
  };

  const handleSubmit = () => {
    const finalSelectedItems: Suggestion[] = [];
    selectedItems.forEach(id => {
      const s = suggestions.find(n => n.id === id);
      finalSelectedItems.push(s!);
    });
    add(finalSelectedItems);
    close();
  };

  return (
    <div style={{ padding: '10px' }}>
      <div className={classes.header}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAsCAMAAAAtr3oOAAAB11BMVEUAAAAA//+AgIBVqqqAv4BmzJlttpKAs5l0uaJqv5V2sZ1ttqRwv59xuJx0uZdvvJtwuJlxvZd2tpt3u5lzvZxwt5dxvJ51uphzuZlwu5tzvJ5yuJ11uppyu5x1uJlzuZtxup10uZlyu5t0vJ11upx1uJtzuZxxuppyuJ11up1zu5pxvJxzuZpyupt0u5xyuZp0uZxyuppyupx0u5p0uZp0u5xyuptzupxyu5tzuZxyupp0u5tzupx0u5pzuZtyupxzuppyu5tzuZpyuptzu5pyuppyu5x0uppzu5t0uZxzuptyuptzupxyu5tzu5xzuptzu5tzuptzu5pyuZtzupxyuptzuZtyuppzuptzu5x0uppzu5tzuptyuptzu5pzupt0uZt0uptzu5tyuZtzu5t0uptzupt0uZxyuptzu5pyuZtzupxzuptzuppzupx0uZtzuptyuppzuZtzuptzu5pzuptyu5tzupxzupt0uptyu5tzuptzuptzuppzuptzu5tzuptzuptyuptzuptzuptzuZtzuptzuptzuptzuptzuptzuptzuptzuppzu5tzuptzuptyuptzuptzuptzuptzuptzuptzuptzuptzuptzuptzupv///9lM9eBAAAAm3RSTlMAAQIDBAUHCgsMDQ4QEhYXGRscHh8gIiUoKSovMDEyMzQ3ODk7PT4/QUZHSElKS0xNTlVWWFpcXV5fYGFkZWZnaGlqa21ydHd4eXp9fn+DhYqMjo+QkZKTlJWYmZucnZ6ho6SlqKqrrK6vsLGytLa3uLm7vb7BwsPFy83S09XX2Nnb4eXm5+jp7O3u7/Dx8vP09fb3+Pn6+/z9/mCQC5IAAAABYktHRJxxvMInAAACZklEQVQYGY3BCUNUZQBA0TsYppWaoqahUqmUYFSPtEyyorAoyrZHGC2Utkg5rVoJLZoag4bFjMxy/2wfj0FmeTidw5LM6CC3MTCeoUZmzMoxqh4a+fritWtXzr3ds4YlxyqOZVixc17LAwRtA1Pe8ucL7QTPVnR+JzUO5PVmB+z5xTq/PwJbb2r+AHV68sUIorxBbvL1o0eHP7xsUByEqJjvoUFvPzxXUX99ci2JTPd5gxPQ30uK3qKWhttZcehf9Qip7r2u849RZ89VLewmzSmtHKLB3oKeI0VXRd+hyUtqH80+0Mt306T9D/2BJnf+oyOkeEaLG2j0sFY2k2JDUQ/T6GW9SKqfdZRGH+tpUn2iZ1m2PdgGTOooqd7Un4Bt2wMMcsBX+i6p3tMfgZwBBjlgQk+R6ox+AeQMMMgBIzpFqt/0BJAzoCvoBB7X8mZS3K8+AXR2BSxbP6/DpHhD8+tp8pn+dRdNNv2tn9LsQfUkTT7SUicpJtXDNDiijpNmy3Vd6KfOAwWd3UiqnpKWImpsuaSlR1nFQFkLe7ll7bT6Iqt6uqzT7SwbUd/iNgbV56namNfPM6Tq7mPRWb1A1Ss6u4mgr5sG+28UDhLsVu9jybS+RnCwcGM/dfbNab6DYEqfInFP2fJWoCOvc/uosWNOHWLR+3phPPGlXmLRkDq3gxVtE3qcRGyN8ySO60QbNdZMvMqS2BrfsWTo9B3UyVAV68z3iRk9Q1WGVcSaJZHVmFZizZLIakwrsWZJZDWmlVgXZhMLGtNKbI2YVmJrxLSyK4qibw2+iaJoF//HupMzM2PrSPEf2U0aoLEd2kkAAAAASUVORK5CYII="
          alt=""
        />
        <span className={classes.title}>
          If I become unwell, I do not want the following to happen
        </span>
        <IconButton className={classes.iconButton} onClick={close}>
          <CloseIcon fontSize="large" style={{ fill: '#73BA9B' }} />
        </IconButton>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.body}>
        <Table>
          <TableBody>
            {suggestions.map(suggestion => (
              <TableRow
                hover
                key={suggestion.id}
                selected={selectedItems.indexOf(suggestion.id) !== -1}
                onClick={() => handleSelectOne(suggestion.id)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedItems.indexOf(suggestion.id) !== -1}
                    color="primary"
                    value={selectedItems.indexOf(suggestion.id) !== -1}
                  />
                </TableCell>
                <TableCell>
                  <div>{suggestion.name}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.footer}>
        <Button type="primary" click={handleSubmit}>
          Add selected suggestions
        </Button>
        <span className={classes.textButton} onClick={close}>
          Cancel
        </span>
      </div>
    </div>
  );
};

export default Suggestions2;
