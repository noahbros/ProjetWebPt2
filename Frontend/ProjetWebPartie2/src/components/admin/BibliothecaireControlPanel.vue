<template>
    <body class="bibliothecaire-control-panel">
        <nav class="navbar border-bottom border-body" style="background: #1e293b ">
            <div class="container-fluid">
                <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Bibliothecaire Control Panel</a>
            </div>
        </nav>


        <div class="bibliothecaire-tables-interface">
            <div class="auteur-section">
                <h2>Auteurs</h2>
                <router-link to="/aAuteur" class="auteur-access">Accéder aux données d'auteurs</router-link>
            </div>
            <div class="categories-section">
                <h2>Categories</h2>
                <router-link to="/aCategories" class="categories-access">Accéder aux données des catégories</router-link>
            </div>
            <div class="emprunts-section">
                <h2>Emprunts</h2>
                <router-link to="/aEmprunts" class="emprunts-access">Accéder aux données des emprunts</router-link>
            </div>
            <div class="livres-section">
                <h2>Livres</h2>
                <router-link to="/aLivres" class="livres-access">Accéder aux données des livres</router-link>
            </div>
        </div>
    </body>
</template>


<script setup>

</script>

<style lang="scss" scoped>
.bibliothecaire-control-panel {
    width: 100vw;
    height: 100vh;
}

.bibliothecaire-tables-interface {
    margin-top: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    .auteur-section {
        margin: 1rem;
        display: flex;
        justify-content: space-evenly;
        padding: 1rem;
        border: solid 2px gray;
        border-radius: 1rem;
        width: 30vw;
        box-shadow: 10px 5px 5px grey;

        .auteur-access {
            text-decoration: none;
            color: green;
            padding: 1rem;
            border: solid 2px green;
            border-radius: 1rem;
            box-shadow: 10px 5px 5px grey
        }

        .auteur-access:hover {
            box-shadow: inset 2px 2px 20px grey;
        }
    }

    .categories-section {
        margin: 1rem;
        display: flex;
        justify-content: space-evenly;
        padding: 1rem;
        border: solid 2px gray;
        border-radius: 1rem;
        width: 30vw;
        box-shadow: 10px 5px 5px grey;

        .categories-access {
            text-decoration: none;
            color: green;
            padding: 1rem;
            border: solid 2px green;
            border-radius: 1rem;
            box-shadow: 10px 5px 5px grey
        }

        .categories-access:hover {
            box-shadow: inset 2px 2px 20px grey;
        }

    }

    .emprunts-section {
        margin: 1rem;
        display: flex;
        justify-content: space-evenly;
        padding: 1rem;
        border: solid 2px gray;
        border-radius: 1rem;
        width: 30vw;
        box-shadow: 10px 5px 5px grey;

        .emprunts-access {
            text-decoration: none;
            color: green;
            padding: 1rem;
            border: solid 2px green;
            border-radius: 1rem;
            box-shadow: 10px 5px 5px grey
        }

        .emprunts-access:hover {
            box-shadow: inset 2px 2px 20px grey;
        }

    }

    .livres-section {
        margin: 1rem;
        display: flex;
        justify-content: space-evenly;
        padding: 1rem;
        border: solid 2px gray;
        border-radius: 1rem;
        width: 30vw;
        box-shadow: 10px 5px 5px grey;

        .livres-access {
            text-decoration: none;
            color: green;
            padding: 1rem;
            border: solid 2px green;
            border-radius: 1rem;
            box-shadow: 10px 5px 5px grey
        }

        .livres-access:hover {
            box-shadow: inset 2px 2px 20px grey;
        }

    }

    h2 {
        font-weight: bold;
    }
}
</style>