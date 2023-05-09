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

router.get('/api/teacher',(req,res)=>{
    connection.query("SELECT Matricule FROM  professeur",(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})

router.get('/api/Number',(req,res)=>{
    connection.query("SELECT Num_mat FROM  matiere",(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})


router.post('/api/Horaire',(req, res) => {
    var reqBody =  req.body
    if(reqBody.Matricule =='' & reqBody.Num_mat =='' & reqBody.Nb_Annee == '')
        res.status(401).send("Remplir tous les champs")
    else{
        var data = [reqBody.Matricule, reqBody.Num_mat, parseInt(reqBody.Annee)]
        connection.query("INSERT INTO horaire SET Matricule=?, Num_mat=?, Annee=?",data,(err,rows,fields)=>{
            if(err) res.status(400).send("La matricule et le N° de matière existe déjà")

            else res.status(200).send("Ajout éffectué") 
            
        })
    }

})

router.get('/api/Horaire',(req,res)=>{
    connection.query("SELECT * FROM  horaire",(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})

router.delete('/api/Horaire/:Matricule&:Num_mat',(req,res)=>{
    var data = [req.params.Matricule,req.params.Num_mat]
    connection.query("DELETE FROM horaire WHERE Matricule=? AND Num_mat=?",data,(err,rows,fields)=>{
        if(err)
            res.status(400).send("Une erreur est survenue au cours de la suppression")

        else
            res.status(200).send("Suppression éffectuée")
    })

})

router.get('/api/Horaire/:Matricule&:Num_mat',(req,res)=>{
    var data = [req.params.Matricule,req.params.Num_mat]
    connection.query("SELECT * FROM horaire WHERE  Matricule=? AND Num_mat=?",data,(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})

router.put('/api/Horaire/:Matricule&:Num_mat',(req,res)=>{
    var reqBody =  req.body
    if(reqBody.Matricule =='' & reqBody.Num_mat =='' & reqBody.Annee == '')
        res.status(401).send("Remplir tous les champs")
    else{
        var data = [reqBody.Matricule, reqBody.Num_mat, parseInt(reqBody.Annee),req.params.Matricule,req.params.Num_mat]
        connection.query("UPDATE horaire SET Matricule=?, Num_mat=?, Annee=? WHERE Matricule=? AND Num_mat=?",data,(err,rows,fields)=>{
            if(err){
                res.status(400).send("Une erreur est survenue au cours de la modification")
            }
            else{
                res.status(200).send("Modification éffectuée") 
            }
        })
    }

})

module.exports = router