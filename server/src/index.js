import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/users.js";
import { connectDB } from "./connect.js";
import { recipeRouter } from "./routes/recipe.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/auth", router);
app.use("/recipes", recipeRouter);

connectDB(process.env.URI).then(() =>{
    app.listen(process.env.PORT,console.log(`server is listening on port ${process.env.PORT}`))
}).catch((err) => {
    console.log(err);
})
