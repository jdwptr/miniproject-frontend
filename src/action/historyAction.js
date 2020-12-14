// si history ini bawa data, jadi di params nya masukin data
// payload gunanya untuk bawa data
// makanya di userAction, yg logout, gapake params data soalnya logout kan ga pake data
export const getHistory = (data) => {
    return {
        type: "GET_HISTORY",
        payload: data
    }
}