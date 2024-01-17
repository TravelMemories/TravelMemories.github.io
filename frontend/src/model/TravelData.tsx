import { TravelStageData } from "./TravelStageData";

export interface TravelData {
  id: number | undefined;
  location: string | undefined;
  description: string;
  date: Date;
  stages: TravelStageData[];
}
