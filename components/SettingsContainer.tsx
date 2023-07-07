import { useState } from "react";
import FloatingButtons from "./FloatingButtons";


const SettingsContainer = () => {
    const [showButtons, setShowButtons] = useState(true);

    const handleChange = () => {
        setShowButtons(!showButtons);
        
    }

    return (
        <>
            <label className="text-sm">
                <input className="mx-2" type="checkbox" checked={showButtons} onChange={handleChange}/>
                Show buttons
            </label>
            {showButtons && <FloatingButtons/>}
        </>
    )
}

export default SettingsContainer;