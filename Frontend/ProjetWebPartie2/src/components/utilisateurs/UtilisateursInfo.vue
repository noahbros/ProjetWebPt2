<!-- Noah Brosseau : Page utilisateurs-->
<template>
    <body class="profile-page">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Profile</a>
            </div>
        </nav>

        <section style="background-color: #eee;">
            <div class="container py-5">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card mb-4">
                            <div class="card-body text-center">
                                <img src= {{ utilisateur.photo }}
                                    alt="avatar" class="rounded-circle img-fluid" style="width: 150px;">
                                <h5 class="my-3"> {{ utilisateur.prenom }} {{ utilisateur.nom }}</h5>
                                <p class="text-muted mb-1"></p>
                                <p class="text-muted mb-4"></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card mb-4">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Nom Complet</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="surname text-muted mb-0"> {{  utilisateur.nom }}</p>
                                        <p class="lastname text-muted mb-0"> {{ utilisateur.prenom }}</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Email</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="text-muted mb-0"> {{ utilisateur.email }}</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Date de naissance</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="text-muted mb-0"> {{ utilisateur.naissance }}</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Role</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="text-muted mb-0"> {{ utilisateur.roleId }}</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <p class="mb-0">Address</p>
                                    </div>
                                    <div class="col-sm-9">
                                        <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </body>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import useUtilisateur from '../../services/serviceUtilisateur'
import axios from 'axios';
const route = useRoute();
console.log('route', route)
const {id} = route.params;
const { utilisateurParId } = useUtilisateur();

const utilisateur = ref({})

</script>

<style lang="scss" scoped>
.profile-page{
    width: 100vw;
    height: 100vh;
}

</style>