<template>
  <nav v-if="paginate.lastPage > 1 && !loading">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: paginate.currentPage === 1 }">
        <router-link
          class="page-link"
          aria-label="Previous"
          :to="{
            name: routeName,
            params: { number: paginate.currentPage - 1 },
          }"
        >
          <span aria-hidden="true">&laquo; Previous</span>
        </router-link>
      </li>
      <li class="page-item disabled">
        <a href="#" class="page-link">
          {{ paginate.currentPage }} / {{ paginate.lastPage }}
        </a>
      </li>
      <li
        class="page-item"
        :class="{ disabled: paginate.currentPage === paginate.lastPage }"
      >
        <router-link
          class="page-link"
          aria-label="Next"
          :to="{
            name: routeName,
            params: { number: paginate.currentPage + 1 },
          }"
        >
          <span aria-hidden="true">Next &raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Paginate } from "@/models/paging.interface";
import { Prop } from "vue-property-decorator";

export default class PaginationComponent extends Vue {
  @Prop() public paginate: Paginate;
  @Prop() public loading: boolean;
  @Prop() public routeName: string;
}
</script>

<style lang="scss" scoped>
nav {
  padding-bottom: 0;
}
</style>
