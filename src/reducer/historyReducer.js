// disini reducer history gaperlu bikin initial state krn default history itu datanya array kosong jd lgsg ke export aja
// gaperlu bikin const INITIALSTATE
export const historyReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_HISTORY":
            return action.payload
        // pakai action.payload karena dia array, kalo object itu krn mau diambil sau satu jd dipisah satu satu
        default:
            return state
    }
}