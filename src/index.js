import express from "express"
import path from "path"

import {enviarEmail} from './routes/sendEmRoute.js'

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/sendemail', enviarEmail)

//app.use(express.static("./src/public"))



app.listen("3050", ()=> {
    console.log("Server on port http://127.0.0.1:3050")
})