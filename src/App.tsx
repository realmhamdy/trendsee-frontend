import React from "react"

import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"

import logo from "./logo.svg"
import "./App.css"
import AppBar from "./components/AppBar"

function App() {
  return (
    <Box mx={12}>
      <AppBar/>
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
    </Box>
  )
}

export default App
