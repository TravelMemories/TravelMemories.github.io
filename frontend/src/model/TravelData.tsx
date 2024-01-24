import { TravelStageData } from "./TravelStageData";

export interface TravelData {
  id: number;
  location: string;
  description: string;
  date: Date;
  stages: TravelStageData[];
}
