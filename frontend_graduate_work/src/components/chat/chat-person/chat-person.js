import {useEffect, useRef, useState} from "react";
import {useAuth} from "../../../context/auth-context";
import {getChat, sendMessage} from "../../../services/chat-service";
import {Col, Image, ListGroup, Row} from "react-bootstrap";
import "./chat-person.css";
import formatCreatedAtDate from "../../../util/format-created-at-date";
import InputComponent from "../input-component";
import CollaborationInvitationMessage from "./collaboration-invitation-message";
import Spinner from "../../spinner";

const ChatPerson = ({userId, projectId}) => {
    const {token, userType} = useAuth();
    const [chatMessages, setChatMessages] = useState(null);
    const [collaborationIsActive, setCollaborationIsActive] = useState(false);
    const [formData, setFormData] = useState({
        chatId: 0,
        textMessage: "",
        file: null,
        fileName: ""
    });
    const chatListGroupRef = useRef(null);

    useEffect(() => {
        const fetchChatMessages = async () => {
            const serverResponse = await getChat(userId, projectId, token);
            setChatMessages(serverResponse.chatMessageList);
            setCollaborationIsActive(serverResponse.collaborationIsActive);

            setFormData({...formData, chatId: serverResponse.chatId});
        };
        fetchChatMessages();
    }, [userId, projectId, token]);

    useEffect(() => {
        if (chatListGroupRef.current) {
            chatListGroupRef.current.scrollTop = chatListGroupRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const handleSendMessage = async (text, file, fileName) => {
        const updatedFormData = {
            ...formData,
            textMessage: text,
            file: file,
            fileName: fileName
        };
        setFormData(updatedFormData);

        await sendMessage(JSON.stringify(updatedFormData), token);
        const updatedChatMessages = await getChat(userId, projectId, token);

        setChatMessages(updatedChatMessages.chatMessageList);
    };

    const updateChat = async () => {
        const updatedChatMessages = await getChat(userId, projectId, token);
        setChatMessages(updatedChatMessages.chatMessageList);
        setCollaborationIsActive(updatedChatMessages.collaborationIsActive);
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + '...';
        }
        return text;
    }

    if (!chatMessages) {
        return (
            <div style={{height: "100%"}} className="d-flex justify-content-center align-items-center">
                <Spinner size="7rem"/>
            </div>
        );
    }


    return (
        <div>
            <ListGroup className="chat-person-listGroup" ref={chatListGroupRef}>
                {chatMessages.map((message, index) => (
                    <ListGroup.Item key={message.messageId} className="mb-2 border rounded">
                        <Row>
                            <Col xs={2} className="mt-1">
                                <Image
                                    src={`data:image/jpeg;base64,${message.sender.profilePicture}`}
                                    className="chat-person-picture"
                                    roundedCircle
                                />
                            </Col>
                            <Col xs={10}>
                                <div>
                                    <strong>{truncateText(message.sender.fullName, 17)}</strong>
                                    <span> {formatCreatedAtDate(message.createdAt)}</span>
                                    {message.fileName && message.file && (
                                        <div>
                                            <p>
                                                File:{" "}
                                                <a
                                                    href={`data:${message.fileType};base64,${message.file}`}
                                                    download={message.fileName}
                                                >
                                                    {truncateText(message.fileName, 27)}
                                                </a>
                                            </p>
                                        </div>
                                    )}
                                    {message.messageText && <p>{message.messageText}</p>}
                                    {message.collaborationInvitation && !message.fileName && !message.file && (
                                        <CollaborationInvitationMessage
                                            invitation={message.collaborationInvitation}
                                            userType={userType}
                                            updateChat={updateChat}
                                        />
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <InputComponent onSubmit={handleSendMessage} userId={userId} projectId={projectId}
                            collaborationIsActive={collaborationIsActive} updateChat={updateChat}/>
        </div>
    );
}
export default ChatPerson;