import React from 'react'

// import comonents
import Carousel1 from '../components/carousel'
import Products from '../components/products'

class Home extends React.Component {
    render() {
        return (
            <div>
                <Carousel1/>
                <Products/>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
    },
    center: {
        marginTop: '100px',
        padding: '20px 30px',
        width: '350px',
        // height: '60vh',
        borderRadius: '10px',
        // backgroundColor: 'RGBA(176,176,176,0.4)'
    }
}

export default Home