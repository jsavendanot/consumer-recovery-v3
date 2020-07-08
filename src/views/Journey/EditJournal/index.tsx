import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import JournalContext, { ContextProps } from './JournalContext';
import { JournalForm, Journal, JournalShareNetwork } from 'types/journey';

import { Hidden } from '@material-ui/core';
import { SmallForm, LargeForm } from './components';
import { RootState } from 'reducer';
import { RouteComponentProps } from 'react-router-dom';
import { Network } from 'types/network';

interface MatchParams {
  id: string;
}
type Props = RouteComponentProps<MatchParams>;

const EditJournal: React.FC<Props> = ({ match }) => {
  const { id } = match.params;

  const journalData: Journal = useSelector(
    (state: RootState) =>
      state.journeyRoot.journey.journals.find(item => item.Id === id)!
  );

  const journalShareData: JournalShareNetwork[] = useSelector(
    (state: RootState) =>
      state.journeyRoot.journeyShare.share.filter(item => item.JournalId === id)
  );

  const networks: Network[] = useSelector(
    (state: RootState) => state.networkRoot.network.networks
  );

  /** Journal state  */
  const [journal, setJournal] = useState<JournalForm>({
    id: journalData.Id,
    title: journalData.Title,
    date: moment().format('dddd, DD MMMM YYYY'),
    time: moment().format('h:mm a'),
    journalText: journalData.Message,
    feeling: journalData.HowAreYouFeeling,
    symptoms: {
      work: false,
      sleep: false,
      routine: false
    },
    image: journalData.Image,
    imageType: journalData.ImageType,
    share: {
      whoCanSee: journalData.VisibleTo,
      network: [
        ...journalShareData
          .filter(item => item.JournalId === id)
          .map(share => {
            return networks.find(
              network => network.Id === share.SharedWithNetworkContactId
            )!;
          })
      ]
    }
  });

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
};

export default EditJournal;
