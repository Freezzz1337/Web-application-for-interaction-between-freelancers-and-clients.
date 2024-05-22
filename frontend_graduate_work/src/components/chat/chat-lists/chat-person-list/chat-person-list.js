import React, {useEffect, useState} from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import {useAuth} from "../../../../context/auth-context";
import {getAllUsersChats} from "../../../../services/chat-service";
import "./chat-person-list.css";
import formatCreatedAtDate from "../../../../util/format-created-at-date";
import Spinner from "../../../spinner";

const ChatPersonList = ({projectId, onSelectUser}) => {
    const {token} = useAuth();
    const [usersChats, setUsersChats] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const serverResponse = await getAllUsersChats(projectId, token);
            setUsersChats(serverResponse);
        };
        fetch();
    }, [projectId, token]);

    if (!usersChats) {
        return (
            <div style={{height: "100%"}} className="d-flex justify-content-center align-items-center">
                <Spinner size="7rem"/>
            </div>
        );
    }

    return (
        <Row className="for-person-list-container">
            {usersChats.map(userChat => (
                <Col xs={12} key={userChat.userId} onClick={() => onSelectUser(userChat.userId, userChat.fullName)}
                     className={`fade-block align-items-center ${userChat.active ? '' : 'inactive'}`}>
                    <Row className="mt-3">
                        <Col xs={2} className="mt-2">
                            <Image src={`data:image/png;base64,${userChat.userPicture}`} alt="User"
                                   className="picture"/>
                        </Col>
                        <Col xs={10} className="mt-1">
                            <div>
                                <div className="name-date">
                                    <strong
                                        className="text-size chat-person-list-user-name">{userChat.fullName}</strong>
                                    <p className="date-text">{formatCreatedAtDate(userChat.lastMessageTime)}</p>
                                </div>
                                <p className="lastMessage-text">{userChat.lastMessage}</p>
                            </div>
                        </Col>

                    </Row>
                    <hr className="mb-0"/>
                </Col>
            ))}
        </Row>
    );
};

export default ChatPersonList;