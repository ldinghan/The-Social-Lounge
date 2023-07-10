import { useState, useEffect } from "react";
import FloatingButtons from "./FloatingButtons";
import ChatBox from "./ChatBox";
import { database } from "../firebase";
import { ref, get, set } from "firebase/database";


interface SettingsContainer {
    username: string;
    userid: string;
}

const SettingsContainer = ({ username , userid }:SettingsContainer) => {
    const [showButtons, setShowButtons] = useState(true);
    const [showChatBox, setShowChatBox] = useState(true);
    const [playerCurrentRoom, setPlayerCurrentRoom] = useState("0");
    
    

    useEffect(() => {
        const playerRoomRef = ref(database, `players/${userid}/room`)
        const getRoom = async () => {
            const currentRoom:string = (await get(playerRoomRef)).val();
            
            setPlayerCurrentRoom(currentRoom);
        }
        getRoom();
        
    }, [userid]);


    const handleRoomChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRoom = e.target.value;
        setPlayerCurrentRoom(selectedRoom);
        
    };
    useEffect(() => {
        const playerRoomRef = ref(database, `players/${userid}/room`)
        set(playerRoomRef, playerCurrentRoom)
    }, [playerCurrentRoom])
    
        

    return (
        <>
            <div className="flex">
                <label className="text-sm">
                    <input className="mx-2" type="checkbox" checked={showButtons} onChange={e => setShowButtons(!showButtons)}/>
                    Show buttons
                </label>
                <label className="text-sm">
                    <input className="mx-2" type="checkbox" checked={showChatBox} onChange={e => setShowChatBox(!showChatBox)}/>
                    Show chatbox
                </label>
                <label className="text-sm">
                    <select className="mx-2" onChange={handleRoomChange}>
                        <option value="0">Room 0</option>
                        <option value="1">Room 1</option>
                    </select>
                </label>
            </div>
            {showButtons && <FloatingButtons/>}
            {showChatBox && <ChatBox username={username}/>}
        </>
    )
}

export default SettingsContainer;