import React, { useState } from "react";
import { TiLocation } from "react-icons/ti";
import { FaMap } from "react-icons/fa";
import { PhotoData } from "../model/PhotoData";
import { PrivacyData } from "../model/PrivacyData";
import DataEditButton from "../components/general-purpose/DataEditButton";
import { MdDateRange } from "react-icons/md";
import { FormatDate } from "../helpers/helpers";
import { MdOutlineSecurity } from "react-icons/md";
import { useTravelsContext } from "../context/TravelsContext";
import CustomDatepicker from "../components/general-purpose/CustomDatepicker";
import TravelsDisplay from "../components/travels-page/TravelsDisplay";
import { StageData } from "../model/StageData";
import { TravelData } from "../model/TravelData";
import StagesDisplay from "../components/travels-page/StagesDisplay";

function NewMemoryPage() {
  const { GetTravelByStageID } = useTravelsContext();
  const [newMemory, setNewMemory] = useState<PhotoData | undefined>();

  const [memoryDate, setMemoryDate] = useState<Date>(new Date());
  const [image, setImage] = useState<string | undefined>();

  const [datepickerVisible, setDatepickerVisible] = useState(false);
  const [selectingTravel, setSelectingTravel] = useState(false);
  const [selectingStage, setSelectingStage] = useState<TravelData>();
  const [mapVisible, setMapVisible] = useState(false);

  const handleImageUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setImage(URL.createObjectURL(target.files[0]));
    setNewMemory({
      id: undefined,
      stageId: undefined,
      description: undefined,
      date: new Date(),
      photoData: target.files[0],
      imageSource: image,
      privacy: PrivacyData.Private,
      likes: [],
      location: "",
      lat: 0,
      lng: 0,
    });
  };
  const cancelEditing = () => {
    setImage(undefined);
    setNewMemory(undefined);
  };
  const onStageSelect = (stage: StageData) => {};
  const onTravelSelect = (travel: TravelData) => {
    setSelectingTravel(false);
    setSelectingStage(travel);
  };
  return (
    <>
      {image === undefined ? (
        <div className="container mx-auto min-h-[100vh] flex flex-col items-center justify-center gap-8 ">
          <h1 className=" text-2xl sm:text-5xl text-primary-900 text-center">
            Add new memory
          </h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center gap-2 justify-center max-w-[30rem] w-full bg-background-50 p-4 h-[30rem] rounded-lg border-dashed border-2 border-primary-800"
          >
            <label htmlFor="image" className="text-xl">
              Drag image here
            </label>
            <p>Or</p>
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
              className="max-w-full ml-auto cursor-pointer"
              required
            />
          </form>
        </div>
      ) : (
        // Image is uploaded
        <form className="max-w-[40rem] w-full mx-auto bg-background-50 flex items-start flex-col mt-20 mb-6 p-8 gap-2 shadow-md">
          <img
            src={image}
            alt=""
            className="object-cover aspect-square h-[30rem] rounded-md mx-auto shadow-md mb-4"
          />
          <textarea
            className="flex h-40 w-full bg-background text-lg  file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 p-2 rounded-md resize-none"
            id="description"
            placeholder="Enter description"
            value={newMemory?.description}
            onChange={(e) => {
              setNewMemory(
                (prev) =>
                  ({ ...prev, description: e.target.value } as PhotoData)
              );
            }}
          />
          <DataEditButton
            data={GetTravelByStageID(newMemory?.stageId as number)?.location}
            onClick={() => {
              setSelectingTravel(true);
            }}
          >
            <FaMap />
            <p>Travel</p>
          </DataEditButton>
          <DataEditButton
            data={undefined}
            onClick={() => {
              setMapVisible(true);
            }}
          >
            <TiLocation />
            <p>Location</p>
          </DataEditButton>
          <DataEditButton
            data={
              newMemory?.privacy === PrivacyData.Private ? "Private" : "Public"
            }
            onClick={() => {
              setNewMemory(
                (prev) =>
                  ({
                    ...prev,
                    privacy:
                      prev?.privacy === PrivacyData.Private
                        ? PrivacyData.Public
                        : PrivacyData.Private,
                  } as PhotoData)
              );
            }}
          >
            <MdOutlineSecurity />
            <p>Privacy</p>
          </DataEditButton>
          <DataEditButton
            data={FormatDate(newMemory?.date)}
            onClick={() => {
              setDatepickerVisible((prev) => !prev);
            }}
          >
            <MdDateRange />
            <p>Date</p>
          </DataEditButton>
          {datepickerVisible && (
            <CustomDatepicker
              className=""
              date={memoryDate}
              onDateSet={(newDate: Date) => {
                setMemoryDate(newDate);
                setNewMemory(
                  (prev) => ({ ...prev, date: newDate } as PhotoData)
                );
              }}
              visible={datepickerVisible}
              setVisible={setDatepickerVisible}
            />
          )}

          <div className="flex items-center justify-between w-full mt-5">
            <button
              className="flex text-center justify-center items-center gap-2 bg-action-400 hover:bg-action-500 p-2 rounded-lg text-background-50 transition-colors px-6"
              type="button"
            >
              Create
            </button>
            <button
              className="flex text-center justify-center items-center gap-2 bg-secondary-500 hover:bg-secondary-600 p-2 rounded-lg text-background-50 transition-colors"
              type="button"
              onClick={cancelEditing}
            >
              Cancel
            </button>
          </div>

          {selectingTravel && (
            <>
              <div
                className="fixed inset-0 bg-primary-950/50"
                onClick={() => {
                  setSelectingTravel(false);
                }}
              />
              <TravelsDisplay onTravelSelect={onTravelSelect} />
            </>
          )}
          {selectingStage !== undefined && (
            <>
              <div
                className="fixed inset-0 bg-primary-950/50"
                onClick={() => {
                  setSelectingStage(undefined);
                }}
              />
              <StagesDisplay
                stages={selectingStage.stages}
                travelID={selectingStage.id as number}
                onStageSelect={onStageSelect}
              />
            </>
          )}
          {/* {mapVisible && <MapPicker setMapVisible={setMapVisible} />} */}
        </form>
      )}
    </>
  );
}

export default NewMemoryPage;
