import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {
    Image,
    Button,
    Modal
} from 'react-bootstrap'

class DetailBeli extends React.Component {
    // NOTE
    // setiap mau fetching data, pikirkan perlu dikirim ke redux atau nggak? karena kalo dikirim ke redux itu 
    // kalo mau dipake ke components lain
    // kalo blm ada perlu, gausah dikirim ke redux dulu

    constructor(props) {
        super(props)
        this.state = {
            dataProd: {},
            image: '',
            // u/ button di klik berubah warna
            // untuk nampung
            selectedSize: null,
            size: null,
            stok: '',
            total: 0,
            toLogin: false,
            cartErr: false,
            toCart: false
        }
    }

    componentDidMount() {
        // NOTE
        // supaya tiap di klik buy per item, pindah ke detail yg per item
        // dlm console.log di browserliat yg props, trs location, terus di search: ?id=5
        // console.log(this)
        // taruh console.log(this) nya di render
        Axios.get(`http://localhost:2000/products${this.props.location.search}`)
            .then((res) => {
                // res.data nya array karena ngambil pake query
                // console.log(res.data[0].images[1])
                this.setState({ dataProd: res.data[0], image: res.data[0].images[1] })
                // this.setState({ stok: res.data[0].stock[0]})
                // console.log(res.data[0].stock[0])
            })
            .catch((err) => console.log(err))
    }

    addCart = () => {
        const {total, size, dataProd} = this.state

        // console.log(this.props.username)
        if (!this.props.id) return this.setState({ toLogin: true })

        // check user input
        if (total === 0 || size === 0) return this.setState({ cartErr: true })

        let cartData= {
            name: dataProd.name,
            image: dataProd.images[1],
            category: dataProd.category,
            brand: dataProd.brand,
            colour: dataProd.colour,
            price: dataProd.price,
            stock: dataProd.stock,
            size: size,
            qty: total,
            totalPrice: total * dataProd.price
        }
        // console.log(cartData)
        let cartTemp= this.props.cart
        cartTemp.push(cartData)
        // console.log(cartTemp)

        Axios.patch(`http://localhost:2000/users/${this.props.id}`, {
            cart: cartTemp
        })
        .then((res => {
            console.log(res.data)
            this.setState({toCart: true})
        }))
        .catch((err) => console.log(err))
    }

    render() {
        // OBJECT DESTRUCTURING, KARENA BANYAK MAU DIPAKE
        console.log(this)
        const { dataProd, image, selectedSize, stok, total, toLogin, cartErr, toCart } = this.state
        // console.log(this.state.dataProd)
        // console.log(this.state.dataProd.images)
        // console.log(this.state.dataProd.images[1])

        // redirect ke login kalo belom login pas klik checkout
        if (toLogin) return <Redirect to='/login' />
        // console.log(this.props.id)

        if (toCart) return <Redirect to='/cart' />

        // NOTE
        // supaya tiap di klik buy per item, pindah ke detail yg per item
        // dlm console.log liat yg props, trs location, terus di search: ?id=5
        // console.log(this)
        return (
            <div style={styles.container}>
                {/* <h1 style={{ marginLeft: '60px' }}>DEETS!</h1> */}
                <div style={{ display: 'flex', height: '65vh', justifyContent:'space-evenly'}}>
                    <div style={styles.divimg}>
                        <Image src={image} style={{ width: '80%', height: '100%', borderRadius: '50px', marginTop:'150px'}} />
                    </div>
                    <div style={styles.divdesc}>
                        <h2>{dataProd.name}</h2>
                        <h6>Brand: {dataProd.brand}</h6>
                        <p>Category: {dataProd.category}</p>
                        <p>Color: {dataProd.colour}</p>
                        <p style={{ textAlign: 'align-right' }}>{dataProd.description}</p>
                        <h4>Price: IDR {dataProd.price ? dataProd.price.toLocaleString() : 0}</h4>
                        <div style={{ display: 'flex', flexDirection:'column', marginTop: '10px'}}>
                            <h5>Size </h5>
                            <div>
                                {/* dibikin ternary krn pertama kali jalan dataProd masih kosong */}
                                {/* button size kalo di klik nampilin stok dibawah */}
                                {(dataProd.stock || []).map((item, index) => {
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
                                            {item.code}
                                        </Button>
                                    )
                                })}
                                <h5>*Available Stock : {stok ? stok : '-'} Pair</h5>
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px'}}>
                                <h5>Quantity </h5>
                                <div style={{ marginBottom: '10px', marginRight: '20px', display: 'flex', justifyContent: 'space-between', height: '38px', width: '43.25' }}>
                                    <Button
                                        disabled={total >= stok ? true : false}
                                        variant='light'
                                        onClick={() => this.setState({ total: total + 1 })}>➕</Button>
                                    <h3 style={{ backgroundColor: 'white', height: '38px' }}>{total}</h3>
                                    <Button
                                        disabled={total <= 0 ? true : false}
                                        variant='light'
                                        onClick={() => this.setState({ total: total - 1 })}>➖</Button>
                                </div>
                                <div style={{ marginBottom: '10px', display:'flex'}}>
                                    <Button variant='success' onClick={this.addCart}>Check Out</Button>
                                </div>
                            </div>
                            <Modal show={cartErr} onHide={() => this.setState({cartErr: false})}>
                                <Modal.Header closeButton>
                                    <Modal.Title>⚡ WARNING ⚡</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    PLEASE PICK YOUR SIZE AND QUANTITY OF THE SHOES
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="primary" onClick={() => this.setState({cartErr: false})}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        marginTop: '70px',
        // padding: '10px 20px',
        // paddingTop: '80px',
        // background: 'url(https://images.unsplash.com/photo-1445498059992-f5a276e1218d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=751&q=80) no-repeat center',
        // backgroundSize: 'cover',
        backgroundColor: '#cfdbd5',
        height: '88vh'
    },
    divimg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexBasis: '40%',
        paddingBottom: '20px',
    },
    divdesc: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexBasis: '60%',
        color: '#424b54',
        paddingTop: '150px'
    },
    divbtn: {
        display: 'flex',
        flexDirection: 'column'
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.user.id,
        cart: state.user.cart
    }
}

// kalau mau pakai data, action nya gausah dibikin null
// kalo di kanan ada ation, dibikin null actionnya
export default connect(mapStateToProps)(DetailBeli)