import React from "react"

import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Chip from "@material-ui/core/Chip"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import DateRangeIcon from "@material-ui/icons/DateRange"
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline"
import InfoIcon from "@material-ui/icons/Info"
import FacebookIcon from "@material-ui/icons/Facebook"
import KeyboardDownArrowIcon from "@material-ui/icons/KeyboardArrowDown"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import StarsIcon from "@material-ui/icons/Stars"
import RedditIcon from "@material-ui/icons/Reddit"
import SettingsIcon from "@material-ui/icons/Settings"
import ShareIcon from "@material-ui/icons/Share"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import VisibilityIcon from "@material-ui/icons/Visibility"
import ReactCountryFlag from "react-country-flag"
import GaugeChart from "react-gauge-chart"

import { ResponsiveLine } from "@nivo/line"

import { BrandData, generateRandomLineChartData } from "../common"

interface LineChartChipProps {
    value: number
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        iconWithTextContainer: {
            display: "flex",
            alignItems: "flex-start"
        },
        socialPaper: {
            padding: theme.spacing(1),
            backgroundColor: "#F8FAFC",
            "& > :not(:last-child)": {
                marginBottom: theme.spacing(1)
            },
            "& .MuiSvgIcon-root": {
                marginRight: theme.spacing(2)
            }
        },
        adPaper: {
            marginTop: theme.spacing(2),
            padding: theme.spacing(1)
        },
        adPaperTextContainer: {
            display: "flex",
            justifyContent: "space-between",
            "& a": {
                fontSize: "smaller"
            }
        },
        adImage: {
            width: "100%"
        },
        adDateSpanText: {
            marginTop: theme.spacing(1)
        },
        countryIcons: {
            textAlign: "center",
            marginTop: theme.spacing(1),
            "& > *": {
                margin: theme.spacing(0.5)
            }
        },
        adStatsContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: theme.spacing(1),
            padding: `0 ${theme.spacing(1)}px`
        },
        adStatContainer: {
            display: "flex",
            alignItems: "center",
            "& > .MuiSvgIcon-root": {
                paddingRight: theme.spacing(0.5),
                fontSize: "smaller"
            }
        },
        gaugePaper: {
            padding: theme.spacing(1),
            width: "100%"
        },
        gaugePaperHeader: {
            display: "flex",
            alignItems: "center",
            textTransform: "uppercase",
            "& > .MuiIconButton-root": {
                marginLeft: theme.spacing(0)
            }
        },
        gaugeDiffTextContainer: {
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center"
        },
        chartGridControllerButtons: {
            "& > *": {
                textAlign: "right"
            }
        }
    })
})

const useLineChartStyles = makeStyles((theme: Theme) => {
    return createStyles({
        lineChartGrid: {
            border: "1px solid #E3E8EE",
            "& > *": {
                border: "1px solid #E3E8EE",
                padding: theme.spacing(1)
            }
        },
        lineChartHeader: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        },
        lineChartTitleText: {
            color: theme.palette.text.secondary
        },
        lineChartChip: {
            borderRadius: 4,
            backgroundColor: (props: LineChartChipProps) => {
                if (props.value > 0) {
                    return "#CBF4C9"
                } else if (props.value == 0) {
                    return "#E3E8ED"
                } else {
                    return "#F89494"
                }
            },
            color: (props: LineChartChipProps) => {
                if (props.value > 0) {
                    return "#0B825D"
                } else if (props.value == 0) {
                    return "#6E788A"
                } else {
                    return "b41c1c"
                }
            }
        }
    })
})

interface IconWithLinkProps {
    icon: React.ReactNode
    text: string
    url?: string
}

function IconWithLink({icon, text, url}: IconWithLinkProps) {
    const classes = useStyles()
    return (
        <div className={classes.iconWithTextContainer}>
            {icon}
            {url ? <Link href={url} color="inherit" target="_blank">{text}</Link> : <Typography variant="body1" component="span">{text}</Typography>}
        </div>
    )
}

interface GaugeChartProps {
    topLabel: string
    value: number
    previousValue: number

}

function GaugeChartContainer({ topLabel, value, previousValue }: GaugeChartProps) {
    const classes = useStyles()
    let color
    if (value >= 90) {
        color = "#0B825D"
    } else if (value >= 50) {
        color = "#FAB000"
    } else {
        color = "#E25950"
    }
    let difference, icon
    if (value >= previousValue) {
        difference = Math.round((value - previousValue) * 100) / 100
        icon = <ArrowUpwardIcon color="primary"/>
    } else {
        difference = Math.round((previousValue - value) * 100) / 100
        icon = <ArrowDownwardIcon color="error"/>
    }
    const percent = value / 100
    return (
        <Grid item xs={4}>
            <Paper variant="outlined" className={classes.gaugePaper}>
                <Typography variant="caption" className={classes.gaugePaperHeader}>{topLabel} <IconButton size="small"><InfoIcon/></IconButton></Typography>
                <Grid container>
                    <Grid item xs={9}>
                        <GaugeChart nrOfLevels={2} percent={percent} colors={[color, "#E3E8EE"]} arcsLength={[percent, 1 - percent]} arcPadding={0} cornerRadius={0} hideText={true}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" gutterBottom align="center">{value}</Typography>
                        <div className={classes.gaugeDiffTextContainer}>
                            <Typography variant="subtitle1" className={classes.gaugeDiffTextContainer}><span>{difference}%</span></Typography>
                            {icon}
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

interface LineChartContainerProps {
    change: number
    headerText: string
    id: number
}

function LineChartContainer({ change, headerText, id }: LineChartContainerProps) {
    const classes = useLineChartStyles({ value: change})
    let changeText: string
    if (change > 0) {
        changeText = `+${change}%`
    } else if (change == 0) {
        changeText = `${change}%`
    } else {
        changeText = `-${change}%`
    }
    return (
        <Grid item xs={4}>
            <div className={classes.lineChartHeader}>
                <Typography variant="subtitle1" className={classes.lineChartTitleText}>{headerText}</Typography>
                <Chip label={changeText} className={classes.lineChartChip}/>
            </div>
            <div style={{height: "200px"}}>
                {/* tslint-ignore no-unsafe-assignment, no-unsafe-call */}
                <ResponsiveLine
                    data={generateRandomLineChartData(id)}
                    margin={{top: 16, bottom: 24}}
                    xScale={{ type: "time", format: "%Y-%m-%d", precision: "day" }}
                    xFormat="time:%Y-%m-%d"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: "bottom",
                        legend: "date",
                        format: "%Y-%m-%d",
                        tickSize: 5,
                        tickPadding: 1,
                        tickValues: "every 3 days"
                    }}
                    useMesh={true}
                    colors={["#3C4FE0"]}
                    curve="linear"
                    enablePoints={false}
                    enableGridX={false}
                    enableGridY={false}/>
            </div>
    </Grid>
    )
}

