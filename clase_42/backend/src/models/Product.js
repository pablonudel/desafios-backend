export default class Product{
    static get collection(){
        return 'Products'
    }

    static get schema(){
        return{
            name:String,
            description:String,
            code:String,
            image:String,
            price:Number,
            category:String,
            stock:Number,
            active:{type:Number, default:true}
        }
    }
}