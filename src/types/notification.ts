export interface NotificationItem {
  Id: string;
  Message: string;
  Flags: string;
  IsRead: boolean;
  CreatedOnDate: string;
  NotificationType: string;
  NotificationTypeEnum: string;
  NotificationVisibleTo: string;
  NotificationVisibleToEnum: string;
  State: 'Active' | 'Inactive';
  IsPinned: boolean;
  DeliveredDate: string;
  EmailDeliveredOn: string;
  RecoveryPlanId: string;
  ReferenceId: string;
  ReferenceName: string;
  UserId: string;
}

export interface NotificationRootType {
  notifications: NotificationItem[];
  loading: boolean;
}
