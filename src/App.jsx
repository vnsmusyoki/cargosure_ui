import { BrowserRouter, Routes, Route   } from "react-router-dom"
import Homepage from "./pages/Homepage"
import DefaultLayout from "./layouts/DefaultLayout"
function App() { 

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Homepage />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
