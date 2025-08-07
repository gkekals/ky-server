const express = require("express")
const mongoose=require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO_URI)
        .then(()=> console.log("mongodb 연결 성공"))
        .catch((err)=> console.log('연결 실패',err))



const characterRouter = require('./routes/character')
app.use('/api/char',characterRouter)



app.get("/", (req, res) => {
    res.send("Hello Express!")
})
app.listen(PORT, () => {
    console.log("Server is running!")
})