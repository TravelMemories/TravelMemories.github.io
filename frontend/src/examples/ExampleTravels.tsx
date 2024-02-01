import { PhotoData } from "../model/PhotoData";
import { PrivacyData } from "../model/PrivacyData";
import { TravelData } from "../model/TravelData";
import { StageData } from "../model/StageData";
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
    id: 3,
    stageId: 1,
    description: "Sunny",
    date: new Date(),
    photoData: homeImage1,
    imageSource: homeImage1,
    privacy: PrivacyData.Public,
    likes: ["test1"],
  },
];

const ExampleStages2: StageData[] = [
  {
    id: 0,
    description: "Arrival",
    travelID: 0,
    photos: ExamplePhotos2,
    location: "Beach",
    lat: 10.433118,
    lng: -75.534791,
    date: new Date(),
  },
];
const ExampleStages: StageData[] = [
  {
    id: 1,
    description: "First trip",
    travelID: 1,
    photos: ExamplePhotos,
    location: "West side",
    lat: 43.966713,
    lng: -86.461251,
    date: new Date(),
  },
];

const ExampleTravels: TravelData[] = [
  {
    id: 0,
    location: "Cartagena, Colombia",
    lat: 10.433118,
    lng: -75.534791,
    description: "Summer holiday 2023!",
    date: new Date(),
    stages: ExampleStages2,
  },
  {
    id: 1,
    location: "Ludington, USA",
    lat: 43.966713,
    lng: -86.461251,
    description: "Breathtaking view.",
    date: new Date(),
    stages: ExampleStages,
  },
];

export default ExampleTravels;
