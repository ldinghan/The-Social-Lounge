
interface ChatText {
    messageText: string;
    messageSender: string;
    messageTime: number;
}

const ChatText = ({ messageText, messageSender, messageTime }:ChatText) => {

    const messageTimeString = (new Date(messageTime)).toString();

    return (
        <div className="w-50 h-12 min-h-fit bg-green-100 pl-4 border border-black">
            <p className="">{messageSender}: {messageText}</p>
            <p className="text-[0.5em]">{messageTimeString}</p>
        </div>
    )
}

export default ChatText;