<template>
  <div class="d-flex justify-content-center text-info flex-column">
    <loading-component :visible="loading"></loading-component>
  </div>
  <div
    class="dropdown text-end dropstart"
    v-if="!loading && profileModel !== null"
  >
    <a
      href="#"
      class="d-block link-dark text-decoration-none dropdown-toggle"
      id="dropdownUser1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img
        :src="
          'https://avatars.dicebear.com/api/male/' +
          profileModel.createdAt +
          '.svg'
        "
        alt="avatar"
        width="40"
        height="40"
        class="rounded-circle"
      />
    </a>
    <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
      <li>
        <a class="dropdown-item disabled text-dark" href="#">
          {{ profileModel.name }}
        </a>
      </li>
      <li>
        <a class="dropdown-item disabled text-dark" href="#">
          {{ profileModel.email }}
        </a>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li>
        <router-link class="dropdown-item" to="/orders">Orders</router-link>
      </li>
      <li>
        <a class="dropdown-item" href="#" v-if="isLogged" v-on:click="logOut()">
          Sign out
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import authService from "@/services/auth.service";

import { IProfileModel } from "@/models/account/auth-model.interface";
import LoadingComponent from "@/containers/loading/loading.component.vue";

@Options({
  components: { UserInHeaderComponent, LoadingComponent },
})
export default class UserInHeaderComponent extends Vue {
  public profileModel: IProfileModel | null = null;

  public loading = false;

  async created() {
    if (!this.isLogged()) {
      return;
    }

    authService.profileModel$.subscribe((profileModel) => {
      this.profileModel = profileModel;
    });

    if (!authService.isInitialize$.value) {
      await authService.getProfile();
    }
  }

  public isLogged(): boolean {
    return authService.hasToken();
  }

  public async logOut() {
    await authService.clear();
    authService.isInitialize$.next(false);
    await this.$router.push("auth");
  }
}
</script>

<style scoped>
.dropstart {
  margin-right: 10px;
}
</style>
