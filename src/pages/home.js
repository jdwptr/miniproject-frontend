import Axios from 'axios'
import React from 'react'
import {
    Carousel
} from 'react-bootstrap'

const url = 'http://localhost:2000/slider'

class Home extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            slider: {}
        }
    }

    componentDidMount () {
        Axios.get(`${url}`)
        .then ((res) => {
            this.setState({slider: res.data})
        })
        .catch((err) => console.log(err))
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.center}>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="holder.js/800x400?text=First slide&bg=373940"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="holder.js/800x400?text=Second slide&bg=282c34"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="holder.js/800x400?text=Third slide&bg=20232a"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
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
        // height: '60vh',
        borderRadius: '10px',
        // backgroundColor: 'RGBA(176,176,176,0.4)'
    }
}

export default Home