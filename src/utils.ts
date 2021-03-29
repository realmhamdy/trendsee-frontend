export function openLinkInNewTab(link: string) {
    Object.assign(
        document.createElement("a"),
        {
            target: "_blank",
            href: link
        }).click()
}
