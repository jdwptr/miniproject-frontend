import React from 'react'

// import components
import Navigation from './components/navbar'

import {Switch, Route} from 'react-router-dom'

// import connect
import { connect } from 'react-redux'

// import login dari actions
import { login } from './action/userAction'

// import halaman dari pages
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import DetailBeli from './pages/detailbeli'
import Axios from 'axios'

class App extends React.Component {
  // ini tempat u/ ngekeep login nya di localstorage jd kesimpen
  componentDidMount () {
    Axios.get(`http://localhost:2000/users?username=${localStorage.getItem('username')}`)
      .then((res) => {
        console.log(res.data[0])
        this.props.login(res.data[0])
      })
      .catch((err) => console.log(err))
  }
  render () {
    return (
      <div>
        <Navigation/>
          <Switch>
            <Route path= '/' component={Home} exact/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/detail' component={DetailBeli}/>
          </Switch>
      </div>
    )
  }
}

export default connect (null, {login}) (App)