import React from "react"

import AppBar from "./components/AppBar"
import WrapperBox from "./components/WrapperBox"
import BrandPage from "./pages/brand"

function App() {
  return (
    <WrapperBox>
      <AppBar/>
      <BrandPage/>
    </WrapperBox>
  )
}

export default App
