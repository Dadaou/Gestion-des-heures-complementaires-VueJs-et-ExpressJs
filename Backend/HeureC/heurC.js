const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const router = express.Router()

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbgestion'
  })
  

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, USE, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

router.use(bodyParser.json())

router.get('/api/HeureComp/',(req,res)=>{
    connection.query("SELECT DISTINCT professeur.Matricule, professeur.Nom, sum(professeur.TauxHoraire*matiere.Nb_heure) AS Montant FROM professeur,matiere,horaire WHERE professeur.Matricule = horaire.Matricule AND matiere.Num_mat = horaire.Num_mat GROUP BY Matricule",(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})

router.get('/api/TotHC/',(req,res)=>{
    connection.query("SELECT sum(professeur.TauxHoraire*matiere.Nb_heure) AS Total FROM professeur,matiere,horaire WHERE professeur.Matricule = horaire.Matricule AND matiere.Num_mat = horaire.Num_mat GROUP BY Annee",(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})
module.exports = router