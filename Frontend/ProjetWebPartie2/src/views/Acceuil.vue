<template>
  <body class="acceuil-page">
    <nav class="navbar border-bottom border-body" style="background: #1e293b ">
      <div class="container-fluid">
        <a class="navbar-brand" style="color: #ffffff; font-weight: bold">Acceuil</a>
      </div>
    </nav>
    <div class="front">
      <img src="../../public/backdrop.png">
      <h1>Bienvenu à BiblioTab!</h1>
    </div>
    <div class="content">
      <p>BiblioTab est-un site de gestion pour les bibliothèques qui cherche à organisé leurs emprunts et leurs collection
        de livres en lignes.</p>
    </div>
  </body>
</template>

<style lang="scss" scoped>
body.acceuil-page {
  width: 100vw;

  .front {
    position: relative;
    text-align: center;

    h1{
      position: absolute;
      top: 1rem;
      margin-left: 2rem;
      padding: 2rem;
      background-color:whitesmoke;
      border: solid .25rem black;
      border-radius: 1rem;
      box-shadow: 10px 5px 5px rgb(24, 23, 23);
      font-weight: bold;
    }

    img{
      width: 100%;
      height: 50vh;
    }
  }

  .content{
    background: rgb(223, 221, 221);

    p{
      padding: 1rem;
    }
  }
}



@media(max-width: 768px) {
  .content-acceuil {
    margin-left: 4rem;
  }

  nav.navbar{
    margin-left: 4rem;
  }
}
</style>
