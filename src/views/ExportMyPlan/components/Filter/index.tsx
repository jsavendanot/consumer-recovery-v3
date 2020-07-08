import React, { Dispatch, SetStateAction } from 'react';
import {
  GoalFilter,
  StoryFilter,
  JourneyFilter,
  SafetyFilter,
  NetworkFilter
} from './components';
import { Export, ExportKeys } from 'views/ExportMyPlan';
import { Grid } from '@material-ui/core';
import { ExportFilterType } from 'types/export';

type Props = {
  checks: Export;
  setChecks: (name: ExportKeys, value: boolean) => void;
  setFilters: Dispatch<SetStateAction<ExportFilterType>>;
};

export const Filter: React.FC<Props> = ({ checks, setChecks, setFilters }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <GoalFilter
          checks={checks}
          setChecks={setChecks}
          setFilters={setFilters}
        />
      </Grid>
      <Grid item xs={12}>
        <StoryFilter
          checks={checks}
          setChecks={setChecks}
          setFilters={setFilters}
        />
      </Grid>
      <Grid item xs={12}>
        <JourneyFilter
          checks={checks}
          setChecks={setChecks}
          setFilters={setFilters}
        />
      </Grid>
      <Grid item xs={12}>
        <SafetyFilter
          checks={checks}
          setChecks={setChecks}
          setFilters={setFilters}
        />
      </Grid>
      <Grid item xs={12}>
        <NetworkFilter
          checks={checks}
          setChecks={setChecks}
          setFilters={setFilters}
        />
      </Grid>
    </Grid>
  );
};

export default Filter;
