import {useEffect, useRef, useState} from "react";
import {Button, Dropdown, DropdownButton, Form, FormControl, InputGroup} from "react-bootstrap";
import {MdAttachFile, MdClose, MdSend} from "react-icons/md";
import {convertFileToBase64} from "../../../util/convert-file-to-base64";
import "./input-component.css";
import {useAuth} from "../../../context/auth-context";
import CollaborationInvitation from "../../collaboration-invitation";

const InputComponent = ({onSubmit, userId, projectId, collaborationIsActive}) => {
    const {userType} = useAuth();

    const [inputValue, setInputValue] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);

    const [rows, setRows] = useState(1);
    const inputRef = useRef(null);

    const [showModal, setShowModal] = useState(false);

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
                            title={<MdAttachFile/>}
                            id="input-group-dropdown-1"
                            disabled={!!inputValue}
                        >
                            <Dropdown.Item as="label" htmlFor="fileInput"
                                           className={`btn ${!!inputValue ? 'disabled' : ''}`}>
                                Upload File
                                <input
                                    id="fileInput"
                                    type="file"
                                    style={{display: 'none'}}
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    disabled={!!inputValue}
                                />
                            </Dropdown.Item>

                            {userType === "EMPLOYER" && (
                                <>
                                    {!collaborationIsActive && (
                                        <Dropdown.Item onClick={toggleModal}>Collaborate</Dropdown.Item>
                                    )}
                                    <CollaborationInvitation showModal={showModal} toggleModal={toggleModal}
                                                             userId={userId} projectId={projectId}/>

                                    <Dropdown.Item>Approve Work</Dropdown.Item>
                                    <Dropdown.Item>Edit Collaboration</Dropdown.Item>
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