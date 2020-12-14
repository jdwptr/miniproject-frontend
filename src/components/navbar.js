import React from 'react'
import {
    Navbar,
    Nav,
    Image,
    Dropdown
} from 'react-bootstrap'

// import logo
import { LOGO1 } from '../assets/index'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { logout } from '../action'

class Navigation extends React.Component {
    // buat kalo di klik logout, dia hilang & balik ke username
    btnLogout = () => {
        this.props.logout()
        localStorage.removeItem('username')
    }

    render() {
        return (
            <Navbar expand="lg" fixed='top' style={{height: '70px', backgroundColor: 'RGBA(176,176,176,0.4)'}}>
                <Navbar.Brand>
                    <Image src={LOGO1.default} alt='logo' style={{height: '50px', marginRight: '20px'}}></Image>
                    <strong style={{color: 'black'}}>SNEAKS SHOES STORE</strong>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to='/' style={{color: 'black'}}>Home</Nav.Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to='/cart' style={{color: 'black', marginRight: '120px', marginLeft: '0px'}}><i class="fas fa-shopping-cart"></i>Cart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Dropdown style={{marginLeft: '500px'}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.props.username ? this.props.username : 'Username'}
                            {/* Userame, jd kalo gagal login ga berubah jd nama kita, tetep Username di dropdownnya */}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {/* bikin supaya abis login kolom nya kd logout */}
                            {this.props.username
                            ?
                            <div>
                                <Dropdown.Item onClick={this.btnLogout}>Log out</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/history">History</Dropdown.Item>
                            </div>
                            :
                            <>
                            <Dropdown.Item as={Link} to="/Login">Login</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/Register">Register</Dropdown.Item>
                            </>
                            } 
                        </Dropdown.Menu>
                    </Dropdown>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}

export default connect (mapStateToProps, {logout}) (Navigation)