import React from "react"

import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import DateRangeIcon from "@material-ui/icons/DateRange"
import KeyboardDownArrowIcon from "@material-ui/icons/KeyboardArrowDown"
import SettingsIcon from "@material-ui/icons/Settings"

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        chartGridControllerButtons: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
        },
        editChartsButton: {
            marginLeft: theme.spacing(2)
        }
    })
})

export default function ReportsOverviewHeader() {
    const classes = useStyles()
    return (
        <Grid container item xs={12}>
            <Grid item xs={3}>
                <Typography variant="h5">Reports Overview</Typography>
            </Grid>
            <Grid item xs={9} className={classes.chartGridControllerButtons}>
                <ButtonGroup aria-label="outlined primary button group">
                    <Button size="small" endIcon={<KeyboardDownArrowIcon/>}>Last 3 months</Button>
                    <Button size="small" startIcon={<DateRangeIcon/>}>Nov, 4 2020 - Feb, 3 2021</Button>
                </ButtonGroup>
                <Button startIcon={<SettingsIcon/>} variant="outlined" color="default" size="small" className={classes.editChartsButton}>Edit charts</Button>
            </Grid>
        </Grid>
    )
}