const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
var router = express.Router()

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

router.get('/api/Bulletin/:Matricule',(req,res)=>{
    var data = [req.params.Matricule]
    connection.query("SELECT DISTINCT matiere.Designation, matiere.Nb_heure,(professeur.TauxHoraire*matiere.Nb_heure) AS Montant FROM professeur,matiere,horaire WHERE professeur.Matricule = horaire.Matricule AND matiere.Num_mat = horaire.Num_mat AND professeur.Matricule=?",data,(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})


router.get('/api/Total/:Matricule',(req,res)=>{
    var data = [req.params.Matricule]
    connection.query("SELECT sum(professeur.TauxHoraire*matiere.Nb_heure) AS Total FROM professeur,matiere,horaire WHERE professeur.Matricule = horaire.Matricule AND matiere.Num_mat = horaire.Num_mat AND professeur.Matricule = ?",data,(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})


router.get('/api/Nom/:Matricule',(req,res)=>{
    var data = [req.params.Matricule]
    connection.query("SELECT Nom FROM professeur WHERE Matricule = ?",data,(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})

router.get('/api/Annee/:Matricule',(req,res)=>{
    var data = [req.params.Matricule]
    connection.query("SELECT DISTINCT Annee FROM horaire WHERE Matricule = ?",data,(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})

module.exports = router