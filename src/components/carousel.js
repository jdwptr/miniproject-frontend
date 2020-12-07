import React from 'react'
import Axios from 'axios'
import {
    Carousel
} from 'react-bootstrap'


class Carousel1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            slider: []
        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:2000/slider`)
            .then((res) => {
                // console.log(res.data)
                this.setState({ slider: res.data })
            })
            .catch((err) => console.log(err))
    }



    render() {
        // console.log(this.state.slider)
        return (
            <div>
                <Carousel>
                    {this.state.slider.map((item, index) => {
                        return (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={item.image}
                                    alt='Slide'
                                    style={{height: '600px', width: '800px'}}
                                />
                                <Carousel.Caption>
                                    <h3>{item.title}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
        )
    }
}

export default Carousel1