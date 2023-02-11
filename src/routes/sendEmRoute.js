import {Router} from "express"
import nodemailer from "nodemailer"

const router = Router()

export const enviarEmail = async (req, res) => {
    try {
        const {name, email, telefono} = req.body
                
        const contentHTML = `<h1>User Information</h1>
                        <ul> 
                            <li>Nombre: ${name} </li>
                            <li>Email: ${email} </li>
                            <li>Telefono: ${telefono} </li>
                        </ul>`
        
        const trasnporte = nodemailer.createTransport({
            host: "mail.grupoalegacr.com",
            port: 26,
            secure: false,
            auth: {
                user: "isflores@grupoalegacr.com",
                pass: "Gacela2022"
            },
            tls: {
                rejectUnauthorized: false
            }
         })
        
         const info = await trasnporte.sendMail({
            from: "'Pruebas M' <isflores@grupoalegacr.com>",
            to: 'chifvs@gmail.com',
            subject: "Prueba de M",
            html: contentHTML
         })
        console.log("Message sent", info.messageId)
        res.redirect("/success.html")
    } catch (error) {
        res.json({message: error.message})
    }
}