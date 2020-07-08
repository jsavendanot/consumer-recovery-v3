import React, { useEffect } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { Journal } from 'types/journey';

import { Hidden } from '@material-ui/core';

import JournalDetailLarge from './JournalDetailLarge';
import JournalDetailSmall from './JournalDetailSmall';
import { fetchJournalsSharedNetworks } from 'slices/journey/share/action';
import { fetchNetworks } from 'slices/network/action';
import { fetchJournalComments } from 'slices/journey/comment/action';

interface MatchParams {
  id: string;
}
type Props = RouteComponentProps<MatchParams>;

const JournalDetail: React.FC<Props> = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();

  const journal: Journal = useSelector(
    (state: RootState) =>
      state.journeyRoot.journey.journals.find(item => item.Id === id)!
  );

  useEffect(() => {
    dispatch(fetchJournalsSharedNetworks());
    dispatch(fetchJournalComments(id));
  }, [dispatch, id]);

  const networksLen: number = useSelector(
    (state: RootState) => state.networkRoot.network.networks.length
  );

  useEffect(() => {
    if (networksLen === 0) {
      dispatch(fetchNetworks());
    }
  }, [dispatch, networksLen]);

  return journal ? (
    <>
      <Hidden lgUp>
        <JournalDetailSmall journal={journal!} />
      </Hidden>
      <Hidden mdDown>
        <JournalDetailLarge journal={journal!} />
      </Hidden>
    </>
  ) : (
    <Redirect to="/journeys/all" />
  );
};

export default JournalDetail;
