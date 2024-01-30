import React, { useEffect, useState } from "react";
import { TiLocation } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import { FormatDate } from "../helpers/helpers";
import DataEditButton from "../components/general-purpose/DataEditButton";
import { TravelData } from "../model/TravelData";
import CustomDatepicker from "../components/general-purpose/CustomDatepicker";
import { useTravelsContext } from "../context/TravelsContext";
import { useNavigate } from "react-router-dom";
import LocationPicker from "../components/general-purpose/LocationPicker";

function NewTravelPage() {
  const [newTravel, setNewTravel] = useState<TravelData | undefined>();
  const [travelDate, setTravelDate] = useState<Date>(new Date());
  const [datepickerVisible, setDatepickerVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const { AddTravel } = useTravelsContext();
  const navigate = useNavigate();

  useEffect(() => {
    setNewTravel({
      id: undefined,
      location: undefined,
      lat: 0,
      lon: 0,
      description: "",
      date: new Date(),
      stages: [],
    });
  }, []);

  const onLocationSelect = (lat: number, lng: number, location: string) => {
    setNewTravel(
      (prev) =>
        ({ ...prev, location: location, lat: lat, lon: lng } as TravelData)
    );
  };

  return (
    <>
      <form
        className=" max-w-[40rem] w-full mx-auto bg-background-50 flex items-start flex-col mt-20 mb-6 p-8 gap-2 shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          if (newTravel !== undefined) {
            AddTravel(newTravel);
            navigate("/travels");
          }
        }}
      >
        <DataEditButton
          data={newTravel?.location}
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
          value={newTravel?.description}
          onChange={(e) => {
            setNewTravel(
              (prev) => ({ ...prev, description: e.target.value } as TravelData)
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
          data={FormatDate(newTravel?.date)}
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
            Create
          </button>
        </div>
      </form>
      {datepickerVisible && (
        <CustomDatepicker
          date={travelDate}
          onDateSet={(newDate: Date) => {
            setTravelDate(newDate);
            setNewTravel((prev) => ({ ...prev, date: newDate } as TravelData));
          }}
          visible={datepickerVisible}
          setVisible={setDatepickerVisible}
        />
      )}
    </>
  );
}

export default NewTravelPage;
