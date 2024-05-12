import {useEffect, useRef, useState} from "react";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {MdAttachFile, MdClose, MdSend} from "react-icons/md";
import {convertFileToBase64} from "../../../util/convert-file-to-base64";
import "./input-component.css";

const InputComponent = ({onSubmit}) => {
    const [inputValue, setInputValue] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);

    const [rows, setRows] = useState(1);
    const inputRef = useRef(null);

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
        <Form className="input-bottom-fixed">
            <InputGroup className="mb-3 align-items-start">
                {file ? (
                    <Button variant="outline-secondary" onClick={handleClearFile}>
                        <MdClose/>
                    </Button>
                ) : (
                    <div>
                        <label htmlFor="fileInput">
                    <span className={`btn btn-outline-secondary ${!!inputValue ? 'disabled' : ''}`}>
                        <MdAttachFile/>
                    </span>
                        </label>
                        <FormControl
                            id="fileInput"
                            type="file"
                            style={{display: 'none'}}
                            onChange={handleFileChange}
                            disabled={!!inputValue}
                            ref={fileInputRef}
                        />
                    </div>
                )}

                <FormControl
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
    );
}
export default InputComponent;


