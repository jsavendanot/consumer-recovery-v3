import React, { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { RadioGroup, FormControlLabel, Radio, Switch } from '@material-ui/core';
import { Export, ExportKeys } from 'views/ExportMyPlan';
import { ExportFilterType } from 'types/export';
import produce from 'immer';

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '26px',
    color: '#37474F'
  },
  text: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#37474F'
  }
}));

type Props = {
  checks: Export;
  setChecks: (name: ExportKeys, value: boolean) => void;
  setFilters: Dispatch<SetStateAction<ExportFilterType>>;
};

export const NetworkFilter: React.FC<Props> = ({
  checks,
  setChecks,
  setFilters
}) => {
  const classes = useStyles();

  const [radioSelected, setRadioSelected] = useState<
    'all' | 'people' | 'services'
  >('all');

  const handleSwitch = () => {
    setChecks('network', !checks.network);

    setFilters(
      produce((draft: ExportFilterType) => {
        draft.network = !checks.network ? radioSelected : '';
      })
    );
  };

  const handleRadioInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setRadioSelected(event.target.value as 'all' | 'people' | 'services');
    setFilters(
      produce((draft: ExportFilterType) => {
        draft.network = event.target.value as 'all' | 'people' | 'services';
      })
    );
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <span className={classes.title}>My network</span>
        <Switch
          checked={checks.network}
          color="primary"
          edge="start"
          name="network"
          onChange={handleSwitch}
        />
      </div>
      {checks.network && (
        <div>
          <RadioGroup
            aria-label="share"
            name="share"
            style={{ paddingLeft: '10px' }}
            value={radioSelected}
            onChange={event => handleRadioInput(event)}>
            <FormControlLabel
              value="all"
              control={<Radio color="primary" />}
              label={<span className={classes.text}>All network</span>}
            />
            <FormControlLabel
              value="people"
              control={<Radio color="primary" />}
              label={<span className={classes.text}>People</span>}
            />
            <FormControlLabel
              value="services"
              control={<Radio color="primary" />}
              label={<span className={classes.text}>Services</span>}
            />
          </RadioGroup>
        </div>
      )}
    </>
  );
};

export default NetworkFilter;
