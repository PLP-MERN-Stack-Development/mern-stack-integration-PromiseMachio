import rateLimit from "./src/router/Middleware/ratelimiter.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import noteRouter from "./src/router/noteRouter.js"
import { connectDB }from "./src/router/connetion/db.js"





dotenv.config();
const app = express();
// Middleware function between the res and req
const PORT = process.env.PORT || 5001;
app.use((req, res, next) => {
    console.log(`req method was ${req.method} and req url was${req.url}`);
    next();
});
app.use(cors({
    origin:"http://localhost:5173"
}))

app.use(express.json());
app.use(rateLimit)
app.use("/api/notes",noteRouter);// With that in mind tou can add quite a number of APIs in there

connectDB()
.then( () =>{
    try{
        app.listen(PORT, ()=>{
                console.log("App started in port:",PORT)
            })}
     catch(error){
        console.log("Error occured",error)
     }   
        });
