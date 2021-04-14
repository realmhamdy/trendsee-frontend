export function openLinkInNewTab(link: string) {
    Object.assign(
        document.createElement("a"),
        {
            target: "_blank",
            href: link
        }).click()
}

export interface ScoreColumn {
    current: number
    previous: number
    status: "good" | "warn" | "bad"
}

export function formatNumber(n: number) {
    return new Intl.NumberFormat().format(n)
}

export function getAbsoluteURL(relativePath: string): string {
    return new URL(relativePath, "http://161.97.176.189:7000").toString()
}
