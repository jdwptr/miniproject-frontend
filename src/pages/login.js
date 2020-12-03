import React from 'react'
import {
    InputGroup,
    FormControl
} from 'react-bootstrap'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false
        }
    }
    render() {
        // ditaruh disini supaya gausah manggil manggil lagi dibawah
        // ini namanya object destructuring u/ local state
        const { visibility } = this.state

        return (
            <div style={styles.container}>
                <div style={styles.center}>
                    <div>
                        <h1 style={styles.h1}>SNEAKS LOGIN HERE</h1>
                    </div>
                    <div>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <i className="far fa-user"></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend style={{cursor: 'pointer', width:'40px'}} onClick={() => this.setState({ visibility: !visibility })}>
                                <InputGroup.Text id="basic-addon1">
                                    <i className={visibility ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                                type= {visibility ? 'text' : 'password'}
                            />
                        </InputGroup>
                    </div>
                </div>

            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '90vh',
        padding: '10px',
        background: 'url(https://images.unsplash.com/photo-1496115898806-2b023a9dcb6b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=794&q=80) no-repeat center',
        backgroundSize: 'cover'
    },
    center: {
        marginTop: '100px',
        padding: '10px 30px',
        width: '350px',
        height: '50vh',
        backgroundColor: 'RGBA(176,176,176,0.4)'
    },
    h1: {
        // color: '#0b090a',
        color: '#d1be9c',
        fontSize: '30px',
    }
}

// const mapStateToProps = (state) => {
//     return {
//         username: state.user.username
//     }
// }

export default Login
// login yg dlm {} itu function login yg di action
// Login yg di dalam () itu nama class yang diatas