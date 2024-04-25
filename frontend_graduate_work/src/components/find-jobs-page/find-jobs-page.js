import {Button, Card, Col, Container, Form, FormControl, InputGroup, ListGroup, Pagination, Row} from "react-bootstrap";
import "./find-jobs-page.css";
import {BiSearch} from "react-icons/bi";
import {useEffect, useState} from "react";
import {
    getAllFilteredProjectsForFreelancer,
    getAllProjectsForFreelancer,
    getAllProjectTypes,
    getSubprojectsTypes
} from "../../services/project-service";
import {useAuth} from "../../context/auth-context";
import {Link} from "react-router-dom";
import filterValidation from "../../util/validation/filter-validation";

const FindJobsPage = () => {
    const {token} = useAuth();
    const [projects, setProjects] = useState();
    const [projectTypes, setProjectTypes] = useState(null);
    const [subprojectTypes, setSubprojectTypes] = useState(null);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [validErrors, setValidErrors] = useState({});

    const [formData, setFormData] = useState({
        searchString: "",
        filterBy: "newest",
        projectType: "",
        subprojectType: "",
        minBudget: "",
        maxBudget: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const serverResponseAllProjectsForFreelancer = await getAllProjectsForFreelancer(token);
            const serverResponseAllProjectTypes = await getAllProjectTypes(token);

            setProjects(serverResponseAllProjectsForFreelancer);
            setProjectTypes(serverResponseAllProjectTypes);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (formData.projectType !== "" && formData.projectType !== "0") {
            const fetchData = async () => {
                const serverResponse = await getSubprojectsTypes(token, formData.projectType);
                setSubprojectTypes(serverResponse);
            };
            fetchData();
        } else {
            setFormData({...formData, "subprojectType": ""});
        }
    }, [formData.projectType]);

    const handleChange = async (e) => {
        e.preventDefault();
        if (e.target.name === "searchString") {
            setFormData({...formData, [e.target.name]: e.target.value});
        } else {
            setFormData({...formData, [e.target.name]: e.target.value.replace(/ /g, '')});
        }
    }

    const formatDeadlineDate = (date) => {
        const formattedDate = new Date(date);
        const day = formattedDate.getDate().toString().padStart(2, '0');
        const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = formattedDate.getFullYear();
        const hours = formattedDate.getHours().toString().padStart(2, '0');
        const minutes = formattedDate.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const formatCreatedAtDate = (date) => {
        const createdAt = new Date(date);
        const now = new Date();

        const diff = Math.floor((now - createdAt) / 1000);
        let result;

        switch (true) {
            case diff < 60:
                result = `${diff} seconds ago`;
                break;
            case diff < 3600:
                const minutes = Math.floor(diff / 60);
                result = `${minutes} minutes ago`;
                break;
            case diff < 86400:
                const hours = Math.floor(diff / 3600);
                result = `${hours} hours ago`;
                break;
            default:
                const days = Math.floor(diff / 86400);
                result = `${days} days ago`;
        }
        return result;
    }

    const toggleFrom = (e) => {
        e.preventDefault();
        if (window.innerWidth < 992) {
            setIsOpenForm(!isOpenForm);
        }
    }

    const handleSearchFilter = async (e) => {
        e.preventDefault();

        const newValidErrors = filterValidation(formData);
        setValidErrors(newValidErrors);

        if (Object.keys(newValidErrors).length === 0) {
            const serverResponse = await getAllFilteredProjectsForFreelancer(JSON.stringify(formData), token);
            console.log(serverResponse);
            setProjects(serverResponse);
        }
    }

    return (
        <Container>
            <Row>
                <Col xs={12} md={12} className="mt-4">
                    <InputGroup className="input-group-lg">
                        <FormControl
                            className="border rounded-pill shadow "
                            name="searchString"
                            type="search"
                            placeholder="Search by name"
                            onChange={handleChange}
                        />
                        <Button
                            onClick={handleSearchFilter}
                            variant="outline-secondary"
                            className="bg-white border rounded-pill shadow"
                            type="submit"
                        >
                            Search <BiSearch/>
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col xs={12} lg={3}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title onClick={toggleFrom} className="text-center mb-0 mb-lg-3 ">Search
                                filter</Card.Title>

                            <div className={`mt-2 ${isOpenForm ? '' : 'd-none'} d-lg-block`}>
                                <hr/>

                                <Form className="mt-2">
                                    <Form.Label><h6>Filter by:</h6></Form.Label>
                                    <Form.Select
                                        as="select"
                                        name="filterBy"
                                        className="rounded-0"
                                        onChange={handleChange}
                                    >
                                        <option value="newest">Newest first</option>
                                        <option value="oldest">Oldest first</option>
                                        <option value="higherBudget">Higher budget first</option>
                                        <option value="lowerBudget">Lower budget first</option>
                                        <option value="nearestDeadline">Nearest deadline first</option>
                                        <option value="farthestDeadline">Farthest deadline first</option>
                                    </Form.Select>

                                    <hr/>

                                    <Row>
                                        <h6>Budget</h6>
                                        <Col>
                                            <Form.Group className="rounded-0">
                                                <Form.Control
                                                    type="text"
                                                    name="minBudget"
                                                    className="rounded-0"
                                                    onChange={handleChange}
                                                    placeholder="min"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    name="maxBudget"
                                                    className="rounded-0"
                                                    onChange={handleChange}
                                                    placeholder="max"/>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <hr/>


                                    <Row>
                                        <Form.Group className="mb-4">
                                            <Form.Label><h6>Project Type</h6></Form.Label>
                                            <Form.Select
                                                as="select"
                                                name="projectType"
                                                className="rounded-0"
                                                onChange={handleChange}>
                                                <option value="0">Select a project</option>
                                                {projectTypes && projectTypes.map(projectType => (
                                                    <option key={projectType.id} value={projectType.id}>
                                                        {projectType.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label><h6>Subproject Type</h6></Form.Label>
                                            <Form.Select
                                                as="select"
                                                name="subprojectType"
                                                className="rounded-0"
                                                onChange={handleChange}
                                                disabled={formData.projectType === "" || formData.projectType === "0"}>
                                                <option value="0">Select a subproject</option>
                                                {subprojectTypes && subprojectTypes.map(subprojectType => (
                                                    <option key={subprojectType.id} value={subprojectType.id}>
                                                        {subprojectType.name}
                                                    </option>))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>

                                    <Button variant="primary"
                                            className="w-100 rounded-0"
                                            onClick={handleSearchFilter}
                                            type="submit">
                                        Apply Filters
                                    </Button>
                                </Form>

                            </div>
                        </Card.Body>
                    </Card>


                </Col>


                <Col xs={12} lg={9}>
                    <Card className="mt-3 ">
                        <Card.Body>
                            {projects && projects.map(project => (
                                <div key={project.id}>
                                    <Row>
                                        <Col sm={10}>
                                            <p className="title-wrapper">{project.title}
                                                <span> {formatCreatedAtDate(project.created_at)}</span>
                                            </p>
                                            <Col sm={12}>
                                                <p className="description-wrapper">{project.description}</p>
                                            </Col>
                                            <h6>Deadline: <span
                                                style={{fontWeight: "normal"}}>{formatDeadlineDate(project.deadline)}</span>
                                            </h6>
                                        </Col>

                                        <Col sm={2}>
                                            <h6>${project.budget}</h6>

                                            <Link to={`/project/details/${project.id}`}
                                                  className="btn btn-success text-center"
                                                  align="center">
                                                Details
                                            </Link>
                                        </Col>
                                    </Row>

                                    <hr/>
                                </div>
                            ))}

                            <nav aria-label="Page navigation example">
                                <Pagination className="justify-content-center">
                                    <Pagination.Prev disabled/>
                                    <Pagination.Item>1</Pagination.Item>
                                    <Pagination.Item>2</Pagination.Item>
                                    <Pagination.Item>3</Pagination.Item>
                                    <Pagination.Item>4</Pagination.Item>
                                    <Pagination.Item>5</Pagination.Item>
                                    <Pagination.Next/>
                                </Pagination>
                            </nav>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default FindJobsPage;