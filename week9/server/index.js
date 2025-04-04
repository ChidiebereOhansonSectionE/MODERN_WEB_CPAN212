//these are my imports
import express from "express"
import mongoose from "mogoose"
import cors from "cors"
import dotenv from "dotenv"

//variables
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose.connect(`mongodb+srv://andyoneboxx:gc1JgmOm235bZFOM@cluster0.vqp5g.mongodb.net/`)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(``)
        })
    })