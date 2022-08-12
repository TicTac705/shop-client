<template>
  <footer>
    <div
      class="text-center fixed-bottom d-sm-none d-md-block"
      style="background-color: rgba(0, 0, 0, 0.05)"
    >
      © {{ year }} Copyright:
      <span class="fw-bold"> Shop </span>
    </div>
  </footer>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class FooterComponent extends Vue {
  year = new Date().getFullYear();
}
</script>

<style scoped></style>
