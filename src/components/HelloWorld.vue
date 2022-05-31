<template>
  <div class="hello"></div>
  <catalog-component></catalog-component>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CatalogRowItemComponent from "@/components/catalog/catalog-row-item.component.vue";
import CatalogComponent from "@/components/catalog/catalog.component.vue";

@Options({
  components: { CatalogRowItemComponent, CatalogComponent },
})
export default class HelloWorld extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
