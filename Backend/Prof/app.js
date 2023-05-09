const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
var matiere = require('../Mat/Matiere')
var horaire = require('../Horaire/Horaire')
var bulletin = require('../Bulletin/bulletin')
var heureC = require('../HeureC/heurC')
const app = express()
const port = process.env.PORT || 3000

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbgestion'
  })
  
  connection.connect((err)=>{
    if(err)
      console.log('Connection failed')
    else
      console.log('Connection done')
  })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, USE, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(bodyParser.json())

app.post('/api/Prof',(req, res) => {
    var reqBody =  req.body
    if(reqBody.Matricule =='' & reqBody.Nom =='' & reqBody.TauxHoraire == '')
        res.status(401).send("Remplir tous les champs")
    else{
        var data = [reqBody.Matricule, reqBody.Nom, parseInt(reqBody.TauxHoraire)]
        connection.query("INSERT INTO professeur SET Matricule=?, Nom=?, TauxHoraire=?",data,(err,rows,fields)=>{
            if(err) res.status(400).send("La Matricule existe déjà")
    
            else res.status(200).send("Ajout éffectué") 
            
        })
    }

})

app.get('/api/Prof',(req,res)=>{
    connection.query("SELECT * FROM  professeur ORDER BY Nom",(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})

app.delete('/api/Prof/:Matricule',(req,res)=>{
    var data = [req.params.Matricule]
    connection.query("DELETE FROM professeur WHERE Matricule=?",data,(err,rows,fields)=>{
        if(err){
            res.status(400).send("Une erreur est survenue au cours de la suppression")

        }
        else
            res.status(200).send("Suppression éffectuée")
    })

})

app.put('/api/Prof/:Matricule',(req,res)=>{
    var reqBody =  req.body
    if(reqBody.Matricule =='' & reqBody.Nom =='' & reqBody.TauxHoraire == '')
        res.status(401).send("Remplir tous les champs")
    else{
        var data = [reqBody.Matricule, reqBody.Nom, parseInt(reqBody.TauxHoraire),req.params.Matricule]
        connection.query("UPDATE professeur SET Matricule=?, Nom=?, TauxHoraire=? WHERE Matricule=?",data,(err,rows,fields)=>{
            if(err){
                res.status(400).send("Une erreur est survenue au cours de la suppression")
            }
            else{
                res.status(200).send("Modification éffectuée") 
            }
        })
    }

})

app.get('/api/Prof/:Matricule',(req,res)=>{
    var data = [req.params.Matricule]
    connection.query("SELECT * FROM professeur WHERE Matricule=? ",data,(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})

app.get('/api/Teacher/:Nom',(req,res)=>{
    var data = [req.params.Nom]
    connection.query("SELECT * FROM professeur WHERE Nom=?",data,(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})

app.use(matiere)
app.use(horaire)
app.use(bulletin)
app.use(heureC)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})