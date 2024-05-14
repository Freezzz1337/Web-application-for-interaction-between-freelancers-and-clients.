import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getProjectForCollaborationInvitation} from "../../services/project-service";
import {useAuth} from "../../context/auth-context";
import {convertToDateTimeLocal} from "../../util/convert-to-date-time-local";
import {createCollaborationInvitation} from "../../services/collaboration-invitation-service";

const CollaborationInvitation = ({showModal, toggleModal, userId, projectId}) => {
    const {token} = useAuth();
    const [projectName, setProjectName] = useState(null);
    const [formData, setFormData] = useState({
        newBudget: '',
        newDeadline: '',
        projectId: projectId,
        freelancerId: userId
    });

    useEffect(() => {
        const fetchProject = async () => {
            const serverResponse = await getProjectForCollaborationInvitation(projectId, token);
            setProjectName(serverResponse.title);

            setFormData({
                ...formData,
                newBudget: serverResponse.budget,
                newDeadline: serverResponse.deadline
            });
        };
        fetchProject();
    }, [projectId, token]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await createCollaborationInvitation(JSON.stringify(formData), token);
        if (serverResponse) {
            toggleModal();
        }
    };

    if (!formData.newBudget && !projectName) {
        return <div><h2>Wait a moment!</h2></div>
    }

    return (
        <Modal show={showModal} onHide={toggleModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Collaboration Agreement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 className="text-center mb-1">{projectName}</h6>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="newBudget">
                        <Form.Label className="mb-0 mt-3">Budget</Form.Label>
                        <Form.Control type="text" name="newBudget" value={formData.newBudget} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="newDeadline">
                        <Form.Label className="mb-0 mt-3">Deadline</Form.Label>
                        <Form.Control type="datetime-local" name="newDeadline"
                                      value={convertToDateTimeLocal(formData.newDeadline)} onChange={handleChange}/>
                    </Form.Group>
                    <Button variant="success" type="submit" className="btn-lg w-100 rounded-0 mt-3">Confirm</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CollaborationInvitation;