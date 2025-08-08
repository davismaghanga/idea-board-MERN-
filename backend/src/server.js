import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"

import notesRouter from "./routes/notesRouter.js"
import rateLimiter from "./middleware/rateLimiter.js"
import { connectDB } from "./config/db.js"


dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()) //parses json bodies:req.body
app.use(rateLimiter)



app.use("/api/notes",notesRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use(express.static(path.join(__dirname, "../frontend/dist"))) //serves static files from the frontend build directory

connectDB().then(()=>{
    app.listen(PORT, () =>{
    console.log("Server started on PORT:",PORT)
})
})


// FBNIPUqXwtWFP8mB
// mongodb+srv://dkirughamio:FBNIPUqXwtWFP8mB@cluster0.q7dms4v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0