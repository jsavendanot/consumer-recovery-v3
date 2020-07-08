import React, { useState, ChangeEvent } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid, TextField, Button, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  }
}));

type Props = {
  className: string;
  initialType: string;
};

const AddSafetyPlan: React.FC<Props> = ({ initialType }) => {
  const classes = useStyles();

  const safetyTypes = [
    {
      value: 'stayingwell',
      name: 'Staying Well'
    },
    {
      value: 'stress',
      name: 'Stress'
    },
    {
      value: 'warningsign',
      name: 'Warning Sign'
    },
    {
      value: 'unwell',
      name: 'Unwell'
    },
    {
      value: 'support',
      name: 'Support'
    }
  ];

  const [selectedType, setSelectedType] = useState(initialType);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setSelectedType(event.target.value);
  };

  /** Staying well */
  const [stayingWell, setStayingWell] = useState({
    value: ''
  });

  /** Stress */
  const [stress, setStress] = useState({
    cause: '',
    manage: ''
  });

  /** Warning Sign */
  const [warningSign, setWarningSign] = useState({
    value: ''
  });

  /** Unwell */
  const [unwell, setUnwell] = useState({
    type: 'Y',
    value: ''
  });

  const handleChangeUnwell = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setUnwell({ type: event.target.value, value: '' });
  };

  const handleFieldChangeUnwell = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    value: string
  ) => {
    event.persist && event.persist();
    setUnwell(values => ({
      ...values,
      [field]: value
    }));
  };

  /** Support */
  const [support, setSupport] = useState({
    type: 'Y',
    value: ''
  });

  const handleChangeSupport = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setSupport({ type: event.target.value, value: '' });
  };

  const handleFieldChangeSupport = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    value: string
  ) => {
    event.persist && event.persist();
    setSupport(values => ({
      ...values,
      [field]: value
    }));
  };

  const handleSubmit = () => {};

  return (
    <div className={classes.root} title="Safety Plan">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Safety Types"
            name="type"
            onChange={handleChange}
            select
            // eslint-disable-next-line react/jsx-sort-props
            SelectProps={{ native: true }}
            value={selectedType}
            variant="outlined">
            {safetyTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.name}
              </option>
            ))}
          </TextField>
        </Grid>
        {selectedType === 'stayingwell' && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Thing you do to stay well"
              name="stayingwell"
              onChange={event => setStayingWell({ value: event.target.value })}
              value={stayingWell.value}
              variant="outlined"
            />
          </Grid>
        )}
        {selectedType === 'stress' && (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Things that stress you"
                name="cause"
                onChange={event =>
                  setStress({ cause: event.target.value, manage: '' })
                }
                value={stress.cause}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="How to manage this issues"
                name="manage"
                onChange={event =>
                  setStress({ cause: '', manage: event.target.value })
                }
                value={stress.manage}
                variant="outlined"
              />
            </Grid>
          </>
        )}
        {selectedType === 'warningsign' && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Thing others may notice when you unwell"
              name="value"
              onChange={event => setWarningSign({ value: event.target.value })}
              value={warningSign.value}
              variant="outlined"
            />
          </Grid>
        )}
        {selectedType === 'unwell' && (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Choose type"
                name="type"
                onChange={handleChangeUnwell}
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={unwell.type}
                variant="outlined">
                {[
                  { name: 'Please do', value: 'Y' },
                  { name: 'Do not do', value: 'N' }
                ].map(item => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Type things that you would like to happen or not happen"
                name="value"
                onChange={event =>
                  handleFieldChangeUnwell(event, 'value', event.target.value)
                }
                value={unwell.value}
                variant="outlined"
              />
            </Grid>
          </>
        )}
        {selectedType === 'support' && (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Choose type"
                name="type"
                onChange={handleChangeSupport}
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={support.type}
                variant="outlined">
                {[
                  { name: 'Services', value: 'services' },
                  { name: 'People', value: 'people' }
                ].map(item => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Type people or services that we can contact if you need help"
                name="value"
                onChange={event =>
                  handleFieldChangeSupport(event, 'value', event.target.value)
                }
                value={support.value}
                variant="outlined"
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddSafetyPlan;
