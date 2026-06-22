import {
  FaShoppingCart,
  FaStore,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { toggleTheme } from '../../features/theme/themeSlice'
import { openCart } from '../../features/cart/cartSlice'
import { lazy, Suspense, useCallback, useMemo } from "react";
// import CardModal from "./CardModal";

const CardModal = lazy(() => import("./CardModal"));


const Header = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const cart = useAppSelector((state) => state.cart.cart);
  // console.log(cart)
  const isCardOpen = useAppSelector((state) => state.cart.isCardOpen);
  // console.log(isCardOpen)

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart])

  // const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleOpenCart = useCallback(() => {
    dispatch(openCart())
  }, [dispatch])


  const handleToggleTheme = useCallback(()=>{
   dispatch(toggleTheme())
  },[dispatch])

  return (
    <>
      <header className={`p-3 mb-8 shadow ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
          <h1 className="text-2xl font-bold flex items-center gap-4">
            <FaStore className={`${theme === "dark" ? "text-white" : "text-blue-600"}`} /> ShopCart
          </h1>
          <div className='flex items-center gap-5'>
            <button className="p-2 text-2xl relative cursor-pointer" onClick={handleOpenCart}>
              <FaShoppingCart />
              <span className='absolute -top-0 -right-0 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                {cartCount}
              </span>
            </button>
            <button className='p-2 rounded-full text-black cursor-pointer' onClick={handleToggleTheme}>
              {theme === "dark" ? (
                <FaSun className='text-white text-3xl hover:bg-gray-600 p-1 rounded-full' />
              ) : (
                <FaMoon className='text-gray-800 text-2xl hover:bg-gray-300 p-1 rounded-full' />

              )}
            </button>
          </div>
        </div>
      </header>
      {isCardOpen && (
        <Suspense fallback={<div className="fixed inset-0 flex justify-center items-center text-xl font-semibold">Loading Cart...</div>}>
          <CardModal />
        </Suspense>
      )}
    </>
  )
}

export default Header
