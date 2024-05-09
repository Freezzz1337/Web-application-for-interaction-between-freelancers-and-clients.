import {useEffect, useState} from "react";
import {Button, Offcanvas} from "react-bootstrap";
import {useAuth} from "../../context/auth-context";
import {getAllProjectsWithChats} from "../../services/chat-service";
import ChatProjectList from "./chat-lists/chat-project-list";
import ChatPersonList from "./chat-lists/chat-person-list";
import {BiChevronLeft} from "react-icons/bi";
import ChatPerson from "./chat-person";

const Chat = ({show, onHide}) => {
    const [projects, setProjects] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [chatMode, setChatMode] = useState('projectList');
    const {token} = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            const serverResponse = await getAllProjectsWithChats(token);
            setProjects(serverResponse);
        };

        if (show) {
            fetchProjects();
        }
    }, [show, token]);

    const handleProject = (projectId) => {
        setSelectedProjectId(projectId);
        setSelectedUserId(null);
        setChatMode('userList');
    };

    const handleUserSelect = (userId) => {
        setSelectedUserId(userId);
        setChatMode('chat');
    };

    const handleBack = () => {
        if (chatMode === 'chat') {
            setSelectedUserId(null);
            setChatMode('userList');
        } else if (chatMode === 'userList') {
            setSelectedProjectId(null);
            setChatMode('projectList');
        }
    };

    return (
        <Offcanvas show={show} onHide={onHide} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    {chatMode !== 'projectList' && (
                        <Button className="btn btn-back" onClick={handleBack}>
                            <BiChevronLeft size={24}/> Chat
                        </Button>
                    )}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <hr style={{marginTop: '-1px'}}/>
            <Offcanvas.Body>
                {selectedUserId ? (
                    <ChatPerson userId={selectedUserId} projectId={selectedProjectId}/>
                ) : selectedProjectId ? (
                    <ChatPersonList projectId={selectedProjectId} onSelectUser={handleUserSelect}/>
                ) : (
                    <ChatProjectList projects={projects} handleProject={handleProject}/>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Chat;