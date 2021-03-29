import React from "react"

import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import Typography from "@material-ui/core/Typography"
import { makeStyles, createStyles, Theme} from "@material-ui/core/styles"
import CheckIcon from "@material-ui/icons/Check"
import GetAppIcon from "@material-ui/icons/GetApp"
import InfoIcon from "@material-ui/icons/Info"
import LaunchIcon from "@material-ui/icons/Launch"

import { growthTableData, GrowthTableDataRow, SimilarFollowedBrands } from "./data"
import { openLinkInNewTab } from "../../../utils"

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        headerContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        tableContainer: {
            marginTop: theme.spacing(2)
        },
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
        iconCell: {
            display: "flex",
            alignItems: "center",
            "& .MuiSvgIcon-root": {
                marginRight: theme.spacing(1)
            }
        },
        followsCell: {
            color: "#24B47E"
        },
        similarFollowedCell: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "& button:first-child": {
                marginRight: theme.spacing(1)
            }
        }
    })
})

export default function GrowthTab() {
    const classes = useStyles()
    const [sortByColumn, setSortByColumn] = React.useState<keyof GrowthTableDataRow>("username")
    const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc")
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(15)
    function formatNumber(n: number) {
        return new Intl.NumberFormat().format(n)
    }
    const createSortHandler = (column: keyof GrowthTableDataRow) => (event: React.MouseEvent<unknown>) => {
        const isAsc = sortByColumn === column && sortDirection === "asc"
        setSortDirection(isAsc ? "desc" : "asc")
        setSortByColumn(column)
    }
    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        let aVal, bVal
        if (orderBy == "similarFollowed") {
            aVal = (a[orderBy] as unknown as SimilarFollowedBrands).brands.length
            bVal = (b[orderBy] as unknown as SimilarFollowedBrands).brands.length
        }
        else if (orderBy == "username") {
            aVal = (a[orderBy] as unknown as string).toLowerCase()
            bVal = (b[orderBy] as unknown as string).toLowerCase()
        }
        else if (orderBy == "brand") {
            aVal = a[orderBy] ? 1 : -1
            bVal = b[orderBy] ? 1 : -1
        }
        else {
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
      ): (a: { [key in Key]: number | string | SimilarFollowedBrands }, b: { [key in Key]: number | string | SimilarFollowedBrands }) => number {
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
    function handlePageChanged(event: unknown, page: number) {
        setPage(page)
    }
    function handleRowsPerPageChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    return (
        <Grid container>
            <Grid item xs={12} className={classes.headerContainer}>
                <div>
                    <Typography variant="h5">Recommended influncers</Typography>
                    <Typography variant="caption"><strong>2,838</strong> influncers likely interested in Tommy Hilfiger</Typography>
                </div>
                <Button variant="outlined" startIcon={<GetAppIcon/>}>Download</Button>
            </Grid>
            <Grid item xs={12}>
                <TableContainer className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortByColumn == "username"}
                                        onClick={createSortHandler("username")}
                                        direction={sortByColumn == "username" ? sortDirection : "asc"}>
                                        Instagram Username
                                    </TableSortLabel></TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortByColumn == "followers"}
                                        onClick={createSortHandler("followers")}
                                        direction={sortByColumn == "followers" ? sortDirection : "asc"}>
                                        Followers
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortByColumn == "engageRate"}
                                        onClick={createSortHandler("engageRate")}
                                        direction={sortByColumn == "engageRate" ? sortDirection : "asc"}>
                                            <div className={classes.iconCell}>
                                                <InfoIcon color="action"/>Engage Rate
                                            </div>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortByColumn == "avgLikes"}
                                        onClick={createSortHandler("avgLikes")}
                                        direction={sortByColumn == "avgLikes" ? sortDirection : "asc"}>
                                        AVG. Likes
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortByColumn == "avgComments"}
                                        onClick={createSortHandler("avgComments")}
                                        direction={sortByColumn == "avgComments" ? sortDirection : "asc"}>
                                        AVG. Comments
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortByColumn == "brand"}
                                        onClick={createSortHandler("brand")}
                                        direction={sortByColumn == "brand" ? sortDirection : "asc"}>
                                        Brand
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Follows</TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortByColumn == "similarFollowed"}
                                        onClick={createSortHandler("similarFollowed")}
                                        direction={sortByColumn == "similarFollowed" ? sortDirection : "asc"}>
                                        Similar Followed Brands
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort(growthTableData, getComparator(sortDirection, sortByColumn))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div className={classes.avatarCell}>
                                            <Avatar variant="circular" src={row.avatar as string}/> <strong>{row.username}</strong>    
                                        </div>
                                    </TableCell>
                                    <TableCell>{formatNumber(row.followers as number)}</TableCell>
                                    <TableCell>{formatNumber(row.engageRate as number)}</TableCell>
                                    <TableCell>{formatNumber(row.avgLikes as number)}</TableCell>
                                    <TableCell>{formatNumber(row.avgComments as number)}</TableCell>
                                    <TableCell>{row.brand ? <Link href={row.brand as string} target="_blank"><LaunchIcon color="action"/></Link> : null}</TableCell>
                                    <TableCell className={classes.followsCell}>{row.follows ? <CheckIcon/> : null}</TableCell>
                                    <TableCell>
                                        <div className={classes.similarFollowedCell}>
                                            <span>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => openLinkInNewTab((row.similarFollowed as SimilarFollowedBrands).brands[0].link)}>
                                                    {(row.similarFollowed as SimilarFollowedBrands).brands[0].name}</Button>
                                                +{(row.similarFollowed as SimilarFollowedBrands).brands.length -1}
                                            </span>
                                            <Button variant="outlined" size="small" onClick={() => openLinkInNewTab((row.similarFollowed as SimilarFollowedBrands).link)}>View All</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[10, 15, 20]}
                    count={growthTableData.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onChangePage={handlePageChanged}
                    onChangeRowsPerPage={handleRowsPerPageChanged}
                    />
            </Grid>
        </Grid>
    )
}
