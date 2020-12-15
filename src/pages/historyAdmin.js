import React from 'react'
import Axios from 'axios'
import { connect } from 'react-router-dom'

import {
    Table,
    Accordion,
    Image,
    Card
} from 'react-bootstrap'

class HistoryAdmin extends React.Component {
    constructor (props) {
        super (props)
        this.state= {
            data: []
        }
    }
    componentDidMount() {
        Axios.get(`http://localhost:2000/history`)
            .then((res) => {
                // NOTE
                console.log(res.data)

                // pake res.data aja krn mau ngirim seluruh isi array history, gaperlu pake index
                this.setState({data: res.data})
            })
            .catch((err) => console.log(err))
    }

    renderAccordion = () => {
        return (
            <Accordion>
                {this.state.data.map((item, index) => {
                    return (
                        <Card>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey={index + 1}>
                                USER: {item.username}, DATE: {item.date}, TOTAL PURCHASE: {item.total.toLocaleString()}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index + 1}>
                                <Table striped bordered hover variant='dark'>
                                    <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>Name</td>
                                            <td>Image</td>
                                            <td>Price</td>
                                            <td>Size</td>
                                            <td>Quantity</td>
                                            <td>Total</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.product.map((item2, index2) => {
                                            return (
                                            <tr>
                                                <td>{index2 + 1}</td>
                                                <td>{item2.name}</td>
                                                <td>
                                                    <Image style={styles.image} src={item2.image}/>
                                                </td>
                                                <td>IDR {item2.price.toLocaleString()}</td>
                                                <td>{item2.size}</td>
                                                <td>{item2.qty}</td>
                                                <td>IDR {item2.totalPrice.toLocaleString()}</td>
                                            </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Accordion.Collapse>
                        </Card>
                            )
                })}
            </Accordion>
                )
    }

    render() {
        return (
            <div style={styles.container}>
                <h1>ADMIN TRANSACTION HISTORY</h1>
                {this.renderAccordion()}
            </div>
        )
    }
}

const styles = {
    container: {
        marginTop: '70px',
        padding: '0px 20px',
        align: 'center'
    },
    image: {
        width: '100px',
        height: '100px'
    }
}

export default HistoryAdmin