import { PhotoData } from "../model/PhotoData";
import { PrivacyData } from "../model/PrivacyData";
import { TravelData } from "../model/TravelData";
import { TravelStageData } from "../model/TravelStageData";
import homeImage2 from "../images/homeImage2.jpg";
import homeImage1 from "../images/homeImage1.jpg";
const ExamplePhotos: PhotoData[] = [
  {
    id: 0,
    stageId: 0,
    description: "Beach",
    date: new Date(),
    photoData: homeImage2,
    imageSource: homeImage2,
    privacy: PrivacyData.Public,
    likes: ["test1"],
  },
  {
    id: 1,
    stageId: 0,
    description: "Amazing sun",
    date: new Date(),
    photoData: homeImage1,
    imageSource: homeImage1,
    privacy: PrivacyData.Public,
    likes: ["test1", "test2"],
  },
];
const ExamplePhotos2: PhotoData[] = [
  {
    id: 0,
    stageId: 0,
    description: "Beach",
    date: new Date(),
    photoData: homeImage1,
    imageSource: homeImage1,
    privacy: PrivacyData.Public,
    likes: ["test1"],
  },
];

const ExampleStages: TravelStageData[] = [
  {
    id: 0,
    description: "Arrival",
    travelID: 0,
    photos: ExamplePhotos,
  },
];
const ExampleStages2: TravelStageData[] = [
  {
    id: 0,
    description: "Arrival",
    travelID: 0,
    photos: ExamplePhotos2,
  },
];

const ExampleTravels: TravelData[] = [
  {
    id: 0,
    location: "Cartagena, Colombia",
    lat: 10.433118,
    lon: -75.534791,
    description: "Summer holiday 2023!",
    date: new Date(),
    stages: ExampleStages,
  },
  {
    id: 1,
    location: "Ludington, USA",
    lat: 43.966713,
    lon: -86.461251,
    description: "Breathtaking view.",
    date: new Date(),
    stages: ExampleStages2,
  },
];

export default ExampleTravels;
