export type Image = {
  Id: string;
  Data: string;
  ImageUrl: string;
  ImageType: string;
};

export interface GalleryRootType {
  images: Image[];
  loading: boolean;
}
