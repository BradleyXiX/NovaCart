import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";

import { Route, Routes } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { theme } = useThemeStore();
  
  return (
    <div className='min-h-screen transition-colors duration-300 bg-base-200' data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/product/:id' element={<ProductsPage />} />
      </Routes>
      
    </div>
  )
}

export default App
