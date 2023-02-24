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
            host: "mail.grupoalegacr.com",
            port: 465,
            secure: true,            
            auth: {
                user: "formulario.meic@grupoalegacr.com",
                pass: "E6LQWW8GL641"
            }
         })

        const gcorreo = `_______________________________________________________
        <h2>Estimado Usuario</h2>
        <p>La siguiente es la informacion que nos acaba de enviar:</p>
        <h4>Datos del Consumidor:</h4>
        <ul>
        <li>Tipo de identificacion: ${tdia}</li>
        <li>Numero de identificaion: ${ndia}</li>
        <li>Nombre completo:  ${nomba} ${apell1a} ${apell2a}</li>
        <li>Correo: ${email}</li> 
        <li>Telefono: ${tel}</li>
        _________________________________________________
        <h4> Ubicacion Geografica:</h4>
        <li>Provincia: ${provi}</li>
        <li>Canton: ${canto}</li>
        <li>Distrito: ${distr}</li>
        </ul>
        _________________________________________________
        
        <h4>Datos del Comerciante:</h4>
        <li>Nombre: ${nombc} ${apell1c} ${apell2c}</li>
        <li>Tipo de identificacion: ${tdic}</li>
        <li>Numero de identificaion: ${ndic}</li>
        __________________________________________________
        <h4>Datos del Evento:</h4>
        <li>Fecha del suceso: ${fchahech}</li>
        <li> Garantia: ${fchagar}</li>
        <li>Descripción de lo sucedido:</li>
        <p>${desch}</p>
        
        <h4>Nota importante:</h4>
        <h5>Respuesta:</h5>
        <p>24 horas hábiles un funcionario capacitado revisará los hechos
        expuestos y le brindará la Asesoria de acuerdo con la ley y las competencias
        de la Comisión Nacional del Consumidor</p>      
        ___________________________________________________`;

         console.log(gcorreo)
         const info = trasnporte.sendMail({
            from: "'Formulario WEB Solicitud de Asesoria' <formulario.meic@grupoalegacr.com>",
            to: `${nomba} ${apell1a} <${email}>`,
            cc: cco,
            subject: "Atención a Solicitud de Asesoria",
            html: gcorreo
         }, function (error, info) {
            console.log("senMail returned!");
            if (error) {
              console.log("ERROR!!!!!!", error);
            } else {
              console.log('Email sent: ' + info.response);
              res.json({ status: "OK" });
            }})
    } catch (error) {
        res.json({message: error.message})
    }
})

app.listen(PORT, ()=> {
    console.log(`Server UP run in http://127.0.0.1:${PORT}/`)
})
