import { Network } from './network';

export interface StepForm {
  id: string;
  name: string;
  repeat: {
    switch: boolean;
    number: number;
    type: string;
    frequencyNumber: number;
    frequencyType: string;
    targetNumber: number;
  };
  dateTime: {
    switch: boolean;
    reminder: boolean;
    reminderDate: string;
  };
  share: {
    whoCanSee: 'Network' | 'OnlyMe' | 'SpecificPeople';
    network: Network[];
  };
}

export interface GoalForm {
  id: string;
  name: string;
  desc: string;
  deadline: {
    switch: boolean;
    startDate: string;
    endDate: string;
  };
  completedDate: string;
  percentageComplete: number;
  steps: StepForm[];
  focusAreaId: string;
  visibleTo?: 'Network' | 'OnlyMe' | 'SpecificPeople';
  image: string;
  imageType: string;
}

export interface Goal {
  Id: string;
  Name: string;
  Description: string;
  IsDeadline: boolean;
  StartDate: string;
  EndDate: string;
  PercentageComplete: number;
  CompletedDate: string;
  Image: string;
  ImageType: string;
  VisibleTo: 'Network' | 'OnlyMe' | 'SpecificPeople';
  FocusArea: string;
  UserId: string;
  SuggestionId?: string;
  SuggestedByUserId?: string;
}

export interface GoalCompletion {
  GoalId: string;
  GoalName: string;
  StartDate: string;
  EndDate: string;
  Deadline: boolean;
  CompletedDate: string;
  PercentageCompletion: number;
  TotalSteps: number;
  TotalStepsCompleted: number;
  TotalStepRepetition: number;
  CompletedRepetition: number;
}

export interface Step {
  Id: string;
  GoalId: string;
  Name: string;
  RepeatTimes: number;
  RepeatUnit: string;
  RepeatFrequency: string;
  RepeatTotalTimes: number;
  VisibleTo: 'Network' | 'OnlyMe' | 'SpecificPeople' | '';
  IsDeadline: boolean;
  StartDate: string;
  EndDate: string;
  IsCompleted: boolean;
  visitsLeft: number;
}

export interface GoalHelp {
  GoalId: string;
  Message: string;
  RecoveryPlanId: string;
  NetworkContactIdList: string[];
  RequestedDate?: string;
  ResponseDate?: string;
}

export interface ProgressCheckIn {
  Id: string;
  GoalStepId: string;
  IsCompleted: boolean;
  Name: string;
}

export interface GoalComment {
  Id: string;
  ParentCommentId: string;
  GoalId: string;
  Message: string;
  PersonName: string;
  CreatedOnDate: string;
  NetworkContactId: string;
  children: GoalComment[];
}

export interface StepShareNetwork {
  StepId: string;
  StepName: string;
  SharedWithNetworkContactId: string;
  SharedWithNetworkName: string;
  SharedOnDate: string;
}

export interface GoalShareNetwork {
  GoalId: string;
  GoalName: string;
  SharedWithNetworkContactId: string;
  SharedWithNetworkName: string;
  SharedOnDate: string;
}

export interface GoalRootType {
  goals: Goal[];
  completionRate: GoalCompletion[];
  loading: boolean;
}
