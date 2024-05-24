import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {useTranslation} from "react-i18next";

const SupportModal = ({show, handleClose, handleSendMessage}) => {
    const {t} = useTranslation();
    const [message, setMessage] = useState("");

    const handleSend = () => {
        setMessage("");
        handleSendMessage();
    };
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("modalSupport.title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="supportMessage">
                        <Form.Label>{t("modalSupport.label")}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={t("modalSupport.placeholder")}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t("buttons.close")}
                </Button>
                <Button variant="primary" onClick={handleSend}>
                    {t("buttons.sendMessage")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SupportModal;