import React from "react"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import AppBar from "./AppBar"

it("Shows the brand text", () => {
    render(
        <MemoryRouter>
            <AppBar/>
        </MemoryRouter>
    )
    expect(screen.getByText("rend")).toBeInTheDocument()
})
