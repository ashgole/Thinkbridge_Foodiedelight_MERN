import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'
import path from 'path';


const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))


app.use("/images", express.static("images"));
app.use(cookieParser())

//routes import
import restaurantRouter from './routes/restaurants.routes.js'

//routes declaration
app.use('/api/restaurant', restaurantRouter)

export { app }