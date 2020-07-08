import { Goal, Step } from './goal';
import { Strength } from './story';
import { FocusArea } from './other';
import { Item, Unwell } from './safety';
import { Network } from './network';

export interface StepInfo {
  Id: string;
  GoalId: string;
  Name: string;
  RepeatTimes: number;
  RepeatUnit: string;
  RepeatFrequency: string;
  RepeatTotalTimes: number;
  VisibleTo: 'Network' | 'OnlyMe' | 'SpecificPeople';
  IsDeadline: boolean;
  StartDate: string;
  EndDate: string;
}

export interface GoalInfo {
  Name: string;
  Description: string;
  IsDeadline: boolean;
  StartDate: string;
  EndDate: string;
  Image: string;
  ImageType: string;
  VisibleTo: 'Network' | 'OnlyMe' | 'SpecificPeople';
  FocusArea: string;
  Steps: StepInfo[];
}

export interface Suggestion {
  SuggestionId: string;
  RecoveryPlanId: string;
  SuggestedByUserId: string;
  Name: string;
  ExtraInfo: string;
  GroupName: string;
  GoalInfo: GoalInfo;
  AcceptedOn: string;
  RejectedOn: string;
}

export interface SuggestionRootType {
  goals: Goal[];
  steps: Step[];
  strengths: Strength[];
  focusAreas: FocusArea[];
  stayWell: Item[];
  stressMe: Item[];
  difficulties: Item[];
  strategies: Item[];
  unwellHappens: Unwell[];
  unwellNotHappens: Unwell[];
  people: Network[];
  organisations: Network[];
}
