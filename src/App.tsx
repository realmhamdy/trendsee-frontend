import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import AppBar from "./components/AppBar"
import WrapperBox from "./components/WrapperBox"
import BrandPage from "./pages/brand"
import SearchResultsPage from "./pages/search-results"
import SearchBrandPage from "./pages/search-brand"

function App() {
  return (
    <Router>
      <WrapperBox>
        <AppBar/>
        <Switch>
          <Route exact path="/search-brand">
            <SearchBrandPage/>
          </Route>
          <Route exact path="/search">
            <SearchResultsPage/>
          </Route>
          <Route exact path="/">
            <BrandPage/>
          </Route>
      </Switch>
      </WrapperBox>
    </Router>
  )
}

export default App
