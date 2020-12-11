import React from 'react'

class Error extends React.Component {
    render () {
        return (
            <div>
                <h1>ERROR</h1>
            </div>
        )
    }
}

const styles= {
    err: {
        background: 'url(https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=667&q=80) no-repeat center',
        backgroundSize: 'cover'
    }

}

export default Error