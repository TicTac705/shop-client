<template>
  <div class="root">
    <div class="app-logo-container">Authorization</div>
    <div class="login-page">
      <form @submit.prevent="submit">
        <input
          type="text"
          v-model="username"
          placeholder="Login"
          class="form-control"
          @focus="error = ''"
          required
        />
        <br />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="form-control"
          @focus="error = ''"
          required
        />
        <br />
        <div class="text-center alert alert-danger" v-if="error.length > 0">
          {{ error }}
        </div>

        <button
          :disabled="loading"
          type="submit"
          class="btn btn-wide btn-primary login-btn"
        >
          <span v-if="!loading"> Login </span>
          <loading-component :visible="loading"></loading-component>
        </button>

        <div class="text-center mt-1">
          <router-link to="/sign-up/" class="link">Sign up</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import authApi from "@/api/auth.api";
import authService from "@/services/auth.service";
import LoadingComponent from "@/containers/loading/loading.component.vue";
import { IToken } from "@/models/account/token.interface";

@Options({
  components: { LoginPage, LoadingComponent },
})
export default class LoginPage extends Vue {
  public loading = false;

  public username = "";
  public password = "";

  public error = "";

  public login() {
    this.loading = true;

    let username = this.username;
    let password = this.password;

    authApi
      .login({
        username,
        password,
      })
      .then(async (res: IToken) => {
        this.loading = false;
        this.error = "";

        await authService.storeToken(res.access_token);
        await authService.storeTokenData();

        const returnUrl: string = this.$route.query.returnUrl
          ? (this.$route.query.returnUrl as string)
          : "/";

        await this.$router.push(returnUrl);
      })
      .catch((err) => {
        this.loading = false;
        this.error = err.response.data.message;
      });
  }

  public submit() {
    this.login();
  }
}
</script>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-bottom: 113px;
  box-sizing: border-box;

  .app-logo-container {
    margin-top: 20px;
  }

  .login-page {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    width: 320px;
    box-sizing: border-box;
    // padding: $offset;
    margin: 0 auto;

    form {
      // background-color: $background-color;
    }

    .logo {
      margin-bottom: 40px;
    }

    .login-btn {
      // background-color: yellow;
      // color: red;
      text-transform: uppercase;
      letter-spacing: 4px;
      font-size: 20px;
      font-weight: 700;
    }

    .captchaImg {
      display: flex;
      img {
        width: 100%;
      }
    }
  }

  .small-logo {
    display: none;
    text-align: center;
    padding-top: 40px;
    line-height: 52px;
    text-decoration: none;
    // color: $color-red;
  }
}

@media only screen and (max-width: 900px) {
  .root {
    .app-logo-container {
      display: none;
    }

    .small-logo {
      display: flex;
    }
  }
}
</style>
