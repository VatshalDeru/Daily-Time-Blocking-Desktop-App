import { useContext } from "react";
import { TaskContext } from "../../../../store/Task/TaskContext";

type DurationPresetsProps = {
  selectedDurationPreset: number | null;
  setSelectedDurationPreset: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomDurationDefault: () => void;
  accentColour: string;
};

const DURATION_PRESETS = [1, 15, 30, 45, 60, 90];

export default function DurationPresets({
  selectedDurationPreset,
  setSelectedDurationPreset,
  setCustomDurationDefault,
  accentColour,
}: DurationPresetsProps) {
  // const [selectedDurationPreset, setSlectedDurationPreset] = useState(1);
  const { currTask } = useContext(TaskContext);


  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const mins = duration % 60;

    if (hours && mins) return `${hours}h ${mins}m`;
    else if (hours) return `${hours}h`;
    else return `${mins}m`;
  };

  // console.log(currTask)
  const handleSelectDurationPreset = (preset: number) => {
    // console.log(preset*60*1000)
    currTask.setDuration(preset * 60 * 1000);
    // currTask.setTimeWindow({
    //   ...currTask.timeWindow,
    //   endTime: new Date(currTask.timeWindow.startTime.getTime() + (preset * 60 * 1000))
    // })
    setSelectedDurationPreset(preset);
    setCustomDurationDefault();
  };
  // console.log(currTask.duration/(1000*60))

  return (
    <div className="durationPresetsContainer">
      <header>
        <h2>Presets</h2>
      </header>
      <div className="presets">
        {DURATION_PRESETS.map((durationPreset, index) => (
          <button
            key={index}
            style={
                (currTask.duration/(1000*60)) === durationPreset
                ? {
                    border: `1px solid ${accentColour}`,
                    color: accentColour,
                  }
                : undefined
            }
            onClick={() => handleSelectDurationPreset(durationPreset)}
          >
            {formatDuration(durationPreset)}
          </button>
        ))}
      </div>
    </div>
  );
}
