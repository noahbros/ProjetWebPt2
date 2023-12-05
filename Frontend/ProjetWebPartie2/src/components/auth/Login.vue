<!-- Noah Brosseau : Page login-->
<template>
  <body class="login-page">
    <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Login</a>
            </div>
    </nav>


    <div class="login-section">
      <div class="header">
        <img>
        <h3>BiblioTab</h3>
      </div>

      <form class="login-form" @submit.prevent="connect">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input v-model="loginInfo.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input v-model="loginInfo.mot_de_passe" type="password" class="form-control" id="exampleInputPassword1">
          <router-link to="/signup">Aucun compte?</router-link>
        </div>
        <button type="submit" class="submit btn btn-primary">Login</button>
      </form>
    </div>
  </body>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useLogin from '../../services/serviceAuth.js';
const router = useRouter()
const { login } = useLogin();

const loginInfo = ref({
  email: '',
  mot_de_passe: ''
})

const connect = () =>{
  console.log('login', loginInfo.value)
  login(loginInfo.value.email,loginInfo.value.mot_de_passe).then((data) =>{
    console.log('utilisateur', data)
    router.push('/')
  }).catch(err => console.log("Probleme lors de l'ajout", err))
}

</script>


<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";

h2.login-title{
  padding-bottom: 1rem;
}

.header{
  margin: 1rem 1rem 1rem 1rem;
  margin-bottom: 0rem;
}

.header h3{
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
}

.login-page{
  width: 100vw;
  height: 100vh;
}

.login-form{
  margin: 2rem;
  border: 0.25rem solid rgb(224, 224, 224);
  border-radius: 12px;
  padding: 1rem;
}

.login-section{
  display: flex;
  flex-direction: column;
  align-items: center;
}

div.mb-3{
  padding: 2rem;
}
button.submit{
  margin-left: 8rem;
}

@media(max-width: 768px){
  form{
    margin-left: 3rem;
  }

  nav.navbar{
    margin-left: 4rem;
  }

}
</style>