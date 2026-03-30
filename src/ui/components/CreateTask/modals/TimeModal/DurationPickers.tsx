import { useState, useRef, useContext } from "react";
import useClickOutside from "../../../../hooks/useClickOutside";
import { TaskContext } from "../../../../store/Task/TaskContext";

type Duration = {
  hours: number;
  mins: number;
};

type DurationPickersProps = {
  duration: Duration;
  setDuration: React.Dispatch<React.SetStateAction<Duration>>;
  setPresetDurationNull: () => void;
};

export default function DurationPickers({
  duration,
  setDuration,
  setPresetDurationNull,
}: DurationPickersProps) {
  const { currTask } = useContext(TaskContext);
  const [listVisiblility, setIsListVisible] = useState({
    hours: false,
    mins: false,
  });
  const durationPickerRef = useRef<HTMLDivElement>(null)

//   console.log(duration);
  const hourArray = Array.from({ length: 25 }, (_, i) => i);
  const minArray = Array.from({ length: 60 }, (_, i) => i);
  // console.log(hourArray, minArray)

  const handlePickDuration = (
    durationType: "hours" | "mins",
    selectedDuration: number,
  ) => {
    setDuration((prevDuration) => {
      return {
        ...prevDuration,
        [durationType]: selectedDuration,
      };
    });
    
    // converting the selected durations to ms
    const durationInMs = durationType === "hours" ? 
      selectedDuration * 60 * 60 * 1000 + (duration.mins * 60 * 1000) : 
      selectedDuration * 60 * 1000 + (duration.hours * 60 * 60 * 1000);
    
    console.log(selectedDuration, durationType)

    currTask.setTimeWindow({
      ...currTask.timeWindow,
      endTime: new Date(currTask.timeWindow.startTime.getTime() + durationInMs),
    });

    setIsListVisible((prevListVisibilty) => ({
      ...prevListVisibilty,
      [durationType]: false,
    }));

    setPresetDurationNull();
  };

  // const handleClickOut

  const handleTooglePickerListVisibilty = (pickerListType: string) => {
    setIsListVisible((prevListVisibility) => ({
        hours: "hours" === pickerListType ? !prevListVisibility.hours : false,
        mins: "mins" === pickerListType? !prevListVisibility.mins : false
    }));
  };

  const closeBothListHandler = () => {
    setIsListVisible(() => ({
        hours: false,
        mins: false,
    }))
  }

  useClickOutside({ref: durationPickerRef, closeHandler: closeBothListHandler});

  return (
    <div className="durationPickers" ref={durationPickerRef}>
      <div className="wrapper">
        {listVisiblility.hours && (
          <div className="pickerList">
            <ul>
              {hourArray.map((hourNum, index) => (
                <li
                  key={index}
                  onClick={() => handlePickDuration("hours", hourNum)}
                  className={hourNum === duration.hours ? "selected" : ""}
                >
                  {hourNum}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div
          className="picker"
          onClick={() => handleTooglePickerListVisibilty("hours")}
        >
          <p>{duration.hours}h</p>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.292818 0.292774C0.480348 0.105284 0.734669 -4.3869e-05 0.999849 -4.3869e-05C1.26503 -4.3869e-05 1.51935 0.105284 1.70688 0.292774L6.65688 5.24277L11.6069 0.292774C11.7964 0.116344 12.047 0.020304 12.3059 0.0248613C12.5647 0.0294187 12.8118 0.134218 12.995 0.317209C13.1782 0.5002 13.2832 0.747115 13.2881 1.006C13.2929 1.26489 13.1972 1.51556 13.0209 1.70527L7.36469 7.36309C7.17716 7.55058 6.92284 7.6559 6.65766 7.6559C6.39248 7.6559 6.13816 7.55058 5.95063 7.36309L0.292818 1.70684C0.105327 1.51931 0 1.26498 0 0.999805C0 0.734625 0.105327 0.480304 0.292818 0.292774Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className="wrapper">
        {listVisiblility.mins && (
          <div className="pickerList">
            <ul>
              {minArray.map((minNum, index) => (
                <li
                  key={index}
                  onClick={() => handlePickDuration("mins", minNum)}
                  className={minNum === duration.mins ? "selected" : ""}
                >
                  {minNum}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div
          className="picker"
          onClick={() => handleTooglePickerListVisibilty("mins")}
        >
          <p>{duration.mins}m</p>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.292818 0.292774C0.480348 0.105284 0.734669 -4.3869e-05 0.999849 -4.3869e-05C1.26503 -4.3869e-05 1.51935 0.105284 1.70688 0.292774L6.65688 5.24277L11.6069 0.292774C11.7964 0.116344 12.047 0.020304 12.3059 0.0248613C12.5647 0.0294187 12.8118 0.134218 12.995 0.317209C13.1782 0.5002 13.2832 0.747115 13.2881 1.006C13.2929 1.26489 13.1972 1.51556 13.0209 1.70527L7.36469 7.36309C7.17716 7.55058 6.92284 7.6559 6.65766 7.6559C6.39248 7.6559 6.13816 7.55058 5.95063 7.36309L0.292818 1.70684C0.105327 1.51931 0 1.26498 0 0.999805C0 0.734625 0.105327 0.480304 0.292818 0.292774Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
