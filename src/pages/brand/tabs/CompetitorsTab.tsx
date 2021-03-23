import React from "react"

import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import Typography from "@material-ui/core/Typography"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import DateRangeIcon from "@material-ui/icons/DateRange"
import GetAppIcon from "@material-ui/icons/GetApp"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import InfoIcon from "@material-ui/icons/Info"
import LanguageIcon from "@material-ui/icons/Language"
import SettingsIcon from "@material-ui/icons/Settings"
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"
import TrendingDownIcon from "@material-ui/icons/TrendingDown"
import TrendingUpIcon from "@material-ui/icons/TrendingUp"

import ReactCountryFlag from "react-country-flag"

import { ResponsiveBar } from "@nivo/bar"


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        tableHeader: {
            "& th": {
                textTransform: "uppercase",
                color: theme.palette.text.secondary,
                fontWeight: "bold",
                fontSize: "smaller"
            }
        },
        brandNameCellWrapper: {
            display: "flex",
            alignItems: "center",
            "& h6": {
                marginLeft: theme.spacing(1),
                fontSize: theme.typography.fontSize,
                fontWeight: "bold"
            }
        },
        lightSubtitle: {
            color: theme.palette.text.secondary,
            "& > strong": {
                color: "black"
            }
        },
        subtitleContainer: {
            marginTop: theme.spacing(4)
        },
        showMoreButtonContainer: {
            marginTop: theme.spacing(1),
            display: "flex",
            justifyContent: "center"
        }
    })
})

interface ScoreColumn {
    current: number
    previous: number
    status: "good" | "warn" | "bad"
}

interface TableRowData {
    avatar: string
    name: string
    flag: string
    url: string
    scalingScore: ScoreColumn
    revenueScore: ScoreColumn
    socialsScore: ScoreColumn
    facebookLikes: number
    igFollowers: number
    adsCount: number
}

interface ScoreCellProps {
    score: ScoreColumn
}

const useScoreCellStyles = makeStyles((theme: Theme) => {
    return createStyles({
        cellWrapper: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        },
        valueChip: {
            backgroundColor: (props: ScoreColumn) => props.status == "good" ? "#CBF4C9" : props.status == "warn" ? "#F6E5B9" : "default",
            color: (props: ScoreColumn) => props.status == "good" ? "#0B825D" : props.status == "warn" ? "#C44C35" : "default"
        },
        directionIcon: {
            color: (props: ScoreColumn) => {
                const percentChange = props.current - props.previous
                if (percentChange > 0) {
                    return "#0B825D"
                } else if (percentChange < 0) {
                    return "#CD3D64"
                } else {
                    return "default"
                }
            }
        }
    })
})

function ScoreCell(props: ScoreCellProps) {
    const classes = useScoreCellStyles(props.score)
    const percentChange = Math.round((props.score.current - props.score.previous) * 100) / 100
    let icon
    if (percentChange > 0) {
        icon = <TrendingUpIcon className={classes.directionIcon}/>
    } else if (percentChange == 0) {
        icon = <ArrowRightAltIcon className={classes.directionIcon}/>
    } else {
        icon = <TrendingDownIcon className={classes.directionIcon}/>
    }
    return (
        <TableCell>
            <div className={classes.cellWrapper}><Chip label={props.score.current} className={classes.valueChip}/> <span>{percentChange}%</span> {icon}</div>
        </TableCell>
    )
}

interface BrandBarChartRow {
    index: number
    scalingScore: number
    brandName: string
}

