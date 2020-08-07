<template>
  <div class="introduction-container" :style="{justifyContent:justify}">
    <Icon v-if="icon" :type="icon" style="margin-right: 3px" />
    <div v-html="value" v-if="value"></div>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  name: "IntroductionText",
  props: {
    icon: {
      type: String,
      default: "ios-information-circle-outline"
    },
    value: {
      type: String
    },
    justify:{
      type:String,
      default:'start'
    }
  }
};
</script>

<style scoped>
.introduction-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 5px;
  padding-top: 2px;
  width: 100%;
}
</style>
