import { PhotoData } from "./PhotoData";
import { TravelData } from "./TravelData";

export interface StageData {
  id: number | undefined;
  location: string | undefined;
  lat: number;
  lng: number;
  description: string;
  date: Date;
  photos: PhotoData[];
  parentTravel: TravelData | undefined;
}
