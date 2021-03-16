import React from "react"

import Box from "@material-ui/core/Box"


interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

export default function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box mt={2}>
                    {children}
                </Box>
            )}
        </div>
    )
}