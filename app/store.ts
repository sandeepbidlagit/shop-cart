import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/products/productSlice'
import themeReducer from '../features/theme/themeSlice'
import cartReducer from '../features/cart/cartSlice'
export const store = configureStore({
  reducer: {
    products: productReducer,
    theme: themeReducer,
    cart: cartReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch