<template>
    <aside :class="`${is_open && 'is-open'}`">
      <div class="logo">
        <img src="../../public/favicon.ico" alt="Vue">
      </div>

      <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="ToggleMenu">
          <span class="material-icons">keyboard_double_arrow_right</span>
        </button>
      </div>

      <h3>Menu</h3>
      <div class="menu">
        <router-link class="button" to="/about">
          <span class="material-icons">home</span>
          <span class="text">Acceuil</span>
        </router-link>
        <router-link class="button" to="/livres">
          <span class="material-icons">search</span>
          <span class="text">Browse</span>
        </router-link>
        <router-link class="button" to="/login">
          <span class="material-icons">login</span>
          <span class="text">Login</span>
        </router-link>
      </div>

      <div class="flex"></div>

      <div class="menu">
        <router-link class="button" to="/">
          <span class="material-icons">person</span>
          <span class="text">Account</span>
        </router-link>
      </div>
    </aside>
</template> 

<script setup>
import {ref} from 'vue'

const is_open = ref(localStorage.getItem("is_open") === "true")

const ToggleMenu = () =>{
  is_open.value = !is_open.value

  localStorage.setItem("is_open", is_open.value)
}
</script>

<style lang="scss" scoped>
aside{
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;

  background-color: #1e293b;
  color: #f1f5f9;

  transition: 0.2s ease-out;

  .logo{
    margin-bottom: 1rem;

    img{
      width: 2rem;

    }
  }

  .menu-toggle-wrap{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle{
    cursor: pointer;
    appearance: none;
    border: none;
    outline: none;
    background: none;

      .material-icons{
        font-size: 2rem;
        color: #f1f5f9; 
        transition: 0.2s ease-out;
      }

      &:hover{
        .material-icons{
          color:#4ad380;
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3, .button .text{
    opacity: 0;
    transition: 0.3s ease-out;
  }

  h3{
    color: #64748b;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

.flex{
  flex: 1 1 0;
}

  .menu {
    margin: 0 -1rem;

    .button{
      display: flex;
      align-items: center;
      text-decoration: none;

      padding: 0.5rem 1rem;
      transition: 0.2s ease-out;

      .material-icons{
        font-size: 2rem;
        color: #f1f5f9;
        transition: 0.2s ease-out;
      }

      .text{
        color: #f1f5f9;
        transition: 0.2s ease-out;        
      }

      &:hover, &.router-link-exact-active{
        background-color: #334155;

        .material-icons, .text{
          color: #4ad380;
        }
      }

      &.router-link-exact-active{
        border-right: 5px solid #4ad380;
      }
    }
  }

  &.is-open {
    width: 300px;
    .menu-toggle-wrap{
      top: -3rem;
      .menu-toggle{
        transform: rotate(-180deg);
      }
    }
    h3, .button .text{
    opacity: 1;
  }

  .button{
    .material-icons{
      margin-right: 1rem;
    }
  }
  }

  @media(max-width: 768px){
    position: fixed;
    z-index: 99;
  }


} 
</style>