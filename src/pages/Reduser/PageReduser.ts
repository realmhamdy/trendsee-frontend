import { defaultInitialState } from "../Actions/PageActionsType"
interface actions {
  type: string,
  payload: any[]
}

const pageInitialstate: defaultInitialState = {
  brandDetails: {
    BrandName: [],
    FBLikes: [],
    FbFollowers: [],
    InstaPosts: [],
    Instafollowers: [],
    Instafollowing: [],
    NumberFBads: [],
    NumberReviews: [],
    ReditMentions: [],
    ReviewScore: [],
    ReviewSite: [],
    ReviewText: [],
    Timestamp: []
  },
  loading: false,
  selectBrand: 0,
  brandData: {},
  searchtype: "",
  brandname: "",
  BrandItemDetails: {},
  products: []
  // Address: [""],
  // BrandName: [""],
  // BrandSite: [""],
  // Categories: [""],
  // CoverImage: [""],
  // Description: [""],
  // FBurl: [""],
  // InstagramURL: [""],
  // ProfileImage: [""],
  // ShopifySite: [""],
  // Timestamp: [""],
  // TrustpilotSite: [""]
}

export const PageReduser = (state: defaultInitialState = pageInitialstate, actions: actions) => {
  switch (actions.type) {
    case "BrandDetails":
      return {
        ...state,
        brandDetails: actions.payload,
        searchtype: "searchtype",
      }
    case "BrandData":
      return {
        ...state,
        brandData: actions.payload,
        searchtype: "freetext",
      }
    case "BrandItemDetails":
      return {
        ...state,
        BrandItemDetails: actions.payload,
      }
    case "brandName":
      return {
        ...state,
        brandname: actions.payload,
      }
    case "Products":
      return {
        ...state,
        products: actions.payload,
      }
    case "Loading":
      return {
        ...state,
        loading: actions.payload
      }

    default:
      return state
  }
}
