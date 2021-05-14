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

import Actions from "../Actions/PageActions"

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

    const dispatch = useDispatch()
    
    const BrandItemDetails: BrandDetails = useSelector(((state:RootStore) => state.PageReduser["BrandItemDetails"]))

    // const BrandSessionStorage= JSON.parse(sessionStorage.getItem("BrandItemDetails") || "{}")
    console.log("BrandName",BrandItemDetails["BrandName"][0])

    if(BrandItemDetails["BrandName"][0]){
        sessionStorage.setItem("BrandName",BrandItemDetails["BrandName"][0])
    }else{
        const BrandData =   sessionStorage.getItem("BrandName")
        if(BrandData !== null){
            const data = BrandData
            console.log("BrandData",BrandData)
           dispatch(Actions.GetSelectedBrandData(data))
        }
      
    }
    

   
    function renderTags(data:string[]) {
        return data.map((tag, index) => (
            <Chip label={tag} key={index} />
        ))
    }

    function openBrandPage() {
        if(BrandItemDetails["BrandSite"][0] !== "NULL"){
            Object.assign(
                document.createElement("a"),
                {
                    target: "_blank",
                    href: `${BrandItemDetails["BrandSite"][0]}`
                }).click()
        }
       
    }

    return (
        <>
            {/* Cover row */}
            <Grid item xs={12}>
                {(!BrandItemDetails["CoverImage"][0] || BrandItemDetails["CoverImage"][0] === "NULL") ?  "" :<img src={BrandItemDetails["CoverImage"][0]} alt="brand cover" className={classes.coverImg} />}
               
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
                        <Typography variant="subtitle1" className={classes.brandSubtitle}>
                        {(BrandItemDetails["Address"][0] === "NULL") ?  "" : BrandItemDetails["Address"][0]}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.brandTagsContainer}>
                        {/* {renderTags()}   */}
                       
                        {(!BrandItemDetails["Categories"][0] ||BrandItemDetails["Categories"][0] === "NULL") ?  "" : renderTags(BrandItemDetails["Categories"])}
                    </Grid>
                </Grid>
                {/* Brand link */}
                <Grid container item xs={3} alignItems="center" justify="flex-end">
                    <Grid item xs={4}>
                        {(BrandItemDetails["BrandSite"][0] === "NULL"||BrandItemDetails["BrandSite"][0] === "null"||BrandItemDetails["BrandSite"][0] === null||BrandItemDetails["BrandSite"][0] === "") ? 
                        ""
                        : <Button variant="contained" color="primary" onClick={() => openBrandPage()}>Visit Site</Button>}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}