import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useAuth} from "../../../../context/auth-context";
import {sentFirstMessage} from "../../../../services/chat-service";
import {useTranslation} from "react-i18next";

const ModalProjectDetails = ({show, handleClose, freelancerId, projectId, updateProjectDetailsEmployer}) => {
    const  {t} = useTranslation();
    const {token} = useAuth();
    const [formData, setFormData] = useState({
        freelancerId: freelancerId,
        projectId: projectId,
        message: ""
    });

    useEffect(() => {
        setFormData({
            ...formData,
            freelancerId: freelancerId,
        });
    }, [freelancerId, projectId]);

    const handleChange = (e) => {
        e.preventDefault();

        setFormData({...formData, message: e.target.value});
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const serverResponse = await sentFirstMessage(JSON.stringify(formData), token);
        if (serverResponse.response) {
            updateProjectDetailsEmployer();
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("modalProjectDetails.title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formMessage">
                        <Form.Label>{t("modalProjectDetails.label")}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Enter your message"
                        />
                    </Form.Group>
                    <Button
                        className="btn-info btn-lg text-body w-100 rounded-0 mt-3"
                        type="submit">
                        {t("buttons.send")}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
export default ModalProjectDetails;