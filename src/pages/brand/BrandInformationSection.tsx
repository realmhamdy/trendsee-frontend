import React,{useEffect} from "react"

import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import {RootStore} from "../../Redux/store"
import { BrandData } from "./common"

import {useDispatch,useSelector} from "react-redux"

import { BrandDetails } from "./common"

import { getAbsoluteURL } from "../../utils"

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        coverImg: {
            width: "100%",
            height:"500px"
        },
        avatarImg: {
            width: "100%",
            height: "100%",
            marginTop: -1 * theme.spacing(2)
        },
        brandTextDataContainer: {
            paddingLeft: theme.spacing(4)
        },
        brandTitle: {
            paddingTop: theme.spacing(2)
        },
        brandSubtitle: {
            paddingLeft: theme.spacing(1)
        },
        brandTagsContainer: {
            "& > *": {
                margin: theme.spacing(0.5),
                borderRadius: 4
            }
        },
        circleSeparator: {
            fontSize: "xx-small",
            verticalAlign: "middle"
        },
        siteName: {
            marginTop: theme.spacing(1)
        }
    })
})

interface Props {
    brand: BrandData
}

export default function BrandInformationSection({brand}: Props) {
    const classes = useStyles()
    const brandname:string = useSelector(((state:RootStore) => state.PageReduser["brandname"]))
    const BrandItemDetails: BrandDetails = useSelector(((state:RootStore) => state.PageReduser["BrandItemDetails"]))

   

   
    function renderTags() {
        return brand.tags.map((tag, index) => (
            <Chip label={tag} key={index} />
        ))
    }

    function openBrandPage(brand: BrandData) {
        Object.assign(
            document.createElement("a"),
            {
                target: "_blank",
                href: `${BrandItemDetails["BrandSite"][0]}`
            }).click()
    }

    return (
        <>
            {/* Cover row */}
            <Grid item xs={12}>
                <img src={BrandItemDetails["CoverImage"][0]} alt="brand cover" className={classes.coverImg} />
            </Grid>
            {/* Information row */}
            <Grid container item xs={12}>
                {/* Avatar */}
                <Grid item xs={2}>
                    <Avatar src={BrandItemDetails["ProfileImage"][0]} variant="circular" className={classes.avatarImg} />
                </Grid>
                {/* Text information */}
                <Grid container item xs={7} className={classes.brandTextDataContainer} alignItems="flex-start">
                    <Grid item xs={12}>
                        <Typography variant="h3" className={classes.brandTitle}>{BrandItemDetails["BrandName"][0]}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" className={classes.brandSubtitle}>{BrandItemDetails["Address"][0]}  </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.brandTagsContainer}>
                        {/* {renderTags()}   */}
                        {BrandItemDetails["Categories"][0]}
                    </Grid>
                </Grid>
                {/* Brand link */}
                <Grid container item xs={3} alignItems="center" justify="flex-end">
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" onClick={() => openBrandPage(brand)}>Visit Site</Button>
                        <Typography align="center" variant="subtitle2" className={classes.siteName}>{BrandItemDetails["BrandSite"][0]}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}