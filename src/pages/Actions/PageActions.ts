import {Dispatch} from "redux"

import { getAbsoluteURL } from "../../utils"

import {brandList,brandDetails} from "../Actions/PageActionsType"

const GetBrandDetails = ()=>{
    interface Response {
        brand: any[],
    }
    interface payloadData{
        type:string,
        payload:any[]
    }
    interface loading{
        type:string,
        payload:boolean
    }
  
    const url = new URL(document.URL)
    const query = url.searchParams.get("q") as string

    return (dispatch: Dispatch)=>{
        const loading : loading = { type:"Loading",payload:true}
        dispatch(loading)
        void (async () => {
            const response = await fetch(getAbsoluteURL(`brands/${query}`))
            const data: Response = await response.json() as Response  
            const loading : loading = { type:"Loading",payload:false}
             dispatch(loading)
            const payloadData : payloadData = { type:"BrandDetails", payload:data.brand}
            dispatch(payloadData)
        })()    
        
       
    }
}

const Actions = {
    GetBrandDetails
}

export default Actions