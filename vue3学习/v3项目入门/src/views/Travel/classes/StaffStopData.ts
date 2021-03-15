export default class StaffStopData {
    id:Number
    date:Date
    dateString:String
    message:String
    type:Number

    constructor(id:Number = 0, dateString:String = '', message:String = '', type:Number = 0) {
        const me = this
        me.id = id
        me.dateString = dateString
        me.date = new Date(dateString as string)
        me.message = message
        me.type = type
    }
}