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
          <input v-model="loginInfo.email" type="email" class="form-control" id="exampleInputEmail1"
            aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          <div class="text-danger pb-2" v-if="errors.email"> {{ errors.email }}</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input v-model="loginInfo.mot_de_passe" type="password" class="form-control" id="exampleInputPassword1">
          <div class="text-danger pb-2" v-if="errors.mot_de_passe"> {{ errors.mot_de_passe }}</div>
          <router-link to="/signup">Aucun compte?</router-link>
        </div>
        <button type="submit" class="submit btn btn-primary">Login</button>
        <div class="text-danger pb-2" v-if="errors.exists"> {{errors.exists}}</div>
      </form>
    </div>
  </body>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '../../services/serviceAuth.js';
import useAuthStore from '../../stores/authStore.js';
import { watchEffect } from 'vue';

const { setUtilisateur, setToken } = useAuthStore()
const router = useRouter()
const { login } = useAuth();

const loginInfo = ref({
  email: '',
  mot_de_passe: ''
})

const errors = ref({
  email: '',
  mot_de_passe: '',
  exists: ''
})

const connect = () => {
  if (!valide(loginInfo.value)) {
    return
  }
  console.log('login', loginInfo.value)
  login(loginInfo.value.email, loginInfo.value.mot_de_passe).then((data) => {
    console.log('utilisateur', data)
    setToken(data.token)
    setUtilisateur(data.data)
    router.push('/')
  }).catch(err => {
    console.log("Probleme lors de l'ajout", err)

    errors.value.exists = "Se compte n'existe pas." 
    
  })
}

//VALIDATION
const passwordRegex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/


const valide = loginInfo => {
  for (let champ in loginInfo) {
    champValide(champ, loginInfo)
  }

  if (!emailRegex.test(loginInfo.email) || !passwordRegex.test(loginInfo.mot_de_passe)) {
    return false;
  }
  return true;
}

const champValide = (champ, loginInfo) => {
  switch (champ) {
    case 'email':
      if (!emailRegex.test(loginInfo[champ])) {
        errors.value[champ] = `${champ} est invalide.`
      }
      break
    case 'mot_de_passe':
      if (!passwordRegex.test(loginInfo[champ])) {
        errors.value[champ] = `${champ} est invalide.`
      }
  }
}

watchEffect(() => {
  errors.value.email = ''
  if (!emailRegex.test(loginInfo.value.email)) {
    errors.value.email = "*Email invalide."
  
  }
  errors.value.mot_de_passe = ''
  if (!passwordRegex.test(loginInfo.value.mot_de_passe)) {
    errors.value.mot_de_passe = "*Mot de passe est invalide."
    
  }
  return
})



</script>


<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";

nav {
  position: sticky;
  top: 0;
  z-index: 50;
}

h2.login-title {
  padding-bottom: 1rem;
}

.header {
  margin: 1rem 1rem 1rem 1rem;
  margin-bottom: 0rem;
}

.header h3 {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
}

.login-page {
  width: 100vw;
  height: 100vh;
}

.login-form {
  margin: 2rem;
  border: 0.25rem solid rgb(224, 224, 224);
  border-radius: 12px;
  padding: 1rem;
}

.login-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

div.mb-3 {
  padding: 2rem;
}

button.submit {
  margin-left: 8rem;
}

.navbar-brand{
  margin-left: 4rem;
}

@media(max-width: 768px) {
  form {
    margin-left: 3rem;
  }

  .navbar-brand{
    margin-left: 0;
  }

  nav.navbar {
    margin-left: 4rem;
  }

}
</style>