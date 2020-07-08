import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v1';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetworks } from 'slices/network/action';
import JournalContext, { ContextProps } from './JournalContext';
import { JournalForm } from 'types/journey';

import { Hidden } from '@material-ui/core';
import { SmallForm, LargeForm } from './components';
import { RootState } from 'reducer';

export default function AddJournal() {
  const dispatch = useDispatch();
  /** Journal state  */
  const [journal, setJournal] = useState<JournalForm>({
    id: uuid(),
    title: '',
    date: moment().format('dddd, DD MMMM YYYY'),
    time: moment().format('h:mm a'),
    journalText: '',
    feeling: '',
    symptoms: {
      work: false,
      sleep: false,
      routine: false
    },
    image: '',
    imageType: '',
    share: {
      whoCanSee: 'Network',
      network: []
    }
  });

  const networksLen: number = useSelector(
    (state: RootState) => state.networkRoot.network.networks.length
  );

  useEffect(() => {
    if (networksLen === 0) {
      dispatch(fetchNetworks());
    }
  }, [dispatch, networksLen]);

  const journalProps: ContextProps = { journal, setJournal };
  return (
    <JournalContext.Provider value={journalProps}>
      <Hidden lgUp>
        <SmallForm />
      </Hidden>
      <Hidden mdDown>
        <LargeForm />
      </Hidden>
    </JournalContext.Provider>
  );
}
