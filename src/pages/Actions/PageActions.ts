import {Dispatch} from "redux"

import { getAbsoluteURL } from "../../utils"

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
  


const GetBrandDetails = ()=>{
    const url = new URL(document.URL)
    const query = url.searchParams.get("q") as string
    return (dispatch: Dispatch)=>{
        console.log("GetBrandDetails Api")
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

const GetFreetextBrandDetails = ()=>{
    const url = new URL(document.URL)
const query = url.searchParams.get("q") as string
    return (dispatch: Dispatch)=>{
        console.log("GetFreetextBrandDetails Api")
        const loading : loading = { type:"Loading",payload:true}
        dispatch(loading)
        void (async () => {
    
            const response = await fetch(getAbsoluteURL(`brandmatch/${query}`))
            const data: Response = await response.json() as Response  
       
            const loading : loading = { type:"Loading",payload:false}
             dispatch(loading)
            const payloadData : payloadData = { type:"BrandData", payload:data.brand}
            dispatch(payloadData)
        })()    
    }
}

const GetBrandData = (brandname:string)=>{

    return (dispatch: Dispatch)=>{
        console.log("GetBrandData Api")
        const loading : loading = { type:"Loading",payload:true}
        dispatch(loading)
        void (async () => {
            const response = await fetch(getAbsoluteURL(`details/${brandname}`))
            const data: Response = await response.json() as Response      
            const loading : loading = { type:"Loading",payload:false}
            dispatch(loading)
           const payloadData : payloadData = { type:"BrandItemDetails", payload:data.brand}
           dispatch(payloadData)
        })()    
    }
}

const GetSelectedBrandData = (value:string)=>{
    const url = new URL(document.URL)
const query = url.searchParams.get("q") as string
    return (dispatch: Dispatch)=>{
        console.log("GetSelectedBrandData Api")
        const loading : loading = { type:"Loading",payload:true}
        dispatch(loading)
        void (async () => {
            const response = await fetch(getAbsoluteURL(`details/${value}`))
            const data: Response = await response.json() as Response    
            const loading : loading = { type:"Loading",payload:false}
            dispatch(loading)
           const payloadData : payloadData = { type:"BrandItemDetails", payload:data.brand}
           dispatch(payloadData)
        })()    
    }
}

const Actions = {
    GetBrandDetails,
    GetFreetextBrandDetails,
    GetBrandData,
    GetSelectedBrandData,
}

export default Actions