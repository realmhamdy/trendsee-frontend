import React from "react"
import { render, screen } from "@testing-library/react"
import AppBar from "./AppBar"

it("Shows the brand text", () => {
    render(<AppBar/>)
    expect(screen.getByText("rend")).toBeInTheDocument()
})
