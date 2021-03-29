export interface SimilarFollowedBrands {
    link: string,
    brands: { name: string, link: string }[]
}

export interface GrowthTableDataRow {
    username: string
    avatar: string
    followers: number
    engageRate: number
    avgLikes: number
    avgComments: number
    brand?: string
    follows: boolean
    similarFollowed: SimilarFollowedBrands
    [index: string]: any
}

export const growthTableData: Array<GrowthTableDataRow> = [
    {
        username: "amritamichelle",
        avatar: "/images/dude.jpg",
        followers: 405,
        engageRate: 15,
        avgLikes: 27879,
        avgComments: 241,
        brand: "http://www.example.com",
        follows: true,
        similarFollowed: {
            link: "http://www.example.com",
            brands: [
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
            ]
        }
    },
    {
        username: "Tommy",
        avatar: "/images/dude.jpg",
        followers: 3009,
        engageRate: 75,
        avgLikes: 7887,
        avgComments: 0,
        brand: undefined,
        follows: false,
        similarFollowed: {
            link: "http://www.example.com",
            brands: [
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
            ]
        }
    },
    {
        username: "Ken",
        avatar: "/images/dude.jpg",
        followers: 46910,
        engageRate: 38,
        avgLikes: 0,
        avgComments: 35,
        brand: undefined,
        follows: false,
        similarFollowed: {
            link: "http://www.example.com",
            brands: [
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
            ]
        }
    },
    {
        username: "Oleh",
        avatar: "/images/dude.jpg",
        followers: 100,
        engageRate: 37,
        avgLikes: 15345,
        avgComments: 1803,
        brand: "http://www.example.com",
        follows: true,
        similarFollowed: {
            link: "http://www.example.com",
            brands: [
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
            ]
        }
    },
    {
        username: "amritamichelle",
        avatar: "/images/dude.jpg",
        followers: 405,
        engageRate: 15,
        avgLikes: 27879,
        avgComments: 241,
        brand: "http://www.example.com",
        follows: true,
        similarFollowed: {
            link: "http://www.example.com",
            brands: [
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
            ]
        }
    },
    {
        username: "Tommy",
        avatar: "/images/dude.jpg",
        followers: 3009,
        engageRate: 75,
        avgLikes: 7887,
        avgComments: 0,
        brand: undefined,
        follows: false,
        similarFollowed: {
            link: "http://www.example.com",
            brands: [
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
            ]
        }
    },
    {
        username: "Ken",
        avatar: "/images/dude.jpg",
        followers: 46910,
        engageRate: 38,
        avgLikes: 0,
        avgComments: 35,
        brand: undefined,
        follows: false,
        similarFollowed: {
            link: "http://www.example.com",
            brands: [
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
            ]
        }
    },
    {
        username: "Oleh",
        avatar: "/images/dude.jpg",
        followers: 100,
        engageRate: 37,
        avgLikes: 15345,
        avgComments: 1803,
        brand: "http://www.example.com",
        follows: true,
        similarFollowed: {
            link: "http://www.example.com",
            brands: [
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
            ]
        }
    },
    {
        username: "amritamichelle",
        avatar: "/images/dude.jpg",
        followers: 405,
        engageRate: 15,
        avgLikes: 27879,
        avgComments: 241,
        brand: "http://www.example.com",
        follows: true,
        similarFollowed: {
            link: "http://www.example.com",
            brands: [
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
            ]
        }
    },
    {
        username: "Tommy",
        avatar: "/images/dude.jpg",
        followers: 3009,
        engageRate: 75,
        avgLikes: 7887,
        avgComments: 0,
        brand: undefined,
        follows: false,
        similarFollowed: {
            link: "http://www.example.com",
            brands: [
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
            ]
        }
    },
    {
        username: "Ken",
        avatar: "/images/dude.jpg",
        followers: 46910,
        engageRate: 38,
        avgLikes: 0,
        avgComments: 35,
        brand: undefined,
        follows: false,
        similarFollowed: {
            link: "http://www.example.com",
            brands: [
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
            ]
        }
    },
    {
        username: "Oleh",
        avatar: "/images/dude.jpg",
        followers: 100,
        engageRate: 37,
        avgLikes: 15345,
        avgComments: 1803,
        brand: "http://www.example.com",
        follows: true,
        similarFollowed: {
            link: "http://www.example.com",
            brands: [
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
                {
                    name: "Gymshark",
                    link: "https://eu.gymshark.com/"
                },
            ]
        }
    },
]
