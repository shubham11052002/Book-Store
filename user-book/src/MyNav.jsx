import { Container, Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function MyNav() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showUserName, setShowUserName] = useState(false);
  const [userName, setUserName] = useState("");
  const [isBrandHovered, setIsBrandHovered] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setShowLoginButton(false);
      setShowUserName(true);
      const storedName = localStorage.getItem("name");
      setUserName(storedName);
    }
  }, []);

  function doLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/home");
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow fixed-top" style={{zIndex: 1030}}>
        <Container>
          <Navbar.Brand 
            as={Link} 
            to="/home" 
            className="d-flex align-items-center"
            onMouseEnter={() => setIsBrandHovered(true)}
            onMouseLeave={() => setIsBrandHovered(false)}
            style={{ transition: "0.3s" }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
              alt="Book Logo"
              height={40}
              width={40}
              className="d-inline-block align-top me-2"
              style={{ 
                filter: isBrandHovered ? "invert(1) brightness(1.2)" : "invert(0.8)",
                transition: "0.3s",
                transform: isBrandHovered ? "scale(1.1)" : "scale(1)"
              }}
            />
            <span className="fw-bold fs-4 text-white">BookVault</span>
          </Navbar.Brand>
          
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/home" className="fw-semibold mx-2 text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-semibold mx-2 text-white">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fw-semibold mx-2 text-white">
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/order" className="fw-semibold mx-2 text-white">
              My Orders
            </Nav.Link>
          </Nav>

          <Nav>
            {showLoginButton && (
              <Button
                variant="outline-light"
                className="px-4 fw-semibold"
                onClick={() => setShowModal(true)}
                onMouseEnter={() => setIsLoginHovered(true)}
                onMouseLeave={() => setIsLoginHovered(false)}
                style={{
                  transform: isLoginHovered ? "translateY(-2px)" : "translateY(0)",
                  boxShadow: isLoginHovered ? "0 4px 8px rgba(255,255,255,0.2)" : "none",
                  transition: "0.3s"
                }}
              >
                Login / SignUp
              </Button>
            )}

            {showUserName && (
              <div className="d-flex align-items-center">
                <span className="me-3 fw-semibold text-white">
                  Welcome, {userName}
                </span>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={doLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* Add this div to create space for the fixed navbar */}
      <div style={{ paddingTop: '80px' }}></div>

      {showModal && <Login />}
    </>
  );
}

export default MyNav;