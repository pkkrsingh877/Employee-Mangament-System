import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext'; // Adjust the path to your UserContext

const NavbarComponent = () => {
    const { user, logout } = useContext(UserContext); // Access user context

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Employee Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {user ? (
                        <>
                            <Nav.Link as={Link} onClick={logout}>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                        </>
                    )}
                    <Nav.Link as={Link} to="/employees/add">Add Employee</Nav.Link>
                    <Nav.Link as={Link} to="/employees">Employee List</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
