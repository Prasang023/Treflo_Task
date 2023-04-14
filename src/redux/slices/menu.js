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
  name: "mennu",
  initialState: {
    loading: false,
    error: null,
    menuItems: []
  },
  reducers: {},
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

// export const { setError, clearError } = errorSlice.actions;
export default menuSlice.reducer
