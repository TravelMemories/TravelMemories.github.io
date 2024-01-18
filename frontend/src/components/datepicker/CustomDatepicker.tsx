import React from "react";
import DatePicker from "tailwind-datepicker-react";
import { IOptions } from "tailwind-datepicker-react/types/Options";
import { cn } from "../../helpers/helpers";
interface Props {
  className?: string;
  date: Date;
  onDateSet: (date: Date) => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
function CustomDatepicker({
  className,
  date,
  onDateSet,
  visible,
  setVisible,
}: Props) {
  const options = {
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    maxDate: new Date(),
    minDate: new Date("1950-01-01"),
    defaultDate: new Date(),
  };
  const handleClose = (state: boolean) => {
    setVisible(state);
  };

  return (
    <div
      className={cn("pointer-events-auto cursor-pointer absolute", className)}
      style={{
        left: "53%",
        bottom: "50%",
        transform: "translate(-100%, -50%)",
      }}
    >
      <DatePicker
        value={date}
        options={options as IOptions}
        onChange={onDateSet}
        show={visible}
        setShow={handleClose}
        classNames={`w-fit cursor-pointer ${visible ? "" : "hidden"}`}
      />
    </div>
  );
}

export default CustomDatepicker;
