import React from "react"

import Chip from "@material-ui/core/Chip"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { ResponsiveLine } from "@nivo/line"

import { generateRandomLineChartData } from "../common"

interface LineChartChipProps {
    value: number
}

const useLineChartStyles = makeStyles((theme: Theme) => {
    return createStyles({
        lineChartContainer: {
            height: "200px",
            position: "relative"
        },
        lineChartHeaderNumber: {
            position: "absolute",
            top: "0px",
            left: theme.spacing(1),
            opacity: 0.6,
            zIndex: 1000,
            "&:hover": {
                opacity: 1
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

export interface LineChartContainerProps {
    change: number
    headerText: string
    headerNumber: string
    id: number
}

export default function LineChartContainer({ change, headerText, headerNumber, id }: LineChartContainerProps) {
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
        <>
            <div className={classes.lineChartHeader}>
                <Typography variant="subtitle2" className={classes.lineChartTitleText}>{"pizza"}</Typography>
                <Chip label={changeText} className={classes.lineChartChip}/>
            </div>
            <div className={classes.lineChartContainer}>
                <Typography variant="h6" className={classes.lineChartHeaderNumber}>{123}</Typography>
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
        </>
    )
}
