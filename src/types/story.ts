import { FocusArea } from './other';
import { ShareNetworkApi } from './network';

export interface Suggestion {
  id: string;
  name: string;
}

export interface Strength {
  id: string;
  name: string;
  SuggestionId?: string;
  SuggestedByUserId?: string;
}

export interface Story {
  MyStoryId: string;
  RecoveryPlanId: string;
  Story: string;
  WhereAreYouFrom: string;
  WhatWasLifeLikeForYouGrowingUp: string;
  WhoHaveBeenTheImportantPeopleInYourLife: string;
  WhatChallengesHaveYouHad: string;
  HowHaveYouGotThroughTheToughTimes: string;
  WhatDoYouLikeDoingMost: string;
  WhatWouldSomeoneSayAboutYou: string;
  VisibleTo: string;
}

export interface StoryRootType {
  story: Story;
  strengths: Strength[];
  focusAreas: FocusArea[];
  sharedList: ShareNetworkApi[];
  loading: boolean;
}
