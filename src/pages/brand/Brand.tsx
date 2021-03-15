import React from "react"

import Grid from "@material-ui/core/Grid"

import { BrandData } from "./common"
import BrandInformationSection from "./BrandInformationSection"
import BrandTabs from "./BrandTabs"


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
  "site": "http://www.tommy.com"
}


export default function () {

  return (
    <Grid container spacing={1}>
      <BrandInformationSection brand={BRAND_DATA}/>
      <BrandTabs/>
    </Grid>
  )
}
