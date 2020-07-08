import { Network } from './network';

export interface FocusArea {
  id: string;
  name: string;
  color: string;
  image: string;
  description: string;
  isSelected: boolean;
  SuggestionId?: string;
  SuggestedByUserId?: string;
}

/** Focus Area API Type */
export interface AreaApiType {
  Id: string;
  Label: string;
  IsSelected: boolean;
  Description: string;
}

export interface OtherRootType {
  focusAreas: FocusArea[];
}
