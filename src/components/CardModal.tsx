import { FaPlus, FaMinus, FaTrash, FaTimes } from "react-icons/fa";
import { closeCart, removeCart, updateQuantity } from '../../features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { useCallback } from "react";

const CardModal = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme)
  //  console.log(theme)
  const cart = useAppSelector((state) => state.cart.cart)
  // console.log(cart)
  const totalItem = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCloseCart = useCallback(() => {
    dispatch(closeCart());
  }, [dispatch])


  const handleRemoveCart = useCallback((id: number) => {
    dispatch(removeCart(id))
  }, [dispatch])


  const handleUpdateQuantity = useCallback((id: number, delta: number) => {
    dispatch(updateQuantity({ id, delta }))
  }, [dispatch])


  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
        <div className={`w-80 sm:w-96 h-full shadow-lg flex flex-col ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          {/* close button */}
          <div className={`p-4 flex justify-between items-center border-b ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button className={` cursor-pointer ${theme === "dark" ? "text-white" : "text-gray-600 hover:text-gray-400"}`} onClick={handleCloseCart}>
              <FaTimes />
            </button>
          </div>

          {/* cart items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <p className="text-center">Cart is Empty!</p>
            ) : (
              cart.map((item) => {
                return (
                  <div key={item.id} className={`flex items-center gap-4 p-4 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="text-sm font-bold"> {item.name}</h3>
                      <p className="text-xs">${item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button className={`p-1 cursor-pointer ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} rounded`}
                          onClick={() => handleUpdateQuantity(item.id, +1)}>
                          <FaPlus />
                        </button>
                        <span className="px-2"> {item.quantity} </span>
                        <button className={`p-1 cursor-pointer ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} rounded`}
                          onClick={() => handleUpdateQuantity(item.id, -1)}>
                          <FaMinus />
                        </button>
                      </div>
                    </div>

                    <button className={`p-2 hover:text-red-600 cursor-pointer ${theme === "dark" ? "text-white" : "text-gray-800"}`} onClick={() => handleRemoveCart(item.id)}>
                      <FaTrash />
                    </button>
                  </div>
                )
              })
            )}

          </div>

          {/* Total & Checkout */}
          <div className="p-4 border-t">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span> ${totalItem.toFixed(2)}</span>
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer" onClick={() => alert("Checkout functionality is not updated yet!")}>Checkout</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardModal
