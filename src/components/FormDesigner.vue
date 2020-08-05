<template>
  <Layout style="height: 100vh">
    <Sider>
      <draggable
        :list="listTemplate"
        :group="{ name: 'template', pull: 'clone', put: false }"
        :clone="cloneTemplate"
        v-bind="dragOptions"
      >
        <div
          v-for="element in listTemplate"
          :key="element.id"
          class="template-item"
        >
          <img
            alt="..."
            v-if="singleLineText(element)"
            class="widget-icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEVHcEwZHiYZHiUaHyMdKCgZHiYaISQYHiQZHiYtE7tIAAAACXRSTlMAZVUSCTQmQxxVUCeiAAAA7ElEQVQoz9WSTW7CQAxGTQIlSz6XDFumvUBSUYklpTkAkXqAgkTXmS5YE1Gp167HM8micwK+ReK8/DzbCtG9Z4oyhTMghRnwmcDeoEugW7jH1NP10bS97SJ8wDVjvdsCfI0eFr+vXyAxAdYl5Wqy5SZ3HD1isUuiAgeiOcJXsSZqSz9DFQ/eI52/8ThIFU6bptmrid7PNsAaGjHl375Q2AYoJoeny2uAMF8SZ8TxPIiKsIyeaQIa4HzQVfVqvIzNzNBpdVTYhgXlWGT4mP5Ce/MD+lhT6D7Ao0feYDoBq53lf+ve3uSpn7v5C/8Auc4hwIODgzAAAAAASUVORK5CYII="
          />
          <img
            alt="..."
            v-if="multipleLineText(element)"
            class="widget-icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAGFBMVEUZHiVHcEwYHCYZHiQaHiYdHSEaHSQhLS17jR+UAAAACHRSTlNmADVSJRNDB3u7OmgAAACUSURBVCjPYxDEAhioICjC4IgpKMaQiClYYMyOKejgxIIpaFDKDCQVGMCACSIoyiZoEAhkQgFEUIhFUEERXaUwu2CAIbqZAYmCwqzogglmaclsaILiUONRBEXYQkNDDRxRBcVALndIRLW9gBHkU3ZUd4LcKCjMhKoS5BtBEWYqRwcWQQUGFACxnQEN4FZJm2QzVN0JAJnJMuKEusQeAAAAAElFTkSuQmCC"
          />
          <img
            alt="..."
            v-if="numberInput(element)"
            class="widget-icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEUZHiVHcEweHyYZHScZHiUYHiUhKSkZHiMZHyeFN1kHAAAACXRSTlNlABArT1wIPxx2kW44AAAA40lEQVQoz92Su2+CUBTGv8jL9QOLjEB0xxrDitWhI6HRWdKk6Ui7dJWlf7fnXKDYtIm7Zzjn3l++87gP8B/DXUA/GYPAxUEWC+CTJjwrDIBEHdB2YUWEhSMwdtpXHBnbbVROiBnWApsJmU2ZueTZIh6eAoHFljxZzFcmIKDCt5qMLdP/PNXuCtUa18wkSSOM8EGG+8Krr2Bsqw7YXUG/PIoP1zmqES6drrJmDNAvq/4S5qgH2Am/WrPtYS/UM8x+lEs8pmnKzEv8xhtqFno9jqjEtr+gDLoBXv4+x/v33fylm/ACBXhC6aliFlMAAAAASUVORK5CYII="
          />
          <img
            alt="..."
            v-if="radio(element) || switcher(element)"
            class="widget-icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAHlBMVEUYHiZHcEwnMTEZHSMbHiUZHyYbGyUYHCUZGyUaGiTzZ3XQAAAACnRSTlNmAAZQK10fRDcO712dBgAAAPJJREFUKM+Nk0EPwUAQhV9UqaNVxM0GcS0nbiXhXOIHkEjEDQfnJv4Akfi9dqctjTxiLrv92t15M/OKKgn8hOqx1x9Q7SLAPes8VDEkPJ2DM2A0316A1Rv24U7t2o1wyqAK3ElymR85OoUdjLO8dwxTeCi/xKhDOYG+vE2jg4nAnnt7w1a0FBgX8yWGnoUKizysQxvYgOjxAydZsTGwCS1aAdGocDSw7tgParb0gd0FCwPbntxvoWSMCwZeZRtYKGfCioHrkvRAwu7M8xdIj9NEVBIVT8ukDaGt402m46CD4yOmZqC24QbjVqSm5fb+4+94AgpfSS+2ESzdAAAAAElFTkSuQmCC"
          />
          <img
            alt="..."
            v-if="select(element) || checkbox(element)"
            class="widget-icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEUZHiZHcEwYHCgYHiUZHSYZHiUfIyolJSUXHCUVEW/fAAAACXRSTlNlAB1dNyUQBkxicou6AAAA+klEQVQoz52TvRKCMAyAI9WTFeRnhfP0HNHBuQzu6jm4Vl5A3oDF9zZNglUvi3YBPr6QNA2QKAt+h8Xq7L5geQVcj/4dlhZoTfs3uARzWN8uDewCzCCu/TUdoH1Ba078sbyZjjCD/Zi3I9XDyvQjLJuIYdnsQ92dF8BHnwLMfTzCexxY1Q5zgsfoxVKYVDOCwzaIUC9iglwwixFm8LAIeVDETA5hincbN4r0CPSKK/UiBTK0xoko0Pu0exIlnBKhyqIkopJQZVFK4uKtYTGR4mmbGbCYyDa5IVY6IA3h1uXuo3Vqk9Xj0A9OPWJ9GNSx0QdMHUV9aP/9EZ69VkfnYpHYCAAAAABJRU5ErkJggg=="
          />
          <img
            alt="..."
            v-if="datePicker(element)"
            class="widget-icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEUZHiVHcEwYHCNISEgZHyYYHycUHCwaJSUZICVNlGYDAAAACXRSTlNlAFEDVjYcC0MdqMEEAAAAy0lEQVQoz73TOw+CMBDA8VPEdrTUxypN3CVgXDU+4oivXRPjXDZGBhO/tkcLpiUqi/rf+C3XNgewF8F7vGz1V29tYOZoHNMnhkFGeIgFkvJQ4eAGjYzEgLmSdmCTIEZgIywQYxB+5uwENpLUE+AizggOInqQxEGyhQg+43E53WXMA40sPWvs3w00+z9Or0WJgerm6vZ1ODkW7b94zrDIxFM5vV1zJJ6KopePzH/5nnMbuzkOiY2yqXZpaaV2KYJK+dbxg22r4NOPUOkBusBGIdKfBoUAAAAASUVORK5CYII="
          />
          <img
            alt="..."
            v-if="timePicker(element)"
            class="widget-icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAG1BMVEUZHiVHcEwZHSIZHyYZIiQZHiYZHyYcHicYHyWJZRsxAAAACXRSTlNlAFFWCkU4I17EnVm3AAAA10lEQVQoz83Tvw8BMRQH8O/RHqNycUZ3CyMhrD2/5hrsJySMhxCjGPzd3suJtH7NvkvTT5qX5vUV6kPwHQ/LfFcfWmhEjlr+wmALz4gUFF/LBm4J4Rguok+YluPIiH1MaWlZjS8+YUe4NXWREJFSqZdjxVeqigfOdjmGawvt/AsGp03yhmegRMt0YWHIPZorlRUsbEAaUDOa0sIMu6CD4ZFrPDGlEyMuEVlofH4ooJhYOOH7hO3rUv1x67ou1hibwkVd4FlCzwl4lmp4SZeHduXa4OdHeMkd5fRAC6/z8FAAAAAASUVORK5CYII="
          />
          <img
            alt="..."
            v-if="rate(element)"
            class="widget-icon"
            src="https://gw.alicdn.com/tfs/TB1qMa6vYj1gK0jSZFuXXcrHpXa-40-40.png"
          />
          <img
            alt="..."
            v-if="alert(element)"
            class="widget-icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAHlBMVEUZHiZHcEwnMTEZHCcZHSUcHyYZHyYZHSUcHCYYHCWYRM0AAAAACnRSTlNmAAYgUitdOA9EtOoRvAAAAQ1JREFUKM+N0zFrwkAUB/A/VRMz5oISNw9swa2hCLpJFx2NgvMpdM9QcLW0pautX9jLe3cxyqt4S7hfkncv770gFhZuovoc6ytUEwMER11HVYBWqGu4Bmar0TvwdsYhgmV5fTT486imQc7BOqapHQ4w9+d+4dXhIaqSUYeIsUN34x8KMUBO+BR82F2KsMTUbAmLVrlL0KQAi7BEhQ1FM/Rk3IW2mIDz+c44K2QWe9D1Cin8WuxyrHS3Y51uLPY5lj8oLh4s7luXuGhbfG5cot3/g+Lr4kEupQopJZe8R07efaZH/kxXEI9cELF0rsjqZVwvsmsHL98OsXFyi8VhEMdGHjB5FMWhlcf7jr/jBIMdTHb6vXXXAAAAAElFTkSuQmCC"
          />
          {{ element.templateName }}
        </div>
      </draggable>
    </Sider>

    <Content>
      <Row class="main-content" type="flex" justify="center">
        <i-col :span="preview ? 12 : 24" class="form-area">
          <Alert>表单设计</Alert>
          <draggable
            class="drop-area form"
            :list="createdRules"
            group="template"
            tag="ul"
            handle=".drag-handle"
            v-bind="dragOptions"
          >
            <transition-group type="transition">
              <ul
                class="form-item"
                v-for="element of createdRules"
                :key="element.id"
              >
                <XFormItem
                  :element="element"
                  @delete-form-item="deleteFormItem"
                  @change-form-item="saveFormItem"
                >
                </XFormItem>
              </ul>
            </transition-group>
          </draggable>
        </i-col>

        <i-col :span="12" class="form-area" v-show="preview">
          <Alert>实际表单</Alert>

          <div id="form-created"></div>
        </i-col>
      </Row>
      <Button
        @click="preview = !preview"
        color="success"
        shape="circle"
        size="large"
        style="position: fixed;bottom: 30px;right: 30px"
      >
        {{ preview ? "关闭预览" : "启用预览" }}
      </Button>
    </Content>
  </Layout>
