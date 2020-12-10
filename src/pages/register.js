import React from 'react'
import Axios from 'axios'

import {
    InputGroup,
    FormControl,
    Button,
    Form,
    Modal
} from 'react-bootstrap'

import { Redirect } from 'react-router-dom'

const url = 'http://localhost:2000/users'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: {},
            visibility: false,
            visibility1: false,
            userValidErr: [false, ""],
            mailValidErr: [false, ""],
            passValidErr: [false, ""],
            regErr: [false, ""],
            doneRegis: false
        }
    }

    // NOTE
    // REGEX
    userValid = (event) => {
        console.log(event)

        // regex username
        let username = event.target.value
        console.log(username)

        let symbol = /[!@#$%^&*;?]/

        if (symbol.test(username) || username.length < 6) return this.setState({ userValidErr: [true, '*Do not Input Symbol and Minimum 6 Characters'] })

        this.setState({ userValidErr: [false, ""] })
    }

    // NOTE
    emailValid = (event) => {
        console.log(event)

        // regex email
        let email = event.target.value
        console.log(email)

        let regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!regex.test(email)) return this.setState({ mailValidErr: [true, '*Invalid Email or Type Email Correctly'] })

        this.setState({ mailValidErr: [false, ""] })
    }

    // NOTE
    passValid = (event) => {
        console.log(event)

        // regex pass
        let pass = event.target.value
        console.log(pass)

        let symbol = /[!@#$%^&*;?]/
        let number = /[0-9]/
        // let upper = /[A-Z]/

        // char min 6, ada simbol, ada angka
        // dinegasi krn harus ada simbol & angka
        if (!symbol.test(pass) || !number.test(pass) || pass.length < 6) return this.setState({ passValidErr: [true, '*Include Symbol and Number, minimum 6 characters'] })

        this.setState({ passValidErr: [false, ""] })
    }

    // NOTE
    btnRegis = () => {
        // object destructuring supaya tidak panggil this.state berkali kali
        const { userValidErr, mailValidErr, passValidErr } = this.state
        let username = this.refs.username.value
        let password = this.refs.password.value
        let email = this.refs.email.value
        let confpass = this.refs.confirmpass.value
        // console.log(username, password, email)

        if (!username || !email || !password || !confpass) return this.setState({ regErr: [true, 'Please Input All Forms'] })

        if (confpass !== password) return this.setState({ regErr: [true, 'Please confirm the password correctly!'] })

        if (userValidErr[0] || mailValidErr[0] || passValidErr[0]) return this.setState({ regErr: [true, 'Please check again'] })

        // console.log({
        // username: username,
        // password: password,
        // role: "user",
        // email: email
        // })

        Axios.get(`${url}?username=${username}`)
        .then((res) => {
            console.log(res.data[0])
            if (res.data.length !== 0) return this.setState({ regErr: [true, "An account already registered with this username"] })

            Axios.get(`${url}?email=${email}`)
                .then((res) => {
                    console.log(res.data[0])
                    if (res.data.length !== 0) return this.setState({ regErr: [true, "An Account already registered with this email"] })

                    Axios.post(`http://localhost:2000/users`, {
                        username: username,
                        password: password,
                        role: "user",
                        email: email,
                        cart: []
                        })
                        .then((res) => {
                            console.log(res.data[0])
                            console.log('berhasil')
                            this.setState({ regErr: [false, ""] })
                        })
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))

        this.refs.username.value = ""
        this.refs.password.value = ""
        this.refs.email.value = ""
        this.refs.confirmpass.value = ""
    }

    // NOTE
    render() {
        // ditaruh disini supaya gausah manggil manggil lagi dibawah
        // ini namanya object destructuring u/ local state
        // object destructuring supaya tidak panggil this.state berkali kali
        const { visibility, visibility1, userValidErr, mailValidErr, passValidErr, regErr, doneRegis } = this.state

        if (doneRegis) return <Redirect to='/login' />

        return (
            <div style={styles.container}>
                <div style={styles.center}>
                    <div>
                        <h1 style={styles.h1}>BECOME A SNEAKS !</h1>
                    </div>
                    <div>
                        <InputGroup>
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
                                onChange={(event) => this.userValid(event)}
                            />
                        </InputGroup>
                        <Form.Text className="mb-3" style={{ color: 'red', textAlign: 'left', fontSize: '10px' }}>
                            {userValidErr[1]}
                        </Form.Text>

                        <InputGroup>
                            <InputGroup.Prepend style={{ width: '40px' }}>
                                <InputGroup.Text id="basic-addon1">
                                    <i className="far fa-envelope"></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                ref="email"
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon1"
                                onChange={(event) => this.emailValid(event)}
                            />
                        </InputGroup>
                        <Form.Text className="mb-3" style={{ color: 'red', textAlign: 'left', fontSize: '10px' }}>
                            {mailValidErr[1]}
                        </Form.Text>

                        <InputGroup>
                            <InputGroup.Prepend style={{ cursor: 'pointer', width: '40px' }}
                                onClick={() => this.setState({ visibility: !visibility })}>
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
                                onChange={(event) => this.passValid(event)}
                            />
                        </InputGroup>
                        <Form.Text className="mb-3" style={{ color: 'red', textAlign: 'left', fontSize: '10px' }}>
                            {passValidErr[1]}
                        </Form.Text>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend style={{ cursor: 'pointer', width: '40px' }}
                                onClick={() => this.setState({ visibility1: !visibility1 })}>
                                <InputGroup.Text id="basic-addon1">
                                    <i className={visibility1 ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                ref="confirmpass"
                                placeholder="Confirm Password"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                                type={visibility1 ? 'text' : 'password'}
                            />
                        </InputGroup>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant='dark' onClick={this.btnRegis}>
                            BECOME A SNEAKS<i className="far fa-user" style={{ marginLeft: '10px' }}></i>
                        </Button>
                    </div>
                    <Modal show={regErr[0]} onHide={() => this.setState({ regErr: [false, ""] })}>
                        <Modal.Header closeButton>
                            <Modal.Title>WARNING !</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{regErr[1]}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ regErr: [false, ""] })}>
                                Okay
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

// NOTE
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
        padding: '20px 30px',
        width: '350px',
        height: '60vh',
        borderRadius: '10px',
        backgroundColor: 'RGBA(176,176,176,0.4)'
    },
    h1: {
        color: '#d1be9c',
        fontSize: '30px',
    }
}

export default Register