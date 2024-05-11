import {useEffect, useState} from "react";
import {useAuth} from "../../../context/auth-context";
import {getChat} from "../../../services/chat-service";
import {Col, Image, ListGroup, Row} from "react-bootstrap";
import "./chat-person.css";
import formatCreatedAtDate from "../../../util/format-created-at-date";
import InputComponent from "../input-component";

const ChatPerson = ({userId, projectId}) => {
    const {token} = useAuth();
    const [chatMessages, setChatMessages] = useState(null);

    useEffect(() => {
        const fetchChatMessages = async () => {
            const serverResponse = await getChat(userId, projectId, token);
            setChatMessages(serverResponse.chatMessageList);
        };
        fetchChatMessages();
    }, [userId, projectId, token]);

    const sendMessage = (text, file) => {
        console.log("TEXT: " + text);
        console.log("FILE: " + file);
    }

    if (!chatMessages) {
        return <div><h2>Wait a moment!</h2></div>
    }

    return (
        <div>
            <ListGroup>
                {chatMessages.map((message) => (
                    <ListGroup.Item key={message.messageId}>
                        <Row>
                            <Col xs={2}>
                                <Image
                                    src={`data:image/jpeg;base64,${message.sender.profilePicture}`}
                                    className="chat-person-picture"
                                    roundedCircle/>
                            </Col>
                            <Col xs={10}>
                                <div>
                                        <strong>{message.sender.fullName}  </strong>
                                        <span>{formatCreatedAtDate(message.createdAt)}</span>
                                    <p>
                                        {message.messageText}

                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <InputComponent onSubmit={sendMessage}/>
        </div>
    );
}

// <p className="title-wrapper">{project.title}
//     <span> {formatCreatedAtDate(project.created_at)}</span>
// </p>
export default ChatPerson;