</template>

<script>
import formCreate from "@form-create/iview4";
import draggable from "vuedraggable";
import { deepCloneJson, uniqueId } from "@/components/utils";
import XFormItem from "@/components/XFormItem";
import TypeMixin from "@/components/TypeMixin";

export default {
  name: "FormDesigner",
  components: {
    draggable,
    XFormItem
  },
  mixins: [TypeMixin],
  data: function() {
    return {
      createdRules: [],
      listTemplate: [
        {
          id: 1,
          type: "input",
          title: "单行输入",
          templateName: "单行输入",
          field: "text",
          value: "",
          col: {
            span: 24,
            labelWidth: 85
          },
          props: {
            type: "text",
            placeholder: "请输入"
          }
        },
        {
          id: 2,
          type: "input",
          title: "数字输入",
          templateName: "数字输入",
          field: "number",
          value: "",
          col: {
            span: 24,
            labelWidth: 85
          },
          props: {
            type: "number",
            placeholder: "请输入"
          }
        },
        {
          id: 3,
          type: "input",
          title: "多行输入",
          templateName: "多行输入",
          field: "textarea",
          value: "",
          col: {
            span: 24,
            labelWidth: 85
          },
          props: {
            type: "textarea",
            placeholder: "请输入"
          }
        },
        {
          id: 4,
          type: "radio",
          title: "单选框",
          templateName: "单选框",
          field: "radio",
          value: "0",
          col: {
            span: 24,
            labelWidth: 85,
            placeholder: "请选择"
          },
          options: [
            { value: "0", label: "选项1", disabled: false },
            { value: "1", label: "选项2", disabled: false },
            { value: "2", label: "选项3", disabled: false },
            { value: "3", label: "选项4", disabled: true }
          ]
        },
        {
          id: 5,
          type: "checkbox",
          title: "多选框",
          templateName: "多选框",
          field: "checkbox",
          value: ["1", "2", "3"],
          col: {
            span: 24,
            labelWidth: 85
          },
          options: [
            { value: "1", label: "好用", disabled: true },
            { value: "2", label: "方便", disabled: false },
            { value: "3", label: "实用", disabled: false },
            { value: "4", label: "有效", disabled: false }
          ],
          props: {
            placeholder: "请选择"
          }
        },
        {
          id: 6,
          type: "select",
          field: "select",
          title: "下拉选择",
          templateName: "下拉选择",
          value: ["104", "105"],
          col: {
            span: 24,
            labelWidth: 85
          },
          options: [
            { value: "104", label: "生态蔬菜", disabled: false },
            { value: "105", label: "新鲜水果", disabled: false }
          ],
          props: {
            multiple: true,
            placeholder: "请选择",
            "not-found-text": "无匹配数据",
            placement: "bottom"
          }
        },
        {
          id: 7,
          type: "switch",
          title: "开关",
          templateName: "开关",
          field: "switch",
          value: "1",
          col: {
            span: 24,
            labelWidth: 85
          },
          props: {
            trueValue: "1",
            falseValue: "0",
            slot: {
              open: "开",
              close: "关"
            }
          }
        },
        {
          id: 8,
          type: "DatePicker",
          field: "datepicker",
          title: "日期选择",
          templateName: "日期选择",
          value: new Date(),
          col: {
            span: 24,
            labelWidth: 85
          },
          props: {
            type: "datetimerange",
            format: "yyyy-MM-dd HH:mm:ss",
            placeholder: "请选择活动日期",
            multiple: false
          }
        },
        {
          id: 9,
          type: "TimePicker",
          field: "timepicker",
          title: "时间选择",
          templateName: "时间选择",
          value: new Date(),
          col: {
            span: 24,
            labelWidth: 85
          },
          props: {
            type: "time",
            placeholder: "请选择时间"
          }
        },
        {
          id: 10,
          type: "rate",
          field: "rate",
          title: "评分",
          templateName: "评分",
          value: 3,
          col: {
            span: 24,
            labelWidth: 85
          },
          props: {
            count: 10,
            allowHalf: false
          }
        },
        {
          id: 11,
          type: "IntroductionText",
          templateName: "说明文字",
          field: "info",
          children: ["这是一段说明文字"],
          props: {}
        }
      ],
      $f: undefined,
      preview: false
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "template",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  watch: {
    createdRules: {
      immediate: true,
      handler: function() {
        this.createForm();
      }
    }
  },
  mounted() {
    this.listTemplate.forEach(e => {
      this.createdRules.push(this.cloneTemplate(e));
    });
  },

  methods: {
    deleteFormItem: function(element) {
      if (this.createdRules.length <= 1) {
        this.$Message.info({ content: "至少保留一项" });
        return;
      }
      this.createdRules.splice(this.createdRules.indexOf(element), 1);
    },
    saveFormItem: function(element) {
      let find = this.createdRules.findIndex(e => e.id === element.id);
      if (find >= 0) {
        this.createdRules = deepCloneJson(this.createdRules);
        this.createdRules[find] = Object.assign(
          {},
          this.createdRules[find],
          element
        );
        this.$f.reload(this.createdRules);
      } else {
        this.$Message.error({ content: "元素未匹配" });
      }
    },
    createForm: async function() {
      let root = document.getElementById("form-created");

      if (root) {
        root.innerHTML = "";
        this.$f = formCreate.create(this.createdRules, {
          el: root,
          global: {
            "*": {
              col: {
                span: 24,
                labelWidth: 85
              }
            }
          },
          onSubmit: function(formData) {
            //按钮进入提交状态
            console.log(formData);
          }
        });
      }
    },

    cloneTemplate: function(template) {
      let newItem = deepCloneJson(template);
      newItem.field = uniqueId(newItem.field); //字段名
      newItem.id = uniqueId("form-item"); //id
      return newItem;
    }
  }
};
</script>

<style scoped>
.main-content {
  top: 50%;
  left: 50%;
  position: relative;
  transform: translate(-50%, -50%);
}

.drop-area {
  /*height: 675px;*/
  /*width: 375px;*/
  padding: 12px 12px;
  border: 1px #333 dashed;
  overflow-y: auto;
  overflow-x: hidden;
  width: 292px;
  height: 480px;
  top: 73px;
  max-height: 480px;
  background: #f6f6f6;
  margin-top: 33px;
}

.template-item {
  margin: 6px 4px;
  cursor: move;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 8px 4px;
  background-color: white;
  border-radius: 4px;
  border: #ddd 1px solid;
  box-shadow: #c8ebfb 2px 2px 4px;
  font-weight: bolder;
}

.form-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 490px;
  height: 670px;
  background: url(http://img.alicdn.com/tfs/TB1vgDmBntYBeNjy1XdXXXXyVXa-980-1340.png)
    no-repeat top;
  background-size: 100% 100%;
}

#form-created {
  width: 292px;
  height: 480px;
  background: #f6f6f6;
  border: 1px #333 dashed;
  overflow-y: auto;
  margin-top: 33px;
  padding: 24px 16px;
}

.widget-icon {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.form-item {
  cursor: move;
}
</style>
