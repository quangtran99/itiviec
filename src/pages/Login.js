import React, { useState } from 'react'
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import loginMiddleware from "../store/action/authAction"
import { Redirect } from "react-router-dom";

export default function Login() {
    let user = useSelector((state) => state.user);
    let error = useSelector((state) => state.error);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("")
    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault();
        let user = { email: email, password: password }
        dispatch(loginMiddleware(user))
        redirect()

    }
    function redirect() {
    if (user.isAuthenticated == true) {
        console.log("hehehe")
        {alert("Login succesfully")}
        return <Redirect to="/jobs/:id" />;
      }
    }


    return (
        <div className="App">
            <div className="navigation">
                <Container>
                    <img
                        className="logo-itviec"
                        alt="itviec"
                        src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png"
                    />
                </Container>
            </div>
            {error ? <Alert variant="danger">{error}</Alert> : <></>}
            <h1 className="login-title">Login Page</h1>
            <Form onSubmit={(e) => login(e)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address </Form.Label>
                    <Form.Control type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="danger" type="submit">
                    Submit
            </Button>
            </Form>
        </div>
    )
}
