import React, {useEffect, useState} from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import {useAuth} from "../../../../context/auth-context";
import {getAllUsersChats} from "../../../../services/chat-service";
import "./chat-person-list.css";
import formatCreatedAtDate from "../../../../util/format-created-at-date";

const ChatPersonList = ({projectId, onSelectUser}) => {
    const {token} = useAuth();
    const [usersChats, setUsersChats] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const serverResponse = await getAllUsersChats(projectId, token);
            setUsersChats(serverResponse);
            console.log(serverResponse);
        };
        fetch();
    }, [projectId, token]);

    return (
        <Row className="for-person-list-container ">
            {usersChats.map(userChat => (
                <Col xs={12} key={userChat.userId} onClick={() => onSelectUser(userChat.userId)}
                     className="fade-block align-items-center">
                    <Row className="mt-3">
                        <Col xs={2} className="mt-2">
                            <Image src={`data:image/png;base64,${userChat.userPicture}`} alt="User"
                                   className="picture"/>
                        </Col>
                        <Col xs={10} className="mt-1">
                            <div>
                                <div className="name-date">
                                    <strong className="text-size">{userChat.fullName}</strong>
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

// <div >
//     <strong>{userChat.fullName}</strong>
//     <p>Last Message: {userChat.lastMessage}</p>
//     <p>Last Message Time: {userChat.lastMessageTime}</p>
// </div>
// <hr />
// <Row key={userChat.userId} onClick={() => onSelectUser(userChat.userId)} >
//     <Col md={2}>
//         <Image src={`data:image/png;base64,${userChat.userPicture}`} alt="User" className="picture"/>
//     </Col>
//     <Col md={8}>
//         <div className="user-details">
//             <strong className="text-size">{userChat.fullName}</strong>
//             <p>{userChat.lastMessage}</p>
//         </div>
//     </Col>
//     <Col md={2}>
//         <p className="date-text">{formatCreatedAtDate(userChat.lastMessageTime)}</p>
//     </Col>
//     <hr/>
// </Row>
export default ChatPersonList;