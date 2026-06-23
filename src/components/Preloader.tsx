const Preloader = () => {

  return (
     <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 text-white">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-blue-500 rounded-full animate-ping absolute"></div>
        <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <h1 className="mt-6 text-2xl font-bold tracking-wider">
        ShopCart
      </h1>

      <p className="text-gray-400 mt-2">
        Loading your experience...
      </p>
    </div>
  )
}

export default Preloader
