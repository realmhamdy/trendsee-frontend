import React from "react"

import Chip from "@material-ui/core/Chip"
import TableCell from "@material-ui/core/TableCell"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"
import TrendingDownIcon from "@material-ui/icons/TrendingDown"
import TrendingUpIcon from "@material-ui/icons/TrendingUp"

import { ScoreColumn } from "../../utils"

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
            backgroundColor: (props: ScoreColumn) => props.status == "good" ? "#CBF4C9" : props.status == "warn" ? "#F6E5B9" : "#FEE2DD",
            color: (props: ScoreColumn) => props.status == "good" ? "#0B825D" : props.status == "warn" ? "#C44C35" : "#CD3D64"
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

export default function ScoreTableCell(props: ScoreCellProps) {
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
