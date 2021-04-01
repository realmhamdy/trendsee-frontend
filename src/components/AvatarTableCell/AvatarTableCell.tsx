import React from "react"

import Avatar from "@material-ui/core/Avatar"
import TableCell from "@material-ui/core/TableCell"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        avatarCell: {
            display: "flex",
            alignItems: "center",
            "& .MuiAvatar-root": {
                marginRight: theme.spacing(1)
            },
            "& strong": {
                fontSize: "larger"
            }
        },
    })
})

interface Props {
    avatar: string
    label: string
}

export default function AvatarTableCell({ avatar, label }: Props) {
    const classes = useStyles()
    return (
        <TableCell>
            <div className={classes.avatarCell}>
                <Avatar variant="circular" src={avatar}/> <strong>{label}</strong>    
            </div>
        </TableCell>
    )
}
