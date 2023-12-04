<!-- Noah Brosseau : Page Principale -->
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './views/Navbar.vue'
</script>

<template>
  <div class="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
:root {
  --primary: #4ad380;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
}

body{
  background: #f1f5f9;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app{
  display: flex;
  background: #f1f5f9;
  width: 100vw;  

  main{
    flex: 1 1 0;
    padding: 2rem;


    @media (max-width: 768px){
      padding-left: 6rem;
    }
  }
}

</style>
