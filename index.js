import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import Book from './models/Book.js'


//Routes

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use((req,response ,next)=>{
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    response.setHeader("Access-Control-Allow-Headers","x-access-token", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next()
})
const PORT = process.env.PORT || 5000;



app.use('/',routes)


const URI = 'mongodb+srv://admin-vedish:E9kyQibXnxgxuik5@cluster0.xlsrd3j.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async ()=>{
    app.listen(PORT,()=>console.log(`Server running on PORT ${PORT}`))
   // await Book.deleteMany()
    console.log("Mongoose Connected")
})






