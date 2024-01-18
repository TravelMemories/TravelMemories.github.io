import React from "react";
import DatePicker from "tailwind-datepicker-react";
import { IOptions } from "tailwind-datepicker-react/types/Options";
interface Props {
  date: Date;
  onDateSet: (date: Date) => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
function CustomDatepicker({ date, onDateSet, visible, setVisible }: Props) {
  const options = {
    autoHide: true,
    todayBtn: true,
    clearBtn: false,
    maxDate: new Date(),
    minDate: new Date("1950-01-01"),
    defaultDate: new Date(),
  };
  const handleClose = (state: boolean) => {
    setVisible(state);
  };

  return (
    <div className="pointer-events-auto cursor-pointer relative">
      <DatePicker
        value={date}
        options={options as IOptions}
        onChange={onDateSet}
        show={visible}
        setShow={handleClose}
        classNames={` cursor-pointer bottom-[250px] left-[200px] ${
          visible ? "absolute" : "hidden"
        }`}
      />
    </div>
  );
}

export default CustomDatepicker;
