<template>
<nav class="navbar navbar-expand-lg navbar-light bg-danger">
  <a class="navbar-brand" href="#">
    <div class="collapse navbar-collapse">
    <ul class="navbar-nav mr-auto monUl">
      <li class="nav-item">
        <router-link  to="/Professeur" class="nav-link" id="Prf">Professeur |</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/Matiere" class="nav-link" id="Mat">Matière |</router-link>
      </li>

      <li class="nav-item">
        <router-link to="/Horaire" class="nav-link" id="Vh">Volume Horaire |</router-link>
      </li>

      <li class="nav-item">
         <router-link to="/Bulletin" class="nav-link" id="Bp">Bulletin de Paie |</router-link>
      </li>

      <li class="nav-item">
        <router-link to="/HeureComp" class="nav-link" id="Hc">Heure Complémentaire</router-link>
      </li>
    </ul>
  </div>
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
<!--
  <div class="collapse navbar-collapse">
    <ul class="navbar-nav mr-auto monUl">
      <li class="nav-item">
        <router-link  to="/Professeur" class="nav-link">Professeur</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/Matiere" class="nav-link">Matière</router-link>
      </li>

      <li class="nav-item">
        <router-link to="/Horaire" class="nav-link">Volume Horaire</router-link>
      </li>

      <li class="nav-item">
         <router-link to="/Bulletin" class="nav-link">Bulletin de paie</router-link>
      </li>

      <li class="nav-item">
        <router-link to="/HeureComp" class="nav-link">Heure Complémentaire</router-link>
      </li>
    </ul>
  </div>
-->
</nav>

</template>
<script>
export default {
    name : 'Header'
}
</script>
<style scoped>
.monUl{
  margin-left: 500px;
}
router-link{
  color: aliceblue;
}



#style1{
  margin-left: 35px;
}

#style2{
  margin-left: 80px;
}
#Prf,#Mat,#Vh,#Bp,#Hc{
  color: aliceblue;
}

</style>