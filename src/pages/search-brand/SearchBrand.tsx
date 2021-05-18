import React, { MouseEvent } from "react"
import { useState, useEffect } from "react"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import FormControl from "@material-ui/core/FormControl"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import MenuItem from "@material-ui/core/MenuItem"
import Paper from "@material-ui/core/Paper"
import Select from "@material-ui/core/Select"
import Slider from "@material-ui/core/Slider"
import TablePagination from "@material-ui/core/TablePagination"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableContainer from "@material-ui/core/TableContainer"
import TableFooter from "@material-ui/core/TableFooter"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import TextField from "@material-ui/core/TextField"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import { createStyles, makeStyles, withStyles, Theme, useTheme } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"
import CancelIcon from "@material-ui/icons/Cancel"
import CloudDownloadIcon from "@material-ui/icons/CloudDownload"
import DateRangeIcon from "@material-ui/icons/DateRange"
import InfoIcon from "@material-ui/icons/Info"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import SettingsIcon from "@material-ui/icons/Settings"

import AvatarTableCell from "../../components/AvatarTableCell"
import CountryLinkTableCell from "../../components/CountryLinkTableCell"
import ScoreTableCell from "../../components/ScoreTableCell"
import { countries, brandTableData, BrandTableRowData, ReviewsColumn } from "./data"
import { ScoreColumn, formatNumber, getAbsoluteURL } from "../../utils"

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    filtersContainer: {
      marginTop: theme.spacing(3)
    },
    filtersPaper: {
      backgroundColor: "#FBFDFE",
      padding: theme.spacing(2)
    },
    filterTitleContainer: {
      "& .MuiSvgIcon-root": {
        marginLeft: theme.spacing(1),
        color: theme.palette.text.secondary
      }
    },
    filterRow: {
      marginBottom: theme.spacing(1)
    },
    slider: {
      width: "100%"
    },
    sliderPaper: {
      backgroundColor: "#ECEFF3",
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(2.3),
      flexGrow: 1
    },
    filterButtonsRow: {
      display: "flex",
      justifyContent: "space-between"
    },
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    brandsSectionContainer: {
      marginTop: theme.spacing(4)
    },
    brandsHeader: {
      "& span": {
        color: theme.palette.text.secondary,
        fontSize: "smaller"
      }
    }
  })
})

function FilterTypeSelect() {
  const [dropDownValue, setDropDownValue] = useState("contains")
  function handleDropDownChanged(event: React.ChangeEvent<{ value: unknown }>) {
    setDropDownValue(event.target.value as string)
  }
  return (
    <FormControl variant="outlined" size="small" style={{ minWidth: 180 }}>
      <Select value={dropDownValue} onChange={handleDropDownChanged}>
        <MenuItem value="contains">Contains</MenuItem>
        <MenuItem value="nocontains">Does not contain</MenuItem>
      </Select>
    </FormControl>
  )
}

const CustomSlider = withStyles({
  root: {
    height: 3,
    color: "#C1C9D2"
  },
  thumb: {
    height: 24,
    width: 36,
    backgroundColor: "#3C4FE0",
    marginTop: -8,
    marginLeft: -25,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
    borderRadius: 4
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 20px)",
  },
  track: {
    height: 4,
    borderRadius: 0,
    backgroundColor: "#6372E6"
  },
  rail: {
    height: 4,
    borderRadius: 0,
  },
})(Slider)

interface ValueLabelProps {
  children: React.ReactElement
  value: number
  open: boolean
}

const CustomTooltip = withStyles({
  tooltip: {
    marginBottom: -26,
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: "0.9em"
  }
})(Tooltip)

function ValueLabel({ children, value }: ValueLabelProps) {
  return (
    <CustomTooltip open={true} title={value} placement="top">
      {children}
    </CustomTooltip>
  )
}

function RangeSlider() {
  const classes = useStyles()
  const [values, setValues] = React.useState([0, 100])
  function handleRangeChanged(event: any, newValue: number | number[]) {
    setValues(newValue as number[])
  }
  return (
    <Paper variant="outlined" className={classes.sliderPaper}>
      <CustomSlider value={values} onChange={handleRangeChanged} ValueLabelComponent={ValueLabel} className={classes.slider} />
    </Paper>
  )
}

