<template>
  <div style="display: flex;flex-direction: row;align-items: center">
    <Icon type="ios-information-circle-outline" style="margin-right: 3px" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "IntroductionText",
  props: {}
};
</script>

<style scoped></style>
