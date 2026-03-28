import { useState } from "react";

const DURATION_PRESETS = [1, 15, 30, 45, 60, 90];

type DurationPresetsProps = {
    selectedDurationPreset: number | null,
    setSelectedDurationPreset: React.Dispatch<React.SetStateAction<number | null>>;
    setCustomDurationDefault: () => void;
    setActiveDuration: React.Dispatch<React.SetStateAction<'custom-duration' | 'preset-duration'>>;
    accentColour: string;
};

export default function DurationPresets({ selectedDurationPreset, setSelectedDurationPreset, setCustomDurationDefault, setActiveDuration, accentColour }: DurationPresetsProps) {
    // const [selectedDurationPreset, setSlectedDurationPreset] = useState(1);

    const formatDuration = (duration: number) => {
        const hours = Math.floor(duration/60);
        const mins = duration%60;
        
        if(hours && mins) return `${hours}h ${mins}m`
        else if(hours) return `${hours}h`
        else return  `${mins}m`
    };

    const handleSelectDurationPreset = (preset: number) => {
        setSelectedDurationPreset(preset);
        setCustomDurationDefault();
        setActiveDuration('preset-duration');
    };

    return <div className="durationPresetsContainer">
        <header>
            <h2>Presets</h2>
        </header>
        <div className="presets">
            {DURATION_PRESETS.map(durationPreset => (
                <button 
                    // className={selectedDurationPreset === durationPreset ? 
                    // 'selected' : ''} 
                    style={selectedDurationPreset === durationPreset ? {
                        border: `1px solid ${accentColour}`,
                        color: accentColour,
                    }: undefined }
                    onClick={() => handleSelectDurationPreset(durationPreset)}
                >{formatDuration(durationPreset)}</button>
            ))}
        </div>
    </div>
}