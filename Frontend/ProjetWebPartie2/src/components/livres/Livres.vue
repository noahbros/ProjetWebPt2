<!-- Noah Brosseau : Page livres-->
<template>
    <div class="livres-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff">Browse</a>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>

        <div class="card">
            <img src="..." class="card-img-top" alt="LivreImage">

            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                    content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';

</script>

<style lang=scss scoped>

.navbar-brand{
    font-weight: bold;
}

.livres-page{
    width: 100vw;
    height: 100vh;
}

h2.title {
    font-weight: bold;
    font-size: 3rem;
}

.card{
    margin: 2rem;
}

div.card {
    width: 12rem;
}
</style>