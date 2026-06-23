import { useEffect, useState } from "react"
import Home from "./pages/Home"
import Preloader from "./components/Preloader";

function App() {
  const [loading, setLoading] = useState(true);
  
useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2000);

  return () => clearTimeout(timer);
}, []);


  if (loading) {
    return <Preloader />
  }

  return (
    <>
      <Home />
    </>
  )
}

export default App