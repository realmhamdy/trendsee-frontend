import React from "react"

import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import SearchResultsPage from "./SearchResults"

test("Shows header test", () => {
    render(
        <MemoryRouter>
            <SearchResultsPage/>
        </MemoryRouter>
    )
    expect(screen.getByText("Search results for the query")).toBeInTheDocument()
})
