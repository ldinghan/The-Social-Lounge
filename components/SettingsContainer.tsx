import { useState } from "react";
import FloatingButtons from "./FloatingButtons";
import ChatBox from "./ChatBox";


interface SettingsContainer {
    username: string;
}

const SettingsContainer = ({ username }:SettingsContainer) => {
    const [showButtons, setShowButtons] = useState(true);
    const [showChatBox, setShowChatBox] = useState(true);
    
    return (
        <>
            <label className="text-sm">
                <input className="mx-2" type="checkbox" checked={showButtons} onChange={e => setShowButtons(!showButtons)}/>
                Show buttons
            </label>
            <label className="text-sm">
                <input className="mx-2" type="checkbox" checked={showChatBox} onChange={e => setShowChatBox(!showChatBox)}/>
                Show chatbox
            </label>
            {showButtons && <FloatingButtons/>}
            {showChatBox && <ChatBox username={username}/>}
        </>
    )
}

export default SettingsContainer;