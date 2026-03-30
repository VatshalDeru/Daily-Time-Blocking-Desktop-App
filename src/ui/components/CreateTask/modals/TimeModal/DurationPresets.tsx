import { useContext } from "react";
import { TaskContext } from "../../../../store/Task/TaskContext";

type DurationPresetsProps = {
  selectedDurationPreset: number | null;
  setSelectedDurationPreset: React.Dispatch<React.SetStateAction<number | null>>;
  setCustomDurationDefault: () => void;
  setActiveDuration: React.Dispatch<
  React.SetStateAction<"custom-duration" | "preset-duration">
  >;
  accentColour: string;
};

const DURATION_PRESETS = [1, 15, 30, 45, 60, 90];

export default function DurationPresets({
  selectedDurationPreset,
  setSelectedDurationPreset,
  setCustomDurationDefault,
  setActiveDuration,
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
    currTask.setTimeWindow({
      ...currTask.timeWindow,
      endTime: new Date(currTask.timeWindow.startTime.getTime() + (preset * 60 * 1000))
    })
    setSelectedDurationPreset(preset);
    setCustomDurationDefault();
    setActiveDuration("preset-duration");
  };

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
              selectedDurationPreset === durationPreset
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
