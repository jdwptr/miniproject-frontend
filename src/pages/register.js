import React from 'react'
import Axios from 'axios'

import {
    InputGroup,
    FormControl,
    Button
} from 'react-bootstrap'

import { Redirect } from 'react-router-dom'

const url = 'http://localhost:2000/'

class Register extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            users: {},
            visibility: false,
            doneReg: false
        }
    }

    btnRegis = () => {
        let username = this.refs.username.value
        let password = this.refs.password.value
        let email = this.refs.email.value
        console.log(username, password, email)

        if ( !username || !password || !email ) return alert('Please type your username, email and password')

        Axios.get(`${url}users`, {params: {username}})
        .then((res) => {
            if (res.data.length !== 0) return alert('Username already exist! Please choose another username')

            Axios.post(`${url}users`,{
                username,
                password,
                email
            })
            .then((res1) => {
                console.log(res1.data)
                this.setState({doneReg: true})
            })
            .catch((err1) => console.log(err1))
        })
        .catch((err) => console.log(err))
    }

    render () {
        // ditaruh disini supaya gausah manggil manggil lagi dibawah
        // ini namanya object destructuring u/ local state
        const {visibility} = this.state

        if (this.state.doneReg) return <Redirect to='/login'/>

        return (
            <div style={styles.container}>
                <div style={styles.center}>
                    <div>
                        <h1 style={styles.h1}>BECOME A SNEAKS !</h1>
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
                            <InputGroup.Prepend style={{width:'40px'}}>
                                <InputGroup.Text id="basic-addon1">
                                    <i className="far fa-envelope"></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                ref="email"
                                placeholder="Email"
                                aria-label="Email"
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
                                ref="password"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                                type= {visibility ? 'text' : 'password'}
                            />
                        </InputGroup>
                        <div style={{display: 'flex', justifyContent:'center'}}>
                            <Button variant='dark' onClick={this.btnRegis}>JOIN & BECOME A SNEAKS</Button>
                        </div>
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
        padding: '20px 30px',
        width: '350px',
        height: '50vh',
        borderRadius: '10px',
        backgroundColor: 'RGBA(176,176,176,0.4)'
    },
    h1: {
        color:'#d1be9c',
        fontSize:'30px',
    }
}

export default Register