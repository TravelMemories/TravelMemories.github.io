import { PhotoData } from "./PhotoData";

export interface StageData {
  id: number;
  description: string;
  travelID: number;
  photos: PhotoData[];
  location: string | undefined;
  date: Date | undefined;
  lat: number;
  lng: number;
}