interface Props {
    brand: BrandData
}

export default function OverviewTab({ brand }: Props) {
    const classes = useStyles()
    const lineChartClasses = useLineChartStyles({value: 1.0})
    return (
        <Grid container spacing={2}>
            {/* the info/ad column */}
            <Grid item xs={3}>
                <Paper className={classes.socialPaper}>
                    <IconWithLink icon={<InfoIcon/>} text={brand.missionStatement}/>
                    <IconWithLink icon={<FacebookIcon/>} text={"Facebook"} url={brand.social.facebook}/>
                    <IconWithLink icon={<ShoppingCartIcon/>} text={"Shopify"} url={brand.social.shopify}/>
                    <IconWithLink icon={<StarsIcon/>} text={"TrustPilot"} url={brand.social.trustpilot}/>
                    <IconWithLink icon={<RedditIcon/>} text={"Reddit"} url={brand.social.reddit}/>
                </Paper>
                <Paper className={classes.adPaper}>
                    <div className={classes.adPaperTextContainer}>
                        <Typography variant="caption">MOST POPULAR AD</Typography>
                        <Link href="#">View All</Link>
                    </div>
                    <Box mt={1} px={2}>
                        {/* tslint-ignore no-unsafe-assignment */}
                        <img src={brand.most_popular_ad.image} className={classes.adImage}/>
                    </Box>
                    <Typography variant="body2" align="center" className={classes.adDateSpanText}>
                        from {brand.most_popular_ad.from} to {brand.most_popular_ad.to}
                    </Typography>
                    <div className={classes.countryIcons}>
                        {brand.most_popular_ad.countries.map((countryCode, index) => <ReactCountryFlag countryCode={countryCode} key={index} svg/>)}
                    </div>
                    <div className={classes.adStatsContainer}>
                        <Typography variant="subtitle1" component="span" className={classes.adStatContainer}><ThumbUpIcon/>{brand.most_popular_ad.likes}</Typography>
                        <Typography variant="subtitle1" component="span" className={classes.adStatContainer}><ChatBubbleOutlineIcon/>{brand.most_popular_ad.comments}</Typography>
                        <Typography variant="subtitle1" component="span" className={classes.adStatContainer}><VisibilityIcon/>{brand.most_popular_ad.views}</Typography>
                        <Typography variant="subtitle1" component="span" className={classes.adStatContainer}><ShareIcon/>{brand.most_popular_ad.shares}</Typography>
                    </div>
                </Paper>
            </Grid>
            {/* the charts column */}
            <Grid container item xs={9}>
                {/* The gauge charts row */}
                <Grid container item xs={12} spacing={3}>
                    <GaugeChartContainer topLabel="Growth Score" value={97.56} previousValue={96.46}/>
                    <GaugeChartContainer topLabel="Success Score" value={74.2} previousValue={74.6}/>
                    <GaugeChartContainer topLabel="Sophistication Score" value={60} previousValue={42}/>
                </Grid>
                {/* the edit chart controls row */}
                <Grid container item xs={12}>
                    <Grid item xs={3}>
                        <Typography variant="h5">Reports Overview</Typography>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid container item xs={7} className={classes.chartGridControllerButtons}>
                        <Grid item xs={8}>
                            <ButtonGroup aria-label="outlined primary button group">
                                <Button size="small" endIcon={<KeyboardDownArrowIcon/>}>Last 3 months</Button>
                                <Button size="small" startIcon={<DateRangeIcon/>}>Nov, 4 2020 - Feb, 3 2021</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={4}>
                            <Button startIcon={<SettingsIcon/>} variant="outlined" color="default" size="small">Edit charts</Button>
                        </Grid>
                    </Grid>
                </Grid>
                {/* the line chart grid */}
                <Grid container item xs={12} className={lineChartClasses.lineChartGrid}>
                    <LineChartContainer change={1.0} headerText="Facebook followers" id={1}/>
                    <LineChartContainer change={0} headerText="Shopify clients" id={2}/>
                    <LineChartContainer change={4.0} headerText="TrustPilot reviews" id={3}/>
                    <LineChartContainer change={1511} headerText="Reddit mentions" id={4}/>
                    <LineChartContainer change={136} headerText="Ad counts" id={5}/>
                    <LineChartContainer change={1815} headerText="Website traffic rank" id={6}/>
                </Grid>
            </Grid>
        </Grid>
    )
}