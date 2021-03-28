import React from "react"

import Button from "@material-ui/core/Button"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import Checkbox from "@material-ui/core/Checkbox"
import Fade from "@material-ui/core/Fade"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"
import Grid from "@material-ui/core/Grid"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Paper from "@material-ui/core/Paper"
import Popper from "@material-ui/core/Popper"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline"
import VisibilityIcon from "@material-ui/icons/Visibility"
import ShareIcon from "@material-ui/icons/Share"
import TuneIcon from "@material-ui/icons/Tune"
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight"

import { ResponsiveChoropleth } from "@nivo/geo"

import ReactCountryFlag from "react-country-flag"

import LineChartContainer, { LineChartContainerProps } from "../components/LineChartContainer"
import ReportsOverviewHeader from "../components/ReportsOverviewHeader"
import countriesFeatures from "../../../static/geo/world_countries.json"

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        lineChartsContainer: {
            marginTop: theme.spacing(2),
            "& > .MuiGrid-item": {
                border: "1px solid #E3E8EE",
                borderCollapse: "collapse",
                padding: theme.spacing(1),
            },
            "& > :first-child": {
                borderLeft: "none"
            },
            "& > :last-child": {
                borderRight: "none"
            }
        },
        countriesContainer: {
            marginTop: theme.spacing(2)
        },
        countryDataPaper: {
            padding: theme.spacing(2),
            backgroundColor: "#F8FAFC"
        },
        countryDataContainer: {
            display: "flex",
            justifyContent: "space-between",
            "& > :last-child": {
                color: theme.palette.text.secondary
            }
        },
        worldChoroplethContainer: {
            height: "490px",
        },
        adListControllersRow: {
            marginTop: theme.spacing(2),
        },
        adListHeaderContainer: {
            display: "flex",
            "& > :first-child": {
                marginRight: theme.spacing(4)
            }
        },
        adsContainer: {
            marginTop: theme.spacing(2)
        },
        adPaper: {
            padding: theme.spacing(1),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > *:not(last-child)": {
                marginBottom: theme.spacing(1)
            },
            "& img": {
                width: "100%"
            }
        },
        adHeader: {
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            "& div span:first-child": {
                color: theme.palette.text.secondary
            }
        },
        countriesRow: {
            "& > *:not(last-child)": {
                marginRight: theme.spacing(1),
                fontSize: "larger"
            }
        },
        adStatsContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "& > *:not(last-child)": {
                marginRight: theme.spacing(1)
            }
        },
        adStatContainer: {
            display: "flex",
            alignItems: "center",
            "& > .MuiSvgIcon-root": {
                paddingRight: theme.spacing(0.5),
                fontSize: "smaller"
            }
        },
    })
})

const useFilterPopperStyles = makeStyles((theme: Theme) => {
    return createStyles({
        paper: {
            minWidth: "180px"
        },
        checkboxDetailSection: {
            padding: theme.spacing(1),
            backgroundColor: "#E4E7EC",
        },
        checkboxRow: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        },
        paperSection2NumberGroup: {
            marginTop: theme.spacing(1),
            "& .MuiInputLabel-formControl": {
                position: "relative"
            },
            "& .MuiSvgIcon-root": {
                marginRight: theme.spacing(1),
                marginTop: -theme.spacing(2)
            },
            "& .MuiTextField-root": {
                maxWidth: "80px"
            }
        },
        buttonSection: {
            backgroundColor: "#E4E7EC",
            padding: theme.spacing(1),
            display: "flex",
            justifyContent: "space-between"
        }
    })
})

interface CheckboxDetailSectionProps {
    comparison: string
    handleComparisonChanged: (event: React.ChangeEvent<{ value: unknown }>) => void
    compareByNumber: number | null
    handleCompareByNumberChanged: (event: React.ChangeEvent<{ value: unknown }>) => void
}


function CheckboxDetailSection({ comparison, handleComparisonChanged, compareByNumber, handleCompareByNumberChanged }: CheckboxDetailSectionProps) {
    const classes = useFilterPopperStyles()
    return (
        <div className={classes.checkboxDetailSection}>
            <FormGroup>
                <FormControl variant="outlined">
                    <InputLabel id="comparison-label">Comparison</InputLabel>
                    {/* eslint-disable @typescript-eslint/no-unsafe-assignment */}
                    <Select
                        labelId="comparison-label"
                        label="Comparison"
                        id="dropdown-comparison"
                        value={comparison}
                        onChange={handleComparisonChanged}
                        MenuProps={{
                            disablePortal: true,
                            anchorEl: this
                        }}>
                        <MenuItem value="equal">Is equal to</MenuItem>
                        <MenuItem value="greater">Is greater than</MenuItem>
                        <MenuItem value="less">Is less than</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.paperSection2NumberGroup}>
                    <div style={{ display: "table-row" }}>
                        <InputLabel style={{ display: "table-cell" }}><SubdirectoryArrowRightIcon color="primary"/></InputLabel>
                        <TextField style={{ display: "table-cell" }} variant="outlined" value={compareByNumber} onChange={handleCompareByNumberChanged} type="number"/>
                    </div>
                </FormControl>
            </FormGroup>
        </div>
    )
}

