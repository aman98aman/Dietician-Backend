const mongoose = require("mongoose");
const cron = require("node-cron");
const app = require("./app.js");
const sendUpdates = require("./cronJobs/sendUpdatesToUsers.js");
require('dotenv').config();
const port=process.env.PORT
const mongodb=process.env.MONGO_DB
async function connectDb(){
    await mongoose.connect(mongodb);
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
cron.schedule('*/10 * * * * *',sendUpdates)
connectDb().catch((e)=> console.log("Error in connecting db:--", e.message))