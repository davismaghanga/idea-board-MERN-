import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import notesRouter from "./routes/notesRouter.js"
import rateLimiter from "./middleware/rateLimiter.js"
import { connectDB } from "./config/db.js"


dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001

//middleware
app.use(cors({
    origin: 'http://localhost:5173', //frontend URL
    
})) //allows cross-origin requests
app.use(express.json()) //parses json bodies:req.body
app.use(rateLimiter)



app.use("/api/notes",notesRouter)

connectDB().then(()=>{
    app.listen(PORT, () =>{
    console.log("Server started on PORT:",PORT)
})
})


// FBNIPUqXwtWFP8mB
// mongodb+srv://dkirughamio:FBNIPUqXwtWFP8mB@cluster0.q7dms4v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0