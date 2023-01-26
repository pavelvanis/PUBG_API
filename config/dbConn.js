const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABSE_URI, {
            useUnifedTopology: true,
            useNewUrlParser: true
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB