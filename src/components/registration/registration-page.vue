<template>
  <div class="root">
    <div class="app-logo-container">Registration</div>
    <div class="login-page">
      <form @submit.prevent="submit">
        <input
          type="text"
          v-model="userName"
          placeholder="Name"
          class="form-control"
          @focus="error = ''"
          required
        />
        <br />
        <input
          type="email"
          v-model="userEmail"
          placeholder="Email"
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
        <input
          type="password"
          v-model="passwordConfirmed"
          placeholder="Confirm password"
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
          <span v-if="!loading"> Register </span>
          <loading-component :visible="loading"></loading-component>
        </button>

        <div class="text-center mt-1">
          <router-link to="/auth/" class="link">
            Already registered?
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import authApi from "@/api/auth.api";
import LoadingComponent from "@/containers/loading/loading.component.vue";

@Options({
  components: { RegistrationPage, LoadingComponent },
})
export default class RegistrationPage extends Vue {
  public loading = false;

  public userName = "";
  public userEmail = "";
  public password = "";
  public passwordConfirmed = "";

  public error = "";

  public register() {
    this.loading = true;

    let userName = this.userName;
    let userEmail = this.userEmail;
    let password = this.password;
    let passwordConfirmed = this.passwordConfirmed;

    authApi
      .register({
        userName,
        userEmail,
        password,
        passwordConfirmed,
      })
      .then(async () => {
        this.loading = false;
        this.error = "";

        const returnUrl: string = this.$route.query.returnUrl
          ? (this.$route.query.returnUrl as string)
          : "/auth/";

        await this.$router.push(returnUrl);
      })
      .catch((err) => {
        this.loading = false;
        this.error = err.response.data.message;
      });
  }

  public submit() {
    if (this.validate()) {
      this.register();
    }
  }

  public validate(): boolean {
    if (this.password !== this.passwordConfirmed) {
      this.error = "Passwords do not match.";
      return false;
    }

    return true;
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
