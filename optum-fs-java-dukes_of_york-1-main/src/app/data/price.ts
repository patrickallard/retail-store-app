export class Price {
    constructor(
    public id: number | null,
    public price: number,
    public startDate: Date,
    public endDate: Date | null
    ) {
    }
}