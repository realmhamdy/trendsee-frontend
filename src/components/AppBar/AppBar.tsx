import React from "react"

import { createStyles, makeStyles, Theme, fade } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import SearchIcon from "@material-ui/icons/Search"
import HelpOutlineIcon from "@material-ui/icons/HelpOutlineRounded"

import "../../static/fonts/cunia/stylesheet.css"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        appBar: {
            boxShadow: "none",
            "& .MuiToolbar-gutters": {
                padding: 0
            }
        },
        title: {
            flexGrow: 1,
            fontFamily: "CuniaBold",
            fontSize: 28,
            lineHeight: "40px",
            "&> span:first-child": {
                color: "#1A1F36",
                "& span": {
                    fontSize: 32
                }
            },
            "&> span:last-child": {
                color: "#3C4FE0",
                "& span": {
                    fontSize: 32
                }
            }
        },
        search: {
            position: "relative",
            borderWidth: 1,
            borderColor: "#DEDFE2",
            borderStyle: "solid",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            "&:hover": {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(1),
                width: "auto",
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        inputRoot: {
            color: "inherit",
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                width: "350px",
                "&:focus": {
                    width: "400px",
                },
            },
        },
        helpIconButton: {
            marginLeft: theme.spacing(4)
        },
        avatar: {
            marginLeft: theme.spacing(1)
        }
    }),
)

export default function () {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <span><span>T</span>rend</span><span><span>S</span>ee</span>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search by name, brand, category"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ "aria-label": "search" }}
                        />
                    </div>
                    <IconButton className={classes.helpIconButton}>
                        <HelpOutlineIcon/>
                    </IconButton>
                    <Avatar src="/images/dude.jpg" alt="Dude avatar" variant="rounded" className={classes.avatar} />
                </Toolbar>
            </AppBar>
        </div>
    )
}