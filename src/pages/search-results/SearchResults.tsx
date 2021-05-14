import React,{useEffect} from "react"
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

import FacebookIcon from "@material-ui/icons/Facebook"
import LanguageIcon from "@material-ui/icons/Language"
import RedditIcon from "@material-ui/icons/Reddit"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import StarsIcon from "@material-ui/icons/Stars"

import { useLocation, Link as RouterLink, Redirect, useHistory } from "react-router-dom"

import ReactCountryFlag from "react-country-flag"

import { getAbsoluteURL } from "../../utils"

import Actions from "../Actions/PageActions"

import { RootStore } from "../../Redux/store"
import LoadingOverlay from "../../components/LoadOverlay/LoadOverlay"
import BrandCard from "../../components/BrandCard/BrandCard"
import BrandCardFreeText from "../../components/BrandCardFreetext/BrandCardFreeytest"



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


interface Score {
    title: string
    score: number,
    status: "good" | "bad"
}


interface demointerface {
    brand: any,

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


export default function SearchResults() {
    function useQuery() {
        return new URLSearchParams(useLocation().search)
    }
    const dispatch = useDispatch()

    const query = useQuery()
    const queryString = query.get("q") as string
    const classes = useStyles()
    const [selectedButtonIndex, setSelectedButtonIndex] = React.useState(0)

    const BrandsData: Record<string, data> = useSelector(((state: RootStore) => state.PageReduser["brandData"]))



    const BrandName: string[] = useSelector(((state: RootStore) => state.PageReduser["brandDetails"]["BrandName"]))

    const loading: boolean = useSelector(((state: RootStore) => state.PageReduser["loading"]))

    const searchType: string = useSelector(((state: RootStore) => state.PageReduser["searchtype"]))

    const buttonLabels = [
        "All results",
        "Breaking out",
        "Potential breakouts",
        "Sudden growth",
        "New to wholesale",
        "Scaling wholesale",
        "New advertiser",
        "Scaling ads"
    ]

    const brand= []
    let brandlength = 0
    for(const item in BrandsData){
        const keydata = BrandsData[item]
        keydata.brandname = item
       brand.push(keydata)
       brandlength = brandlength + 1
    }

    useEffect(() => {
      
       dispatch(Actions.GetFreetextBrandDetails())
      
    }, [])

    return (
        <Grid container>
            <LoadingOverlay loading={loading}/>
            {BrandsData ? 
            <Grid item xs={12}>
                <div className={classes.headerContainer}>
                    {}
                    <Typography variant="h4">Search results for the query <strong>"{query.get("q")}"</strong> <Link component={RouterLink} to="/search-brand"><small>advanced filters</small></Link></Typography>
                    <Typography variant="h4">{brandlength}</Typography>
                </div>
                <Divider />
            </Grid>
             : 
             <Grid item xs={12}>
                <div className={classes.headerContainer}>
                    {}
                    <Typography variant="h4">No Results for the query <strong>"{query.get("q")}"</strong> <Link component={RouterLink} to="/search-brand"><small>advanced filters</small></Link></Typography>
                    <Typography variant="h4">{brandlength}</Typography>
                </div>
                <Divider/>
            </Grid>}
            <Grid item xs={12} className={classes.labelButtonsContainer}>
                {buttonLabels.map((label, index) =>
                    <Button
                        key={index}
                        variant={selectedButtonIndex == index ? "contained" : "outlined"}
                        color={selectedButtonIndex == index ? "primary" : "default"}
                        size="small"
                        onClick={() => setSelectedButtonIndex(index)}>
                        {label}
                    </Button>)}
            </Grid>
            <Grid container item xs={12} className={classes.resultCardsContainer} spacing={2}>
             {/* { brand.map((data, index) => <BrandCard key={index} indexNumber={index} brand={data}/>)}  */}
             {
              searchType === "freetext" ?  (brand.map((data, index) => <BrandCard key={index} indexNumber={index} brand={data}/>)) :""
            }   
           
             
           
            </Grid>
        </Grid>
    )
}
