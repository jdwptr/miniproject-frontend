import React from 'react'
import Axios from 'axios'
import {
    InputGroup,
    FormControl,
    Button
} from 'react-bootstrap'

// import connect dr reactredux
import { connect } from 'react-redux'

// import action login dari folder action
import { login } from '../action/userAction'

// import redirect dr reactrouterdom
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: {},
            visibility: false,
            loginError: false
        }
    }

    btnLogin = () => {
        let username = this.refs.username.value
        let password = this.refs.password.value
        console.log(username, password)

        if (!username || !password) return alert('Please type your username and password below')

        Axios.get(`http://localhost:2000/users?username=${username}&password=${password}`)
            .then((res) => {
                console.log(res.data)
                if (res.data.length === 0) return alert('Username or Password is invalid')

                // this.setState({users: res.data[0]})
                this.props.login(res.data[0])

                // pakai localstorage
                // define localstorage.username terus dikasih isinya itu dia username dari user
                // pakai localstorage spy abis login, kesimpen di localstorage
                // karea redux itu kalo di refresh/reload, ilang datanya
                localStorage.username = username
            })
            .catch((err) => console.log('error', err))
    }

    render() {
        // ditaruh disini supaya gausah manggil manggil lagi dibawah
        // ini namanya object destructuring u/ local state
        const { visibility, loginError } = this.state

        // jd abis login, kalo username nya ada, ke redirect ke home dan UserName nya ganti
        if (this.props.username) return <Redirect to='/' />

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
                                ref="username"
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend style={{ cursor: 'pointer', width: '40px' }} onClick={() => this.setState({ visibility: !visibility })}>
                                <InputGroup.Text id="basic-addon1">
                                    <i className={visibility ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                ref="password"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                                type={visibility ? 'text' : 'password'}
                            />
                        </InputGroup>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant='dark' onClick={this.btnLogin}>HELLO SNEAKS</Button>
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
        height: '100vh',
        paddingTop: '80px',
        background: 'url(https://images.unsplash.com/photo-1496115898806-2b023a9dcb6b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=794&q=80) no-repeat center',
        backgroundSize: 'cover'
    },
    center: {
        marginTop: '100px',
        padding: '40px 30px',
        width: '350px',
        height: '50vh',
        borderRadius: '10px',
        backgroundColor: 'RGBA(176,176,176,0.4)'
    },
    h1: {
        // color: '#0b090a',
        color: '#d1be9c',
        fontSize: '30px',
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}

export default connect(mapStateToProps, { login })(Login)
// login yg dlm {} itu function login yg di action
// Login yg di dalam () itu nama class yang diatas