const mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect(`mongodb+srv://$(process.env.DB_USER):$(process.env.DB_USER_PASSWORD)@cluster0.niuwx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,()=>{
    console.log("connected to mongodb");
})