import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import Connector from "./DataBase/Connect.js"
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"
import savedRouter from "./routes/saved.route.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3002

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send('Hello Sir!!')
})

app.use('/auth', userRouter)
app.use('/post', postRouter)
app.use('/cmnt', commentRouter)
app.use('/saved', savedRouter)

const startServer = async () => {
    try {
        await Connector()
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()
