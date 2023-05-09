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

router.post('/api/Matiere',(req, res) => {
    var reqBody =  req.body
    if(reqBody.Num_mat =='' & reqBody.Designation =='' & reqBody.Nb_heure == '')
        res.status(401).send("Remplir tous les champs")
    else{
        var data = [reqBody.Num_mat, reqBody.Designation, parseInt(reqBody.Nb_heure)]
        connection.query("INSERT INTO matiere SET Num_mat=?, Designation=?, Nb_heure=?",data,(err,rows,fields)=>{
            if(err) res.status(400).send("Le N° de matière existe déjà")

            else res.status(200).send("Ajout éffectué") 
            
        })
    }
})

router.get('/api/Matiere',(req,res)=>{
    connection.query("SELECT * FROM  matiere ORDER BY Designation",(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})

router.delete('/api/Matiere/:Num_mat',(req,res)=>{
    var data = [req.params.Num_mat]
    connection.query("DELETE FROM matiere WHERE Num_mat=?",data,(err,rows,fields)=>{
        if(err)
            res.status(400).send("Une erreur est survenue au cours de la suppression")

        else
            res.status(200).send("Suppression éffectuée")
    })

})

router.put('/api/Matiere/:Num_mat',(req,res)=>{
    var reqBody =  req.body
    if(reqBody.Num_mat =='' & reqBody.Designation =='' & reqBody.Nb_heure == '')
        res.status(401).send("Remplir tous les champs")
    else{
        var data = [reqBody.Num_mat, reqBody.Designation, parseInt(reqBody.Nb_heure),req.params.Num_mat]
        connection.query("UPDATE matiere SET Num_mat=?, Designation=?, Nb_heure=? WHERE Num_Mat=?",data,(err,rows,fields)=>{
            if(err){
                res.status(400).send("Une erreur est survenue au cours de la suppression")
            }
            else{
                res.status(200).send("Modification éffectuée") 
            }
        })
    }

})

router.get('/api/Matiere/:Num_mat',(req,res)=>{
    var data = [req.params.Num_mat]
    connection.query("SELECT * FROM matiere WHERE Num_mat=?",data,(err,rows,fields)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows) 
        }
    })
})

module.exports = router