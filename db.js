const mongoose = require('mongoose')

const URI = "mongodb+srv://visa:t3g67kOSMUIYv7M7@visa.kwakwgr.mongodb.net/anothervisa?appName=visa"
mongoose.set("strictQuery", false);
const connectToMongoose = () => mongoose.connect(URI, () => {
    console.log("Connected to Mongo Successfully")
})

module.exports = connectToMongoose

