import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import ProductsPage from "./pages/ProductsPage"

function App() {
  return (
    <div className='min-h-screen transition-colors duration-300 bg-base-200'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/product/:id' element={<ProductsPage />} />
      </Routes>
      
    </div>
  )
}

export default App
