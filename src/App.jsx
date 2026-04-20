import { BrowserRouter, Routes, Route   } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DefaultLayout from "./layouts/DefaultLayout"
function App() { 

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
