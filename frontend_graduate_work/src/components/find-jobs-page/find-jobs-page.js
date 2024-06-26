import {Button, Card, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
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
import FindJobPagePagination from "./find-job-page-pagination/find-job-page-pagination";
import formatCreatedAtDate from "../../util/format-created-at-date";
import Spinner from "../spinner";
import {useTranslation} from "react-i18next";

const FindJobsPage = () => {
    const {t} = useTranslation();
    const {token} = useAuth();
    const [projects, setProjects] = useState();
    const [projectTypes, setProjectTypes] = useState(null);
    const [subprojectTypes, setSubprojectTypes] = useState(null);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [validErrors, setValidErrors] = useState({});

    const [paginationValue, setPaginationValue] = useState({
        numberOfProjects: 0,
        numberOfPages: 0,
        currentPage: 1
    });

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

            setProjects(serverResponseAllProjectsForFreelancer.listOfProjects);
            setPaginationValue({
                ...paginationValue,
                numberOfProjects: serverResponseAllProjectsForFreelancer.numberOfProjects,
                numberOfPages: Math.ceil(serverResponseAllProjectsForFreelancer.numberOfProjects / 5)
            });

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
            setProjects(serverResponse.listOfProjects);
            setPaginationValue({
                ...paginationValue,
                numberOfProjects: serverResponse.numberOfProjects,
                numberOfPages: Math.ceil(serverResponse.numberOfProjects / 3)
            });
        }
    }

    if (!projects) {
        return (
            <div style={{height: "100%"}} className="d-flex justify-content-center align-items-center">
                <Spinner size="10rem"/>
            </div>
        );
    }

    return (
        <div>
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
                                {t("buttons.search")} <BiSearch/>
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
                                        <Form.Label><h6>{t("findJobs.form.title")}:</h6></Form.Label>
                                        <Form.Select
                                            as="select"
                                            name="filterBy"
                                            className="rounded-0"
                                            onChange={handleChange}
                                        >
                                            <option value="newest">{t("findJobs.form.select.newest")}</option>
                                            <option value="oldest">{t("findJobs.form.select.oldest")}</option>
                                            <option
                                                value="higherBudget">{t("findJobs.form.select.higherBudget")}</option>
                                            <option value="lowerBudget">{t("findJobs.form.select.lowerBudget")}</option>
                                            <option
                                                value="nearestDeadline">{t("findJobs.form.select.nearestDeadline")}</option>
                                            <option
                                                value="farthestDeadline">{t("findJobs.form.select.farthestDeadline")}</option>
                                        </Form.Select>

                                        <hr/>

                                        <Row>
                                            <h6>{t("findJobs.form.budget")}</h6>
                                            <Col>
                                                <Form.Group className="rounded-0">
                                                    <Form.Control
                                                        type="text"
                                                        name="minBudget"
                                                        className={`${validErrors.minBudget ? 'is-invalid' : ''} rounded-0`}
                                                        onChange={handleChange}
                                                        placeholder="min"
                                                    />
                                                    {validErrors.minBudget &&
                                                        <Form.Control.Feedback
                                                            type="invalid">{validErrors.minBudget}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Control
                                                        type="text"
                                                        name="maxBudget"
                                                        className={`${validErrors.maxBudget ? 'is-invalid' : ''} rounded-0`}
                                                        onChange={handleChange}
                                                        placeholder="max"/>
                                                    {validErrors.maxBudget &&
                                                        <Form.Control.Feedback
                                                            type="invalid">{validErrors.maxBudget}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <hr/>


                                        <Row>
                                            <Form.Group className="mb-4">
                                                <Form.Label><h6>{t("findJobs.form.projectType")}</h6></Form.Label>
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
                                                <Form.Label><h6>{t("findJobs.form.subprojectType")}</h6></Form.Label>
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
                                            {t("buttons.applyFilters")}
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
                                                    {t("buttons.details")}
                                                </Link>
                                            </Col>
                                        </Row>

                                        <hr/>
                                    </div>
                                ))}

                                <FindJobPagePagination paginationValue={paginationValue}
                                                       setPaginationValue={setPaginationValue}
                                                       setProjects={setProjects}
                                                       token={token}
                                                       formData={formData}/>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default FindJobsPage;