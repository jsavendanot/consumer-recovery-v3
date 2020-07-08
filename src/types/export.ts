export interface ExportFilterType {
  goal: 'all' | 'current' | 'completed' | '';
  story: boolean;
  journey: boolean;
  safety: boolean;
  network: 'all' | 'people' | 'services' | '';
}

export interface ExportRootType {
  loading: boolean;
}
