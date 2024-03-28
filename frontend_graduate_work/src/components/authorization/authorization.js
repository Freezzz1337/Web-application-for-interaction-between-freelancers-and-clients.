import {Alert, Button, Container, Form} from "react-bootstrap";
// import {Link, useNavigate} from "react-router-dom";
// import bgPicture from "../../img/bg.jpg";
// import icon from "../../img/icon.png"


const Authorization = () => {
    return (
        <div>
            <Container className="text-center d-flex align-items-center justify-content-center vh-100">
                <Form className="form-signin shadow-lg p-3 mb-5 bg-white rounded">
                    {/*<img*/}
                    {/*    className="mb-4"*/}
                    {/*    // src={`${icon}`}*/}
                    {/*    alt=""*/}
                    {/*    width="72"*/}
                    {/*    height="72"*/}
                    {/*/>*/}
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <Form.Group controlId="inputEmail">
                        <Form.Control
                            // className={`form-control-lg rounded-0 ${validErrors.email ? 'is-invalid' : ''}`}
                            type="email" name="email"
                            placeholder="Email address" required/>
                        {/*{validErrors.email &&*/}
                        {/*    <Form.Control.Feedback type="invalid">{validErrors.email}</Form.Control.Feedback>}*/}
                    </Form.Group>

                    <Form.Group controlId="inputPassword">
                        <Form.Control
                            // className={`form-control-lg rounded-0 ${validErrors.password ? 'is-invalid' : ''}`}
                            type="password" name="password"
                            placeholder="Password" required/>
                        {/*{validErrors.password &&*/}
                        {/*    <Form.Control.Feedback type="invalid">{validErrors.password}</Form.Control.Feedback>}*/}
                    </Form.Group>

                    {/*{error &&*/}
                    {/*    <div className="mt-3">*/}
                    {/*        <Alert variant="danger">*/}
                    {/*            {error}*/}
                    {/*        </Alert>*/}
                    {/*    </div>*/}
                    {/*}*/}

                    <Button variant="info" type="submit" className="btn-lg w-100 rounded-0 mt-3">
                        Sign in
                    </Button>

                    <p className="mt-2">
                        Don't have an account? <span>Create a new account.</span>
                        {/*<Link to="/registration" className="fw-bold">Create a new account.</Link>*/}
                    </p>

                </Form>
            </Container>

        </div>
    )
}
export default Authorization;