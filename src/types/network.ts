export interface Network {
  Id: string;
  UserId: string;
  ContactId?: string;
  Name: string;
  Email: string;
  Phone: string;
  CallForSupport: boolean;
  Address: string;
  Type: 'Person' | 'Organisation' | '';
  Relationship: string;
  Image: string;
  ImageType: string;
  ImageUrl: string;
  SuggestionId?: string;
  SuggestedByUserId?: string;
  Status?: 'Connected' | 'Disconnected' | 'Pending' | '';
}

export interface ShareNetworkApi {
  SharedWithNetworkContactId: string;
  SharedWithNetworkName: string;
  SharedOnDate: string;
}

export interface Invitation {
  InvitationId: string;
  Name: string;
  EmailAddress: string;
  Subject: string;
  Message: string;
  UserId?: string;
  InviterUserEmailAddress?: string;
  InviterContactType?: 'Patient' | 'Practitioner' | 'RelatedPerson';
  AcceptedOn?: string;
  AccountType: string;
  AllowRecPlanAccess?: boolean;
  GoalsToShare?: string;
  ShareAllGoals?: boolean;
  JournalsToShare?: string;
  ShareAllJournals?: boolean;
  ShareMyStory?: boolean;
  ShareSafetyPlan?: boolean;
  ShareNetworkContacts?: boolean;
  Relationship: string;
  SharingPurpose: string;
  InvitationCode: string;
  CreatedOn: string;
}

export interface NetworkRootType {
  networks: Network[];
  sharedList: ShareNetworkApi[];
  loading: boolean;
}
