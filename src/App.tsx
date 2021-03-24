import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import AppBar from "./components/AppBar"
import WrapperBox from "./components/WrapperBox"
import BrandPage from "./pages/brand"
import SearchResultsPage from "./pages/search-results"

function App() {
  return (
    <Router>
      <WrapperBox>
        <AppBar/>
        <Switch>
          <Route path="/search">
            <SearchResultsPage/>
          </Route>
          <Route path="/">
            <BrandPage/>
          </Route>
      </Switch>
      </WrapperBox>
    </Router>
  )
}

export default App
