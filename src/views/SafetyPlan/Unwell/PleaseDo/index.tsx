import React, { useEffect } from 'react';
import { Unwell } from 'types/safety';
import { ListItems, SuggestedItem } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { fetchSuggestedUnwellHappen } from 'slices/suggestion/safety/unwell/action';
import { Grid } from '@material-ui/core';

type Props = {
  pleaseDo: Unwell[];
};
export const PleaseDo: React.FC<Props> = ({ pleaseDo }) => {
  const dispatch = useDispatch();

  const suggestedUnwellHappens: Unwell[] = useSelector(
    (state: RootState) => state.suggestion.unwellHappens
  );

  useEffect(() => {
    dispatch(fetchSuggestedUnwellHappen());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <ListItems values={pleaseDo} />
      </Grid>
      <Grid item xs={12}>
        {suggestedUnwellHappens.map(item => {
          return <SuggestedItem unwell={item} key={item.UnwellId} />;
        })}
      </Grid>
    </Grid>
  );
};

export default PleaseDo;
