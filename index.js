const mongoose = require("mongoose");
const app = require("./app.js")
require('dotenv').config();
const port=process.env.PORT
const mongodb=process.env.MONGO_DB
async function connectDb(){
    await mongoose.connect(mongodb);
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

connectDb().catch((e)=> console.log("Error in connecting db:--", e.message))