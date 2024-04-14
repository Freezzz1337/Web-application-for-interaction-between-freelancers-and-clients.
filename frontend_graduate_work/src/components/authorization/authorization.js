import {Alert, Button, Container, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {authorizationValidation} from "../../util/validation";
import {authorization} from "../../services/auth-service";
import icon from "../../icon/icon.png";
import {useAuth} from "../../context/auth-context";


const Authorization = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const {login} = useAuth();
    const [error, setError] = useState(null);
    const [validErrors, setValidErrors] = useState({});
    const formRef = useRef(null);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newValidErrors = authorizationValidation(formData);
        setValidErrors(newValidErrors);

        if (Object.keys(newValidErrors).length === 0) {
            try {
                const serverResponse = await authorization(JSON.stringify(formData));
                if (serverResponse.token) {
                    login(serverResponse.token, serverResponse.expiresIn);
                    navigate("/profile");
                } else {
                    setError(serverResponse.description);
                }
            } catch (error) {
                console.log("Login failed:", error);
                setError("Unexpected error occurred.");
            } finally {
                formRef.current.reset();
            }
        }
    }

    return (
        <div>
            <Container className="text-center d-flex align-items-center justify-content-center vh-100">
                <Form ref={formRef} className="form-signin shadow-lg p-3 mb-5 bg-white rounded"
                      onSubmit={handleSubmit}>
                    <img
                        className="mb-4"
                        src={`${icon}`}
                        alt=""
                        width="72"
                        height="72"
                    />
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <Form.Group controlId="inputEmail">
                        <Form.Control
                            className={`form-control-lg rounded-0 ${validErrors.email ? 'is-invalid' : ''}`}
                            type="email" name="email"
                            placeholder="Email address"
                            onChange={handleChange}
                            required/>
                        {validErrors.email &&
                            <Form.Control.Feedback type="invalid">{validErrors.email}</Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group controlId="inputPassword">
                        <Form.Control
                            className={`form-control-lg rounded-0 ${validErrors.password ? 'is-invalid' : ''}`}
                            type="password" name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required/>
                        {validErrors.password &&
                            <Form.Control.Feedback type="invalid">{validErrors.password}</Form.Control.Feedback>}
                    </Form.Group>

                    {error &&
                        <div className="mt-3">
                            <Alert variant="danger">
                                {error}
                            </Alert>
                        </div>
                    }

                    <Button variant="info" type="submit" className="btn-lg w-100 rounded-0 mt-3">
                        Sign in
                    </Button>

                    <p className="mt-2">
                        Don't have an account? <span>Create a new account. </span>
                        <Link to="/registration" className="fw-bold">Create a new account.</Link>
                    </p>

                </Form>
            </Container>

        </div>
    )
}
export default Authorization;