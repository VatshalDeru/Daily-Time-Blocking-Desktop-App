import { useState, useRef, useContext } from "react";
import useClickOutside from "../../../../hooks/useClickOutside";
import { TaskContext } from "../../../../store/Task/TaskContext";
import ArrowIcon from "../../../icons/ArrowIcon";

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
            <ArrowIcon/>
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
          <ArrowIcon/>
        </div>
      </div>
    </div>
  );
}
