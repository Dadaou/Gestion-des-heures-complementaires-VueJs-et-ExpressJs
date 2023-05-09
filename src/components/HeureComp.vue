<template>
<form>
<Header/>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">
    <div class="theme">
        Heure Complémentaire
    </div>
  </a>
</nav>
<div class="container"><br>
<div class="row">
    <div class="col">
        <button type="button" class="btn btn-outline-warning" @click="getProf(),getTot()">Actualiser</button>
    </div>  
</div><br>

<div class="row">
  <div class="col">
    <table class="table table-dark">
        <thead>
            <tr>
             <th scope="col">Matricule</th>
             <th scope="col">Nom</th>
             <th scope="col">Montant</th>
             </tr>
        </thead>
        <tbody>
        <tr v-for= "item in Liste" :key= "item.Matricule">
            <td>{{item.Matricule}}</td>
            <td>{{item.Nom}}</td>
            <td>{{item.Montant}}</td>
        </tr>
        </tbody>
    </table>
  </div>
</div>

   <div class="row">
        <table class="Tot">
            <tr>
                <td><em><h3>Total</h3></em></td>
                <td style="padding-left:12px">
                    <div v-for= "item in TotHC" :key= "item.Total" >
                        <input class="form-control" type="text" v-model="item.Total" readonly>
                    </div> 
                </td>
                <td style="padding-left:12px"><h4>Ar</h4></td>
            </tr>
        </table>
    </div>
</div>
</form>
</template>

<script>
import Header from "./Header.vue"
import axios from "axios"
export default {
    name:'HeureComp',
    components: {Header},
    data(){
        return{
            Liste:[],
            TotHC:[]
        }
    },
    methods:{
    getProf(){
        axios.get('http://localhost:3000/api/HeureComp/')
        .then(reponse => {
            this.Liste = reponse.data
        })
    },
    getTot(){
        axios.get('http://localhost:3000/api/TotHC/')
        .then(reponse => {
            this.TotHC = reponse.data
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
.Tot{
    margin-left: 720px;
    font-family: 'Times New Roman', Times, serif
}
.chmpName,.chmpAn{
    margin-left: 500px
}
.theme{
      font-family: 'Optima';
      font-size: 30px;
}
</style>