const INITIAL_STATE = {
    username: '',
    password: '',
    role: '',
    email: '',
    id: '',
    cart: []
}

// yg dimasukkan ke redux yg hanya akan dipakai saja.

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOG_IN' :
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password,
                role: action.payload.role,
                email: action.payload.email,
                id: action.payload.id,
                cart: action.payload.cart
            }

        case 'LOG_OUT' :
            return INITIAL_STATE
        default :
            return state
    }            
}
