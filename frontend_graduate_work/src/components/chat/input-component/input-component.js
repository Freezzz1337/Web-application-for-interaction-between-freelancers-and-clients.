import {useEffect, useRef, useState} from "react";
import {Button, Dropdown, DropdownButton, Form, FormControl, InputGroup} from "react-bootstrap";
import {MdClose, MdSend} from "react-icons/md";
import {AiOutlineMenu} from "react-icons/ai";
import {convertFileToBase64} from "../../../util/convert-file-to-base64";
import "./input-component.css";
import {useAuth} from "../../../context/auth-context";
import CollaborationInvitationModal from "../../collaboration-invitation";
import {useTranslation} from "react-i18next";

const InputComponent = ({onSubmit, userId, projectId, collaborationIsActive, updateChat}) => {
    const {t} = useTranslation();
    const {userType} = useAuth();

    const [inputValue, setInputValue] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);

    const [rows, setRows] = useState(1);
    const inputRef = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const [collaborationAction, setCollaborationAction] = useState(null);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        if (inputRef.current) {
            const textarea = inputRef.current;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
            setRows(textarea.rows);
        }
    }, [inputValue]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleCollaborate = () => {
        setCollaborationAction('collaborate');
        toggleModal();
    };

    const handleEditCollaboration = () => {
        setCollaborationAction('edit');
        toggleModal();
    };

    const handleDeclineCollaboration = () => {
        setCollaborationAction('decline');
        toggleModal();
    }

    const handleApproveCollaboration = () => {
        setCollaborationAction('approve');
        toggleModal();
    };
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            convertFileToBase64(selectedFile, (base64String) => {
                setFile(base64String);
            });
            setFileName(selectedFile.name);
        }
    };

    const handleClearFile = () => {
        setFile(null);
        setFileName(null);
        setInputValue('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onSubmit) {
            onSubmit(inputValue, file, fileName);
        }
        setInputValue('');
        setFile(null);
        setFileName('');
    };


    return (
        <>
            <Form className="input-bottom-fixed">
                <InputGroup className="mb-3 align-items-start">
                    {file ? (
                        <Button variant="outline-secondary" onClick={handleClearFile}>
                            <MdClose/>
                        </Button>
                    ) : (
                        <DropdownButton
                            variant="outline-secondary"
                            title={<AiOutlineMenu/>}
                            id="input-group-dropdown-1"
                            disabled={!!inputValue}
                        >
                            <Dropdown.Item as="label" htmlFor="fileInput"
                                           className={`btn ${!!inputValue ? 'disabled' : ''}`}>
                                {t("inputComponent.uploadFile")}
                                <input
                                    id="fileInput"
                                    type="file"
                                    style={{display: 'none'}}
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    disabled={!!inputValue}
                                />
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            {userType === "EMPLOYER" && (
                                <>
                                    {!collaborationIsActive && (
                                        <Dropdown.Item onClick={handleCollaborate}>{t("inputComponent.dropdown.title")}</Dropdown.Item>
                                    )}

                                    {collaborationIsActive && (
                                        <>
                                            <Dropdown.Item onClick={handleApproveCollaboration}>{t("inputComponent.dropdown.approve")}</Dropdown.Item>
                                            <Dropdown.Item onClick={handleDeclineCollaboration}>{t("inputComponent.dropdown.decline")}</Dropdown.Item>
                                            <Dropdown.Item onClick={handleEditCollaboration}>{t("inputComponent.dropdown.edit")}</Dropdown.Item>
                                        </>
                                    )}

                                    <CollaborationInvitationModal showModal={showModal} toggleModal={toggleModal}
                                                                  userId={userId}
                                                                  projectId={projectId}
                                                                  collaborationAction={collaborationAction}
                                                                  updateChat={updateChat}
                                    />
                                </>
                            )}

                        </DropdownButton>
                    )}

                    < FormControl
                        as="textarea"
                        rows={rows}
                        ref={inputRef}
                        placeholder={fileName ? fileName : "Enter text..."}
                        value={inputValue}
                        onChange={handleInputChange}
                        disabled={!!file}
                        style={{resize: "none"}}
                    />
                    <Button variant="primary"
                            onClick={handleSubmit}
                            disabled={!inputValue && !file}>
                        <MdSend/>
                    </Button>
                </InputGroup>
            </Form>

        </>
    );
}
export default InputComponent;