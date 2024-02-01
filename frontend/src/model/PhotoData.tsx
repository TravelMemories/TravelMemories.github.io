import { PrivacyData } from "./PrivacyData";

export interface PhotoData {
  id: number | undefined;
  stageId: number | undefined;
  description: string | undefined;
  date: Date | undefined;
  photoData: Blob | undefined;
  imageSource: string | undefined;
  privacy: PrivacyData;
  likes: string[];
  location: string | undefined;
  lat: number;
  lng: number;
}
