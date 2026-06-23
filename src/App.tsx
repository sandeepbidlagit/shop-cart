import { useEffect } from "react"
import Home from "./pages/Home"
import Preloader from "./components/Preloader";
import { useAppDispatch, useAppSelector } from "../types/hooks";
import { setLoading } from "../features/cart/cartSlice";

function App() {
  const dispatch = useAppDispatch();
  const loader = useAppSelector((state)=> state.cart.loading)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);


  if (loader) {
    return <Preloader />
  }

  return (
    <>
      <Home />
    </>
  )
}

export default App


