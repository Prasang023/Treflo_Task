import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { setError } from "./error"

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    error: null,
    cartItems: [
      {
        id: 1,
        name: "Margherita",
        description: "A classic delight with 100% Real mozzarella cheese",
        isVeg: true,
        rating: 3.5,
        price: 239,
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/6/6f/Pizza_on_stone.jpg",
        size: [
          {
            isRadio: true,
            title: "choose size",
            items: [
              {
                size: "Regular"
              },
              {
                size: "Medium"
              },
              {
                size: "Large"
              }
            ]
          }
        ],
        toppings: [
          {
            isRadio: false,
            title: "choose topping(s)",
            items: [
              {
                name: "Red Pepper"
              },
              {
                name: "Onion"
              },
              {
                name: "Grilled Mushroom"
              },
              {
                name: "Extra Cheese"
              },
              {
                name: "Black Olive"
              }
            ]
          }
        ],
        selectedSize: 0,
        selectedToppings: [2, 4],
        quantity: 2
      }
    ],
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
            tmparr = tmparr.filter((item, key) => key !== i)
            state.totalAmt = state.totalAmt - parseInt(tmparr[i].price)
          }
          break
        }
      }
      state.cartItems = tmparr
    }
  },
  extraReducers: (builder) => {
    function onPending(state, action) {
      state.loading = true
      state.error = null
    }
    function onRejection(state, action) {
      state.loading = false
      state.error = action.payload
    }
    // builder.addCase(getMenu.fulfilled, (state, action) => {
    //   state.menuItems = action.payload
    //   state.loading = false
    // })
    // builder.addCase(getMenu.pending, onPending)
    // builder.addCase(getMenu.rejected, onRejection)
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
