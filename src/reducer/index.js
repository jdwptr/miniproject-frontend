// import combinereducers from redux
import { combineReducers } from 'redux'

// import user reducer
import { userReducer } from './userReducer'
import { historyReducer } from './historyReducer'

// combine semua reducer
const allReducers = combineReducers({
    user: userReducer,
    history: historyReducer
})

export default allReducers