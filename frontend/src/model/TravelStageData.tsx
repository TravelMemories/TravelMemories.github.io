import { PhotoData } from "./PhotoData";

export interface TravelStageData {
  id: number;
  description: string;
  travelID: number;
  photos: PhotoData[];
}
