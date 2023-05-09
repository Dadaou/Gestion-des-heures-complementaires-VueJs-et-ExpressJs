<template>
<form>
<Header/>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">
    <div class="theme">
        Bulletin de Paie
    </div>
  </a>
</nav>
<div class="container"><br>
<div class="row">
    <div class="col">
        <table>
            <tr>
                <td><button class="btn btn-outline-danger" type="button" @click="getProf(matriculeSearch),getTotal(matriculeSearch),getNom(matriculeSearch),getAnnee(matriculeSearch)">Générer</button></td>
                <td style="padding-left:15px"><input class="form-control" type="search" placeholder="Matricule" v-model= "matriculeSearch"></td>
            </tr>
        </table>
    </div>
</div><br>
 <div class="row">
        <table class="chmpName chmpTot">
            <tr>
                <th>Nom</th>
                <td style="padding-left:12px">
                    <div v-for= "item in Name" :key= "item.Nom" >
                        <input class="form-control" type="text" v-model= "item.Nom" readonly>
                    </div> 
                </td>
            </tr>
            <tr>
                <th>Année</th>
                <td style="padding-left:12px">
                    <div v-for= "item in Annee" :key= "item.Annee">
                        <input class="form-control" type="text" v-model= "item.Annee" readonly>
                    </div> 
                </td>
            </tr>
        </table>
    </div><br>

<div class="row">
  <div class="col">
    <table class="table table-dark">
        <thead>
            <tr>
             <th scope="col">Désignation</th>
             <th scope="col">Nombre d'heure</th>
             <th scope="col">Montant</th>
             </tr>
        </thead>
        <tbody>
        <tr v-for= "item in Liste" :key= "item.Designation">
            <td>{{item.Designation}}</td>
            <td>{{item.Nb_heure}}</td>
            <td>{{item.Montant}}</td>
        </tr>
        </tbody>
    </table>
    <div class="row">
        <table class="chmpTot">
            <tr>
                <th><h3><em>Total</em></h3></th>
                <td style="padding-left:12px">
                    <div v-for= "item in Total" :key= "item.Total" >
                        <input class="form-control" type="text" v-model= "item.Total" readonly>
                    </div> 
                </td>
                <td style="padding-left:12px"><h4>Ar</h4></td>
            </tr>
        </table>
    </div>
  </div>
</div>
</div>
</form>
</template>

<script>
import Header from "./Header.vue"
import axios from "axios"
export default {
    name:'Bulletin',
    components: {Header},
    data(){
        return{
            Liste:[],
            Total:[],
            Name:[],
            Annee:[],
            matriculeSearch:''
        }
    },
    methods:{
    getProf(matricule){
        axios.get('http://localhost:3000/api/Bulletin/'+ matricule)
        .then(reponse => {
            this.Liste = reponse.data
        })
    },
    getTotal(matricule){
        axios.get('http://localhost:3000/api/Total/'+ matricule)
        .then(reponse => {
            this.Total = reponse.data
        })
    },
    getNom(matricule){
        axios.get('http://localhost:3000/api/Nom/'+ matricule)
        .then(reponse => {
            this.Name = reponse.data
        })
    },
    getAnnee(matricule){
        axios.get('http://localhost:3000/api/Annee/'+ matricule)
        .then(reponse => {
            this.Annee = reponse.data
        })
    }

}
}
</script>
<style>
.btnSearch{
      margin-left: 285px
}
.listUn{ 
      margin-left: 60px
}
.chmpTot{
    font-family: 'Times New Roman', Times, serif;
    margin-left: 775px
}
.chmpName,.chmpAn{
    margin-left: 500px
}
.theme{
      font-family: 'Optima';
      font-size: 30px;
}
</style>