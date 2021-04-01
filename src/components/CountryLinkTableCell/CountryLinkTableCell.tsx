import React from "react"

import IconButton from "@material-ui/core/IconButton"
import TableCell from "@material-ui/core/TableCell"
import LanguageIcon from "@material-ui/icons/Language"

import ReactCountryFlag from "react-country-flag"

import { openLinkInNewTab } from "../../utils"

interface Props {
    flag: string
    link: string
}

export default function CountryLinkTableCell({ flag, link }: Props) {
    function handleBrandURLIconButtonClicked() {
        openLinkInNewTab(link)
    }
    return (
        <TableCell>
            <ReactCountryFlag countryCode={flag} svg/>
             <IconButton onClick={handleBrandURLIconButtonClicked}>
                 <LanguageIcon/>
            </IconButton>
        </TableCell>
    )
}
