export interface IUploadData {
  file: {
    name: string;
    lastModified: number;
    lastModifiedDate: Date;
    webkitRelativePath: string;
    size: number;
    type: string;
  };
}
