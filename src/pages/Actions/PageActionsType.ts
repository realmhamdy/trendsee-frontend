
export type defaultInitialState = {
    brandDetails : {
        BrandName : string[],
        FBLikes: number[],
        FbFollowers: number[],
        InstaPosts:  number[],
        Instafollowers:  number[],
        Instafollowing:  number[],
        NumberFBads:  number[],
        NumberReviews: number[],
        ReditMentions:  number[],
        ReviewScore: number[],
        ReviewSite:  number[],
        ReviewText:  number[],
        Timestamp: Date[]
    },
    loading:boolean,
    selectBrand:number
}

export type brandDetails = {
    BrandName : string[],
        FBLikes: number[],
        FbFollowers: number[],
        InstaPosts:  number[],
        Instafollowers:  number[],
        Instafollowing:  number[],
        NumberFBads:  number[],
        NumberReviews: number[],
        ReditMentions:  number[],
        ReviewScore: number[],
        ReviewSite:  number[],
        ReviewText:  number[],
        Timestamp: Date[]
}

export type brandList = {
    brand : {
         BrandName : string[],
        FBLikes: number[],
        FbFollowers: number[],
        InstaPosts:  number[],
        Instafollowers:  number[],
        Instafollowing:  number[],
        NumberFBads:  number[],
        NumberReviews: number[],
        ReditMentions:  number[],
        ReviewScore: number[],
        ReviewSite:  number[],
        ReviewText:  number[],
        Timestamp: Date[]
        
    }
}