import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";

const SupportModal = ({show, handleClose, handleSendMessage}) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        setMessage("");
        handleSendMessage();
    };
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Contact Support</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="supportMessage">
                        <Form.Label>Your Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Please describe your issue or question here..."
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSend}>
                    Send Message
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SupportModal;