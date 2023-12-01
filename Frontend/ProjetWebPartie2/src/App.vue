<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <RouterLink to="/" class="navbar-brand" href="#">Navbar</RouterLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <RouterLink to="/login" class="nav-link active login" aria-current="page" href="#">Login</RouterLink>
              <RouterLink to="/about" class="nav-link" href="#">About</RouterLink>
              <a class="nav-link" href="#">Pricing</a>
            </div>
            <RouterView/>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "./components/css/navstyle.css" 
</style>
