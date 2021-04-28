require('dotenv/config')
const express = require('express')
const nodemailer = require('nodemailer')
const app = express()


const port = 3000

const user = 'vitor.hugo.futebol@gmail.com'
const pass = process.env.DB_PASS

app.use(express.json())


app.get('/', (req, res)=>{ res.send('Hello World')})

app.post('/send', (req,res)=>{

  const {nome, email, telefone, assunto, mensagem} = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {user, pass}
  })

  transporter.sendMail({
    from: user,
    to: email,
    // replyTo: 'vitorhprsilva@gmail.com',
    subject: assunto, //assunto
    text: `Olá, meu nome é: ${nome} \n Meu telefone é: ${telefone} \n Meu email é: vitorhprsilva@gmail.com \n E gostaria de deixar a seguinte mensagem: ${mensagem}`,
  }).then(info=>{
    res.send(info)
  }).catch(e=> res.send(e))

})

app.listen(port,()=>console.log(`Runing on port ${port}` ))
