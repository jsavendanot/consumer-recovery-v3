import React, { useEffect } from 'react';
import { Unwell } from 'types/safety';
import { ListItems, SuggestedItem } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { fetchSuggestedUnwellNotHappen } from 'slices/suggestion/safety/unwell/action';
import { Grid } from '@material-ui/core';

type Props = {
  doNotDo: Unwell[];
};
export const DontDo: React.FC<Props> = ({ doNotDo }) => {
  const dispatch = useDispatch();

  const suggestedUnwellNotHappens: Unwell[] = useSelector(
    (state: RootState) => state.suggestion.unwellNotHappens
  );

  useEffect(() => {
    dispatch(fetchSuggestedUnwellNotHappen());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <ListItems values={doNotDo} />
      </Grid>
      <Grid item xs={12}>
        {suggestedUnwellNotHappens.map(item => {
          return <SuggestedItem unwell={item} key={item.UnwellId} />;
        })}
      </Grid>
    </Grid>
  );
};

export default DontDo;
