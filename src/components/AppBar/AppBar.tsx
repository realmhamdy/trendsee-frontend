import React, { useState, useEffect } from "react"
import { useHistory, Link as RouterLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { createStyles, makeStyles, Theme, fade } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Avatar from "@material-ui/core/Avatar"
import CircularProgress from "@material-ui/core/CircularProgress"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import InputBase from "@material-ui/core/InputBase"
import Link from "@material-ui/core/Link"
import TextField from "@material-ui/core/TextField"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import SearchIcon from "@material-ui/icons/Search"
import HelpOutlineIcon from "@material-ui/icons/HelpOutlineRounded"

import Actions from "../../pages/Actions/PageActions"
import logo from "../../assets/images/logo.png"

import "../../static/fonts/cunia/stylesheet.css"

import { getAbsoluteURL } from "../../utils"

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
    searchForm: {
      minWidth: 300
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
  const history = useHistory()
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([])
  const [autocompleteOptionsLoading, setAutocompleteOptionsLoading] = useState(false)

  function handleSearchTermChanged(event: React.ChangeEvent<{ value: unknown }>) {
    setSearchTerm(event.target.value as string)

  }
  function handelEnter(event: React.KeyboardEvent) {

    if (event.key === "Enter" && searchTerm && searchTerm.length > 2) {
      history.push("/search?" + new URLSearchParams({ q: searchTerm }).toString())
      dispatch(Actions.GetFreetextBrandDetails())
    }
  }
  function handleSearchAutocompleteSubmitted(event: React.ChangeEvent<unknown>, ...rest: any[]) {
    const value = rest[0] as string
    if (value) {
      const formattedValue = value.replace("/", ":")
      //history.push("/search?" + new URLSearchParams({q: value}).toString())
      history.push(`/brand/${formattedValue.replace(/ /g, "-")}`)
      dispatch(Actions.GetSelectedBrandData(value))
      dispatch(Actions.GetProductsData(value))
    }
  }
  interface Response {
    brands: string[]
  }
  React.useEffect(() => {
    setAutocompleteOptionsLoading(true)
    void (async () => {
      const response = await fetch(getAbsoluteURL("/brandlist?" + new URLSearchParams({ q: searchTerm }).toString()))
      const data: Response = await response.json() as Response
      setAutocompleteOptions(data.brands)
      setAutocompleteOptionsLoading(false)
    })()
  }, [searchTerm])
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link component={RouterLink} to="/" className={classes.title} underline="none">
              <img src={logo} alt="Trendsee" />
              {/* <span><span>T</span>rend</span><span><span>S</span>ee</span> */}
            </Link>
          </Typography>
          <div className={classes.searchForm}>
            <Autocomplete
              options={autocompleteOptions}
              loading={autocompleteOptionsLoading}
              onChange={handleSearchAutocompleteSubmitted}
              closeIcon={null}
              id="brand-autocomplete"
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={searchTerm}
                  onChange={handleSearchTermChanged}
                  onKeyPress={handelEnter}
                  onSubmit={handleSearchAutocompleteSubmitted}
                  label="Search by name, brands, category"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <React.Fragment>
                        {autocompleteOptionsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                    type: "search"
                  }}
                  variant="outlined"
                  size="small"
                  margin="none"
                />
              )} />
          </div>
          <IconButton className={classes.helpIconButton}>
            <HelpOutlineIcon />
          </IconButton>
          <Avatar src="/images/dude.jpg" alt="Dude avatar" variant="rounded" className={classes.avatar} />
        </Toolbar>
      </AppBar>
    </div>
  )
}