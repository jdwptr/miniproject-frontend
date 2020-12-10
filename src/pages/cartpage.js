import React from 'react'
import {
    Table,
    Image
} from 'react-bootstrap'

import { connect } from 'react-redux'

class cartPage extends React.Component {
    render() {
        return (
            <div style={styles.container}>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
                            <th>Image</th>
                            <th>Shoes Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Colour</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cart.map((item, index) => {
                            return (
                                <tr>
                                    {/* <td>1</td> */}
                                    <td><Image src={item.image} style={styles.image}></Image></td>
                                    <td>{item.name}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.category}</td>
                                    <td>{item.colour}</td>
                                    <td>{item.size}</td>
                                    <td>{item.price}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.totalPrice}</td>
                                </tr>
                            )
                        })}
                        {/* <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr> */}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const styles = {
    container: {
        marginTop: '70px'
    },
    image: {
        width: '100px',
        height: '100px'
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.user.cart
    }
}

export default connect(mapStateToProps)(cartPage)