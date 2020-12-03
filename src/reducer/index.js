// import combinereducers from redux
import { combineReducers } from 'redux'

// import user reducer
import userReducer from './userReducer'

// combine semua reducer
const allReducers = combineReducers ({
    user: userReducer
})

export default allReducers