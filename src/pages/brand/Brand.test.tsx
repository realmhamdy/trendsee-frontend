import React from "react"

import { screen, render } from "@testing-library/react"

import BrandPage from "./Brand"

it("Shows the brand name", () => {
    render(<BrandPage/>)
    expect(screen.getByText("Tommy Hilfiger")).toBeInTheDocument()
})
