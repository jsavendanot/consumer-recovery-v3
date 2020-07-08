import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Switch } from '@material-ui/core';
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

export const SafetyFilter: React.FC<Props> = ({
  checks,
  setChecks,
  setFilters
}) => {
  const classes = useStyles();

  const handleSwitch = () => {
    setChecks('safety', !checks.safety);

    setFilters(
      produce((draft: ExportFilterType) => {
        draft.safety = !checks.safety;
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
        <span className={classes.title}>My safety plan</span>
        <Switch
          checked={checks.safety}
          color="primary"
          edge="start"
          name="safety"
          onChange={handleSwitch}
        />
      </div>
    </>
  );
};

export default SafetyFilter;
