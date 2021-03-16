import React from "react"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import StarIcon from "@material-ui/icons/Star"
import ShareIcon from "@material-ui/icons/Share"

import { BrandData } from "./common"
import TabPanel from "./tabs/TabPanel"
import OverviewTab from "./tabs/OverviewTab"


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    }
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        tabList: {
            borderTop: "1px solid #E3E8EE",
            borderBottom: "1px solid #E3E8EE",
            "& .MuiTab-root": {
                minWidth: "inherit"
            }
        }
    })
})

interface Props {
    brand: BrandData
}

export default function BrandTabs({ brand }: Props) {
    const classes = useStyles()
    const [tabIndex, setTabIndex] = React.useState(0)
    const [brandFavorited, setBrandFavorited] = React.useState(false)

    function handleTabChanged(event: React.ChangeEvent<unknown>, newTabIndex: number) {
        setTabIndex(newTabIndex)
    }

    return (
        <Grid container item xs={12}>
            <Grid item xs={10}>
                <Tabs indicatorColor="primary" variant="scrollable" value={tabIndex} onChange={handleTabChanged} aria-label="Brand tabs" className={classes.tabList}>
                    <Tab label="Overview" {...a11yProps(0)} />
                    <Tab label="Social" {...a11yProps(1)} />
                    <Tab label="Competitors" {...a11yProps(2)} />
                    <Tab label="Ads" {...a11yProps(3)} />
                    <Tab label="Growth" {...a11yProps(4)} />
                    <Tab label="Store" {...a11yProps(5)} />
                    <Tab label="Products" {...a11yProps(6)} />
                </Tabs>
                <TabPanel value={tabIndex} index={0}>
                    <OverviewTab brand={brand}/>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    Social Tab
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    Competitors Tab
                </TabPanel>
                <TabPanel value={tabIndex} index={3}>
                    Ads Tab
                </TabPanel>
                <TabPanel value={tabIndex} index={4}>
                    Growth Tab
                </TabPanel>
                <TabPanel value={tabIndex} index={5}>
                    Store Tab
                </TabPanel>
                <TabPanel value={tabIndex} index={6}>
                    Products Tab
                </TabPanel>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.tabList}>
                    <Grid container alignItems="center" justify="flex-end">
                        <Grid item xs={3}>
                            <IconButton onClick={() => setBrandFavorited(!brandFavorited)}>
                                {brandFavorited ? <StarIcon/> : <StarBorderIcon/>}
                            </IconButton>
                        </Grid>
                        <Grid item xs={7}>
                            <Button variant="outlined" startIcon={<ShareIcon/>}>Share</Button>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    )
}