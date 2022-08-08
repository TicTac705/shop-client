<template>
  <div class="spinner-grow" role="status" v-if="visible">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  components: { LoadingComponent },
})
export default class LoadingComponent extends Vue {
  @Prop() visible: boolean;
}
</script>

<style lang="scss" scoped></style>
