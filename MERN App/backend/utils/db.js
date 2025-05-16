const  mongoose = require("mongoose");

// const URI = "mongodb+srv://ashusonik4444:Ashuk123@cluster0.akac1gm.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=Cluster0"
const URI = process.env.MONGODB;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection successful")
    } catch (error) {
        console.error("connection feild");
        process.exit(0);
    }
}

module.exports = connectDb;