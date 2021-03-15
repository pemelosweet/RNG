export default class ProductionStopData {
    id:Number
    date:Date
    dateString:String
    name:String
    poster:String
    firstSaleDate:String
    firstSaleAmount:Number
    lastSaleDate:String
    lastSaleAmount:Number
    totalSaleAmount:Number
    totalReturnedAmount:Number
    totalReturnedRate:Number

    constructor(
        id:Number = 0,
        dateString:String = '',
        name:String = '',
        poster:String = '',
        firstSaleDate:String = '',
        firstSaleAmount:Number = 0,
        lastSaleDate:String = '',
        lastSaleAmount:Number = 0,
        totalSaleAmount:Number = 0,
        totalReturnedAmount:Number = 0,
        totalReturnedRate:Number = 0
    ) {
        const me = this
        me.id = id
        me.dateString = dateString
        me.date = new Date(dateString as string)
        me.name = name
        me.poster = poster
        me.firstSaleDate = firstSaleDate
        me.firstSaleAmount = firstSaleAmount
        me.lastSaleDate = lastSaleDate
        me.lastSaleAmount = lastSaleAmount
        me.totalSaleAmount = totalSaleAmount
        me.totalReturnedAmount = totalReturnedAmount
        me.totalReturnedRate = totalReturnedRate
    }
}