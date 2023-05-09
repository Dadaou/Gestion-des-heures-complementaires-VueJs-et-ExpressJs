<template>
<form>
<Header/>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">
    <div class="theme">
        Professeur
    </div>
  </a>
  <table class="mytable">
        <tr>
            <td>
                <h4>Rechercher par :</h4>
            </td>
        <div class="myNav">
            <td>
                <router-link  to="/Professeur" id="Matr">Matricule</router-link>
            </td>
            <td>
                <router-link  to="/NameSearch" id="Name">Nom</router-link>
            </td>
        </div>

            <td>
                <button class="btn btn-outline-primary btnSearch" type="submit" @click="getEdit(matriculeSearch),showTabletrue()">Chercher</button>
            </td>
            <td>
                <input class="form-control" type="search" placeholder="Nom" v-model= "matriculeSearch">
            </td>
        </tr>
    </table>
</nav>
<div class="container"><br>
<div class="row">
    <div class="col-3">
        <button id="createBtn" type="button" class="btn btn-outline-info"
        @click="createdShowtrue(),editShowfalse(),showTablefalse()">Créer</button>
        <button  
        type="button" class="btn btn-outline-warning btnAffic" @click="mounted(),createdShowfalse(),showTablefalse()">Actualiser
        </button>
    </div>

</div><br>
<div class="row justify-content-center">
    <div class="col-4" v-show="createdVisible">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Matricule" required autofocus v-model= "Matricule">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Nom" required v-model= "Nom">
        </div>
         <div class="form-group">
            <input type="number" class="form-control" placeholder="Taux horaire" 
            min= "0" required v-model= "TauxHoraire">
        </div>
        <div>
            <button  type="button" class="btn btn-outline-primary" @click="created(),addProf(),mounted(),createdShowfalse()">Ajouter</button>
        </div>
    </div>

    <div class="col-4" v-for="item in ListeEdit" :key="item.Matricule" v-show="editVisible">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Matricule" required v-model= "item.Matricule" readonly>
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Nom" required v-model= "item.Nom">
        </div>
         <div class="form-group">
            <input type="number" class="form-control" placeholder="Taux horaire" 
            min= "0" required v-model= "item.TauxHoraire">
        </div>
        <div>
            <button  type="button" class="btn btn-outline-secondary" @click="edit(item.Matricule),editShowfalse(),mounted()">Enregistrer</button>       
        </div>
    </div>
  
</div><br>

<div class="row">
  <div class="col">
    <table class="table table-dark" v-show="!showTableEdit">
        <thead>
            <tr>
             <th scope="col">Matricule</th>
             <th scope="col">Nom</th>
             <th scope="col" style="padding-left:50px">Taux horaire</th>
             </tr>
        </thead>
        <tbody>
        <tr v-for= "item in Liste" :key= "item.Matricule">
            <td scope="row">{{item.Matricule}}</td>
            <td>{{item.Nom}}</td>
            <td style="padding-left:70px">{{item.TauxHoraire}}</td>
            <td class="text-right">
                <button type="button" class="btn btn-outline-success btn-sm" @click="getEdit(item.Nom),createdShowfalse(),editShowtrue()">Editer</button>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.Matricule),mounted()">Supprimer</button>
            </td>
        </tr>
        </tbody>
    </table>

     <table class="table table-dark" v-show="showTableEdit">
        <thead>
            <tr>
             <th scope="col">Matricule</th>
             <th scope="col">Nom</th>
             <th scope="col" style="padding-left:50px">Taux horaire</th>
             </tr>
        </thead>
        <tbody>
        <tr v-for= "item in ListeEdit" :key= "item.Matricule">
            <td scope="row">{{item.Matricule}}</td>
            <td>{{item.Nom}}</td>
            <td style="padding-left:70px">{{item.TauxHoraire}}</td>
            <td class="text-right">
                <button type="button" class="btn btn-outline-success btn-sm" @click="getEdit(item.Nom),createdShowfalse(),editShowtrue()">Editer</button>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.Matricule),mounted()">Supprimer</button>
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
    name:'Professeur',
    components : {Header},
    data(){
        return{
            Liste:[],
            ListeEdit:[],
            Matricule : '',
            Nom: '',
            TauxHoraire: '',
            matriculeSearch:'',
            createdVisible : false,
            editVisible:false,
            showTableEdit:false,
            showChoice:false
    

        }
    },
    methods:{
    created(){
        axios.post('http://localhost:3000/api/Prof',{
          Matricule : this.Matricule,
          Nom : this.Nom,
          TauxHoraire : this.TauxHoraire
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
         axios.get('http://localhost:3000/api/Prof')
        .then(reponse => {
            this.Liste = reponse.data
        })
    },
    deleted(matricule){
        var result = confirm('Vous êtes sur le point de supprimer, confirmez!')
        if(result){
             axios.delete('http://localhost:3000/api/Prof/'+ matricule)
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
    getEdit(Name){
        axios.get('http://localhost:3000/api/Teacher/'+ Name)
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
    getMatricule(){
        var Matricule
        this.ListeEdit.forEach(item => {
         Matricule = item.Matricule
        })
        return Matricule
    },
     getNom(){
        var Nom
        this.ListeEdit.forEach(item => {
         Nom = item.Nom
        })
        return Nom
    },
     getTaux(){
        var Taux
        this.ListeEdit.forEach(item => {
         Taux = item.TauxHoraire
        })
        return Taux
    },
    addProf(){
        this.Liste.push({
            Matricule :this.Matricule,
            Nom : this.Nom,
            TauxHoraire : this.TauxHoraire
        })
    },
    edit(matricule){
        var result = confirm('Vous êtes sur le point de modifiez, confirmez!')
        if(result){
            axios.put('http://localhost:3000/api/Prof/'+ matricule,{
            Matricule: this.getMatricule(),
            Nom : this.getNom(),
            TauxHoraire : this.getTaux()
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
    showTabletrue(){
        this.showTableEdit = true
    },
    showTablefalse(){
        this.showTableEdit = false
    },
    showChoiceTrue(){
        this.showChoice = true
    },
    showChoiceFalse(){
        this.showChoice = false
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
      margin-left: 100px
}
.listUn{
      margin-left: 60px
}
.mytable{
    margin-left: 400px
}
.myNav{
    padding-left: 15px;
    font-size: 20px;
}
#Name{
     font-family: 'Varela';
     margin-left: 30px;
     color:cornflowerblue;
     text-decoration: none;
}
#Matr{
    font-family: 'Varela' ;
     color: cornflowerblue;
     text-decoration: none;
}
h4{
    font-family: 'Varela';
    font-style: inherit;
}
.theme{
      font-family: 'Optima';
      font-size: 30px;
}

</style>