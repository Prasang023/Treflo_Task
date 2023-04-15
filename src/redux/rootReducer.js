import error from "./slices/error"
import success from "./slices/success"
import menu from "./slices/menu"
import cart from "./slices/cart"

const rootReducer = {
  error,
  success,
  menu,
  cart
}

export default rootReducer
