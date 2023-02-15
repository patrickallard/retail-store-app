import { Categories } from "./categories";
import { Price } from "./price";
import { Shipment } from "./shipments";

export class Product {
    public id : number | null = null;
    public name: string
    public discontinued: boolean
    public availability: Date
    public description: string
    public image: string
    public category: Categories | null
    public scheduledMaps: Price[]
    public scheduledPrices: Price[]
    public scheduledSales: Price[]
    public shipments: Shipment[]

    constructor(name: string, discontinued: boolean, availability: Date, description: string, image: string, category: Categories | null, scheduledMAPS: Price[], scheduledPrices: Price[], scheduledSales: Price[], shipments: Shipment[]){
        this.name = name
        this.discontinued = discontinued
        this.availability = availability
        this.description = description
        this.image = image
        this.category = category
        this.scheduledMaps = scheduledMAPS
        this.scheduledPrices = scheduledPrices
        this.scheduledSales = scheduledSales
        this.shipments = shipments
    }
}