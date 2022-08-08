<template>
  <div class="home">
    <catalog-component></catalog-component>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CatalogComponent from "@/components/catalog/catalog.component.vue";

@Options({
  components: {
    CatalogComponent,
  },
})
export default class HomeView extends Vue {}
</script>
