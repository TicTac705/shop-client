<template>
  <header-component></header-component>

  <router-view />

  <footer-component></footer-component>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HeaderComponent from "@/components/common/header.component.vue";
import FooterComponent from "@/components/common/footer.component.vue";

@Options({
  components: {
    HeaderComponent,
    FooterComponent,
  },
})
export default class MainView extends Vue {}
</script>
