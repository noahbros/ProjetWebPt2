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
            </div>
            <div class="categories-section">
                <h2>Categories</h2>
            </div>
            <div class="emprunts-section">
                <h2>Emprunts</h2>
            </div>
            <div class="livres-section">
                <h2>Livres</h2>
            </div>
        </div>
    </body>
</template>


<script setup>

</script>

<style lang="scss" scoped>

.bibliothecaire-control-panel{
    width: 100vw;
    height: 100vh;
}

.bibliothecaire-tables-interface {
    margin-top: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    

    h2 {
        font-weight: bold;
    }
}

</style>