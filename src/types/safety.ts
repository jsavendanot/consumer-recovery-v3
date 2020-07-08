import { ShareNetworkApi } from './network';

export interface Suggestion {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  name: string;
  SuggestionId?: string;
  SuggestedByUserId?: string;
}

export interface Unwell {
  UnwellId: string;
  Name: string;
  Description: string;
  SafetyPlanId: string;
  NetworkContactIdResponsible: string | null;
  SuggestionId?: string;
  SuggestedByUserId?: string;
}

export interface SafetyRootType {
  shareList: ShareNetworkApi[];
  loading: boolean;
}
