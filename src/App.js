import React from 'react'
import Axios from 'axios'

// import components
import Navigation from './components/navbar'

import {Switch, Route} from 'react-router-dom'

// import connect
import { connect } from 'react-redux'

// import login dari actions
import { login } from './action'
import { getHistory } from './action'

// import halaman dari pages
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import DetailBeli from './pages/detailbeli'
import cartPage from './pages/cartpage'
import History from './pages/history'
import Error from './pages/error'
import HistoryAdmin from './pages/historyAdmin'

class App extends React.Component {
  // ini tempat u/ ngekeep login nya di localstorage jd kesimpen
  componentDidMount () {
    Axios.get(`http://localhost:2000/users?username=${localStorage.getItem('username')}`)
      .then((res) => {
        console.log(res.data[0])
        this.props.login(res.data[0])

        Axios.get(`http://localhost:2000/history?username=${this.props.username}`)
        .then((res) => {
          console.log(res.data)
          this.props.getHistory(res.data)
        })
        .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }

  render () {
    // console.log(this.props.role)
    if (this.props.role === 'admin') {
      return (
        <div>
          <Navigation/>
          <Switch>
            <Route path= '/' component={Home} exact/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/detail' component={DetailBeli}/>
            <Route path='/history_adm' component={HistoryAdmin}/>
            <Route path='*' component={Error}/>
          </Switch>
        </div>
      )
    }
    
    return (
      <div>
        <Navigation/>
          <Switch>
            <Route path= '/' component={Home} exact/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/detail' component={DetailBeli}/>
            <Route path='/cart' component={cartPage}/>
            <Route path='/history' component={History}/>
            <Route path='*' component={Error}/>
          </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    role: state.user.role
  }
}

export default connect (mapStateToProps, {login, getHistory}) (App)