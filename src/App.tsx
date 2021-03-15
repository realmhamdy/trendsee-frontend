import React from "react"

import Typography from "@material-ui/core/Typography"

import logo from "./logo.svg"
import "./App.css"
import AppBar from "./components/AppBar"
import WrapperBox from "./components/WrapperBox"
import BrandPage from "./pages/brand"

function App() {
  return (
    <WrapperBox>
      <AppBar/>
      <BrandPage/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h1">
          Edit <code>src/App.tsx</code> and save to reload.
        </Typography>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </WrapperBox>
  )
}

export default App
