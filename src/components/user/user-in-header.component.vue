<template>
  <div class="d-flex mx-3 justify-content-center text-info flex-column">
    <loading-component :visible="loading"></loading-component>
    <div v-if="!loading" class="">{{ profileModel.name }}</div>
    <div v-if="!loading" class="">{{ profileModel.email }}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import authService from "@/services/auth.service";

import profileApi from "@/api/profile.api";
import { IProfileModel } from "@/models/account/auth-model.interface";
import LoadingComponent from "@/containers/loading/loading.component.vue";

@Options({
  components: { UserInHeaderComponent, LoadingComponent },
})
export default class UserInHeaderComponent extends Vue {
  public profileModel: IProfileModel;

  public loading = false;

  created() {
    this.isLogged() && this.load();
  }

  public isLogged(): boolean {
    return authService.hasToken();
  }

  public async load() {
    if (this.loading) {
      return;
    }
    this.loading = true;

    try {
      this.profileModel = await profileApi.getUserProfile();
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped></style>
