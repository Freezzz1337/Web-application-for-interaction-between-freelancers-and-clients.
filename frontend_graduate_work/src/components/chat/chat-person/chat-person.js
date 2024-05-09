import {useEffect, useState} from "react";
import {useAuth} from "../../../context/auth-context";
import {getChat} from "../../../services/chat-service";

const ChatPerson = ({userId, projectId}) => {
    const {token} = useAuth();
    const [chatMessages, setChatMessages] = useState(null);

    useEffect(() => {
        const fetchChatMessages = async () => {
            const serverResponse = await getChat(userId, projectId, token);
            setChatMessages(serverResponse);
            console.log(serverResponse);
        };
        fetchChatMessages();
    }, [userId, token]);

    return <div>{userId} - {projectId}</div>
}
export default ChatPerson;


// const ChatPerson = ({ chatId }) => {
//     const { token } = useAuth();
//     const [messages, setMessages] = useState([]);
//
//     useEffect(() => {
//         const fetchChatMessages = async () => {
//             const serverResponse = await getChatMessages(chatId, token);
//             setMessages(serverResponse);
//         };
//         fetchChatMessages();
//     }, [chatId, token]);
//
//     return (
//         <div>
//             {messages.map(message => (
//                 <div key={message.messageId}>
//                     <p>{message.senderFullName}: {message.messageText}</p>
//                     <p>Time: {message.createdAt}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };