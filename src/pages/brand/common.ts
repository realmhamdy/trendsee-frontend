import { DateTime } from "luxon"

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


export function generateRandomLineChartData(id: number) {
    return [{
        id: id,
        data: new Array(10).fill(0).map((value, index) => {
            return {
                x: DateTime.now().minus({days: 10 - index}).toFormat("yyyy-MM-dd"),
                y: Math.round(Math.random() * 10 * 10) / 10
            }
        })
    }]
}
