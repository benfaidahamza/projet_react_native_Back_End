require('dotenv').config()
const express = require('express');
let cors=require('cors')

//routes 
const Users=require('./routes/api/users')
const Auth=require('./routes/api/authentification')
const Patients=require('./routes/api/patients')
const Medicaments=require('./routes/api/medicaments')
const Appointments=require('./routes/api/appointments')

const app= express()

//connexion BDD
const connectDB=require('./db/conn')

app.use(express.json())
app.use(cors())

//Connect Database 
connectDB();

app.use('/api/users',Users)
app.use('/api/patients',Patients)
app.use('/api/medicaments',Medicaments)
app.use('/api/appointments',Appointments)
app.use('/api/auth',Auth)

app.listen(3000,()=>{
    console.log("Serveur à l'écoute")
})