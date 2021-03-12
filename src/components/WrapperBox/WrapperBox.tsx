import React from "react"

import Box from "@material-ui/core/Box"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        box: {
            marginLeft: 0,
            marginRight: 0,
            [theme.breakpoints.up("md")]: {
                marginLeft: theme.spacing(12),
                marginRight: theme.spacing(12)
            }
        }
    })
)

type BoxProps = {
    children: JSX.Element | JSX.Element[]
}

export default function(props: BoxProps) {
    const classes = useStyles()
    return (
        <Box className={classes.box}>
            {props.children}
        </Box>
    )
}
