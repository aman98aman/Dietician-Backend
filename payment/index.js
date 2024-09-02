import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/payment.js";
import mongoose from "mongoose";
const app = express();

dotenv.config();

app.use(express.json());
app.use('/payment',router);

const mongodb = process.env.MONGO_DB;
const port = process.env.PORT;
mongoose
  .connect(mongodb)
  .then((res) => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Unable to run server", err);
});
