
const DURATION_PRESETS = [1, 15, 30, 45, 60, 90];

export default function DurationPresets() {

    const formatDuration = (duration: number) => {
        const hours = Math.floor(duration/60);
        const mins = duration%60;
        
        if(hours && mins) return `${hours}h ${mins}m`
        else if(hours) return `${hours}h`
        else return  `${mins}m`
    };

    return <div className="durationPresetsContainer">
        <header>
            <h2>Presets</h2>
        </header>
        <div className="presets">
            {DURATION_PRESETS.map(durationPreset => (
                <button>{formatDuration(durationPreset)}</button>
            ))}
        </div>
    </div>
}