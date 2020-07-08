import { Network } from './network';

export interface JournalForm {
  id: string;
  title: string;
  date: string;
  time: string;
  journalText: string;
  feeling: 'VerySad' | 'Sad' | 'Neutral' | 'Happy' | 'VeryHappy' | '';
  symptoms: {
    work: boolean;
    sleep: boolean;
    routine: boolean;
  };
  image: string;
  imageType: string;
  share: {
    whoCanSee: 'OnlyMe' | 'Network' | 'SpecificPeople';
    network: Network[];
  };
}

export interface JournalShareNetwork {
  JournalId: string;
  JournalName: string;
  SharedWithNetworkContactId: string;
  SharedWithNetworkName: string;
  SharedOnDate: string;
}

export interface Journal {
  Id: string;
  Title: string;
  Message: string;
  HowAreYouFeeling: 'VerySad' | 'Sad' | 'Neutral' | 'Happy' | 'VeryHappy' | '';
  CreatedOnDate: string;
  VisibleTo: 'OnlyMe' | 'Network' | 'SpecificPeople';
  Image: string;
  ImageType: string;
}

export interface JournalChart {
  Id: string;
  Message: string;
  HowAreYouFeeling: 1 | 2 | 3 | 4 | 5;
  CreatedOnDate: string;
}

export interface JournalComment {
  Id: string;
  ParentCommentId: string;
  JournalId: string;
  Message: string;
  PersonName: string;
  CreatedOnDate: string;
  NetworkContactId: string;
  children: JournalComment[];
}

export interface JourneyRootType {
  journals: Journal[];
  journalsChart: JournalChart[];
  loading: boolean;
}
