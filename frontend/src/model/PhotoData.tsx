import { PrivacyData } from "./PrivacyData";
import { StageData } from "./StageData";

export interface PhotoData {
  id: number;
  location: string | undefined;
  lat: number;
  lng: number;
  date: Date;
  description: string;
  photoData: Blob | undefined;
  imageSource: string | undefined;
  privacy: PrivacyData;
  likes: string[];
  parentStage: StageData | undefined;
}
