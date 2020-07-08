export interface NotificationSetting {
  SubscriptionId: string;
  NotificationTypeEnum:
    | 'AccessDenied'
    | 'AccessGranted'
    | 'AccessRequest'
    | 'Comment'
    | 'CommentReply'
    | 'Help'
    | 'Invitation'
    | 'Suggestion'
    | 'SuggestionAccepted'
    | 'SuggestionRejected'
    | 'System'
    | 'Update';
  NotificationType:
    | 'Update'
    | 'Comment'
    | 'Invitation'
    | 'Suggestion'
    | 'AccessRequest';
  UserId: string;
  NotificationMethodEnum: 'Email' | 'Push' | 'SMS';
  NotificationMethod: string;
  State: 'Active' | 'Inactive';
  StateEnum: number;
}

export interface AccountSetting {
  autoLogin: boolean;
  completePrivate: boolean;
}

export interface SuggestionRootType {
  notifSettings: NotificationSetting[];
  accountSettings: AccountSetting;
  loading: boolean;
}
