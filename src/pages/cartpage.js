import React from 'react'
import Axios from 'axios'
import {login} from "../action"
import { Redirect } from 'react-router-dom'

import {
    Table,
    Image,
    Button,
    Form
} from 'react-bootstrap'

import { connect } from 'react-redux'

class cartPage extends React.Component {
    constructor (props) {
        super (props)
        this.state= {
            selectIndex: null,
            newQty: 0,
            total: this.props.qty,
        }
    }

    btnDelete = (index) => {
        // console.log(index)
        let tempCart = this.props.cart
        tempCart.splice(index, 1)
        console.log(tempCart)
    
        Axios.patch (`http://localhost:2000/users/${this.props.id}`, {cart: tempCart})
        .then ((res) => {
            console.log(res.data)
            Axios.get (`http://localhost:2000/users/${this.props.id}`)
            .then ((res) => this.props.login(res.data))
            .catch ((err) => console.log(err))
        })
        .catch ((err) => console.log(err))
    }

    btnDone = (index) => {
        // NOTE : mengganti data pesanan suatu produk berdasarkan index
        // console.log(index)

        // ambil dr cart
        // mengganti data cart untuk produk yg ingin diganti
        let tempProd= this.props.cart[index]
        console.log('1', tempProd)

        tempProd.qty = this.state.newQty
        tempProd.total = this.state.newQty * this.props.cart[index].price
        
        // NOTE : memasukkan object pesanan produk yg baru kedalam array cart
        // tempCart adalah tempat penampungan sementara data cart user yang lama
        // tempProd adalah tempat penyimpanan sementara data produk yg ingin diedit
        let tempCart = this.props.cart
        
        tempCart.splice (index, 1, tempProd)
        console.log('2', tempCart)

        // NOTE ; mengirim perubahan ke database json
        Axios.patch (`http://localhost:2000/users/${this.props.id}`, {cart: tempCart})
        .then((res) => {
            console.log(res.data)

            // update data di redux
            Axios.get (`http://localhost:2000/users/${this.props.id}`)
            .then((res) =>{
                this.props.login(res.data)
                this.setState({selectIndex: null})
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    }

    btnPlus = () => {
        this.setState({newQty: this.state.newQty + 1})
    }

    btnMinus = () => {
        if (this.state.newQty <= 0) return

        this.setState({newQty: this.state.newQty - 1})
    }

    changeQty = (e) => {
        this.setState ({newQty: e.target.value})
    }

    renderThead = () => {
        return (
            <thead style={styles.thead}>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Shoes Name</th>
                    <th>Colour</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
        )
    }

    renderTbody = () => {
        return (
            <tbody style={styles.tbody}>
                {this.props.cart.map((item, index) => {
                    // if else buat tampilan kalo di edit
                    if (this.state.selectIndex === index) {
                        return (
                            <tr>
                            <td>{index + 1}</td>
                            <td><Image src={item.image} style={styles.image}></Image></td>
                            <td>{item.name}</td>
                            <td>{item.colour}</td>
                            <td>{item.size}</td>
                            <td>IDR {item.price.toLocaleString()}</td>
                            <td style={{display:'flex'}}>
                                {/*  <Button onClick={() => this.setState({newQty: this.state.newQty - 1})}>*/}
                                {/* <Button onClick={() => this.btnMinus}> */}
                                <Button onClick={this.btnMinus}>
                                    <i class="far fa-minus-square"></i>
                                </Button>
                                <Form.Control min={0} value={this.state.newQty} style={{width:'50px'}} onChange={(e) => this.changeQty(e)}/>
                                <Button onClick={() => this.setState({newQty: parseInt(this.state.newQty) + 1})}>
                                    <i class="far fa-plus-square"></i>
                                </Button>
                            </td>
                            <td>IDR {(this.state.newQty * item.price).toLocaleString()}</td>
                            <td>
                                <Button style={styles.btn} onClick={() => this.btnDone(index)}>DONE</Button>
                                <Button style={styles.btn1} onClick={() => this.setState({selectIndex: null})}>CANCEL</Button>
                            </td>
                        </tr>
                        )
                    }
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td><Image src={item.image} style={styles.image}></Image></td>
                            <td>{item.name}</td>
                            <td>{item.colour}</td>
                            <td>{item.size}</td>
                            <td>IDR {item.price.toLocaleString()}</td>
                            <td>{item.qty}</td>
                            <td>IDR {item.totalPrice.toLocaleString()}</td>
                            <td>
                                <Button 
                                    // disabled={total >= newQty ? true : false}
                                    style={styles.btn} 
                                    onClick={() => this.setState({selectIndex: index, newQty: item.qty})}>
                                        EDIT
                                </Button>
                                <Button 
                                    // disabled={total <= 0 ? true : false}
                                    style={styles.btn1} 
                                    onClick={() => this.btnDelete(index)}>
                                        DELETE
                                </Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    render() {
        const {total} = this.state
        // console.log(this.state.selectIndex)
        if (!this.props.id) return <Redirect to="/login"/>

        return (
            <div style={styles.container}>
                <Table striped bordered hover variant="dark">
                    {this.renderThead()}
                    {this.renderTbody()}
                    {/* <thead style={styles.thead}>
                        <tr>
                            <th>Image</th>
                            <th>Shoes Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Colour</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead> */}
                    {/* <tbody style={styles.tbody}>
                        {this.props.cart.map((item, index) => {
                            return (
                                <tr>
                                    <td></td>
                                    <td><Image src={item.image} style={styles.image}></Image></td>
                                    <td>{item.name}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.category}</td>
                                    <td>{item.colour}</td>
                                    <td>{item.size}</td>
                                    <td>{item.price}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.totalPrice}</td>
                                    <td>
                                        <Button style={styles.btn}>EDIT</Button>
                                        <Button style={styles.btn}>DELETE</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody> */}
                </Table>
            </div>
        )
    }
}

const styles = {
    container: {
        marginTop: '70px',
        padding: '0 10px'
    },
    image: {
        width: '100px',
        height: '100px'
    },
    btn: {
        fontSize: '10px',
        textAlign: 'center',
        marginRight: '10px'
    },
    btn1: {
        fontSize: '10px',
        textAlign: 'center'
    },
    tbody: {
        fontSize: '10px',
        textAlign: 'center'
    },
    thead: {
        fontSize: '15px',
        textAlign: 'center'
    },
}

const mapStateToProps = (state) => {
    return {
        cart: state.user.cart,
        id: state.user.id,
        username: state.user.username
    }
}

export default connect(mapStateToProps, {login})(cartPage)