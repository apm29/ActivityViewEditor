<template>
    <XFormPreview style="padding: 16px 8px;" :created-rules="rule"></XFormPreview>
</template>

<script>
import XFormPreview from '@/components/form/XFormPreview'
import TypedTemplateMixin from '@/components/form/TypedTemplateMixin'
export default {
  name: 'preview',
  mixins: [TypedTemplateMixin],
  components: { XFormPreview },
  data: function () {
    return {
      rule: []
    }
  },
  mounted(){
    this.templateList.forEach(e => {
      this.rule.push(this.cloneTemplate(e));
    });
  }
}
</script>

<style scoped>

</style>
