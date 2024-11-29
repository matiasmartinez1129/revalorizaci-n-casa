const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para manejar el envío del formulario
app.post('/send-email', async (req, res) => {
    const { fullname, phone, email, description } = req.body;

    // Configurar el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Puedes usar otro servicio de correo
        auth: {
            user: 'matiasmartinez.web@gmail.com', // Reemplaza con tu correo
            pass: 'arkfvemusczwlpvq' // Genera una contraseña para apps si usas Gmail
        }
    });

    try {
        // Detalles del correo
        await transporter.sendMail({
            from: email, // Correo del usuario
            to: 'matiasmartinez.web@gmail.com', // Tu correo
            subject: `Nuevo Mensaje de: ${fullname}`,
            text: `Teléfono: ${phone}\nEmail: ${email}\nMensaje: ${description}`
        });
        res.status(200).json({ message: 'Correo enviado con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al enviar el correo.' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