function BrandTable() {
    const classes = useStyles()
    const tableData: Array<TableRowData> = [
        {
            avatar: "/images/brands/tommyhilfiger/avatar.png",
            name: "Columbia Sportswear",
            flag: "US",
            url: "http://www.example.com/",
            scalingScore: {
                current: 79,
                previous: 77.9,
                status: "good"
            },
            revenueScore: {
                current: 81,
                previous: 83.1,
                status: "good"
            },
            socialsScore: {
                current: 78,
                previous: 78,
                status: "good"
            },
            facebookLikes: 335557,
            igFollowers: 137,
            adsCount: 1614
        },
        {
            avatar: "/images/brands/tommyhilfiger/avatar.png",
            name: "Tommy Hilfiger",
            flag: "US",
            url: "http://www.example.com/",
            scalingScore: {
                current: 76,
                previous: 74.9,
                status: "warn"
            },
            revenueScore: {
                current: 77,
                previous: 79.1,
                status: "warn"
            },
            socialsScore: {
                current: 70,
                previous: 70,
                status: "warn"
            },
            facebookLikes: 1803,
            igFollowers: 12473,
            adsCount: 11542
        },
        {
            avatar: "/images/brands/tommyhilfiger/avatar.png",
            name: "CNN",
            flag: "US",
            url: "http://www.example.com/",
            scalingScore: {
                current: 83,
                previous: 81.9,
                status: "warn"
            },
            revenueScore: {
                current: 87,
                previous: 89.1,
                status: "good"
            },
            socialsScore: {
                current: 81,
                previous: 81,
                status: "warn"
            },
            facebookLikes: 1307,
            igFollowers: 7306,
            adsCount: 6172
        },
        {
            avatar: "/images/brands/tommyhilfiger/avatar.png",
            name: "Target",
            flag: "US",
            url: "http://www.example.com/",
            scalingScore: {
                current: 60,
                previous: 58.9,
                status: "bad"
            },
            revenueScore: {
                current: 62,
                previous: 63.1,
                status: "warn"
            },
            socialsScore: {
                current: 62,
                previous: 62,
                status: "warn"
            },
            facebookLikes: 3859,
            igFollowers: 235,
            adsCount: 3117
        },
    ]
    const [sortByColumn, setSortByColumn] = React.useState<keyof TableRowData>("name")
    const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc")
    const createSortHandler = (column: keyof TableRowData) => (event: React.MouseEvent<unknown>) => {
        const isAsc = sortByColumn === column && sortDirection === "asc"
        setSortDirection(isAsc ? "desc" : "asc")
        setSortByColumn(column)
    }
    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        let aVal, bVal
        if (["scalingScore", "revenueScore", "socialsScore"].indexOf(orderBy as string) !== -1) {
            aVal = (a[orderBy] as unknown as ScoreColumn).current
            bVal = (b[orderBy] as unknown as ScoreColumn).current
        } else {
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
      ): (a: { [key in Key]: number | string | ScoreColumn }, b: { [key in Key]: number | string | ScoreColumn }) => number {
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
    function handleBrandURLIconButtonClicked(brandRow: TableRowData) {
        Object.assign(
            document.createElement("a"), {
                target: "_blank",
                href: brandRow.url
            }
        ).click()
    }
    return (
        <TableContainer>
            <Table>
                <TableHead className={classes.tableHeader}>
                    <TableRow>
                        <TableCell><TableSortLabel active={sortByColumn == "name"} direction={sortByColumn == "name" ? sortDirection : "asc"}  onClick={createSortHandler("name")}>Brand Name</TableSortLabel></TableCell>
                        <TableCell></TableCell>
                        <TableCell><IconButton size="small"><InfoIcon/></IconButton><TableSortLabel active={sortByColumn == "scalingScore"} direction={sortByColumn == "scalingScore" ? sortDirection : "asc"} onClick={createSortHandler("scalingScore")}>Scaling Score</TableSortLabel></TableCell>
                        <TableCell><IconButton size="small"><InfoIcon/></IconButton><TableSortLabel active={sortByColumn == "revenueScore"} direction={sortByColumn == "revenueScore" ? sortDirection : "asc"} onClick={createSortHandler("revenueScore")}>Revenue Score</TableSortLabel></TableCell>
                        <TableCell><IconButton size="small"><SettingsIcon/></IconButton><TableSortLabel active={sortByColumn == "socialsScore"} direction={sortByColumn == "socialsScore" ? sortDirection : "asc"} onClick={createSortHandler("socialsScore")}>Socials</TableSortLabel></TableCell>
                        <TableCell><TableSortLabel active={sortByColumn == "facebookLikes"} direction={sortByColumn == "facebookLikes" ? sortDirection : "asc"} onClick={createSortHandler("facebookLikes")}>FB Likes</TableSortLabel></TableCell>
                        <TableCell><TableSortLabel active={sortByColumn == "igFollowers"} direction={sortByColumn == "igFollowers" ? sortDirection : "asc"} onClick={createSortHandler("igFollowers")}>IG Followers</TableSortLabel></TableCell>
                        <TableCell><TableSortLabel active={sortByColumn == "adsCount"} direction={sortByColumn == "adsCount" ? sortDirection : "asc"} onClick={createSortHandler("adsCount")}>Ads Count</TableSortLabel></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(tableData, getComparator(sortDirection, sortByColumn)).map((rowData, index) => <TableRow key={index}>
                        <TableCell><div className={classes.brandNameCellWrapper}><Avatar src={rowData.avatar}/> <Typography variant="h6" noWrap>{rowData.name}</Typography></div></TableCell>
                        <TableCell><ReactCountryFlag countryCode={rowData.flag} svg/> <IconButton onClick={() => handleBrandURLIconButtonClicked(rowData)}><LanguageIcon/></IconButton></TableCell>
                        <ScoreCell score={rowData.scalingScore}/>
                        <ScoreCell score={rowData.revenueScore}/>
                        <ScoreCell score={rowData.socialsScore}/>
                        <TableCell>{rowData.facebookLikes}</TableCell>
                        <TableCell>{rowData.igFollowers}</TableCell>
                        <TableCell>{rowData.adsCount}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default function CompetitorsTab() {
    const classes = useStyles()
    const brandNames = ["Apple", "Google", "Coca-Cola", "Microsoft", "Toyota", "IBM", "Samsung", "Amazon", "Mercedes-Benz", "GE", "BMW", "McDonald's", "Disney", "Intel", "Facebook", "Cisco", "Oracle", "Nike", "Louis Vuitton", "H&M", "Honda", "SAP", "Pepsi", "Gillette", "American", "Express", "IKEA", "Zara", "Pampers", "UPS", "Budweiser", "J.P.", "Morgan", "eBay", "Ford", "Herm\xc3\xa8s", "Hyundai", "Nescafe", "Accenture", "Audi", "Kellogg's", "Volkswagen", "Philips", "Canon", "Nissan", "Hewlett", "Packard", "Enterprise", "L'Or\xc3\xa9al", "AXA", "HSBC", "HP", "Citi", "Porsche", "Allianz", "Siemens", "Gucci", "Goldman", "Sachs", "Danone", "Nestl\xc3\xa9", "Colgate", "Sony", "3M", "adidas", "Visa", "Cartier", "Adobe", "Starbucks", "Morgan", "Stanley", "Thomson", "Reuters", "Lego", "Panasonic", "Kia", "Santander", "Discovery", "Huawei", "Johnson & Johnson", "Tiffany & Co.", "KFC", "MasterCard", "DHL", "Land", "Rover", "FedEx", "Harley-Davidson", "Prada", "Caterpillar", "Burberry", "Xerox", "Jack", "Daniel's", "Sprite", "Heineken", "Mini", "Dior", "PayPal", "John", "Deere", "Shell", "Corona", "MTV", "Johnnie", "Walker", "Smirnoff", "Mo\xc3\xabt", "&", "Chandon", "Ralph", "Lauren", "Lenovo", "Tesla"]
    const barData = new Array(50).fill(0).map((_, index) => ({brandName: brandNames[index], scalingScore: Math.round(Math.random() * 10 * 100) / 100, index}))
    return (
        <Grid container>
            <Grid container item xs={12}>
                <Grid item xs={3}>
                    <Typography variant="h5">Similar brands</Typography>
                </Grid>
                <Grid container item xs={9} justify="flex-end">
                    <Button startIcon={<DateRangeIcon/>} endIcon={<KeyboardArrowDownIcon/>} variant="outlined" size="small">Last 6 months</Button>
                    <Button endIcon={<KeyboardArrowDownIcon/>} variant="outlined" size="small" style={{marginLeft: 8}}>10 competitors</Button>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ height: "400px"}}>
                <ResponsiveBar
                    data={barData}
                    keys={[ "scalingScore" ]}
                    indexBy="index"
                    margin={{ top: 16, right: 16, bottom: 32, left: 16 }}
                    padding={0.3}
                    valueScale={{ type: "linear" }}
                    indexScale={{ type: "band", round: true }}
                    colors="#DEDFE2"
                    borderColor={{ from: "color", modifiers: [ [ "darker", 1.6 ] ] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                    }}
                    label={(rowData) => `${(rowData.data as unknown as BrandBarChartRow).brandName}: ${rowData.value}`}
                    labelTextColor={{ from: "color", modifiers: [ [ "darker", 1.6 ] ] }}
                    tooltip={({ data, value, color }) => (
                        <strong style={{ color }}>
                            {data.brandName}: {value}
                        </strong>
                    )}
                    theme={{
                        tooltip: {
                            container: {
                                background: "#333",
                            },
                        },
                    }}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </Grid>
            <Grid item xs={12}>
                <BrandTable/>
            </Grid>
            <Grid container item xs={12} className={classes.subtitleContainer} alignItems="center" justify="space-between">
                <Grid item xs={5}>
                    <Typography variant="h5">People also like</Typography>
                    <Typography variant="subtitle1" className={classes.lightSubtitle}><strong>107+</strong> brands appeal to the same people that like Tommy Hilfiger</Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "right" }}>
                    <Button variant="outlined" size="small" startIcon={<GetAppIcon/>}>Download</Button>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.subtitleContainer}>
                <BrandTable/>
                <div className={classes.showMoreButtonContainer}>
                    <Button variant="outlined" size="small">Show More</Button>
                </div>
            </Grid>
            <Grid container item xs={12} className={classes.subtitleContainer} alignItems="center" justify="space-between">
                <Grid item xs={5}>
                    <Typography variant="h5">Commonly sold with</Typography>
                    <Typography variant="subtitle1" className={classes.lightSubtitle}><strong>19</strong> brands that are commonly sold with Tommy Hilfiger</Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "right" }}>
                    <Button variant="outlined" size="small" startIcon={<GetAppIcon/>}>Download</Button>
                </Grid>
                <Grid item xs={12}>
                    <BrandTable/>
                </Grid>
            </Grid>
        </Grid>
        )
    }
