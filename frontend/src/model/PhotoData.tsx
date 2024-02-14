import { PrivacyData } from "./PrivacyData";
import { StageData } from "./StageData";

export interface PhotoData {
  id: number | undefined;
  location: string | undefined;
  lat: number;
  lng: number;
  date: Date;
  description: string;
  photoData: Blob;
  imageSource: string | undefined;
  privacy: PrivacyData;
  likes: number[];
  parentStage: StageData | undefined;
}
