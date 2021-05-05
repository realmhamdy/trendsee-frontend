import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import AppBar from "./components/AppBar"
import WrapperBox from "./components/WrapperBox"
import BrandPage from "./pages/brand"
import SearchResultsPage from "./pages/search-results"
import SearchBrandPage from "./pages/search-brand"
import { Provider } from "react-redux"
import Store from "./Redux/store"
import Brand from "./pages/brand/Brand"

function App() {
  return (
    <Provider store={Store}>
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
    </Provider>
  )
}

export default App
