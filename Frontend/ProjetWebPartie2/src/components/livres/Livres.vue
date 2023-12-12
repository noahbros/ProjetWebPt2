<!-- Noah Brosseau : Display livres-->
<template>
    <div class="livres">
        <div @click="details" class="card">
        <img :src=props.livres.photo class="card-img-top" id="image-livre" alt="LivreImage">

        <div class="card-body">
            <h5 class="card-title"> {{ livres.nom }}</h5>
            <p class="card-text"> {{ livres.biographie }}</p>
        </div>
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
            photo: '',
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
    router.push(`details/${props.livres.id}`)
}

</script>

<style lang=scss scoped>
.navbar-brand {
    font-weight: bold;
}

.card img {
    width: 124px;
    height: 124px;
    margin: 1rem;
    border: solid 4px black;
    border-radius: 1rem;
    box-shadow: 4px 5px 5px grey;
    align-self: center;
}

h2.title {
    font-weight: bold;
    font-size: 3rem;
}

.card {
    margin: 2rem;
    cursor: pointer;
}

.card:hover {
    box-shadow: -5px -5px 5px grey;
}

.card:active {
    box-shadow: 4px 5px 5px 5px grey;

}

.card-title {
    font-weight: bold;
    text-align: center;
}

.card-text {
    color: grey;
    font-size: 12px;
    text-align: left;
}

div.card {
    width: 12rem;
}

@media(max-width: 768px) {
    .card {
        margin: 0rem;
        margin-top: 1rem;
        margin-left: 5rem;
    
        .card-text{
            margin-left: 1rem;
        }
        .card-body {
            width: 40vw;
        }
    }
}
</style>