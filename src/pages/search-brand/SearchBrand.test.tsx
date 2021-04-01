import React from "react"

import { screen, render } from "@testing-library/react"
import SearchBrandPage from "./SearchBrand"

test("Shows table header text", () => {
    render(<SearchBrandPage/>)
    expect(screen.getByText("Brands")).toBeInTheDocument()
})
