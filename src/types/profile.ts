export interface Profile {
  ContactId: string;
  UserId: string;
  RecoveryPlanId: string;
  SafetyPlanId: string;
  FirstName: string;
  Surname: string;
  PreferredName: string;
  Gender: 'Male' | 'Female' | 'Other' | 'Unknown' | '';
  DateOfBirth: string;
  UserEmail: string;
  ContactType: string;
  HomeAddress: string;
  HomePostCode: string;
  PostalAddress: string;
  PostalPostCode: string;
  HomePhone: string;
  MobilePhone: string;
  BusinessPhone: string;
  PrimaryEmail: string;
  PreferredContactMethod: string;
  ContactName: string;
  RelationshipToConsumer: string;
  EmergencyContactPhone: string;
  EmergencyAddress: string;
  EmergencyWhenToContact: string;
  CountryOfBirth: string;
  PreferredLanguage: string;
  GeneralPractionerId: string;
  MedicalRecordNumber: string;
  AdditionalInformation: string;
  Image: string;
  ImageType: string;
  ImageUrl: string;
  FullName: string;
  AutoLogin?: boolean;
  CompletePrivate?: boolean;
  LastLoginDate?: string;
}

export interface ProfileRootType {
  profile: Profile;
  verified: boolean;
  loading: boolean;
}
