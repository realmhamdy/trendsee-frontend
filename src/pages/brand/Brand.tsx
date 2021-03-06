import React,{useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import Grid from "@material-ui/core/Grid"

import { BrandData ,BrandDetails } from "./common"
import BrandInformationSection from "./BrandInformationSection"
import BrandTabs from "./BrandTabs"
import Instagram from "@material-ui/icons/Instagram"
import {RootStore} from "../../Redux/store"

import { getAbsoluteURL } from "../../utils"

import Actions from "../Actions/PageActions"
import LoadingOverlay from "../../components/LoadOverlay/LoadOverlay"

const BRAND_DATA: BrandData = {
  "title": "Tommy Hilfiger",
  "cover": "/images/brands/tommyhilfiger/cover.png",
  "avatar": "/images/brands/tommyhilfiger/avatar.png",
  "address": "LA, California, United States",
  "category": "Clothes",
  "type": "brand",
  "tags": [
    "Breaking out",
    "Sudden growth",
    "Scaling ads"
  ],
  "site": "http://www.tommy.com",
  "missionStatement": "American heritage with a modern edge. All the latest looks, news, and inspiration from the world of Tommy Hilfiger.",
  "social": {
    facebook: "http://www.example.com/",
    shopify: "http://www.example.com/",
    trustpilot: "http://www.example.com/",
    reddit: "http://www.example.com/"
  },
  "most_popular_ad": {
    image: "/images/brands/tommyhilfiger/ad.jpg",
    from: "Dec 06, 2018",
    to: "Jan 07, 2021",
    countries: [
      "AU",
      "CA",
      "GB",
      "US"
    ],
    likes: 1800,
    comments: 904,
    views: 25157,
    shares: 30
  }
}




export default function () {
  const brandname:string = useSelector(((state:RootStore) => state.PageReduser["brandname"]))
  const loading: boolean = useSelector(((state:RootStore) => state.PageReduser["loading"]))
  const dispatch = useDispatch()
  
  useEffect(() => {
  
   
  void (async () => {
    
    const response = await fetch(getAbsoluteURL("fb/&pizza"),{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"date":[{"x" : "datetime", "y" : "2021-4-26"}, {"x" : "datetime", "y" : "2021-4-28"}]})
    })
    const data: Response = await response.json() as Response  
   
 
})() 

void (async () => {
 
  const response = await fetch(getAbsoluteURL("fb/7Amenfant"))
  const data: Response = await response.json() as Response  


})() 
   
  }, [brandname])
  return (
    <Grid container spacing={1}>
      <LoadingOverlay loading={loading}/>
      <BrandInformationSection brand={BRAND_DATA}/>
      <BrandTabs brand={BRAND_DATA}/>
    </Grid>
  )
}
