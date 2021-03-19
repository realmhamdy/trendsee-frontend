import React from "react"

import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline"
import InfoIcon from "@material-ui/icons/Info"
import FacebookIcon from "@material-ui/icons/Facebook"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import StarsIcon from "@material-ui/icons/Stars"
import RedditIcon from "@material-ui/icons/Reddit"
import ShareIcon from "@material-ui/icons/Share"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import VisibilityIcon from "@material-ui/icons/Visibility"
import ReactCountryFlag from "react-country-flag"
import GaugeChart from "react-gauge-chart"

import { BrandData } from "../common"

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
            alignItems: "flex-start"
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
                        <Typography variant="h6" gutterBottom>{value}</Typography>
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

interface Props {
    brand: BrandData
}

export default function OverviewTab({ brand }: Props) {
    const classes = useStyles()
    return (
        <Grid container spacing={2}>
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
            <Grid container item xs={9} spacing={3}>
                <GaugeChartContainer topLabel="Growth Score" value={97.56} previousValue={96.46}/>
                <GaugeChartContainer topLabel="Success Score" value={74.2} previousValue={74.6}/>
                <GaugeChartContainer topLabel="Sophistication Score" value={60} previousValue={42}/>
            </Grid>
        </Grid>
    )
}