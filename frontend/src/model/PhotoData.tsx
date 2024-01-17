import { PrivacyData } from "./PrivacyData";

export interface PhotoData {
  id: number | undefined;
  stageId: number | undefined;
  description: string | undefined;
  date: Date | undefined;
  photoData: string | undefined;
  privacy: PrivacyData;
}
