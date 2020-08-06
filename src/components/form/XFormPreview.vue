<template>
  <div id="form-created"></div>
</template>

<script>
import formCreate from "@form-create/iview4";
import TypedTemplateMixin from "@/components/form/TypedTemplateMixin";

export default {
  name: "XFormPreview",
  mixins: [TypedTemplateMixin],
  props: {
    createdRules: {
      required: true,
      type: Array
    }
  },
  data: function() {
    return {
      $f: undefined
    };
  },
  watch: {
    createdRules: {
      immediate: true,
      deep: true,
      handler: function() {
        this.createForm();
      }
    }
  },
  methods: {
    getModel: function() {
      return this.$f.model();
    },
    updateRule: function(field, rule) {
      this.$f.updateRule(field, rule);
    },
    createForm: async function() {
      let root = document.getElementById("form-created");

      let upload = this.createdRules.filter(ele => {
        return this.attachment(ele) || this.imageUpload(ele);
      });
      if (upload && upload.length > 0) {
        upload.forEach(item => {
          item.props.onSuccess = function(res, file) {
            file.url = res.data.filePath;
          };
        });
      }
      if (root) {
        root.innerHTML = "";
        this.$f = formCreate.create(this.createdRules, {
          el: root,
          onSubmit: formData => {
            //按钮进入提交状态
            console.log(formData);
            if (this.$f) {
              this.model = formData;
              this.display = true;
            }
          }
        });
        // let { $f } = this
        // //获取表单所有字段名
        // console.log($f.fields())
        // //获取表单的键值对
        // console.log($f.formData())
        // //获取指定字段的值
        // console.log($f.getValue($f.fields()[0]))
        // //表单的全局配置
        // console.log($f.config)
        // //表单的生成规则
        // console.log($f.rule)
        // //设置指定字段的值
        // console.log($f.setValue($f.fields()[0], '123'))
        // //获取双向数据绑定的表单键值对
        // console.log($f.bind())
        // //获取指定组件生成规则
        // console.log($f.getRule($f.fields()[$f.fields().length - 1]))
        // //获取表单组件的生成规则
        // console.log($f.model())
        // //获取自定义组件生成规则
        // console.log($f.component())
        // //调用生成组件的方法
        // //$f.method('input','focus')()
        // //获取组件的vm/dom元素
        //  console.log($f.el($f.fields()[$f.fields().length - 1]))
        // //手动重新渲染指定组件
        // console.log($f.sync($f.fields()[$f.fields().length - 1]))
      }
    }
  }
};
</script>

<style scoped>
#form-created {
  width: 294px;
  height: 480px;
  background: #fdfdfd;
  /*border: 1px #333 dashed;*/
  overflow-y: auto;
  margin-top: 43px;
  padding: 24px 16px;
}
</style>
