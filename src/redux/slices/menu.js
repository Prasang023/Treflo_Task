import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { setError } from "./error"

import axios from "axios"

export const getMenu = createAsyncThunk(
  "bucket/getMenu",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68`
      )
      console.log(response)

      return response.data
    } catch (err) {
      console.log(err)
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    loading: false,
    error: null,
    menuItems: []
  },
  reducers: {
    sortByPrice: (state, action) => {
      var arr = state.menuItems
      arr.sort(function (a, b) {
        var keyA = a.price,
          keyB = b.price
        if (keyA < keyB) return -1
        if (keyA > keyB) return 1
        return 0
      })
      state.menuItems = arr
    },
    sortByRatings: (state, action) => {
      var arr = state.menuItems
      console.log(arr[0])
      arr.sort(function (a, b) {
        var keyA = parseFloat(a.rating),
          keyB = parseFloat(b.rating)
        if (keyA > keyB) return -1
        if (keyA < keyB) return 1
        return 0
      })
      state.menuItems = arr
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
    builder.addCase(getMenu.fulfilled, (state, action) => {
      state.menuItems = action.payload
      state.loading = false
    })
    builder.addCase(getMenu.pending, onPending)
    builder.addCase(getMenu.rejected, onRejection)
  }
})

export const { sortByPrice, sortByRatings } = menuSlice.actions
export default menuSlice.reducer
