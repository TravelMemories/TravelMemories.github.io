import { StageData } from "./StageData";

export interface TravelData {
  id: number | undefined;
  location: string | undefined;
  lat: number;
  lng: number;
  description: string;
  date: Date;
  stages: StageData[];
  userID: number;
}
