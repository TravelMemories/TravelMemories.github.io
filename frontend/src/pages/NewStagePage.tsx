import React, { useEffect, useState } from "react";
import { TiLocation } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import { FormatDate } from "../helpers/helpers";
import DataEditButton from "../components/general-purpose/DataEditButton";
import { TravelData } from "../model/TravelData";
import CustomDatepicker from "../components/general-purpose/CustomDatepicker";
import { useTravelsContext } from "../context/TravelsContext";
import { useNavigate, useParams } from "react-router-dom";
import LocationPicker from "../components/general-purpose/LocationPicker";
import { StageData } from "../model/StageData";
interface EditPageProps {
  stageData: StageData;
  setStageData: (newData: StageData) => void;
  cancelEditing: () => void;
}
interface Props {
  editPage?: EditPageProps;
}
function NewStagePage({ editPage }: Props) {
  const { travelID } = useParams();
  const [newStage, setNewStage] = useState<StageData | undefined>();
  const [parentTravel, setParentTravel] = useState<TravelData | undefined>();
  const [stageDate, setStageDate] = useState<Date>(new Date());
  const [datepickerVisible, setDatepickerVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const { AddStage, UpdateStage, GetNewStageID, GetTravelByID } =
    useTravelsContext();
  const navigate = useNavigate();

  useEffect(() => {
    setParentTravel(GetTravelByID(Number(travelID)));
    if (parentTravel === undefined) {
      return;
    }
    setNewStage(
      editPage === undefined
        ? ({
            id: GetNewStageID(),
            location: parentTravel.location,
            lat: parentTravel.lat,
            lng: parentTravel.lng,
            description: "",
            date: parentTravel.date,
            photos: [],
            travelID: parentTravel.id,
          } as StageData)
        : editPage.stageData
    );
  }, [GetNewStageID, GetTravelByID, editPage, parentTravel, travelID]);

  const onLocationSelect = (lat: number, lng: number, location: string) => {
    setNewStage(
      (prev) =>
        ({ ...prev, location: location, lat: lat, lng: lng } as StageData)
    );
  };
  if (parentTravel === undefined) {
    return (
      <p className="w-[100vw] h-[100vh] text-center">There is no such travel</p>
    );
  }

  return (
    <>
      <form
        className=" max-w-[40rem] w-full mx-auto bg-background-50 flex items-start flex-col mt-20 mb-6 p-8 gap-2 shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          if (newStage !== undefined) {
            if (editPage === undefined) {
              AddStage(newStage);
              navigate(`/travel/${travelID}`);
            } else {
              UpdateStage(newStage);
              editPage.setStageData(newStage);
              navigate(`/stage/${editPage.stageData.id}`);
            }
          }
        }}
      >
        <div className="w-full bg-background-100 rounded-lg shadow-md mb-4">
          <h1 className="text-center w-full">New stage for travel:</h1>
          <h2 className="text-center w-full text-xl -mt-2 tracking-wider">
            {parentTravel.location}
          </h2>
        </div>
        <DataEditButton
          data={newStage?.location}
          onClick={() => {
            setMapVisible(true);
          }}
        >
          <TiLocation />
          <p>Location</p>
        </DataEditButton>
        <textarea
          className="flex h-40 w-full bg-background text-lg  file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 p-2 rounded-md resize-none"
          id="description"
          placeholder="Enter desription"
          value={newStage?.description}
          onChange={(e) => {
            setNewStage(
              (prev) => ({ ...prev, description: e.target.value } as StageData)
            );
          }}
        />
        {mapVisible && (
          <LocationPicker
            setVisible={setMapVisible}
            onSelect={onLocationSelect}
          />
        )}
        <DataEditButton
          data={FormatDate(newStage?.date)}
          onClick={() => {
            setDatepickerVisible((prev) => !prev);
          }}
        >
          <MdDateRange />
          <p>Date</p>
        </DataEditButton>

        <div className="flex items-center justify-between w-full mt-5 ">
          <button
            className="flex text-center justify-center items-center gap-2 bg-action-400 hover:bg-action-500 p-2 rounded-lg text-background-50 transition-colors px-6"
            type="submit"
          >
            {editPage === undefined ? "Create" : "Confirm"}
          </button>
          <button
            className="flex text-center justify-center items-center gap-2 bg-secondary-400 hover:bg-secondary-500 p-2 rounded-lg text-background-50 transition-colors px-6"
            type="button"
            onClick={() => {
              if (editPage === undefined) {
                navigate(`/travel/${travelID}`);
              } else {
                editPage.cancelEditing();
              }
            }}
          >
            Cancel
          </button>
        </div>
      </form>
      {datepickerVisible && (
        <CustomDatepicker
          date={stageDate}
          onDateSet={(newDate: Date) => {
            setStageDate(newDate);
            setNewStage((prev) => ({ ...prev, date: newDate } as StageData));
          }}
          visible={datepickerVisible}
          setVisible={setDatepickerVisible}
          maxDate={parentTravel.date}
        />
      )}
    </>
  );
}

export default NewStagePage;
