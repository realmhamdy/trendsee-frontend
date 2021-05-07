import React, { FC } from "react"
import {useDispatch,useSelector} from "react-redux"
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
import {RootStore} from "../../Redux/store"



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
            backgroundColor: (props: Score) => props.status == "good" ? "#CBF4C9": "#F6E5B9",
            color: (props: Score) => props.status == "good" ? "#0B825D" : "#C44C35",
            borderRadius: theme.spacing(1),
            fontWeight: "bold"
        }
    })
})

function ScoreChip({ score }: ScoreChipProps) {
    const classes = useChipStyles(score)
    return (
        <Chip label={score.score.toString()} className={classes.scoreChip}/>
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

interface Props{
    indexNumber:number,
    brandName:string[],
}

interface selectBrand{
    type:string,
    payload:number,
}

const BrandCardFreeText:FC<Props> = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const selectBrand :selectBrand = { type:"selectBrand",payload:props.indexNumber}
    dispatch(selectBrand)
    const redirectpage  = (name:string) =>{
        history.push("/")
        dispatch({type:"brandName",payload:name})
    }
    const BrandDetials: string[] = useSelector(((state:RootStore) => state.PageReduser["brandDetails"]))
    const BrandName: string[] = useSelector(((state:RootStore) => state.PageReduser["brandDetails"]["BrandName"]))
    const FBLikes: number[] = useSelector(((state:RootStore) => state.PageReduser["brandDetails"]["FBLikes"]))
    const FbFollowers: number[] = useSelector(((state:RootStore) => state.PageReduser["brandDetails"]["FbFollowers"]))
    const NumberFBads: number[] = useSelector(((state:RootStore) => state.PageReduser["brandDetails"]["NumberFBads"]))
    const BrandList: string[] = useSelector(((state:RootStore) => state.PageReduser["brandDetails"]))
    console.log("BrandDetialscardd",BrandDetials)
    const classes = useStyles()
    const tommyLabels = ["Breaking out", "Sudden growth", "Scaling ads"]
    const scores: Score[] = [
        { title: "Scaling Score", score: 73, status: "good" },
        { title: "Revenue Score", score: 85, status: "bad" }
    ]
    return (
        <Grid item xs={4}>
            <Paper variant="outlined" className={classes.resultCardPaper}>
                <Avatar src="/images/brands/tommyhilfiger/avatar.png" variant="circular"/>
                <Typography variant="h5" onClick={()=>redirectpage(BrandName[props.indexNumber])}><strong>{BrandName[props.indexNumber]}</strong></Typography>
                <Typography variant="body1"><ReactCountryFlag countryCode="US" svg/> LA, California, United States</Typography>
                <div className={classes.brandLabelsContainer}>
                    {tommyLabels.map((label, index) => <Chip label={label} key={index}/>)}
                </div>
                <Typography variant="body1">{FbFollowers[props.indexNumber]} follower&bull; {NumberFBads[props.indexNumber]}ads</Typography>
                <div className={classes.brandLabelsContainer}>
                    {scores.map((score, index) => (
                        <div className={classes.chipContainer} key={index}>
                            <ScoreChip score={score}/>
                            <Typography variant="subtitle1">{score.title}</Typography>
                        </div>
                    ))}
                </div>
                <div>
                    <IconButton size="small"><LanguageIcon/></IconButton>
                    <IconButton size="small"><FacebookIcon/></IconButton>
                    <IconButton size="small"><ShoppingCartIcon/></IconButton>
                    <IconButton size="small"><StarsIcon/></IconButton>
                    <IconButton size="small"><RedditIcon/></IconButton>
                </div>
            </Paper>
        </Grid>
    )
 }

export default BrandCardFreeText