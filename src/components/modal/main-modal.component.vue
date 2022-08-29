<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">{{ modalTitle }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            v-if="secondButtonTile !== null"
            @click="secondButtonAction"
            type="button"
            class="btn btn-primary"
          >
            {{ secondButtonTile }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class MainModalComponent extends Vue {
  @Prop() public modalTitle = "";
  @Prop() public secondButtonTile: string | null = null;

  created() {
    console.log(this.modalTitle);
  }

  public secondButtonAction() {
    this.$emit("secondButtonAction");
  }
}
</script>
