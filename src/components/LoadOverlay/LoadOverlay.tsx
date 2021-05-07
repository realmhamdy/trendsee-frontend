import React from "react"
import loader from "../../assets/images/loader.svg"
import { createStyles, makeStyles, withStyles, Theme, useTheme } from "@material-ui/core/styles"
import {useDispatch,useSelector} from "react-redux"

import {RootStore} from "../../Redux/store"
interface props {
  loading :boolean
}

export default function LoadingOverlay(props:props){
  
  const loading: boolean = useSelector(((state:RootStore) => state.PageReduser["loading"]))
  
  console.log("loading",loading)
    return (
      <div style={{position:"fixed",top:"0px",left:"0px",zIndex:9999,width:"100%",height:"100%",background:"rgba(255,255,255,.6)",textAlign:"center",display:props.loading ? "block":"none"}}>
         <img src={loader} style={{height:"150px",top:"calc(50% - 50px)",position:"relative"}} alt="" />
      </div>
    )
  
}

