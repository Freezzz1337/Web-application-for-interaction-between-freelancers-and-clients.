import {useEffect, useState} from "react";
import {Button, Offcanvas} from "react-bootstrap";
import {useAuth} from "../../context/auth-context";
import {getAllProjectsWithChats} from "../../services/chat-service";
import ChatProjectList from "./chat-lists/chat-project-list";
import ChatPersonList from "./chat-lists/chat-person-list";
import {BiChevronLeft} from "react-icons/bi";
import ChatPerson from "./chat-person";
import "./chat.css";
import Spinner from "../spinner";
import {useTranslation} from "react-i18next";

const Chat = ({show, onHide, userId, userName, projectId, projectName}) => {
    const {t} = useTranslation();
    const [projects, setProjects] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(projectId);
    const [selectedProjectName, setSelectedProjectName] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(userId);
    const [selectedUserName, setSelectedUserName] = useState(null);
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

    useEffect(() => {
        if (userId && projectId) {
            setSelectedUserId(userId);
            setSelectedUserName(userName)
            setSelectedProjectId(projectId);
            setSelectedProjectName(projectName);
            setChatMode('chat');
        }
    }, [userId, projectId]);

    const handleProject = (projectId, projectName) => {
        setSelectedProjectId(projectId);
        setSelectedProjectName(projectName);
        setSelectedUserId(null);
        setChatMode('userList');
    };

    const handleUserSelect = (userId, fullName) => {
        setSelectedUserId(userId);
        setSelectedUserName(fullName);
        setChatMode('chat');
    };

    const handleBack = () => {
        if (chatMode === 'chat') {
            setSelectedUserId(null);
            setSelectedUserName(null);
            setChatMode('userList');
        } else if (chatMode === 'userList') {
            setSelectedProjectId(null);
            setSelectedProjectName(null);
            setChatMode('projectList');
        }
    };

    return (
        <Offcanvas show={show} onHide={onHide} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    <div className="chat-header-text">
                        {chatMode !== 'projectList' ? (
                            <Button variant="outline-secondary" onClick={handleBack}>
                                <BiChevronLeft size={24}/>
                            </Button>
                        ) : (
                            <h4 className="mb-0">{t("chat.title")}</h4>
                        )}
                        <span> {chatMode === "chat" ? selectedUserName : selectedProjectName}</span>
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <hr className="mb-0" style={{marginTop: '-1px'}}/>
            <Offcanvas.Body>
                {selectedUserId && selectedProjectId ? (
                    <ChatPerson userId={selectedUserId} projectId={selectedProjectId}/>
                ) : selectedProjectId ? (
                    <ChatPersonList projectId={selectedProjectId} onSelectUser={handleUserSelect}/>
                ) : (
                    <ChatProjectList projects={projects} handleProject={handleProject}/>
                )}

                {!projects && (
                    <div style={{height:"100%"}} className="d-flex justify-content-center align-items-center">
                        <Spinner size="7rem"/>
                    </div>
                )}
                {projects && projects.length <= 0 && (
                    <h4 className="text-center">{t("chat.noChat")} =(</h4>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Chat;