interface FilterPopperProps {
    open: boolean
    anchorEl: HTMLButtonElement | null,
    onDone: () => void
}


function FilterPopper({ open, anchorEl, onDone }: FilterPopperProps) {
    const classes = useFilterPopperStyles()
    const [checkState, setCheckState] = React.useState({
        likes: false, comments: false, views: false, shares: false,
        country: false, last_seen: false, started: false
    })
    function handleCheckboxChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const newCheckState = { ...checkState }
        for (const property in newCheckState) {
            newCheckState[property as CheckboxNames] = false
        }
        newCheckState[event.target.name as CheckboxNames] = event.target.checked
        setCheckState(newCheckState)
    }
    function handleClearButtonClicked() {
        const newCheckState = { ...checkState }
        for (const property in newCheckState) {
            newCheckState[property as CheckboxNames] = false
        }
        setCheckState(newCheckState)
    }
    type CheckboxNames = "likes" | "comments" | "views" | "shares" | "country" | "last_seen" | "started"
    const checkboxes:CheckboxNames[] = ["likes", "comments", "views", "shares", "country", "last_seen", "started"]
    const [comparison, setComparison] = React.useState("equal")
    const [compareByNumber, setCompareByNumber] = React.useState<number | null>(null)
    function handleComparisonChanged(event: React.ChangeEvent<{ value: unknown}>) {
        setComparison(event.target.value as string)
    }
    function handleCompareByNumberChanged(event: React.ChangeEvent<{ value: unknown }>) {
        setCompareByNumber(event.target.value as number)
    }
    return (
        <Popper open={open} anchorEl={anchorEl} placement="bottom" transition>
            {({TransitionProps}) => (
                <Fade {...TransitionProps} timeout={150}>
                    <Paper className={classes.paper}>
                        <FormGroup>
                            {checkboxes.map((name, index) => (
                                <>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={checkState[name]} onChange={handleCheckboxChanged} name={name}/>}
                                        label={name[0].toUpperCase() + name.slice(1).replace("_", " ")}
                                        key={index}
                                        className={classes.checkboxRow}/>
                                    {checkState[name] ? <CheckboxDetailSection
                                        comparison={comparison}
                                        compareByNumber={compareByNumber}
                                        handleComparisonChanged={handleComparisonChanged}
                                        handleCompareByNumberChanged={handleCompareByNumberChanged}/> : null}
                                </>
                            ))}
                        </FormGroup>
                        <div className={classes.buttonSection}>
                            <Button size="small" variant="outlined" onClick={handleClearButtonClicked}>clear</Button>
                            <Button size="small" variant="contained" color="primary" onClick={onDone}>Done</Button>
                        </div>
                    </Paper>
                </Fade>
            )}
        </Popper>
    )
}

