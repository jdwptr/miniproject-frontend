import React from 'react'
import {
    Navbar,
    Nav,
    Image,
    Dropdown
} from 'react-bootstrap'

// import logo
import { LOGO } from '../assets/index'

import { Link } from 'react-router-dom'

class Navigation extends React.Component {
    render() {
        return (
            <Navbar expand="lg" style={{height: '70px', backgroundColor: '#2f3e46'}}>
                <Navbar.Brand>
                    <Image src={LOGO.default} alt='logo' style={{height: '50px', marginRight: '20px'}}></Image>
                    <strong style={{color: '#cad2c5'}}>SNEAKS SHOES STORE</strong>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to='/' style={{color: '#cad2c5'}}>Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Dropdown style={{marginRight: '40px'}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">USERNAME
                        <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/Login">Login</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/Register">Register</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown.Toggle>
                    </Dropdown>
            </Navbar>
        )
    }
}

export default Navigation