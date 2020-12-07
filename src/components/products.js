import React from 'react'
import Axios from 'axios'
import {
    Card,
    Button
} from 'react-bootstrap'

import {Link} from 'react-router-dom'

class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: []
        }
    }
    componentDidMount() {
        Axios.get(`http://localhost:2000/products`)
            .then((res) => {
                // console.log(res.data)
                this.setState({ product: res.data })
            })
            .catch((err) => console.log(err))
    }

    render() {
        // NOTE
        // console.log(this.state.product)
        return (
            <div style={{padding: '20px'}}>
                <h1>PRODUCTS</h1>
                <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                    {this.state.product.map((item, index) => {
                        return (
                            <Card style={{ width: '18rem', marginBottom: '20px'}} key={index}>
                                <Card.Img variant="top" src={item.images[1]} />
                                <Card.Body style={styles.body}>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text style={styles.text}>{item.description}</Card.Text>
                                    
                                    <div style={styles.button}>
                                        <Button variant="secondary">Wishlist</Button>
                                        {/* NOTE */}
                                        {/* buat ngambil kalo di klik buy now item 1, ngelink ke detail item 1 */}
                                        <Button variant="dark" as={Link} to={`/detail?id=${item.id}`}>Buy 🛒</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const styles= {
    body: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '350px'
    },
    text: {
        display:'flex',
        justifyContent:'start'
    },
    button: {
        display: 'flex',
        justifyContent: 'space-evenly'
    }
}

export default Products