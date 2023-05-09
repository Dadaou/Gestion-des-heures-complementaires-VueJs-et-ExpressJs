<template>
<form>
<Header/>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">
    <div class="theme">
        Matière
    </div>
  </a>
</nav>
<div class="container"><br>
<div class="row">
    <div class="col-3">
        <button id="createBtn" type="button" class="btn btn-outline-info"
        @click="createdShowtrue(),editShowfalse()">Créer</button>
        <button  
        type="button" class="btn btn-outline-warning btnAffic" @click="mounted(),createdShowfalse()">Actualiser
        </button>
    </div>
</div><br>
<div class="row justify-content-center">
    <div class="col-4" v-show="createdVisible">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="N° matière" required autofocus v-model= "Num_mat">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Désignation" required v-model= "Designation">
        </div>
         <div class="form-group">
            <input type="number" class="form-control" placeholder="Nombre d'heure" 
            min= "0" required v-model= "Nb_heure">
        </div>
        <div>
            <button  type="button" class="btn btn-outline-primary" @click="created(),mouted(),createdShowfalse()">Ajouter</button>
        </div>
    </div>

    <div class="col-4" v-for="item in ListeEdit" :key="item.Num_mat" v-show="editVisible">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="N° matière" required v-model= "item.Num_mat" readonly>
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Désignation" required v-model= "item.Designation">
        </div>
         <div class="form-group">
            <input type="number" class="form-control" placeholder="Nombre d'heure" 
            min= "0" required v-model= "item.Nb_heure">
        </div>
        <div>
            <button  type="button" class="btn btn-outline-secondary" @click="edit(item.Num_mat),mouted(),editShowfalse()">Enregistrer</button>       
        </div>
    </div>
  



</div><br>

<div class="row">
  <div class="col">
    <table class="table table-dark" >
        <thead>
            <tr>
             <th scope="col">N° matière</th>
             <th scope="col">Désignation</th>
             <th scope="col" style="padding-left:50px">Nombre d'heure</th>
             </tr>
        </thead>
        <tbody>
        <tr v-for= "item in Liste" :key= "item.Num_mat">
            <td scope="row">{{item.Num_mat}}</td>
            <td>{{item.Designation}}</td>
            <td style="padding-left:70px">{{item.Nb_heure}}</td>
            <td class="text-right">
                <button type="button" class="btn btn-outline-success btn-sm" @click="getEdit(item.Num_mat),createdShowfalse(),editShowtrue()">Editer</button>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.Num_mat),mounted()">Supprimer</button>
            </td>
        </tr>
        </tbody>
    </table>
  </div>
</div>
</div>
</form>
</template>

<script>
import axios from "axios"
import Header from './Header.vue'
export default {
    components: { Header },
    name:'Matiere',
    data(){
        return{
            Liste:[],
            ListeEdit:[],
            Num_mat: '',
            Designation: '',
            Nb_heure: '',
            createdVisible : false,
            editVisible:false,
        }
    },
    methods:{
    created(){
        axios.post('http://localhost:3000/api/Matiere',{
          Num_mat : this.Num_mat,
          Designation : this.Designation,
          Nb_heure : this.Nb_heure
        })
        .then(reponse => {
            alert(reponse.data)
        })
        .catch(error =>{
            error = "Erreur, vérifiez les informations mentionnées!"
                alert(error)
        })
    },
    mounted(){
         axios.get('http://localhost:3000/api/Matiere')
        .then(reponse => {
            this.Liste = reponse.data
        })
    },
    deleted(numero){
        var result = confirm('Vous êtes sur le point de supprimer, confirmez!')
        if(result){
             axios.delete('http://localhost:3000/api/Matiere/'+ numero)
            .then(reponse => {
             alert(reponse.data)
            })
            .catch(error =>{
            error = "Il y a eu une erreur"
            alert(error)
        })
        }
        else alert("Suppression annuler")
        
       
    },
    getEdit(numero){
        axios.get('http://localhost:3000/api/Matiere/'+ numero)
        .then(reponse => {
            this.ListeEdit = reponse.data
        })
    },
    createdShowtrue(){
        this.createdVisible  = true
    },
    createdShowfalse(){
        this.createdVisible  = false
    },
    editShowtrue(){
        this.editVisible= true
    },
    editShowfalse(){
        this.editVisible = false
    },
    getNumero(){
        var Numero
        this.ListeEdit.forEach(item => {
         Numero = item.Num_mat
        })
        return Numero
    },
     getDesignation(){
        var Designation
        this.ListeEdit.forEach(item => {
         Designation = item.Designation
        })
        return Designation
    },
     getNbHeure(){
        var NbHeure
        this.ListeEdit.forEach(item => {
         NbHeure = item.Nb_heure
        })
        return NbHeure
    },
    edit(numero){
        var result = confirm('Vous êtes sur le point de modifiez, confirmez!')
        if(result){
            axios.put('http://localhost:3000/api/Matiere/'+ numero,{
                Num_mat : this.getNumero(),
                Designation : this.getDesignation(),
                Nb_heure : this.getNbHeure()
         })
            .then(reponse => {
                alert(reponse.data)
            })
            .catch(error =>{
            error = "Erreur, vérifiez les informations mentionnées!"
            alert(error)
        })
        }
        else alert("Modification annuler")
      
    }

 }
}
</script>
<style>
.btnAffic{
    margin-left: 20px
}
.btnSuppr{
    margin-left: 10px
}
.btnSearch{
      margin-left: 465px
}
.theme{
      font-family: 'Optima';
      font-size: 30px;
}
</style>