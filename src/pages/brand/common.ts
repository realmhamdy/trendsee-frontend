interface SocialLinks {
    facebook: string
    shopify: string
    trustpilot: string
    reddit: string
}

interface BrandAd {
    image: string
    from: string
    to: string
    countries: Array<string>
    likes: number
    comments: number
    views: number
    shares: number
}

export interface BrandData {
    title: string
    cover: string
    avatar: string
    address: string
    category: string
    type: string
    tags: Array<string>
    site: string
    missionStatement: string
    social: SocialLinks
    most_popular_ad: BrandAd
}
