import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { doLogin } from "../../api-book/controllers/UserController";
function Login() {
    let [show, setShow] = useState(true);
    let [login, setLogin] = useState(true);
    let [signup, setSignUp] = useState(false);
    let [title, setTitle] = useState("Login");
    let [user, setUser] = useState({
        firstName: "",
        lastName: "",
        mobileNo: "",
        email: "",
        password: ""
    });

    let [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    });

    function doLogin() {
        // alert("ok")
        axios({
            url: 'http://localhost:3001/user/login',
            method: "POST",
            data: loginUser
        }).then((res) => {
            if (res.data.success) {
                alert(res.data.message);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("name", res.data.data.firstName);
                window.location.reload();
            }
        }).catch((err) => {
            alert(err.response.data.message);
        })
    }

    function handleLoginChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setLoginUser((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    }

    let [confirmPassword, setConfirmPassword] = useState("");
    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setUser((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    }

    const handleClose = () => {
        setShow(false);
        window.location.reload();
    };
    function showSignUpModal() {
        setLogin(false);
        setSignUp(true);
        setTitle("Sign Up");
    }
    function addUser() {
        if (user.password !== confirmPassword) {
            // alert("Password & Confirm Password does not match");
            toast.error('Password & Confirm Password does not match')
        } else {
            axios({
                url: "http://localhost:3001/add/user",
                method: "post",
                data: user
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        // alert("Sign has been sucessfully, Pls Login");
                        toast.success('Sigin has been succesfully, please login now')
                        setLogin(true);
                        setSignUp(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert(err.response.data.message);
                    handleClose();
                });
        }
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {login && (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" name="email" onChange={handleLoginChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" onChange={handleLoginChange} />
                        </Form.Group>
                        <Button variant="dark" onClick={doLogin}>Login</Button>
                        <p>
                            Do you have account?
                            <span style={{ marginLeft: "10px" }} onClick={showSignUpModal}>
                                Sign up
                            </span>
                        </p>
                    </Form>
                )}
                {signup && (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                placeholder="Enter First Name"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                placeholder="Enter Last Name"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control
                                type="text"
                                name="mobileNo"
                                placeholder="Enter Mobile No"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Enter Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="dark" onClick={addUser}>
                        <ToastContainer position="top-right" autoClose={3000} />
                            Sign Up
                        </Button>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
}
export default Login;
