export class Coupon {
    constructor(
        public id: number,
        public code: string,
        public discount: number,
        public orderTotalMinimum: number,
        public startDate: Date,
        public endDate : Date,
    ) {}
}