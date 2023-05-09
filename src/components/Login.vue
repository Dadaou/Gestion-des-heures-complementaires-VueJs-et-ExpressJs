<template>
<form>
<HeaderLogin/>
<div class="container">
<div class="card box">
  <div class="card-body">
      <h3>Login</h3>
      <!--<img :src= "image" alt="Logo">-->
      <form>
        <div class="myContent">
          <input class="form-control" type="text" placeholder="Utilisateur" v-model="user" required><br>
          <input class="form-control" type="password" placeholder="Mot de passe" v-model="psswd" required><br>
          <button class="btn btn-success form-control" @click="login()">Connexion</button>
          <p v-show="estIncorect">Nom d'utilisateur et/ou mot de passe incorrecte </p>
        </div>
      </form>
  </div>
</div>
</div>
</form>
</template>

<script>
import HeaderLogin from "./HeaderLogin.vue"
export default {
    components: {HeaderLogin},
    name : 'Login',
    image :  "./images/LoginIcon.jpg",
    data(){
        return{
            user:'',
            psswd:'',
            estIncorect : false

        }
    },
    methods :{
        login(){
           if (this.user != 'Admin' || this.psswd != 'xxxx') 
                this.estIncorect = true
            else
                this.$router.push('/Professeur')
        }
    }
}
</script>

<style>
.box{
    width: 400px;
    height: 300px;
    margin-left: 300px;
    margin-top: 110px;
}
.myContent{
    padding-top: 10px;
}

h3{
    padding-left: 130px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
p{
    color: red;
    font-family: 'Times New Roman', Times, serif;
    padding-left: 30px;
}
</style>