import React from 'react'
import Axios from 'axios'
import {
    Image
} from 'react-bootstrap'

class DetailBeli extends React.Component {
    // NOTE
    // setiap mau fetching data, pikirkan perlu dikirim ke redux atau nggak? karena kalo dikirim ke redux itu 
    // kalo mau dipake ke components lain
    // kalo blm ada perlu, gausah dikirim ke redux dulu

    constructor (props) {
        super (props)
        this.state= {
            dataProd: {}
        }
    }

    componentDidMount () {
        Axios.get (`http://localhost:2000/products${this.props.location.search}`)
        .then((res) => {
            // res.data nya array karena ngambil pake query
            console.log(res.data[0].image[1])
            this.setState({dataProd: res.data[0]})
        })
        .catch((err) => console.log(err))
    }

    render () {
        // OBJECT DESTRUCTURING, KARENA BANYAK MAU DIPAKE
        const {dataProd} = this.state
        console.log(this.state.dataProd)
        console.log(this.state.dataProd.images)

        // NOTE
        // supaya tiap di klik buy per item, pindah ke detail yg per item
        // dlm console.log liat yg props, trs location, terus di search: ?id=5
        // console.log(this)
        return (
            <div style={{marginTop: '70px', padding: '10px 20px', backgroundColor: 'salmon'}}>
                <h1>DETAILS</h1>
                <div style={{display: 'flex', backgroundColor: 'lightblue', height: '50vh'}}>
                    <div style={{display: 'flex', flexBasis: '40%', backgroundColor:'lightpink'}}>
                        {/* <Image src={dataProd.images} rounded /> */}
                    </div>
                    <div style={{display: 'flex', flexBasis: '60%', backgroundColor:'grey'}}>2</div>
                </div>
            </div>
        )
    }
}

export default DetailBeli