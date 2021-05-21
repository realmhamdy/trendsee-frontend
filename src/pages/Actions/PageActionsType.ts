
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
    selectBrand:number,
    brandData:object,
    searchtype:string,
    brandname:string,
    BrandItemDetails:object,
    products:Array<unknown>
    // {
    //     Address: string[]
    //     BrandName: string[]
    //     BrandSite: string[]
    //     Categories: string[]
    //     CoverImage: string[]
    //     Description: string[]
    //     FBurl: string[]
    //     InstagramURL: string[]
    //     ProfileImage: string[]
    //     ShopifySite: string[]
    //     Timestamp: string[]
    //     TrustpilotSite: string[]
    // }
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
