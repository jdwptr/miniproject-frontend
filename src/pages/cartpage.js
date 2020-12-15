import React from 'react'
import Axios from 'axios'
import { login } from "../action"
import { Redirect } from 'react-router-dom'

import {
    Table,
    Image,
    Button,
    Form,
    Modal
} from 'react-bootstrap'

import { connect } from 'react-redux'

class CartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: '',
            selectedSize: null,
            size: null,
            stok: '',
            selectIndex: null,
            newQty: 0,
            total: 0,
            reqPay: false,
            reqPass: false,
            passErr: false,
            payErr: false,
            emptyCart: false,
            toHistory: false,
            prodCart: [],
            prodCartStock: []
        }
    }

    componentDidMount() {
        // NOTE
        // supaya tiap di klik buy per item, pindah ke detail yg per item
        // dlm console.log liat yg props, trs location, terus di search: ?id=5
        // console.log(this)
        // taruh console.log(this) nya di render
        let nameItemCart= []
        this.props.cart.map ((item, index) => {
           nameItemCart.push(item.name)
        })
        console.log(nameItemCart)

        let prodCart= []
        nameItemCart.map ((item, index) => {
            Axios.get (`http://localhost:2000/products?name=${item}`)
                .then ((res) => {
                    prodCart.push(res.data[0])
                })
                .catch ((err) => console.log(err))
        })
        console.log(prodCart)

        this.setState({prodCart: prodCart})
       
        // Axios.get(`http://localhost:2000/products${this.props.location.search}`)
        //     .then((res) => {
        //         // res.data nya array karena ngambil pake query
        //         // console.log(res.data[0].images[1])
        //         this.setState({ dataProd: res.data[0], image: res.data[0].images[1]})
        //         // this.setState({ stok: res.data[0].stock[0]})
        //         // console.log(res.data[0].stock[0])
        //     })
        //     .catch((err) => console.log(err))
    }

    btnDelete = (index) => {
        // console.log(index)
        let tempCart = this.props.cart
        tempCart.splice(index, 1)
        console.log(tempCart)

        Axios.patch(`http://localhost:2000/users/${this.props.id}`, { cart: tempCart })
            .then((res) => {
                console.log(res.data)
                Axios.get(`http://localhost:2000/users/${this.props.id}`)
                    .then((res) => this.props.login(res.data))
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    btnDone = (index) => {
        // NOTE : mengganti data pesanan suatu produk berdasarkan index
        // console.log(index)

        // ambil dr cart
        // mengganti data cart untuk produk yg ingin diganti
        let tempProd = this.props.cart[index]
        console.log('1', tempProd)

        tempProd.qty = this.state.newQty
        tempProd.total = this.state.newQty * this.props.cart[index].price

        // NOTE : memasukkan object pesanan produk yg baru kedalam array cart
        // tempCart adalah tempat penampungan sementara data cart user yang lama
        // tempProd adalah tempat penyimpanan sementara data produk yg ingin diedit
        let tempCart = this.props.cart

        tempCart.splice(index, 1, tempProd)
        console.log('2', tempCart)

        // NOTE ; mengirim perubahan ke database json
        Axios.patch(`http://localhost:2000/users/${this.props.id}`, { cart: tempCart })
            .then((res) => {
                console.log(res.data)

                // update data di redux
                Axios.get(`http://localhost:2000/users/${this.props.id}`)
                    .then((res) => {
                        this.props.login(res.data)
                        this.setState({ selectIndex: null })
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    btnPlus = () => {
        this.setState({ newQty: this.state.newQty + 1 })
    }

    btnMinus = () => {
        if (this.state.newQty <= 0) return

        this.setState({ newQty: this.state.newQty - 1 })
    }

    changeQty = (e) => {
        this.setState({ newQty: e.target.value })
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
        const { prodCart, selectedSize, stok } = this.state
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
                                <td>
                                    {/* {item.size} */}
                                    <div>
                                        {/* dibikin ternary krn pertama kali jalan dataProd masih kosong */}
                                        {/* button size kalo di klik nampilin stok dibawah */}
                                        {(prodCart || []).map((item, index) => {
                                            return (
                                                <Button
                                                    key={index}
                                                    variant='dark'
                                                    onClick={() => this.setState({ size: item.code, selectedSize: index, stok: item.total })}
                                                    style={{
                                                        backgroundColor: selectedSize === index ? '#ffffff' : '#242423',
                                                        color: selectedSize === index ? '#000000' : '#ffffff'
                                                    }}
                                                >
                                                    {item.stock.code}
                                                </Button>
                                            )
                                        })}
                                        <p style={{fontSize: '15px'}}>*Available Stock : {stok ? stok : '-'} Pair</p>
                                    </div>
                                </td>
                                <td>IDR {item.price.toLocaleString()}</td>
                                <td style={{ display: 'flex' }}>
                                    {/*  <Button onClick={() => this.setState({newQty: this.state.newQty - 1})}>*/}
                                    {/* <Button onClick={() => this.btnMinus}> */}
                                    <Button
                                        onClick={this.btnMinus}>
                                        <i className="far fa-minus-square"></i>
                                    </Button>
                                    <Form.Control min={0} value={this.state.newQty} style={{ width: '50px' }} onChange={(e) => this.changeQty(e)} />
                                    <Button
                                        onClick={() => this.setState({ newQty: parseInt(this.state.newQty) + 1 })}>
                                        <i className="far fa-plus-square"></i>
                                    </Button>
                                </td>
                                <td>IDR {(this.state.newQty * item.price).toLocaleString()}</td>
                                <td>
                                    <Button style={styles.btn} onClick={() => this.btnDone(index)}>DONE</Button>
                                    <Button style={styles.btn1} onClick={() => this.setState({ selectIndex: null })}>CANCEL</Button>
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
                                    onClick={() => this.setState({ selectIndex: index, newQty: item.qty })}>
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

    btnCheckout = () => {
        // buat properti req payment
        if (this.props.cart.length === 0) return this.setState({ emptyCart: true })

        this.setState({reqPass: true})
    }

    totalHarga = () => {
        let counter = 0
        this.props.cart.map(item => counter += item.totalPrice)
        // console.log('1', counter)
        // this.setState({total: counter})
        return counter
    }

    confirmPay = () => {
        // tampung inputan dari user
        let uang= this.refs.payment.value
        console.log(uang)

        let total= this.totalHarga()

        if (uang <= total) return this.setState({payErr: true})

        if (this.props.cart.length === 0) return this.setState({emptyCart: true})
        // spy modalnya ketutup
        
        // siapkan data buat masukin ke history
        let history= {
            username: this.props.username,
            date: new Date().toLocaleString(),
            total: total,
            product: this.props.cart,
        }
        console.log(history)

        // NOTE CALLBACK HELL
        // tembak history disini
        Axios.post(`http://localhost:2000/history`, history)
        .then((res) => {
            console.log(res.data)
            
            // kosongkan cart setelah ini dan update database
            Axios.patch (`http://localhost:2000/users/${this.props.id}`, {cart: []})
            .then((res) => {
                console.log(res.data)
                
                // NOTE UPDATE REDUX, makanya login nya dipanggil lagi
                Axios.get (`http://localhost:2000/users/${this.props.id}`)
                .then((res) => {
                    console.log(res.data)
                    this.props.login(res.data)
                    this.setState({reqPay: false, toHistory: true})
                })
                .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))

    }

    confirmPass = () => {
        let pass= this.refs.pass.value
        console.log(pass)

        // this.setState({reqPass: false})

        if (pass !== this.props.password) return this.setState({passErr: true})
        
        this.setState({reqPay: true, reqPass: false})
    }

    render() {
        // console.log(this.state.size, this.state.stok, this.props.location.search)
        const {reqPay, reqPass, passErr, payErr, emptyCart, toHistory} = this.state
        // console.log(this.state.selectIndex)

        // REVIEW REDIRECT KE LOGIN KALO USER BELOM LOGIN
        if (!this.props.id) return <Redirect to="/login" />

        // REVIEW REDIRECT KE HISTORY KALO USER BERHASIL CHECKOUT
        if (toHistory) return <Redirect to="/history"/>

        return (
            <div style={styles.container}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1>CART</h1>
                    <Button
                        onClick={this.btnCheckout}
                        style={styles.btn1}>
                        Check Out
                    </Button>
                </div>
                <Table striped bordered hover variant="dark">
                    {this.renderThead()}
                    {this.renderTbody()}
                </Table>

                <h1 style={{textAlign:'right'}}>TOTAL: IDR {this.totalHarga().toLocaleString()}</h1>

                <Modal show={reqPass} onHide={() => this.setState({reqPass: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>PASSWORD CONFIRMATION</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Please enter your password here 🔻
                        <Form.Control ref='pass' type='password' placeholder="Enter Password Here"/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={() => this.setState({reqPass: false})}>
                            Close
                        </Button>
                        <Button variant="primary"
                            onClick={this.confirmPass}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>


                <Modal show={passErr} onHide={() => this.setState({passErr: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>ERROR WARNING</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        WRONG PASSWORD, ENTER AGAIN !
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={() => this.setState({passErr: false})}>
                                Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={payErr} onHide={() => this.setState({payErr: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>PAYMENT WARNING</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        PLEASE INPUT THE RIGHT AMOUNT FOR PAYMENT
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={() => this.setState({payErr: false})}>
                                Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={reqPay} onHide={() => this.setState({reqPay: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>PAYMENT</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Please input your payment amount here 🔻
                        <Form.Control ref='payment' type='number' placeholder="Enter Amount of Payment Here"/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={() => this.setState({reqPay: false})}>
                                Close
                        </Button>
                        <Button variant="primary"
                            onClick={this.confirmPay}>
                                Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={emptyCart} onHide={() => this.setState({emptyCart: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>EMPTY CART</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        🛒Make Sure The Items are in Your Cart 🛒
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={() => this.setState({emptyCart: false})}>
                                Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const styles = {
    container: {
        marginTop: '70px',
        padding: '0 10px',
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
        username: state.user.username,
        password: state.user.password
    }
}

export default connect(mapStateToProps, { login })(CartPage)