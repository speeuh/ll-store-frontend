import ISection from "./ISection";
import IBrand from "./IBrand";

export default interface IProduct {
    id: string
    name: string
    section: ISection[]
    brand: IBrand[]
    description: string
    value: number
    date: Date
    expiry: Date
}