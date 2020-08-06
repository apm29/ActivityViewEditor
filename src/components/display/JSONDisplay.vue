<template>
    <div>
        <h3>{{ title }}</h3>
        <pre style="max-height: 70vh;overflow-y: auto">{{ valueString }}</pre>
    </div>
</template>
<script>
  const props = {
    name: 'JSONDisplay',
    title: {
      required: true,
      type: String,
    },
    value: {
      required: true,
    },
  }
  export default {
    props,
    computed: {
      valueString () {
        return JSON.stringify(this.value, null, 2)
      },
    },
  }
</script>
<style scoped>
    pre {
        text-align: start;
    }
</style>