export default function AdsTab() {
    const lineChartData: LineChartContainerProps[] = [
        { id: 1, headerNumber: "6,551", headerText: "Lifetime Ad Count", change: 1.0},
        { id: 2, headerNumber: "978", headerText: "Lifetime Unique Ad Count", change: 0.0},
        { id: 3, headerNumber: "13,831,376", headerText: "Typical Time Between Ad Updates", change: -1.3},
        { id: 4, headerNumber: "1,803", headerText: "Typical Time To Publish New Ad", change: 4.0},
    ]
    interface CountryAdDataPoint {
        country: string
        code: string
        adCount: number
    }
    const countryData: CountryAdDataPoint[] = [
        { country: "Mexico", code: "MEX", adCount: 295 },
        { country: "Ecuador", code: "ECU", adCount: 67 },
        { country: "Australia", code: "AUS", adCount: 581 },
        { country: "United Kingdom", code: "GBR", adCount: 1487 },
        { country: "Lithuania", code: "LTU", adCount: 4 },
        { country: "Italy", code: "ITA", adCount: 207 },
        { country: "Ireland", code: "IRL", adCount: 465 },
        { country: "United States", code: "USA", adCount: 2573 },
        { country: "Austria", code: "AUT", adCount: 808 },
        { country: "Slovakia", code: "SVK", adCount: 545 },
        { country: "Latvia", code: "LVA", adCount: 87 },
        { country: "Brazil", code: "BRA", adCount: 51 },
        { country: "Russian Federation", code: "RUS", adCount: 126 },
        { country: "France", code: "FRA", adCount: 965 },
    ]
    const adCounts = countryData.map((country) => country.adCount)
    adCounts.sort()
    const classes = useStyles()
    const [sortAdsBy, setSortAdsBy] = React.useState("popularity")
    const [filtersPopperOpened, setFiltersPopperOpened] = React.useState(false)
    const [filtersPopperAnchorEl, setFiltersPopperAnchorElem] = React.useState<HTMLButtonElement | null>(null)
    const [mouseInsideAdNumber, setMouseInsideAdNumber] = React.useState<null | number>(null)
    const countryNames = ["AU", "CA", "GB", "US"]
    function handleFiltersButtonClicked(event: React.MouseEvent<HTMLButtonElement>) {
        setFiltersPopperAnchorElem(filtersPopperAnchorEl ? null : event.currentTarget)
        setFiltersPopperOpened(!filtersPopperOpened)
    }
    function closeFilterPopper() {
        setFiltersPopperAnchorElem(null)
        setFiltersPopperOpened(false)
    }
    function handleClickAwayFromFiltersPopper() {
        closeFilterPopper()
    }
    function handleSortAdsBySelectChanged(event: React.ChangeEvent<{ value: unknown}>) {
        setSortAdsBy(event.target.value as string)
    }
    function handleFilterPopperDone() {
        closeFilterPopper()
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <ReportsOverviewHeader/>
            </Grid>
            <Grid container item xs={12} className={classes.lineChartsContainer} spacing={1}>
                {lineChartData.map((data, index) => (
                    <Grid item xs={3} key={index}>
                        <LineChartContainer {...data}/>
                    </Grid>
                ))}
            </Grid>
            <Grid container item xs={12} spacing={1} className={classes.countriesContainer}>
                <Grid item xs={3}>
                    <Paper variant="outlined" className={classes.countryDataPaper}>
                        {countryData.map((data, index) => (
                            <div key={index} className={classes.countryDataContainer}>
                                <Typography variant="h6">{data.country}</Typography>
                                <Typography variant="h6">{data.adCount}</Typography>
                            </div>
                        ))}
                    </Paper>
                </Grid>
                <Grid item xs={9} className={classes.worldChoroplethContainer}>
                    <ResponsiveChoropleth
                        data={countryData.map((country) => ({ id: country.code, value: country.adCount}))}
                        features={countriesFeatures.features}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        colors="blues"
                        domain={[ adCounts[0], adCounts[adCounts.length - 1] ]}
                        unknownColor="#eaeef3"
                        label="properties.name"
                        valueFormat=".2s"
                        projectionScale={150}
                        projectionRotation={[ 0, 0, 0 ]}
                        enableGraticule={false}
                        borderWidth={0.5}
                        borderColor="#e0e2e4"
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} alignItems="center" className={classes.adListControllersRow}>
                <Grid item xs={6} className={classes.adListHeaderContainer}>
                    <Typography variant="h5">Ads list</Typography>
                    <ClickAwayListener onClickAway={handleClickAwayFromFiltersPopper}>
                        <div>
                            <Button variant="outlined" startIcon={<TuneIcon/>} size="medium" onClick={handleFiltersButtonClicked}>Filters</Button>
                            <FilterPopper open={filtersPopperOpened} anchorEl={filtersPopperAnchorEl} onDone={handleFilterPopperDone}/>
                        </div>
                    </ClickAwayListener>
                </Grid>
                <Grid container item xs={6} justify="flex-end">
                    <FormControl variant="outlined">
                        <InputLabel id="label-sort-by">Sort by</InputLabel>
                        <Select
                            labelId="label-sort-by"
                            label="Sort by"
                            id="dropdown-sort-by"
                            value={sortAdsBy}
                            onChange={handleSortAdsBySelectChanged}>
                            <MenuItem value="popularity">Popularity</MenuItem>
                            <MenuItem value="startDate">Start date</MenuItem>
                            <MenuItem value="lastSeenOn">Last seen on</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2} className={classes.adsContainer}>
                {new Array(8).fill(0).map((_, index) => (
                    <Grid key={index} item xs={3} onMouseEnter={() => setMouseInsideAdNumber(index)} onMouseLeave={() => setMouseInsideAdNumber(null)}>
                        <Paper
                            variant={mouseInsideAdNumber == index ? "elevation" : "outlined"}
                            className={classes.adPaper}
                            elevation={4}
                            style={{ cursor: mouseInsideAdNumber == index ? "pointer" : "none"}}>
                            <div className={classes.adHeader}>
                                <div>
                                    <Typography variant="caption" component="span">Start </Typography>
                                    <Typography variant="caption" component="span">12/06/2018</Typography>
                                </div>
                                <div>
                                    <Typography variant="caption" component="span">Last seen </Typography>
                                    <Typography variant="caption" component="span">01/03/2021</Typography>
                                </div>
                            </div>
                            <div>
                                <img src="/images/brands/tommyhilfiger/tommy-faces.jpg"/>
                            </div>
                            <div className={classes.countriesRow}>
                                {countryNames.map((countryName, index) => (
                                    <ReactCountryFlag countryCode={countryName} key={index} svg/>
                                ))}
                            </div>
                            <div className={classes.adStatsContainer}>
                                <Typography variant="subtitle1" component="span" className={classes.adStatContainer}><ThumbUpIcon/>1,800</Typography>
                                <Typography variant="subtitle1" component="span" className={classes.adStatContainer}><ChatBubbleOutlineIcon/>904</Typography>
                                <Typography variant="subtitle1" component="span" className={classes.adStatContainer}><VisibilityIcon/>25,157</Typography>
                                <Typography variant="subtitle1" component="span" className={classes.adStatContainer}><ShareIcon/>30</Typography>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}
