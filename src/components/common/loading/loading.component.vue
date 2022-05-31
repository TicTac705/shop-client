<template>
  <div v-if="visible" class="floatingCirclesG">
    <div class="f_circleG" id="frotateG_01"></div>
    <div class="f_circleG" id="frotateG_02"></div>
    <div class="f_circleG" id="frotateG_03"></div>
    <div class="f_circleG" id="frotateG_04"></div>
    <div class="f_circleG" id="frotateG_05"></div>
    <div class="f_circleG" id="frotateG_06"></div>
    <div class="f_circleG" id="frotateG_07"></div>
    <div class="f_circleG" id="frotateG_08"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({})
export default class LoadingComponent extends Vue {
  @Prop() public visible = false;
}
</script>

<style lang="scss" scoped>
// @import "mixins";

.floatingCirclesG {
  position: relative;
  width: 22px;
  height: 22px;
  margin: auto;
  transform: scale(0.6);
}

.f_circleG {
  position: absolute;
  background-color: rgb(255, 255, 255);
  height: 4px;
  width: 4px;
  border-radius: 2px;
  animation-name: f_fadeG;
  animation-duration: 0.782s;
  animation-iteration-count: infinite;
  animation-direction: normal;
}

#frotateG_01 {
  left: 0;
  top: 9px;
  animation-delay: 0.2895s;
}

#frotateG_02 {
  left: 3px;
  top: 3px;
  animation-delay: 0.386s;
}

#frotateG_03 {
  left: 9px;
  top: 0;
  animation-delay: 0.4825s;
}

#frotateG_04 {
  right: 3px;
  top: 3px;
  animation-delay: 0.589s;
}

#frotateG_05 {
  right: 0;
  top: 9px;
  animation-delay: 0.6855s;
}

#frotateG_06 {
  right: 3px;
  bottom: 3px;
  animation-delay: 0.782s;
}

#frotateG_07 {
  left: 9px;
  bottom: 0;
  animation-delay: 0.8785s;
}

#frotateG_08 {
  left: 3px;
  bottom: 3px;
  animation-delay: 0.975s;
}

@keyframes f_fadeG {
  0% {
    background-color: rgb(0, 0, 0);
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-o-keyframes f_fadeG {
  0% {
    background-color: rgb(0, 0, 0);
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-ms-keyframes f_fadeG {
  0% {
    background-color: rgb(0, 0, 0);
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-webkit-keyframes f_fadeG {
  0% {
    background-color: rgb(0, 0, 0);
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-moz-keyframes f_fadeG {
  0% {
    background-color: rgb(0, 0, 0);
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}
</style>
