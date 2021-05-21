import React from "react"
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"

import Avatar from "@material-ui/core/Avatar"
import TableCell from "@material-ui/core/TableCell"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Actions from "../../pages/Actions/PageActions"

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
  const history = useHistory()
  const dispatch = useDispatch()
  const redirectPage = (name: string) => {
    history.push(`/brand/${name.replace(/ /g, "-")}`)
    dispatch({ type: "brandName", payload: name })
    dispatch(Actions.GetSelectedBrandData(name))
    dispatch(Actions.GetProductsData(name))
  }
  return (
    <TableCell>
      <div className={classes.avatarCell}>
        <Avatar style={{ cursor: "pointer" }} onClick={() => redirectPage(label)} variant="circular" src={avatar} />
        <strong style={{ cursor: "pointer" }} onClick={() => redirectPage(label)}>{label}</strong>
      </div>
    </TableCell>
  )
}
