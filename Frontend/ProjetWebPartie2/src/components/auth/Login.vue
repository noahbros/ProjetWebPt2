<!-- Noah Brosseau : Page login-->
<template>
  <body>

    <div>
      <form>
        
        <div class="mb-3">
          <h2 class="login-title">Login</h2>
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="submit btn btn-primary">Submit</button>
      </form>
    </div>
  </body>
</template>

<script>
import { ref, reactive } from 'vue';

</script>


<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";

h2.login-title{
  padding-bottom: 1rem;
}

div.mb-3{
  padding: 2rem;
}
button.submit{
  margin-left: 8rem;
}

@media(max-width: 768px){
  form{
    margin-left: 3rem;
  }
}
</style>