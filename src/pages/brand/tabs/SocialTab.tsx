import React from "react"
import {useState, useEffect} from "react"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import Paper from "@material-ui/core/Paper"
import { makeStyles, createStyles, Theme  } from "@material-ui/core/styles"
import CheckIcon from "@material-ui/icons/Check"
import Typography from "@material-ui/core/Typography"
import DateRangeIcon from "@material-ui/icons/DateRange"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"

import {useSelector} from "react-redux"

import {RootStore} from "../../../Redux/store"

import { ResponsiveLine } from "@nivo/line"

import { generateRandomLineChartData } from "../common"

interface PaperStyleProps {
    isActive: boolean
}

const usePaperButtonStyles = makeStyles((theme: Theme) => {
    return createStyles({
        paperButton: {
            marginTop: theme.spacing(2),
            padding: theme.spacing(2),
            cursor: "pointer",
            border: ({ isActive }: PaperStyleProps) => isActive ? `2px solid ${theme.palette.primary.dark}` : ""
        },
        paperButtonTitle: {
            color: theme.palette.text.secondary
        },
        paperButtonContent: {
            color: ({ isActive }: PaperStyleProps) => isActive ? theme.palette.primary.dark : "inherit"
        }
    })
})

interface PaperButtonProps {
    title: string
    content: string
    isActive: boolean
    onClick: () => void
}

function PaperButton({ title, content, isActive, onClick }: PaperButtonProps) {
    const classes = usePaperButtonStyles({ isActive })
    return (
        <Grid item xs={12}>
            <Paper variant={isActive ? "elevation" : "outlined"} className={classes.paperButton} onClick={onClick}>
                <Typography variant="subtitle1" gutterBottom className={classes.paperButtonTitle}>{title}</Typography>
                <Typography variant="h4" className={classes.paperButtonContent}>{content}</Typography>
            </Paper>
        </Grid>
    )
}

interface MenuItemWithCheckmarkProps {
    text: string
    onClick: () => void
    checked: boolean
}

function MenuItemWithCheckmark({ text, onClick, checked }: MenuItemWithCheckmarkProps) {
    return (
        <MenuItem onClick={onClick}>
            <ListItemText primary={text}/>
            {checked ? 
                <ListItemSecondaryAction>
                    <CheckIcon fontSize="small"/>
                </ListItemSecondaryAction>
                : ""
            }
        </MenuItem>
    )
}

interface PaperButtonData {
    title: string
    content: string
}

interface PaperButtonDataCollection {
    data: Array<PaperButtonData>
    onClick: (index: number) => void
}

interface fbdata{
    data : [{title:string,content:string},{title:string,content:string},{title:string,content:string},{title:string,content:string},{title:string,content:string}]
}

function PaperButtonsCollection({ data, onClick }: PaperButtonDataCollection) {
    const [activePaperIndex, setActivePaperIndex] = React.useState(0)
    function handlePaperButtonClicked(index: number) {
        setActivePaperIndex(index)
        onClick(index)
    }
    return (
        <>
            {data.map((dataItem, index) => 
                <PaperButton key={index} title={dataItem.title} content={dataItem.content} isActive={activePaperIndex == index} onClick={() => handlePaperButtonClicked(index)}/>)}
        </>
    )
}

export default function SocialTab() {
    const [menuAnchorElem, setMenuAnchorElem] = useState<null | HTMLElement>(null)
    const [checkedMenuItemIndex, setCheckedMenuItemIndex] = useState(0)
    const [activePaperButtonIndex, setActivePaperButtonIndex] = useState(0)

    const FBLikes: number[] = useSelector(((state:RootStore) => state.PageReduser["brandDetails"]["FBLikes"]))
    const FbFollowers: number[] = useSelector(((state:RootStore) => state.PageReduser["brandDetails"]["FbFollowers"]))
    const Instafollowers: number[] = useSelector(((state:RootStore) => state.PageReduser["brandDetails"]["Instafollowers"]))
    const NumberFBads: number[] = useSelector(((state:RootStore) => state.PageReduser["brandDetails"]["NumberFBads"]))
    const selectedBrand: number = useSelector(((state:RootStore) => state.PageReduser["selectBrand"]))

    function handleMenuButtonClicked(event: React.MouseEvent<HTMLButtonElement>) {
        setMenuAnchorElem(event.currentTarget)
    }
    function handleMenuClosed() {
        setMenuAnchorElem(null)
    }
    function handleMenuItemSelected(index: number) {
        setCheckedMenuItemIndex(index)
        setActivePaperButtonIndex(0)
        handleMenuClosed()
    }
    const menuItems = ["Social", "Reviews", "Reddit"]
    const paperColumnButtonCounts = [5, 6, 2]
    const chartsData = React.useMemo(
        () => menuItems.map((menuItem, index) => new Array(paperColumnButtonCounts[index]).fill(0).map((value, index) => generateRandomLineChartData(index))),
        [])
    
    const fbRenderData:any[] = [
        { title: "Facebook followers", content: FbFollowers[selectedBrand] },
        { title: "Facebook likes growth", content:"+6,3%" },
        { title: "Instagram followers", content: Instafollowers[selectedBrand]},
        { title: "Instagram followers growth", content: "-37" },
        { title: "Ads count", content: NumberFBads[selectedBrand] }
    ]  
    
    return (
        <Grid container>
            <Grid item xs={3}>
                <Grid container item xs={12} justify="space-between">
                    <Button variant="outlined" size="small" endIcon={<KeyboardArrowDownIcon/>} aria-haspopup="true" onClick={handleMenuButtonClicked}>{menuItems[checkedMenuItemIndex]}</Button>
                    <Menu id="socials-menu" anchorEl={menuAnchorElem} keepMounted open={Boolean(menuAnchorElem)} onClose={handleMenuClosed}>
                        {menuItems.map((menuItem, index) => <MenuItemWithCheckmark key={index} text={menuItem} onClick={() => handleMenuItemSelected(index)} checked={checkedMenuItemIndex == index}/>)}
                    </Menu>
                    <Button variant="outlined" size="small" startIcon={<DateRangeIcon/>} endIcon={<KeyboardArrowDownIcon/>}>Last 12 months</Button>
                </Grid>
                {
                    checkedMenuItemIndex == 0 ?
                        <PaperButtonsCollection
                            data={fbRenderData}
                            onClick={setActivePaperButtonIndex}/>
                    : checkedMenuItemIndex == 1 ?
                        <PaperButtonsCollection
                            data={[
                                { title: "Total reviews", content: "55,976" },
                                { title: "TrustPilot reviews", content: "291" },
                                { title: "Product reviews", content: "11,542" },
                                { title: "Facebook reviews", content: "207" },
                                { title: "Google reviews", content: "9,030" },
                                { title: "Amazon reviews", content: "13,946" }
                            ]}
                            onClick={setActivePaperButtonIndex}/>
                    :   <PaperButtonsCollection
                            data={[
                                { title: "Total mentions", content: "3,964" },
                                { title: "Reddit mentions growth", content: "+6,3%" }
                            ]}
                            onClick={(setActivePaperButtonIndex)}/>
                }
            </Grid>
            <Grid item xs={9} style={{maxHeight: "620px"}}>
                <ResponsiveLine
                    data={chartsData[checkedMenuItemIndex][activePaperButtonIndex]}
                    margin={{top: 16, bottom: 24, left: 24, right: 16}}
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
                    enableGridY={false}
                    enableArea={true}/>
            </Grid>
        </Grid>
    )
}
