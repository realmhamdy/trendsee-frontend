import { Dispatch } from "redux"

import { getAbsoluteURL } from "../../utils"

interface Response {
  brand: Record<string, unknown>,
  error_code: number
}
interface payloadData {
  type: string,
  payload: unknown
}
interface loading {
  type: string,
  payload: boolean
}



const GetFreetextBrandDetails = () => {
  const url = new URL(document.URL)
  const query = url.searchParams.get("q") as string
  return (dispatch: Dispatch) => {
    const loading: loading = { type: "Loading", payload: true }
    dispatch(loading)
    void (async () => {
      const response = await fetch(getAbsoluteURL(`brandmatch/${query}`))
      const data: Response = await response.json() as Response

      const loading: loading = { type: "Loading", payload: false }
      dispatch(loading)
      const payloadData: payloadData = { type: "BrandData", payload: data.brand }
      dispatch(payloadData)
    })()
  }
}


const GetSelectedBrandData = (value: string) => {

  return (dispatch: Dispatch) => {

    const loading: loading = { type: "Loading", payload: true }
    dispatch(loading)

    void (async () => {
      const response = await fetch(getAbsoluteURL(`details/${value}`))
      const data: Response = await response.json() as Response
      const loading: loading = { type: "Loading", payload: false }
      dispatch(loading)
      if (data.error_code === 0 && Object.keys(data.brand).length !== 0) {
        const payloadData: payloadData = { type: "BrandItemDetails", payload: data.brand["0"] }
        dispatch(payloadData)
      }
    })()

  }
}

const GetProductsData = (value: string) => {
  return (dispatch: Dispatch) => {
    const loading: loading = { type: "Loading", payload: true }
    dispatch(loading)

    void (async () => {
      const response = await fetch(getAbsoluteURL(`products/${value}`))
      const data: Response = await response.json() as Response
      const loading: loading = { type: "Loading", payload: false }
      const products = data.brand
      if (data.brand) {
        const productsArray: Array<unknown> = []
        if (Object.keys(products).length !== 0) {
          Object.values(products).forEach(val => productsArray.push(val))
          const payloadData: payloadData = { type: "Products", payload: productsArray }
          dispatch(payloadData)
        } else {
          const payloadData: payloadData = { type: "Products", payload: [] }
          dispatch(payloadData)
        }
      } else {
        const payloadData: payloadData = { type: "Products", payload: [] }
        dispatch(payloadData)
      }
      dispatch(loading)
    })()
  }
}

const Actions = {

  GetFreetextBrandDetails,
  GetSelectedBrandData,
  GetProductsData
}

export default Actions