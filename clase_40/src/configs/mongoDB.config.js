import mongoose from "mongoose"
import { config } from "./config.js";

export default class MongoDBService {
  constructor(){
    this.connection = mongoose.connect(config.MONGO_DB.URL, {
      dbName: config.MONGO_DB.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDb');
  }

  static getInstance = () => {
    if(!this.instance){
      this.instance = new MongoDBService()
    }else{
      return this.instance
    }
  }
}