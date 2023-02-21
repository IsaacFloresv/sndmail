import express, {Router} from "express"
import cors from 'cors'
import nodemailer from "nodemailer"
import { APP_PORT } from "./d_config.js"

var app = express();
const PORT = APP_PORT

app.use(cors())
app.use(express.json())

app.use('/sendemail', function (req, res) {
    
    try {
        console.log(req.body)
        const {tdia,ndia,nomba,apell1a,apell2a,email,tel,provi,canto,distr,nombc,apell1c,apell2c,tdic,ndic,fchahech,fchagar,desch} = req.body
        const cco = ["gestion.meic@grupoalegacr.com", "sistemadenuncias_2@meic.go.cr"]
        const trasnporte = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,            
            auth: {
                user: "isaacfloresv@gmail.com",
                pass: "hirazcuzpozfmihr"
            }
         })

        const gcorreo = `_______________________________________________________
        <h2>Estimado Afectado</h2>
        <p>La siguiente es la informacion que nos acaba de enviar:</p>
        <h4>Datos del Afectado:</h4>
        <ul>
        <li>Tipo de identificacion: ${tdia}</li>
        <li>Numero de identificaion: ${ndia}</li>
        <li>Nombre completo:  ${nomba} ${apell1a} ${apell2a}</li>
        <li>Correo: ${email} Telefono: ${tel}</li>
        <li> Ubicacion Geografica</li>
        <li>Provincia: ${provi} Canton: ${canto} Distrito: ${distr}</li>
        </ul>
        _________________________________________________
        
        <h4>Datos del Comerciante</h4>
        <li>Nombre: ${nombc} ${apell1c} ${apell2c}</li>
        <li>Tipo de identificacion: ${tdic}</li>
        <li>Numero de identificaion: ${ndic}</li>
        __________________________________________________
        <h4>Datos del Evento:</h4>
        <li>Fecha del suceso: ${fchahech} Garantia: ${fchagar}</li>
        <li>Descripción de lo sucedido:</li>
        <p>${desch}</p>
        ___________________________________________________`;

         console.log(gcorreo)
         const info = trasnporte.sendMail({
            from: "'Pruebas M' <isaacfloresv@gmail.com>",
            to: `${nomba} ${apell1a} <${email}>`,
            cc: cco,
            subject: "Prueba de M",
            html: gcorreo
         }, function (error, info) {
            console.log("senMail returned!");
            if (error) {
              console.log("ERROR!!!!!!", error);
            } else {
              console.log('Email sent: ' + info.response);
            }})
    } catch (error) {
        res.json({message: error.message})
    }
})

app.listen(PORT, ()=> {
    console.log(`Server UP run in http://127.0.0.1:${PORT}/`)
})