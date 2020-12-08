import React from 'react'
import Axios from 'axios'
import {
    Image,
    Button,
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
            total: 0,
            stok: 0
        }
    }

    componentDidMount() {
        // NOTE
        // supaya tiap di klik buy per item, pindah ke detail yg per item
        // dlm console.log liat yg props, trs location, terus di search: ?id=5
        // console.log(this)
        // taruh console.log(this) nya di render
        Axios.get(`http://localhost:2000/products${this.props.location.search}`)
            .then((res) => {
                // res.data nya array karena ngambil pake query
                console.log(res.data[0].images[1])
                this.setState({ dataProd: res.data[0], image: res.data[0].images[1] })
                this.setState({ stok: res.data[0].stock[0]})
                console.log(res.data[0].stock[0])
            })
            .catch((err) => console.log(err))
    }

    tambah = () => {
        console.log('tambah di klik')
    }

    kurang = () => {
        console.log('kurang di klik')
    }

    belanja = () => {
        console.log('belanja di klik')
    }

    sizeSepatu = () => {
        console.log('size nya sepatu')
    }

    render() {
        // OBJECT DESTRUCTURING, KARENA BANYAK MAU DIPAKE
        const { dataProd, image, ukuran, stok } = this.state
        // console.log(this.state.dataProd)
        // console.log(this.state.dataProd.images)
        // console.log(this.state.dataProd.images[1])

        // NOTE
        // supaya tiap di klik buy per item, pindah ke detail yg per item
        // dlm console.log liat yg props, trs location, terus di search: ?id=5
        // console.log(this)
        return (
            <div style={styles.container}>
                <h1>DEETS!</h1>
                <div style={{ display: 'flex', height: '65vh' }}>
                    <div style={styles.divimg}>
                        <Image src={image} rounded style={{ width: '80%', height: '100%' }} />
                    </div>
                    <div style={styles.divdesc}>
                        <h2>Call me, {dataProd.name}</h2>
                        <h5>Category: {dataProd.category}</h5>
                        <h5>Brand: {dataProd.brand}</h5>
                        <h5>Color: {dataProd.colour}</h5>
                        <h6 style={{textAlign:'align-right'}}>{dataProd.description}</h6>
                        <h5>Price: IDR {dataProd.price}</h5>
                            <div style={{display: 'flex'}}>
                                <div style={{marginBottom: '10px', marginRight: '20px'}}>
                                        {/* {this.state.stok.map((item, index) => {
                                            return (
                                                <Button variant='dark' onClick={this.sizeSepatu}>{item.code}</Button>
                                            )
                                        })}
                                        <Button variant='dark' onClick={this.sizeSepatu}>38</Button>
                                        <Button variant='dark'>39</Button>
                                        <Button variant='dark'>40</Button>
                                        <Button variant='dark'>41</Button>
                                        <Button variant='dark'>42</Button> */}
                                    <h6>{stok? `${stok}` : ''}</h6>
                                </div>
                                <div style={{marginBottom: '10px', marginRight: '20px'}}>
                                    <Button variant='dark' onClick={this.tambah}>➕</Button>
                                    <Button variant='dark' onClick={this.kurang}>➖</Button>
                                </div>
                                <div style={{marginBottom: '10px'}}>
                                    <Button variant='success' onClick={this.belanja}>Check Out</Button>
                                </div>
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
        backgroundColor: 'RGBA(74,78,105,0.62)',
        height: '87vh'
    },
    divimg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexBasis: '40%',
        paddingBottom: '20px'
    },
    divdesc: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexBasis: '60%',
        color: 'black'
        // backgroundColor:'grey'
    },
    divbtn: {
        display: 'flex',
        flexDirection: 'column'
    }
}

export default DetailBeli