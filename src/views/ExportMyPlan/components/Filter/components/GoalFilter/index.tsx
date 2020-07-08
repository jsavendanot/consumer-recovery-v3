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

export const GoalFilter: React.FC<Props> = ({
  checks,
  setChecks,
  setFilters
}) => {
  const classes = useStyles();

  const [radioSelected, setRadioSelected] = useState<
    'all' | 'current' | 'completed'
  >('all');

  const handleSwitch = () => {
    setChecks('goal', !checks.goal);

    setFilters(
      produce((draft: ExportFilterType) => {
        draft.goal = !checks.goal ? radioSelected : '';
      })
    );
  };

  const handleRadioInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setRadioSelected(event.target.value as 'all' | 'current' | 'completed');
    setFilters(
      produce((draft: ExportFilterType) => {
        draft.goal = event.target.value as 'all' | 'current' | 'completed';
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
        <span className={classes.title}>My goals</span>
        <Switch
          checked={checks.goal}
          color="primary"
          edge="start"
          name="goal"
          onChange={handleSwitch}
        />
      </div>
      {checks.goal && (
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
              label={<span className={classes.text}>All goals</span>}
            />
            <FormControlLabel
              value="current"
              control={<Radio color="primary" />}
              label={<span className={classes.text}>Only current goals</span>}
            />
            <FormControlLabel
              value="completed"
              control={<Radio color="primary" />}
              label={<span className={classes.text}>Only completed goals</span>}
            />
          </RadioGroup>
        </div>
      )}
    </>
  );
};

export default GoalFilter;
