import { useEffect } from "react"
import Header from "../components/Header"
import ProductCart from "../components/ProductCart"
import { useAppDispatch, useAppSelector } from '../../types/hooks'
import { setProducts } from "../../features/products/productSlice"
const Home = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state)=> state.theme.theme)

  useEffect(()=>{
    const fetchProducts =async ()=>{
      const response = await fetch("/shop-cart/products.json");
      if(!response.ok) throw new Error("Failed to load json");
      const data = await response.json();
      dispatch(setProducts(data))
    }

    fetchProducts()
  },[dispatch])
  return (

    <>
      <div className={`min-h-screen ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black" }`}>
        <Header />
        <main className="p-4 mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            <ProductCart />
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
