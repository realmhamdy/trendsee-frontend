 import {defaultInitialState} from "../Actions/PageActionsType"
interface actions {
    type : string,
    payload : any[]
}

const pageInitialstate : defaultInitialState = {
    brandDetails : {
        BrandName : [],
        FBLikes: [],
        FbFollowers: [],
        InstaPosts:  [],
        Instafollowers:  [],
        Instafollowing:  [],
        NumberFBads:  [],
        NumberReviews: [],
        ReditMentions:  [],
        ReviewScore: [],
        ReviewSite:  [],
        ReviewText:  [],
        Timestamp: []
    },
    loading:false,
    selectBrand:0
}

export const  PageReduser = (state:defaultInitialState = pageInitialstate, actions: actions)=>{
    switch(actions.type){
        case  "BrandDetails":
        return {
            ...state,
            brandDetails: actions.payload 
        }

        case "Loading":
            return {
                ...state,
            loading:actions.payload
            }

        default:
        return state
    }
}
