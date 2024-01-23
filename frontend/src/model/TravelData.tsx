import { TravelStageData } from "./TravelStageData";

export interface TravelData {
  id: number | undefined;
  location: string | undefined;
  lat: number;
  lon: number;
  description: string;
  date: Date;
  stages: TravelStageData[];
}
