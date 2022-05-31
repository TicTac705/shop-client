<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark p-2">
    <a class="navbar-brand p-0" href="/">
      <img src="../../assets/logo.png" alt="logo" width="48" height="48" />
    </a>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar"
      aria-controls="navbar"
      aria-expanded="false"
      aria-label="Toggle navigation"
    ></button>

    <div class="collapse navbar-collapse" id="navbar">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/catalog">Catalog</router-link>
        </li>

        <li class="nav-item" v-if="true">
          <router-link class="nav-link" to="/orders">Catalog</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/cart"
            >Cart
            <span class="badge bg-primary rounded-pill" id="cartQuantity"
              >0</span
            >
          </router-link>
        </li>
      </ul>
    </div>
    <div class="d-flex">
      <button class="btn btn-light" v-on:click="logOut()">Logout</button>

      <router-link v-if="false" class="nav-link" to="/cart">Login</router-link>
      <router-link v-if="false" class="nav-link" to="/cart"
        >Sing in</router-link
      >
    </div>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class HeaderComponent extends Vue {}
</script>

<style scoped></style>
