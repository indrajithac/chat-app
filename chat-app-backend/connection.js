const mongoose = require('mongoose')
require('dotenv').config()

// mongoose.connect(`mongodb+srv://$(process.env.DB_USER):$(process.env.DB_USER_PASSWORD)@cluster0.niuwx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,()=>{
//     console.log("connected to mongodb");
// })

mongoose.connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));
