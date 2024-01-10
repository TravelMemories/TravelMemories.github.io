import { PrivacyData } from "./PrivacyData";

export interface PhotoData {
  id: number;
  stageId: number;
  desription: string;
  date: Date;
  photoData: string;
  privacy: PrivacyData;
}
