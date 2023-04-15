import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    error: null,
    cartItems: [],
    itemNo: 0,
    totalAmt: 0
  },
  reducers: {
    addToCart: (state, action) => {
      var tmparr = state.cartItems
      var newPizza = action.payload
      state.itemNo = state.itemNo + 1
      state.totalAmt = state.totalAmt + parseInt(newPizza.price)
      for (var i = 0; i < tmparr.length; i++) {
        console.log("checking all")
        if (
          tmparr[i].id === newPizza.id &&
          tmparr[i].selectedSize === newPizza.selectedSize &&
          JSON.stringify(tmparr[i].selectedToppings) ===
            JSON.stringify(newPizza.selectedToppings)
        ) {
          console.log("Updating older")
          state.cartItems[i].quantity = state.cartItems[i].quantity + 1
          return
        }
      }
      console.log("adding New")
      state.cartItems.push({ ...action.payload, quantity: 1 })
    },
    removeFromCart: (state, action) => {
      var tmparr = state.cartItems
      state.itemNo = state.itemNo - 1
      for (var i = 0; i < tmparr.length; i++) {
        if (tmparr[i].id === action.payload) {
          if (tmparr[i].quantity > 1) {
            tmparr[i].quantity--
            state.totalAmt = state.totalAmt - parseInt(tmparr[i].price)
          } else {
            // tmparr = tmparr.filter((item, key, x=i) => key !== x)
            tmparr = []
            for (var j = 0; j < state.cartItems.length; j++) {
              if (j !== i) tmparr.push(state.cartItems[j])
            }
            state.totalAmt = state.totalAmt - parseInt(state.cartItems[i].price)
          }
          break
        }
      }
      state.cartItems = tmparr
    }
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
