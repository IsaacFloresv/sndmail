import express from "express"
import cors from 'cors'
import nodemailer from "nodemailer"
import { APP_PORT } from "./d_config.js"

var app = express();
const PORT = APP_PORT

app.use(cors())
app.use(express.json())

const crearTransporte = () => nodemailer.createTransport({
    host: "mail.grupoalegacr.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "formulario.meic@grupoalegacr.com",
        pass: "E6LQWW8GL641"
    }
})

app.use('/sendemail', function (req, res) {
    try {
        const {tdia,ndia,nomba,apell1a,apell2a,email,tel,provi,canto,distr,nombc,apell1c,apell2c,tdic,ndic,fchahech,fchagar,desch} = req.body
        const cco = ["gestion.meic@grupoalegacr.com", "sistemadenuncias_2@meic.go.cr"]
        const gcorreo = `<h2>Estimado Usuario</h2>
        <p>La siguiente es la informacion que nos acaba de enviar:</p>
        <h4>Datos del Consumidor:</h4>
        <ul>
        <li>Tipo de identificacion: ${tdia}</li>
        <li>Numero de identificacion: ${ndia}</li>
        <li>Nombre completo: ${nomba} ${apell1a} ${apell2a}</li>
        <li>Correo: ${email}</li>
        <li>Telefono: ${tel}</li>
        </ul>
        <h4>Ubicacion Geografica:</h4>
        <li>Provincia: ${provi}</li>
        <li>Canton: ${canto}</li>
        <li>Distrito: ${distr}</li>
        <h4>Datos del Comerciante:</h4>
        <li>Nombre: ${nombc} ${apell1c} ${apell2c}</li>
        <li>Tipo de identificacion: ${tdic}</li>
        <li>Numero de identificacion: ${ndic}</li>
        <h4>Datos del Evento:</h4>
        <li>Fecha del suceso: ${fchahech}</li>
        <li>Garantia: ${fchagar}</li>
        <li>Descripcion: ${desch}</li>`

        crearTransporte().sendMail({
            from: "'Formulario WEB Solicitud de Asesoria' <formulario.meic@grupoalegacr.com>",
            to: `${nomba} ${apell1a} <${email}>`,
            cc: cco,
            subject: "Atencion a Solicitud de Asesoria",
            html: gcorreo
        }, function (error, info) {
            if (error) {
                console.log("ERROR:", error);
                res.status(500).json({ message: error.message });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ status: "OK" });
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/recuperar-password', function (req, res) {
    try {
        const { email, nombre, tempPass } = req.body
        crearTransporte().sendMail({
            from: "'Gestor de Formularios MEIC' <formulario.meic@grupoalegacr.com>",
            to: `${nombre} <${email}>`,
            subject: "Recuperacion de contrasena - Gestor de Formularios",
            html: `
                <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto">
                    <h2 style="color:#005BAC">Recuperacion de contrasena</h2>
                    <p>Hola <strong>${nombre}</strong>,</p>
                    <p>Tu contrasena temporal es:</p>
                    <div style="background:#f0f4ff;border:2px solid #005BAC;border-radius:8px;padding:16px 24px;text-align:center;margin:20px 0">
                        <span style="font-size:24px;font-weight:bold;letter-spacing:2px;color:#1a2741">${tempPass}</span>
                    </div>
                    <p>Al iniciar sesion con esta contrasena, el sistema te pedira crear una nueva.</p>
                    <p style="color:#888;font-size:12px">Si no solicitaste este cambio, ignora este correo.</p>
                </div>
            `
        }, function (error, info) {
            if (error) {
                console.log("ERROR:", error);
                res.status(500).json({ message: error.message });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ status: "OK" });
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.listen(PORT, ()=> {
    console.log(`Server UP run in http://127.0.0.1:${PORT}/`)
})
