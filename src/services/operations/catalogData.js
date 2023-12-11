import toast from "react-hot-toast"
import { catalogData } from "../apis"
import { apiConnector } from "../apiConnector"

const {
    CATALOG_PAGE_DATA_API
} = catalogData

export const getCatalogPageData = async(categoryId) => {
    let response = []
    try{
        response = await apiConnector("POST", CATALOG_PAGE_DATA_API, {categoryId})
        if(!response?.data?.success) throw new Error("COLD NOT FETCH CATEGORY PAGE DATA")
    }catch(err){
        console.error("CATALOG PAGE DATA API ERROR...",err)
        toast.error(err.message)
    }
    return response
}