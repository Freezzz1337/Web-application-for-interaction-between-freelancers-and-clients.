import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";

const ModalProjectDetails = ({show, handleClose, freelancerId}) => {

    const [formData, setFormData] = useState({
        freelancerId: freelancerId,
        message: ""
    });

    useEffect(() => {
        setFormData({
            ...formData,
            freelancerId: freelancerId
        });
    }, [freelancerId]);
    const handleChange = (e) => {
        setFormData({...formData, freelancerId: freelancerId});
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Send Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formMessage">
                        <Form.Label>Message</Form.Label>
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
                        Send
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
export default ModalProjectDetails;