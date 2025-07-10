import { Container, Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function MyNav() {
  const navigate = useNavigate();
  let [showModal, setShowModal] = useState(false);
  let [showLoginButton, setShowLoginButton] = useState(true);
  let [showUserName, setShowUserName] = useState(false);
  let [userName, setUserName] = useState("");
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setShowLoginButton(false);
      setShowUserName(true);
      let userName = localStorage.getItem("name");
      setUserName(userName);
    }
  }, []);
  function doLogout() {
    localStorage.setItem("token", "");
    localStorage.setItem("name", "");
    navigate("/home");
    window.location.reload();
  }
  return (
    <Container fluid >
      <Navbar bg="success" data-bs-theme="dark" >
        <Navbar.Brand> <img src="https://th.bing.com/th?id=OIP.6vla_hTUBjnoxwgT9chFQwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="" height={90} width={90} style={{mixBlendMode:"color-burn"}}/></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/home" style={{color:"black",fontWeight:"bolder"}}>Home</Nav.Link>
          <Nav.Link href="/about" style={{color:"black",fontWeight:"bolder"}}>About</Nav.Link>
          <Nav.Link href="/contact" style={{color:"black",fontWeight:"bolder"}}>Contact</Nav.Link>
          <Nav.Link href="/order" style={{color:"black",fontWeight:"bolder"}}>my Order</Nav.Link>
        </Nav>
        <Navbar.Text>
          {showLoginButton && (
            <Button
              variant="primary"
              style={{ marginRight: "150px",color:"black" }}
              onClick={() => setShowModal(true)}

            >
              Login / SignUp
            </Button>
          )}
          {showUserName && (
            <p
              style={{ marginRight: "30px", color: "white", fontSize: "20px" ,fontWeight:'bolder'}}
            >
              {"Welcome " + userName}
              <span onClick={doLogout} style={{ marginLeft: "10px" }}>
                {" "}
                Log out{" "}
              </span>
            </p>
          )}
        </Navbar.Text>
      </Navbar>
      {showModal && <Login></Login>}
    </Container>
  );
}
export default MyNav;
