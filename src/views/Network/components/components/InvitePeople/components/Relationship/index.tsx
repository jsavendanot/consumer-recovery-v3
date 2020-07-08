import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import { Invitation } from 'types/network';

const useStyles = makeStyles(() => ({
  textField: {
    borderRadius: '5px',
    borderStyle: 'none'
  }
}));

type Props = {
  invitation: Invitation;
  change: (name: string, value: string | boolean) => void;
};
export const Relationship: React.FC<Props> = ({ invitation, change }) => {
  const classes = useStyles();
  return (
    <div>
      <TextField
        fullWidth
        label="Please select"
        name="Relationship"
        select
        autoComplete="off"
        SelectProps={{ native: true }}
        value={invitation.Relationship}
        className={classes.textField}
        variant="outlined"
        onChange={event => change('Relationship', event.target.value)}>
        {[
          '',
          'Parent',
          'Spouse',
          'Child',
          'Partner',
          'Grandparent',
          'Sibling',
          'Friend',
          'other'
        ].map(relation => (
          <option key={relation} value={relation}>
            {relation}
          </option>
        ))}
      </TextField>
    </div>
  );
};

export default Relationship;
