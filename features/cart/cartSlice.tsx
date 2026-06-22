import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { cartItem, Product } from '../../types'

interface CartState {
  cart: cartItem[],
  isCardOpen: boolean;
}

const initialState: CartState = {
  cart: [],
  isCardOpen: false
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      // product exist or not
      const existing = state.cart.find((item) => item.id === action.payload.id)

      if (existing) {
        existing.quantity += 1
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1
        })
      }
    },
    updateQuantity: (state, action: PayloadAction<{
      id: number,
      delta: number
    }>) => {
      const item = state.cart.find((item)=> item.id === action.payload.id)

      if(item){
        item.quantity = Math.max(item.quantity + action.payload.delta, 1)
      }

    },
    removeCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload)
    },
    openCart: (state) => {
      state.isCardOpen = true
    },
    closeCart: (state) => {
      state.isCardOpen = false
    }

  }
})

export const { addToCart, openCart, closeCart, removeCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer
