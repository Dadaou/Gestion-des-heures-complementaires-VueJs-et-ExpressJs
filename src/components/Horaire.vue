<template>
<form>
<Header/>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">
    <div class="theme">
        Volume Horaire
    </div>
  </a>
</nav>
<div class="container"><br>
<div class="row">
    <div class="col-3">
        <button id="createBtn" type="button" class="btn btn-outline-info"
        @click="createdShowtrue(),editShowfalse(),showTablefalse()">Créer</button>
        <button  
        type="button" class="btn btn-outline-warning btnAffic" @click="mounted(),createdShowfalse()">Actualiser
        </button>
    </div>
</div><br>
<div class="row justify-content-center">
    <div class="col-4" v-show="createdVisible">
      <div class="form-group">
        <select id = "listUn" class="form-control" required @click="getMatricule()">
            <option selected>Matricule</option>
            <option v-for="item in ListMatr" :key="item.Matricule">
                {{item.Matricule}}
            </option>
        </select>
      </div>

      <div class="form-group">
         <select id = "listDeux" class="form-control" required @click="getNumeroAPI()">
            <option selected>N° matiere</option>
            <option v-for="item in ListNum" :key="item.Num_mat">
                {{item.Num_mat}}
            </option>
        </select>
      </div>
       
         <div class="form-group">
            <input type="number" class="form-control" placeholder="Année" 
            min= "0" required v-model= "Annee">
        </div>
        <div>
            <button  type="button" class="btn btn-outline-primary" @click="created(),mounted(),createdShowfalse()">Ajouter</button>
        </div>
    </div>

    <div class="col-4" v-show="editVisible">
        <div v-for="list in ListeEdit" :key="list.Matricule">
        <div class="form-group">
          <input type="text" class="form-control"
            v-model= "list.Matricule" readonly>
        </div>

        <div class="form-group">
             <input type="text" class="form-control"
            v-model= "list.Num_mat" readonly>
        </div>
       
         <div class="form-group">
            <input type="number" class="form-control" placeholder="Année" 
            min= "0" required v-model= "list.Annee">
        </div>
        <div>
            <button  type="button" class="btn btn-outline-secondary" @click="edit(list.Matricule,list.Num_mat),mounted(),editShowfalse()">Enregistrer</button>
        </div>
        </div>
    </div>
</div><br>

<div class="row">
  <div class="col">
    <table class="table table-dark">
        <thead>
            <tr>
            <th scope="col">Matricule</th>
             <th scope="col">N° matière</th>
             <th scope="col" style="padding-left:50px">Année</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in Liste" :key= "item.Matricule">
            <td scope="row">{{item.Matricule}}</td>
            <td>{{item.Num_mat}}</td>
            <td style="padding-left:57px">{{item.Annee}}</td>
            <td class="text-right">
                <button type="button" class="btn btn-outline-success btn-sm" @click="getEdit(item.Matricule,item.Num_mat),createdShowfalse(),editShowtrue()">Editer</button>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.Matricule,item.Num_mat),mounted()">Supprimer</button>
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
import Header from "./Header.vue"
import axios from "axios"
export default {
    name:'Horaire',
    components : {Header},
    data(){
        return{

            Liste:[],
            ListeEdit:[],
            ListMatr:[],
            ListNum:[],
            Matricule:'',
            Num_mat: '',
            Annee: '',
            createdVisible : false,
            editVisible:false,
          
        }
    },
    methods:{
    getMatricule(){
        axios.get('http://localhost:3000/api/teacher')
        .then(reponse => {
            this.ListMatr= reponse.data
        })
    },
    getNumeroAPI(){
        axios.get('http://localhost:3000/api/number')
        .then(reponse => {
            this.ListNum= reponse.data
        })
    },
    created(){
        axios.post('http://localhost:3000/api/Horaire',{
          Matricule : this.getIndexMatricule(),
          Num_mat : this.getIndexNumero() ,
          Annee : this.Annee
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
         axios.get('http://localhost:3000/api/Horaire')
        .then(reponse => {
            this.Liste = reponse.data
        })
    },
    deleted(matricule,numero){
        var result = confirm('Vous êtes sur le point de supprimer, confirmez!')
        if(result){
             axios.delete('http://localhost:3000/api/Horaire/'+ matricule + '&' + numero)
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
    getEdit(matricule,numero){
        axios.get('http://localhost:3000/api/Horaire/'+ matricule + '&' + numero)
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
     getMtr(){
        var Matricule
        this.ListeEdit.forEach(item => {
         Matricule = item.Matricule
        })
        return Matricule
    },
     getAnnee(){
        var Annee
        this.ListeEdit.forEach(item => {
         Annee = item.Annee
        })
        return Annee
    },
    edit(matricule,numero){
        var result = confirm('Vous êtes sur le point de modifiez, confirmez!')
        if(result){
            axios.put('http://localhost:3000/api/Horaire/'+ matricule + '&' + numero,{
                Matricule : this.getMtr(),
                Num_mat: this.getNumero(),
                Annee : this.getAnnee()
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
      
    },
    getIndexMatricule(){
        var list = document.querySelector('#listUn')
        var Matricule = (list.options[list.selectedIndex].innerHTML)   
        return Matricule
    },
    getIndexNumero(){
        var list = document.querySelector('#listDeux')
        var Numero = (list.options[list.selectedIndex].innerHTML)   
        return Numero
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