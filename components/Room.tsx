import { ReactNode, useState, useEffect } from "react";
import { database, auth } from "../firebase";
import { get, ref } from "firebase/database";

interface Room {
    children: ReactNode;
    id: number;
}
const Room = ({children, id}: Room) => {
    const roomRef = ref(database, `rooms/${id}`);
    const [color, setColor] = useState("");

    useEffect(() => {
        if (auth.currentUser) {
            const getRoomColor = async () => {
                const roomColor:string = (await get(roomRef)).val().color;
                setColor(roomColor);
            }
            getRoomColor();
    
        }
    }, [roomRef])

    const style = {
        backgroundColor: color
    }

    return (
        <div className={"w-full h-full relative"} style={style}>
            {children}
        </div>
    )
}

export default Room;