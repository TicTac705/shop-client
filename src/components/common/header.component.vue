<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark p-2 fixed-top">
    <a class="navbar-brand p-0" href="/">
      <img src="@/assets/store.png" alt="logo" width="48" height="48" />
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
        <li class="nav-item" v-if="true">
          <router-link class="nav-link" :to="{ name: 'catalog' }">
            Catalog
          </router-link>
        </li>
      </ul>
    </div>

    <div class="d-flex">
      <div>
        <router-link class="nav-link" to="/basket">
          <img
            src="@/assets/basket.svg"
            alt="basket"
            width="30"
            height="30"
            class="mx-1"
          />
          <span class="badge bg-primary rounded-pill">{{ countBasket }}</span>
        </router-link>
      </div>
      <user-in-header-component></user-in-header-component>
      <router-link v-if="!isLogged" class="nav-link" to="/auth">
        Login
      </router-link>
      <router-link v-if="!isLogged" class="nav-link" to="/auth">
        Sing in
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import authService from "@/services/auth.service";
import basketService from "@/services/basket.service";
import UserInHeaderComponent from "@/components/user/user-in-header.component.vue";

@Options({
  components: { UserInHeaderComponent },
})
export default class HeaderComponent extends Vue {
  countBasket = 0;
  async created() {
    this.countBasket = basketService.basketCount$.value;
    basketService.basketCount$.subscribe((countBasket) => {
      this.countBasket = countBasket;
    });

    if (!basketService.isInitialize$.value) {
      await basketService.updateBasket();
    }
  }

  public isLogged(): boolean {
    return authService.hasToken();
  }
}
</script>

<style scoped></style>
