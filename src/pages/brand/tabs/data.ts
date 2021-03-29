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

export const productsData = [
    {
        "brandName": "Twinder",
        "image": "http://dummyimage.com/250x250.png/ff4444/ffffff",
        "url": "https://merriam-webster.com/vulputate.js",
        "name": "Wine - Magnotta, Merlot Sr Vqa",
        "price": 593.67
    },
    {
        "brandName": "Shuffledrive",
        "image": "http://dummyimage.com/250x250.png/cc0000/ffffff",
        "url": "https://fda.gov/vivamus/vestibulum.html",
        "name": "General Purpose Trigger",
        "price": 671.36
    },
    {
        "brandName": "Kwideo",
        "image": "http://dummyimage.com/250x250.png/cc0000/ffffff",
        "url": "http://simplemachines.org/scelerisque/mauris/sit/amet/eros.jpg",
        "name": "Doilies - 12, Paper",
        "price": 532.75
    },
    {
        "brandName": "Bubblemix",
        "image": "http://dummyimage.com/250x250.png/dddddd/000000",
        "url": "http://weather.com/ante/ipsum/primis.html",
        "name": "Lobster - Tail, 3 - 4 Oz",
        "price": 990.86
    },
    {
        "brandName": "Oba",
        "image": "http://dummyimage.com/250x250.png/cc0000/ffffff",
        "url": "http://ustream.tv/purus/aliquet.xml",
        "name": "Chicken - Wieners",
        "price": 843.09
    },
    {
        "brandName": "Kwinu",
        "image": "http://dummyimage.com/250x250.png/cc0000/ffffff",
        "url": "https://liveinternet.ru/morbi/sem/mauris/laoreet/ut/rhoncus/aliquet.html",
        "name": "Marjoram - Dried, Rubbed",
        "price": 411.09
    },
    {
        "brandName": "Pixoboo",
        "image": "http://dummyimage.com/250x250.png/dddddd/000000",
        "url": "https://unblog.fr/nulla.js",
        "name": "Cheese - Goat With Herbs",
        "price": 24.21
    },
    {
        "brandName": "Youopia",
        "image": "http://dummyimage.com/250x250.png/5fa2dd/ffffff",
        "url": "https://newyorker.com/libero/ut.html",
        "name": "Nantucket - Pomegranate Pear",
        "price": 607.04
    },
    {
        "brandName": "Demimbu",
        "image": "http://dummyimage.com/250x250.png/ff4444/ffffff",
        "url": "http://miibeian.gov.cn/ut/erat/id/mauris/vulputate/elementum.jsp",
        "name": "Cookie Double Choco",
        "price": 363.23
    },
    {
        "brandName": "Gabtune",
        "image": "http://dummyimage.com/250x250.png/dddddd/000000",
        "url": "http://webmd.com/nulla.jpg",
        "name": "Cheese - Woolwich Goat, Log",
        "price": 953.51
    },
    {
        "brandName": "Ailane",
        "image": "http://dummyimage.com/250x250.png/5fa2dd/ffffff",
        "url": "https://boston.com/dignissim/vestibulum.html",
        "name": "Cleaner - Bleach",
        "price": 667.59
    },
    {
        "brandName": "Oyoyo",
        "image": "http://dummyimage.com/250x250.png/ff4444/ffffff",
        "url": "https://thetimes.co.uk/augue/vestibulum/ante/ipsum/primis/in.jsp",
        "name": "Vector Energy Bar",
        "price": 969.68
    }
]