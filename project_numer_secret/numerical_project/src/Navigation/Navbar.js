import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from "react"
function Navbar1() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Sample">Home</Nav.Link>
            <NavDropdown title="Root of Equation" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Graphical">Graphical</NavDropdown.Item>
              <NavDropdown.Item href="/Sample">Bisection</NavDropdown.Item>
              <NavDropdown.Item href="/Onepoint">Onepoint</NavDropdown.Item>
              <NavDropdown.Item href="/Falseposition">
                FalsePosition
              </NavDropdown.Item>
              <NavDropdown.Item href="/Newton">Newton</NavDropdown.Item>
              <NavDropdown.Item href="/Secant">Secant</NavDropdown.Item>


            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;