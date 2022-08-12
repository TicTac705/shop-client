<template>
  <nav v-if="paginate.lastPage > 1">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: paginate.currentPage === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click="getList(paginate.currentPage - 1)"
        >
          <span aria-hidden="true">&laquo; Previous</span>
        </a>
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
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click="getList(paginate.currentPage + 1)"
        >
          <span aria-hidden="true">Next &raquo;</span>
        </a>
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

  getList(pageNumber: number) {
    this.$emit("getList", pageNumber);
  }
}
</script>

<style lang="scss" scoped></style>
