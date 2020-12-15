import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
    Table,
    Accordion,
    Image,
    Card
} from 'react-bootstrap'

// import action nya
// ACTION TARO DI CONNECT KALO MAU DIPAKE DI COMPONENT DIDMOUT
import { getHistory } from '../action'

class History extends React.Component {
    componentDidMount() {
        Axios.get(`http://localhost:2000/history?username=${this.props.username}`)
            .then((res) => {
                // NOTE
                // kalo dah dapet masukkin data ke redux, PAKAI CONNECT
                // ACION TARO DI CONNECT KALO MAU DIPAKE DI COMPNENT DIDMOUT
                console.log(res.data)

                // pake res.data aja krn mau ngirim seluruh isi array history, gaperlu pake index
                this.props.getHistory(res.data)
            })
            .catch((err) => console.log(err))
    }

    // renderThead = () => {
    //     return (
    //         <thead>
    //             <tr>
    //                 <td>#</td>
    //                 <td>USERNAME :</td>
    //                 <td>DATE :</td>
    //                 <td>TOTAL :</td>
    //             </tr>
    //         </thead>
    //     )
    // }

    renderAccordion = () => {
        return (
            <Accordion>
                {this.props.history.map((item, index) => {
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
        // console.log(this.props.history)

        if (!this.props.username) return <Redirect to='/login'/>

        return (
            <div style={styles.container}>
                <h1>TRANSACTION HISTORY</h1>
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

// map state to props itu untuk nge get data yg mau kita pakai dr redux
const mapStateToProps = (state) => {
    return {
        history: state.history,
        username: state.user.username
    }
}

// connect action di export default connect (null, {getHistory}) (History)
// null kalo misal gada data yg mau diambil dr redux
// kalo ada yg mau diambil, jadi (mapStateToProps, {getHistory}) (History)
export default connect(mapStateToProps, { getHistory })(History)
// bikin redux history di reducer & action