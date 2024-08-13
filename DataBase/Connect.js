import mongoose from "mongoose";

const Connector = async () => {
    try {
        await mongoose.connect(process.env.Blog_Db)
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
}

export default Connector