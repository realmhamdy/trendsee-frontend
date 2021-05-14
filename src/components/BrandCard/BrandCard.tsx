import React, { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import { useHistory, Link as RouterLink } from "react-router-dom"

import FacebookIcon from "@material-ui/icons/Facebook"
import LanguageIcon from "@material-ui/icons/Language"
import RedditIcon from "@material-ui/icons/Reddit"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import StarsIcon from "@material-ui/icons/Stars"
import ReactCountryFlag from "react-country-flag"
import { RootStore } from "../../Redux/store"
import Instagram from "@material-ui/icons/Instagram"
import Actions from "../../pages/Actions/PageActions"

interface Score {
    title: string
    score: number,
    status: "good" | "bad"
}

interface ScoreChipProps {
    score: Score
}

const useChipStyles = makeStyles((theme: Theme) => {
    return createStyles({
        scoreChip: {
            backgroundColor: (props: Score) => props.status == "good" ? "#CBF4C9" : "#F6E5B9",
            color: (props: Score) => props.status == "good" ? "#0B825D" : "#C44C35",
            borderRadius: theme.spacing(1),
            fontWeight: "bold"
        }
    })
})

function ScoreChip({ score }: ScoreChipProps) {
    const classes = useChipStyles(score)
    return (
        <Chip label={score.score.toString()} className={classes.scoreChip} />
    )
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        headerContainer: {
            display: "flex",
            justifyContent: "space-between",
            "& > h4:last-child, & > hr": {
                color: theme.palette.text.secondary
            },
            marginBottom: theme.spacing(1)
        },
        labelButtonsContainer: {
            marginTop: theme.spacing(2),
            "& > button": {
                marginRight: theme.spacing(1)
            }
        },
        resultCardsContainer: {
            marginTop: theme.spacing(4)
        },
        resultCardPaper: {
            backgroundColor: "#FBFDFE",
            padding: theme.spacing(1.5),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& .MuiAvatar-root": {
                width: "96px",
                height: "96px"
            },
            "& .MuiTypography-body1": {
                color: theme.palette.text.secondary
            },
            "& > *:not(:last-child)": {
                marginBottom: theme.spacing(1.5)
            }
        },
        brandLabelsContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            "& > *": {
                marginRight: theme.spacing(1),
                borderRadius: theme.spacing(1)
            }
        },
        chipContainer: {
            textAlign: "center",
            marginRight: theme.spacing(2),
            "& h6": {
                color: theme.palette.text.secondary,
                textTransform: "uppercase"
            }
        }
    })
})

interface Props {
    indexNumber: number,
    brand: {
        Address: string,
        BrandSite: string,
        Categories: string,
        CoverImage: string,
        Description: string,
        FBurl: string,
        InstagramURL: string,
        ProfileImage: string,
        ShopifySite: null
        Timestamp: string,
        TrustpilotSite: string,
        brandname: string
    }
}

interface selectBrand {
    type: string,
    payload: number,
}

interface data {
    Address: string,
    BrandSite: string,
    Categories: string,
    CoverImage: string,
    Description: string,
    FBurl: string,
    InstagramURL: string,
    ProfileImage: string,
    ShopifySite: null,
    Timestamp: string,
    TrustpilotSite: string,
    brandname: string
}

const BrandCard: FC<Props> = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const selectBrand: selectBrand = { type: "selectBrand", payload: props.indexNumber }
    dispatch(selectBrand)
    const redirectpage = (name: string) => {
        history.push(`/brand/${name.replace(/ /g, "-")}`)
        dispatch({ type: "brandName", payload: name })
        dispatch(Actions.GetSelectedBrandData(name))
    }
    const Brand: data = props.brand

    const classes = useStyles()
   



    return (
        <Grid item xs={4} className="resultBox">
            <Paper variant="outlined" className={classes.resultCardPaper}>
                <Avatar style={{ cursor: "pointer" }} onClick={() => redirectpage(Brand.brandname)} src={Brand.ProfileImage} variant="circular" />
                <Typography variant="h5" onClick={() => redirectpage(Brand.brandname)}>
                    <strong style={{ cursor: "pointer" }}>
                        {Brand.brandname}
                    </strong>
                </Typography>
                <Typography variant="body1"> {(Brand.Address === "NULL" || Brand.Address === null) ? "" : Brand.Address}</Typography>
                <div className={classes.brandLabelsContainer}>
                    {/* {tommyLabels.map((label, index) => <Chip label={label} key={index}/>)} */}
                    {(Brand.Categories === "NULL" || Brand.Categories === null) ? "" :
                        Brand.Categories.split(",").map((data) => <Chip label={data} />)}
                </div>
                <div className={classes.brandLabelsContainer}>

                    {(Brand.Description == "NULL" || Brand.Description == null || Brand.Description == "null") ? "" : Brand.Description.replace(/[^a-zA-Z ]/g, "")}
                </div>
                {/* <Typography variant="body1">{} followers &bull; {}ads</Typography> */}
                {/* <div className={classes.brandLabelsContainer}> */}
                {/* {scores.map((score, index) => (
                        <div className={classes.chipContainer} key={index}>
                            <ScoreChip score={score}/>
                            <Typography variant="subtitle1">{score.title}</Typography>
                        </div>
                    ))} */}
                {/* </div> */}
                <div>
                    <IconButton size="small" >
                        {(Brand.BrandSite === "NULL" || Brand.BrandSite === null) ? "" :
                            <a href={Brand.BrandSite} target="blank" style={{ color: "grey" }}><LanguageIcon /></a>}
                    </IconButton>
                    <IconButton size="small">
                        {(Brand.FBurl === "NULL" || Brand.FBurl === null) ? "" :
                            <a href={Brand.FBurl} target="blank" style={{ color: "grey" }}><FacebookIcon /></a>}
                    </IconButton>
                    {/* <IconButton size="small">
                        {(Brand.ShopifySite !== "NULL" || Brand.FBurl !== null) &&
                         <a href={Brand.ShopifySite} target="blank" style={{color:"grey"}}><ShoppingCartIcon/></a>}
                    </IconButton> */}

                    <IconButton size="small">
                        {Brand.InstagramURL === "NULL" ? "" :
                            <a href={Brand.InstagramURL} target="blank" style={{ color: "grey" }}><Instagram /></a>}
                    </IconButton>
                    <IconButton size="small">
                        {Brand.TrustpilotSite === "NULL" ? "" :
                            <a href={Brand.TrustpilotSite} target="blank" style={{ color: "grey" }}><RedditIcon /></a>}
                    </IconButton>
                </div>
            </Paper>
        </Grid>
    )
}

export default BrandCard