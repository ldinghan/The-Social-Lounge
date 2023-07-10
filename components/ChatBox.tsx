import { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, serverTimestamp, get, set, update, onValue, off } from "firebase/database";
import ChatText from "./ChatText";


interface ChatBox {
    username:string;
}

interface Message {
    id:string|number;
    message:string;
    sender:string;
    time:number;
}

const ChatBox = ({username}:ChatBox) => {
    
    
    const [messageCount, setMessageCount] = useState(0);
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState<{ [key:number|string]: Message}>({});

    const messageCountRef = ref(database, 'chatHistory/count');
    const messageDBRef = ref(database, 'chatHistory');

    useEffect(() => {
        const initChatBox = async () => {
            setMessageCount((await get(messageCountRef)).val());
        }
        initChatBox();
        onValue(messageDBRef, (snapshot) => {
            setAllMessages(snapshot.val().messages);
            initChatBox();
        })

    }, [])

    const sendMessage = async () => {
        if (message === "") {
            return;
        }
        setMessageCount((await get(messageCountRef)).val());
        let messageId:string = messageCount.toString()
        const messageRef = ref(database, `chatHistory/messages/${messageId}`);
        set(messageRef, {
            message: message,
            sender: username,
            time: serverTimestamp()
        })
        update(messageDBRef, {count: messageCount+1});
        setMessageCount(c => c+1);
        
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        sendMessage();
        setMessage("");
    }



    return (
        <div className="mt-2">
        <div className="h-full flex flex-col">
            {Object.keys(allMessages).reverse().slice(0,5).map(key => {
                return <ChatText key={key} messageText={allMessages[key].message} messageSender={allMessages[key].sender} messageTime={allMessages[key].time} />
            })}
        </div>
        <form onSubmit={handleSubmit} className="flex justify-center items-center">
            <input onChange={e => setMessage(e.target.value)} className="border border-2 border-gray-300" type="text" value={message} placeholder="Enter your message here" />
            <button className="border border-2 border-gray-400 bg-gray-300 px-3" type="submit">Send</button>
        </form>
        </div>
    )
}

export default ChatBox;