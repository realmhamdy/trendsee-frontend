import React from "react"

import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import FormControl from "@material-ui/core/FormControl"
import Link from "@material-ui/core/Link"
import MenuItem from "@material-ui/core/MenuItem"
import Paper from "@material-ui/core/Paper"
import Select from "@material-ui/core/Select"
import Typography from "@material-ui/core/Typography"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import LaunchIcon from "@material-ui/icons/Launch"

import { productsData } from "./data"

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        mainContainer: {
            marginTop: theme.spacing(2),
        },
        header: {
            "& span": {
                color: theme.palette.text.secondary
            }
        },
        productsContainer: {
            marginTop: theme.spacing(2)
        },
        productPaper: {
            padding: theme.spacing(1),
            display: "flex",
            flexDirection: "column",
            "& > *:not(last-child)": {
                marginBottom: theme.spacing(1)
            },
            "& .MuiAvatar-root": {
                width: "100%",
                height: "100%"
            }
        },
        productHeaderContainer: {
            display: "flex",
            alignItems: "center",
            "& a": {
                lineHeight: 0,
                marginLeft: theme.spacing(1)
            }
        }
    })
})

export default function ProductsTab() {
    const classes = useStyles()
    const [productsDropdownValue, setProductsDropdownValue] = React.useState("all")
    const [hoveredProductIndex, setHoveredProductIndex] = React.useState<number | null>(null)
    function handleMouseEnteredProduct(index: number) {
        setHoveredProductIndex(index)
    }
    function handleMouseLeftProduct() {
        setHoveredProductIndex(null)
    }
    function handleProductsDropdownChanged(event: React.ChangeEvent<{ value: unknown }>) {
        setProductsDropdownValue(event.target.value as string)
    }
    return (
        <Grid container className={classes.mainContainer}>
            <Grid container item xs={12} alignItems="center" justify="space-between">
                <Typography variant="h5" className={classes.header}>Product Reviews <Typography variant="h6" component="span">~3430 products</Typography></Typography>
                <FormControl variant="outlined" size="small">
                    <Select
                        value={productsDropdownValue}
                        onChange={handleProductsDropdownChanged}>
                        <MenuItem value="all">All products</MenuItem>
                        <MenuItem value="else">Something else</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid container item xs={12} spacing={2} className={classes.productsContainer}>
                {productsData.map((product, index) => (
                    <Grid item xs={3} key={index}>
                        <Paper
                            variant={hoveredProductIndex == index ? "elevation" : "outlined"}
                            elevation={4}
                            onMouseEnter={() => handleMouseEnteredProduct(index)}
                            onMouseLeave={handleMouseLeftProduct}
                            className={classes.productPaper}>
                            <Typography variant="subtitle1">
                                <div className={classes.productHeaderContainer}>
                                    <span>{product.brandName}</span>
                                     <Link href={product.url} target="_blank"><LaunchIcon color="action" fontSize="small"/></Link>
                                </div>
                            </Typography>
                            <Avatar variant="square" src={product.image}/>
                            <Typography variant="subtitle2">{product.name}</Typography>
                            <Typography variant="subtitle1">{product.price}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}
