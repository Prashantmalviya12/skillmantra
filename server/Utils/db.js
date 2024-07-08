const mongoose = require("mongoose")
const URL ="mongodb://127.0.0.1:27017/SkillMantra"

const connectDb = async()=>{
    try {
        await mongoose.connect(URL)
        console.log("database connection success")

    } catch (error) {
        console.log("database connection failed")
        process.exit(0)
    }
}

module.exports= connectDb