interface FilterRowHeaderAndSelectProps {
  header: string
}

function FilterHeaderAndSelect({ header }: FilterRowHeaderAndSelectProps) {
  const classes = useStyles()
  return (
    <>
      <Grid container item xs={2} alignItems="center" className={classes.filterTitleContainer}>
        <Typography variant="subtitle1"><strong>{header}</strong></Typography>
        <InfoIcon fontSize="small" />
      </Grid>
      <Grid item xs={2}>
        <FilterTypeSelect />
      </Grid>
    </>
  )
}

interface FilterRowProps {
  header: string
  thirdColumn: React.ReactElement
}

function FilterRow({ header, thirdColumn }: FilterRowProps) {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Grid container spacing={2} alignItems="center" className={classes.filterRow}>
      <FilterHeaderAndSelect header={header} />
      <Grid container item xs={8} alignItems="center">
        {thirdColumn}
        <IconButton size="small" style={{ marginLeft: theme.spacing(1) }}><CancelIcon color="action" /></IconButton>
      </Grid>
    </Grid>
  )
}

const useCountryAutocompleteStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
  autocomplete: {
    width: 300
  }
})

function CountryAutocomplete() {
  const classes = useCountryAutocompleteStyles()
  function countryToFlag(isoCode: string) {
    return typeof String.fromCodePoint !== "undefined"
      ? isoCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : isoCode
  }
  return (
    <FormControl variant="outlined">
      <Autocomplete
        className={classes.autocomplete}
        options={countries}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        size="small"
        getOptionLabel={(option) => option.label}
        renderOption={(option) => (
          <React.Fragment>
            <span>{countryToFlag(option.code)}</span>
            {option.label}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    </FormControl>
  )
}

const useBrandsTableStyles = makeStyles((theme: Theme) => {
  return createStyles({
    iconCell: {
      display: "flex",
      alignItems: "center",
      "& .MuiSvgIcon-root": {
        marginRight: theme.spacing(1)
      }
    },
    reviewsCellContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& .MuiSvgIcon-root": {
        marginLeft: theme.spacing(1)
      }
    }
  })
})

