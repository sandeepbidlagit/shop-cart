import { FaCartPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { addToCart } from "../../features/cart/cartSlice";
import { useCallback } from "react";
import type { Product } from "../../types";

const ProductCart = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const theme = useAppSelector((state) => state.theme.theme);
  // console.log(theme)

  // const cart = useAppSelector((state) => state.cart.cart);
  // console.log(cart)

  const handleAddToCart = useCallback((product: Product) => {
    dispatch(addToCart(product))
  }, [dispatch]);

  return (
    <>
      {products.map((product) => {
        return (
          <div key={product.id} className={`rounded overflow-hidden shadow-lg ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} `}>
            {/* product image */}
            <div className="h-56 w-full overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-all duration-300 ease-in-out" />
            </div>
            {/* product info */}
            <div className="p-4">
              <h2 className="text-lg font-semibold"> {product.name} </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{product.description}</p>
              {/* price and add to cart */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold">
                  $ {product.price}
                </span>
                <button className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-green-700 transition-all duration-300 ease-in-out" onClick={() => handleAddToCart(product)}>
                  <FaCartPlus /> Add To Cart
                </button>
              </div>
            </div>
          </div>
        )
      })}

    </>
  )
}

export default ProductCart
