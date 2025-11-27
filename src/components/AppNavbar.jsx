import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export default function AppNavbar() {
    return (
        <Navbar bg="light" sticky="top" className="shadow-sm mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    🌕 FLOW
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}