function BrandsTable() {
  const classes = useBrandsTableStyles()
  const theme = useTheme()
  type Order = "asc" | "desc"
  const [sortByColumn, setSortByColumn] = React.useState<keyof BrandTableRowData>()
  const [sortDirection, setSortDirection] = React.useState<Order>("asc")
  const createSortHandler = (column: keyof BrandTableRowData) => (event: React.MouseEvent<unknown>) => {
    const isAsc = sortByColumn === column && sortDirection === "asc"
    setSortDirection(isAsc ? "desc" : "asc")
    setSortByColumn(column)
  }
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    let aVal, bVal
    if (["scalingScore", "revenueScore"].indexOf(orderBy as string) !== -1) {
      aVal = (a[orderBy] as unknown as ScoreColumn).current
      bVal = (b[orderBy] as unknown as ScoreColumn).current
    } else if (orderBy == "reviews") {
      aVal = (a[orderBy] as unknown as ReviewsColumn).value
      bVal = (b[orderBy] as unknown as ReviewsColumn).value
    }
    else {
      aVal = a[orderBy]
      bVal = b[orderBy]
    }
    if (bVal < aVal) {
      return -1
    }
    if (bVal > aVal) {
      return 1
    }
    return 0
  }
  function getComparator<Key extends keyof any>(
    order: "asc" | "desc",
    orderBy: Key,
  ): (a: { [key in Key]: number | string | ScoreColumn | ReviewsColumn }, b: { [key in Key]: number | string | ScoreColumn | ReviewsColumn }) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  function stableSort<T>(array: Array<T>, comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }


  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortByColumn == "name"}
                direction={sortByColumn == "name" ? sortDirection : "asc"}
                onClick={createSortHandler("name")}>
                Brand Name
                            </TableSortLabel>
            </TableCell>
            <TableCell style={{ minWidth: 100 }}></TableCell>
            <TableCell>
              <div className={classes.iconCell}>
                <InfoIcon color="disabled" fontSize="small" />
                <TableSortLabel
                  active={sortByColumn == "scalingScore"}
                  direction={sortByColumn == "scalingScore" ? sortDirection : "asc"}
                  onClick={createSortHandler("scalingScore")}>
                  Scaling Score
                                </TableSortLabel>
              </div>
            </TableCell>
            <TableCell>
              <div className={classes.iconCell}>
                <InfoIcon color="disabled" fontSize="small" />
                <TableSortLabel
                  active={sortByColumn == "revenueScore"}
                  direction={sortByColumn == "revenueScore" ? sortDirection : "asc"}
                  onClick={createSortHandler("revenueScore")}>
                  Revenue Score
                                </TableSortLabel>
              </div>
            </TableCell>
            <TableCell>
              <div className={classes.iconCell}>
                <SettingsIcon color="disabled" fontSize="small" />
                <TableSortLabel
                  active={sortByColumn == "reviews"}
                  direction={sortByColumn == "reviews" ? sortDirection : "asc"}
                  onClick={createSortHandler("reviews")}>
                  Reviews
                                </TableSortLabel>
              </div>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortByColumn == "trustPilot"}
                direction={sortByColumn == "trustPilot" ? sortDirection : "asc"}
                onClick={createSortHandler("trustPilot")}>
                Trust Pilot
                            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortByColumn == "product"}
                direction={sortByColumn == "product" ? sortDirection : "asc"}
                onClick={createSortHandler("product")}>
                Product
                            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortByColumn == "facebook"}
                direction={sortByColumn == "facebook" ? sortDirection : "asc"}
                onClick={createSortHandler("facebook")}>
                FB's
                            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortByColumn == "google"}
                direction={sortByColumn == "google" ? sortDirection : "asc"}
                onClick={createSortHandler("google")}>Google's</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortByColumn == "amazon"}
                direction={sortByColumn == "amazon" ? sortDirection : "asc"}
                onClick={createSortHandler("amazon")}>
                Amazon's
                            </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(brandTableData, getComparator(sortDirection, sortByColumn as string)).map((row, index) => (
            <TableRow key={index}>
              <AvatarTableCell avatar={row.avatar as string} label={row.name as string} />
              <CountryLinkTableCell flag={row.flag as string} link={row.url as string} />
              <ScoreTableCell score={row.scalingScore as ScoreColumn} />
              <ScoreTableCell score={row.revenueScore as ScoreColumn} />
              <TableCell>
                <div className={classes.reviewsCellContainer}>
                  <span>{formatNumber((row.reviews as ReviewsColumn).value)}</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ color: theme.palette.text.secondary }}>
                      {(row.reviews as ReviewsColumn).change}%
                                        </span>
                    <ArrowRightAltIcon color="action" fontSize="small" />
                  </div>
                </div>
              </TableCell>
              <TableCell>{formatNumber(row.trustPilot as number)}</TableCell>
              <TableCell>{formatNumber(row.product as number)}</TableCell>
              <TableCell>{formatNumber(row.facebook as number)}</TableCell>
              <TableCell>{formatNumber(row.google as number)}</TableCell>
              <TableCell>{formatNumber(row.amazon as number)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default function SearchBrand() {
  const classes = useStyles()
  const tableclasses = useBrandsTableStyles()
  const theme = useTheme()
  const tabNames = [
    "Breaking out",
    "Potential breakouts",
    "Sudden growth",
    "New to wholesale",
    "Scaling wholesale",
    "New advertiser",
    "Scaling ads"
  ]
  const [tabIndex, setTabIndex] = React.useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState("20")
  const [searchTerm, setSearchTerm] = useState("")
  const [brandList, setbrandList] = useState<string[]>([])
  useEffect(() => {
    interface Response {
      brands: string[]
    }
    void (async () => {
      const response = await fetch(getAbsoluteURL("/brandlist?" + new URLSearchParams({ q: searchTerm }).toString()))
      const data: Response = await response.json() as Response
      setbrandList(data.brands)

    })()

  }, [])

  const scalingScore: ScoreColumn = {
    current: 79,
    previous: 77.9,
    status: "good",
  }

  const revenueScore: ScoreColumn = {
    current: 81,
    previous: 79.9,
    status: "good",
  }

  function handlePageChange(event: MouseEvent<HTMLButtonElement> | null, page: number) {
    setPage(page)
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setPage(0)
    setRowsPerPage(event.target.value)
  }

  const BrandList = brandList.slice(page * parseInt(rowsPerPage), page * parseInt(rowsPerPage) + parseInt(rowsPerPage)).map((data, index) => {
    return (
      <TableRow key={index}>
        <AvatarTableCell avatar={"/images/brands/tommyhilfiger/avatar.png"} label={data} />
        <CountryLinkTableCell flag={"US"} link={"http://www.example.com/"} />
        <ScoreTableCell score={scalingScore} />
        <ScoreTableCell score={revenueScore} />
        <TableCell>12,878</TableCell>
        <TableCell>12,878</TableCell>
        <TableCell>12,878</TableCell>
        <TableCell>12,878</TableCell>
        <TableCell>12,878</TableCell>
        <TableCell>12,878</TableCell>
        <TableCell>12,878</TableCell>
      </TableRow>
    )
  })

  function handleTabChanged(event: React.ChangeEvent<unknown>, newTabIndex: number) {
    setTabIndex(newTabIndex)
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Tabs value={tabIndex} onChange={handleTabChanged} textColor="primary" indicatorColor="primary">
          {tabNames.map((tabName, index) => (
            <Tab label={tabName} key={index} />
          ))}
        </Tabs>
      </Grid>
      <Grid item xs={12} className={classes.filtersContainer}>
        <Paper variant="elevation" elevation={1} className={classes.filtersPaper}>
          <FilterRow header="Scaling Score" thirdColumn={<RangeSlider />} />
          <FilterRow header="Revenue Score" thirdColumn={<RangeSlider />} />
          <FilterRow header="Country" thirdColumn={<CountryAutocomplete />} />
          <Button variant="text" startIcon={<AddIcon />} color="default">Add Filter</Button>
          <Divider className={classes.divider} />
          <div className={classes.filterButtonsRow}>
            <Button variant="outlined" color="primary" size="small">Save as preset</Button>
            <div>
              <Button variant="outlined" color="default" size="small">Cancel</Button>
              <Button variant="contained" color="primary" size="small" style={{ marginLeft: theme.spacing(2) }}>Save</Button>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid container item xs={12} className={classes.brandsSectionContainer}>
        <Grid container item xs={12} justify="space-between">
          <Typography variant="h4" className={classes.brandsHeader}>Brands <span>{brandList.length}</span></Typography>
          <div>
            <Button variant="outlined" endIcon={<CloudDownloadIcon />} size="small">Download</Button>
            <Button variant="outlined" startIcon={<DateRangeIcon />} endIcon={<KeyboardArrowDownIcon />} size="small" style={{ marginLeft: theme.spacing(1) }}>Last 6 months</Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel>Brand Name</TableSortLabel>
                  </TableCell>
                  <TableCell style={{ minWidth: 100 }}></TableCell>
                  <TableCell>
                    <div className={tableclasses.iconCell}>
                      <InfoIcon color="disabled" fontSize="small" />
                      <TableSortLabel>Scaling Score</TableSortLabel>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={tableclasses.iconCell}>
                      <InfoIcon color="disabled" fontSize="small" />
                      <TableSortLabel>Revenue Score</TableSortLabel>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={tableclasses.iconCell}>
                      <SettingsIcon color="disabled" fontSize="small" />
                      <TableSortLabel>Reviews</TableSortLabel>
                    </div>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel>Trust Pilot</TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel>Product</TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel>FB's</TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel>Google's</TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel>Amazon's</TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {BrandList}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    page={page}
                    onChangePage={handlePageChange}
                    rowsPerPage={parseInt(rowsPerPage)}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    count={brandList.length}
                    rowsPerPageOptions={[20, 50, 100, 150]} />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  )
}
