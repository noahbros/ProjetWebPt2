<!-- Noah Brosseau : Page livres-->
<template>
    <div class="card">
        <img src="..." class="card-img-top" alt="LivreImage">

        <div class="card-body">
            <h5 class="card-title"> {{ livres.nom }}</h5>
            <p class="card-text"> {{ livres.biographie }}</p>
            <a @click="details" class="btn btn-primary">Voir</a>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({
    livres: {
        type: Object,
        default: () => ({
            id: '',
            nom: 'test',
            date_de_pub: '',
            rating: 0,
            maison_edition: 'test',
            location: 'test',
            montant: 0,
            biographie: 'test',
            cateogryId: '',
            auteurId: ''
        })
    }
})

const details = () => {
    router.push(`/details/${props.livres.id}`)
}


</script>

<style lang=scss scoped>
.navbar-brand {
    font-weight: bold;
}

.livres-page {
    width: 100vw;
    height: 100vh;
}

h2.title {
    font-weight: bold;
    font-size: 3rem;
}

.card {
    margin: 2rem;
}

div.card {
    width: 12rem;
}

@media(max-width: 768px) {
    nav.navbar {
        margin-left: 4rem;
    }

    .card {
        margin-left: 5rem;
    }
}
</style>