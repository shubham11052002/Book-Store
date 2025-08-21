import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    let [show, setShow] = useState(true);
    let [login, setLogin] = useState(true);
    let [signup, setSignUp] = useState(false);
    let [title, setTitle] = useState("Login to BookVault");
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
        axios({
            url: 'http://localhost:3001/user/login',
            method: "POST",
            data: loginUser
        }).then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("name", res.data.data.firstName);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        }).catch((err) => {
            toast.error(err.response?.data?.message || "Login failed");
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
        setTitle("Create Account");
    }

    function showLoginModal() {
        setLogin(true);
        setSignUp(false);
        setTitle("Login to BookVault");
    }

    function addUser() {
        if (user.password !== confirmPassword) {
            toast.error('Password & Confirm Password does not match');
        } else {
            axios({
                url: "http://localhost:3001/add/user",
                method: "post",
                data: user
            })
                .then((res) => {
                    if (res.data.success) {
                        toast.success('Account created successfully! Please login now');
                        setLogin(true);
                        setSignUp(false);
                        setTitle("Login to BookVault");
                    }
                })
                .catch((err) => {
                    toast.error(err.response?.data?.message || "Signup failed");
                });
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered style={{ fontFamily: 'Arial, sans-serif' }}>
                <Modal.Header closeButton style={{ border: 'none', padding: '1.5rem 1.5rem 0.5rem' }}>
                    <Modal.Title style={{ fontWeight: 'bold', fontSize: '1.5rem', width: '100%', textAlign: 'center' }}>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body style={{ padding: '1rem 1.5rem 1.5rem' }}>
                    {login && (
                        <div>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Email address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        name="email" 
                                        onChange={handleLoginChange}
                                        style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #e9ecef' }}
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-4">
                                    <Form.Label style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Enter your password" 
                                        name="password" 
                                        onChange={handleLoginChange}
                                        style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #e9ecef' }}
                                    />
                                </Form.Group>
                                
                                <Button 
                                    variant="primary" 
                                    onClick={doLogin}
                                    style={{ 
                                        width: '100%', 
                                        padding: '0.75rem', 
                                        fontWeight: '600', 
                                        marginBottom: '1rem',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)'
                                    }}
                                >
                                    Login
                                </Button>
                                
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ color: '#6c757d', margin: 0 }}>
                                        Don't have an account?{" "}
                                        <span 
                                            style={{ color: '#007bff', fontWeight: '600', cursor: 'pointer' }}
                                            onClick={showSignUpModal}
                                        >
                                            Sign up
                                        </span>
                                    </p>
                                </div>
                            </Form>
                        </div>
                    )}
                    
                    {signup && (
                        <div>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ fontWeight: '600', marginBottom: '0.5rem' }}>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                placeholder="First name"
                                                onChange={handleChange}
                                                style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #e9ecef' }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                placeholder="Last name"
                                                onChange={handleChange}
                                                style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #e9ecef' }}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Mobile No</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="mobileNo"
                                        placeholder="Mobile number"
                                        onChange={handleChange}
                                        style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #e9ecef' }}
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        onChange={handleChange}
                                        style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #e9ecef' }}
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Create password"
                                        onChange={handleChange}
                                        style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #e9ecef' }}
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-4">
                                    <Form.Label style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #e9ecef' }}
                                    />
                                </Form.Group>
                                
                                <Button 
                                    variant="primary" 
                                    onClick={addUser}
                                    style={{ 
                                        width: '100%', 
                                        padding: '0.75rem', 
                                        fontWeight: '600', 
                                        marginBottom: '1rem',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                                    }}
                                >
                                    Create Account
                                </Button>
                                
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ color: '#6c757d', margin: 0 }}>
                                        Already have an account?{" "}
                                        <span 
                                            style={{ color: '#007bff', fontWeight: '600', cursor: 'pointer' }}
                                            onClick={showLoginModal}
                                        >
                                            Login
                                        </span>
                                    </p>
                                </div>
                            </Form>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
            
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ marginTop: '60px' }}
            />
        </>
    );
}

export default Login;