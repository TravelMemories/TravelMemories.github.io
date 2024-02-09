import { PhotoData } from "../model/PhotoData";
import { PrivacyData } from "../model/PrivacyData";
import { TravelData } from "../model/TravelData";
import { StageData } from "../model/StageData";
import homeImage2 from "../images/homeImage2.jpg";
import homeImage1 from "../images/homeImage1.jpg";
import homeImage3 from "../images/homeImage3.jpg";
import CartagenaProvince1 from "../images/CartagenaProvince1.jpg";
import CartagenaProvince2 from "../images/CartagenaProvince2.jpg";

const ExampleTravels: TravelData[] = [
  {
    id: 0,
    location: "Cartagena, Colombia",
    lat: 10.433118,
    lng: -75.534791,
    description: "Summer holiday 2023!",
    date: new Date(),
    stages: [],
    userID: 0,
  },
  {
    id: 1,
    location: "Ludington, USA",
    lat: 43.966713,
    lng: -86.461251,
    description: "Breathtaking view.",
    date: new Date(),
    stages: [],
    userID: 0,
  },
];
const CartagenaStages: StageData[] = [
  {
    id: 0,
    description: "Arrival",
    photos: [],
    location: "Cartagena beach",
    lat: 10.433118,
    lng: -75.534791,
    date: new Date(),
    parentTravel: ExampleTravels[0],
  },
  {
    id: 3,
    description: "Cartagena province sightseeing",
    photos: [],
    location: "Streets of Cartagena de Indias, Colombia, Cartagena",
    lat: 10.422801,
    lng: -75.544146,
    date: new Date(),
    parentTravel: ExampleTravels[0],
  },
];
const LudingtonStages: StageData[] = [
  {
    id: 1,
    description: "First trip",
    photos: [],
    location: "West side",
    lat: 43.966713,
    lng: -86.461251,
    date: new Date(),
    parentTravel: ExampleTravels[1],
  },
];

const LudingtonPhotos: PhotoData[] = [
  {
    id: 0,
    description: "First trip to the beach",
    date: new Date(),
    photoData: homeImage2,
    imageSource: homeImage2,
    privacy: PrivacyData.Public,
    likes: [0],
    location: "West side",
    lat: 10.433118,
    lng: -75.534791,
    parentStage: LudingtonStages[0],
  },
  {
    id: 1,
    description: "Amazing sun",
    date: new Date(),
    photoData: homeImage1,
    imageSource: homeImage1,
    privacy: PrivacyData.Public,
    likes: [0, 1],
    location: "Amazing beach",
    lat: 10.433118,
    lng: -75.534791,
    parentStage: LudingtonStages[0],
  },
];
const CartagenaPhotos2: PhotoData[] = [
  {
    id: 4,
    description: "Cartagena province sightseeing",
    date: new Date(),
    photoData: CartagenaProvince1,
    imageSource: CartagenaProvince1,
    privacy: PrivacyData.Public,
    likes: [0],
    location: "Streets of Cartagena de Indias",
    lat: 10.422801,
    lng: -75.544146,
    parentStage: CartagenaStages[1],
  },
  {
    id: 5,
    description: "Beautiful streets!",
    date: new Date(),
    photoData: CartagenaProvince2,
    imageSource: CartagenaProvince2,
    privacy: PrivacyData.Public,
    likes: [0],
    location: "Streets of Cartagena de Indias",
    lat: 10.422801,
    lng: -75.544146,
    parentStage: CartagenaStages[1],
  },
];
const CartagenaPhotos: PhotoData[] = [
  {
    id: 3,
    description: "Sunny, beautiful evening",
    date: new Date(),
    photoData: homeImage3,
    imageSource: homeImage3,
    privacy: PrivacyData.Public,
    likes: [0],
    location: "Cartagena beach. West coast.",
    lat: 10.433118,
    lng: -75.534791,
    parentStage: CartagenaStages[0],
  },
];
ExampleTravels[0].stages = CartagenaStages;
ExampleTravels[1].stages = LudingtonStages;
CartagenaStages[0].photos = CartagenaPhotos;
CartagenaStages[1].photos = CartagenaPhotos2;
LudingtonStages[0].photos = LudingtonPhotos;

export default ExampleTravels;
