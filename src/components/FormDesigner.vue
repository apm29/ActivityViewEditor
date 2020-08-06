<template>
    <Layout style="height: 100vh">
        <Sider class="side-bar" :width="250">
            <draggable
                    :list="templateList"
                    :group="{ name: 'template', pull: 'clone', put: false }"
                    :clone="cloneTemplate"
                    v-bind="dragOptions"
                    class="template-area"
            >
                <div
                        v-for="element in templateList"
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
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAALVBMVEVHcEyjpaijpaikpaikpaijpqijpamipKijpainp6ujpaijpKmjpqiho6ijpaiC2bxJAAAADnRSTlMAUNMrppGze2IL6DvAGUTLTL8AAAEzSURBVCjPY2CgEphsiSnGrPfIAEOQ6d07BQzBvmd1LzAE9R7yPUIX43iXwPauAcNIAV4MQ+WeMTDkPcQwEiiBauhk8XcJDAxs7wrhHuBuTXr37p0AAwMjkFKL2ADxCpD97gmIWQdigT3GBpQOF4ZoMixNWgcyiIHrzU0U488tAJIs7wqQBVkgrn33FFnQD2QlA8O8dwHICiE+4Fz3FEMhA8Otdw7oCoEuXfcEQyEDgxHMAezvEGHCjBAUQBKEBi8jUjhzvNsAk0W4jvXdBCgL7HEI4HkFD+sFcEGuN0AvFKkDlcc9gAveA7qz6d07dWDsP0bE2nMGGVD4ajDsQ7iz7uGWd+8iWYGi854jksybd++cGRiuvnt3DpF0rN69ywbRpu/eLYYLMvo5Qhhblwkw0AgAAP9derYvPabEAAAAAElFTkSuQmCC"
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
            <Row class="main-content" type="flex" justify="center" align="middle">
                <Col :span="preview ? 12 : 24" class="form-area">
                    <IntroductionText>表单设计</IntroductionText>
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
                </Col>

                <Col :span="12" class="form-area" v-show="preview">
                    <IntroductionText>实际表单</IntroductionText>

                    <div id="form-created"></div>
                </Col>
            </Row>
            <Button
                    @click="preview = !preview"
                    color="success"
                    shape="circle"
                    size="large"
                    style="position: fixed;bottom: 30px;right: 30px"
            >
                {{ preview ? '关闭预览' : '启用预览' }}
            </Button>
        </Content>
    </Layout>
</template>

<script>
  import formCreate from '@form-create/iview4'
  import draggable from 'vuedraggable'
  import { deepCloneJson, uniqueId } from '@/components/utils'
  import XFormItem from '@/components/XFormItem'
  import TypeMixin from '@/components/TypeMixin'
  import IntroductionText from '@/components/IntroductionText'

  const LABEL_WIDTH = 72
  export default {
    name: 'FormDesigner',
    components: {
      IntroductionText,
      draggable,
      XFormItem,
    },
    mixins: [TypeMixin],
    data: function () {
      return {
        createdRules: [],
        templateList: [
          {
            id: 1,
            type: 'input',
            title: '单行输入',
            templateName: '单行输入',
            field: 'text',
            value: '',
            col: {
              span: 24,
              labelWidth: LABEL_WIDTH,
            },
            props: {
              type: 'text',
              placeholder: '请输入',
            },
          },
          {
            id: 2,
            type: 'input',
            title: '数字输入',
            templateName: '数字输入',
            field: 'number',
            value: '',
            col: {
              span: 24,
              labelWidth: LABEL_WIDTH,
            },
            props: {
              type: 'number',
              placeholder: '请输入',
            },
          },
          {
            id: 3,
            type: 'input',
            title: '多行输入',
            templateName: '多行输入',
            field: 'textarea',
            value: '',
            col: {
              span: 24,
              labelWidth: LABEL_WIDTH,
            },
            props: {
              type: 'textarea',
              placeholder: '请输入',
            },
          },
          {
            id: 4,
            type: 'radio',
            title: '单选框',
            templateName: '单选框',
            field: 'radio',
            value: '0',
            col: {
              span: 24,
              labelWidth: LABEL_WIDTH,
              placeholder: '请选择',
            },
            options: [
              { value: '0', label: '选项1', disabled: false },
              { value: '1', label: '选项2', disabled: false },
              { value: '2', label: '选项3', disabled: false },
              { value: '3', label: '选项4', disabled: true },
            ],
          },
          {
            id: 5,
            type: 'checkbox',
            title: '多选框',
            templateName: '多选框',
            field: 'checkbox',
            value: ['1', '2', '3'],
            col: {
              span: 24,
              labelWidth: LABEL_WIDTH,
            },
            options: [
              { value: '1', label: '好用', disabled: true },
              { value: '2', label: '方便', disabled: false },
              { value: '3', label: '实用', disabled: false },
              { value: '4', label: '有效', disabled: false },
            ],
            props: {
              placeholder: '请选择',
            },
          },
          {
            id: 6,
            type: 'select',
            field: 'select',
            title: '下拉选择',
            templateName: '下拉选择',
            value: ['104', '105'],
            col: {
              span: 24,
              labelWidth: LABEL_WIDTH,
            },
            options: [
              { value: '104', label: '生态蔬菜', disabled: false },
              { value: '105', label: '新鲜水果', disabled: false },
            ],
            props: {
              multiple: true,
              placeholder: '请选择',
              'not-found-text': '无匹配数据',
              placement: 'bottom',
            },
          },
          {
            id: 7,
            type: 'switch',
            title: '开关',
            templateName: '开关',
            field: 'switch',
            value: '1',
            col: {
              span: 24,
              labelWidth: LABEL_WIDTH,
            },
            props: {
              trueValue: '1',
              falseValue: '0',
              slot: {
                open: '开',
                close: '关',
              },
            },
          },
          {
            id: 8,
            type: 'DatePicker',
            field: 'datepicker',
            title: '日期选择',
            templateName: '日期选择',
            value: new Date(),
            col: {
              span: 24,
              labelWidth: LABEL_WIDTH,
            },
            props: {
              type: 'datetimerange',
              format: 'yyyy-MM-dd HH:mm:ss',
              placeholder: '请选择活动日期',
              multiple: false,
            },
          },
          {
            id: 9,
            type: 'TimePicker',
            field: 'timepicker',
            title: '时间选择',
            templateName: '时间选择',
            value: new Date(),
            col: {
              span: 24,
              labelWidth: LABEL_WIDTH,
            },
            props: {
              type: 'time',
              placeholder: '请选择时间',
            },
          },
          {
            id: 10,
            type: 'rate',
            field: 'rate',
            title: '评分',
            templateName: '评分',
            value: 3,
            col: {
              span: 24,
              labelWidth: LABEL_WIDTH,
            },
            props: {
              count: 10,
              allowHalf: false,
            },
          },
          {
            id: 11,
            type: 'IntroductionText',
            templateName: '说明文字',
            native:true,
            name:'IntroductionText',
            children: ['这是一段说明文字'],
            props: {},
          },
          {
            id:12,
            type:'i-button',
            name: 'btn',
            templateName: '测试Button',
            native:true,
            props:{
              type:'primary',
              field:'btn',
              loading:true
            },
            children:['加载中']
          }
        ],
        $f: undefined,
        preview: true,
      }
    },
    computed: {
      dragOptions () {
        return {
          animation: 200,
          group: 'template',
          disabled: false,
          ghostClass: 'ghost',
        }
      },
    },
    watch: {
      createdRules: {
        immediate: true,
        handler: function () {
          this.createForm()
        },
      },
    },
    mounted () {
      this.templateList.forEach(e => {
        this.createdRules.push(this.cloneTemplate(e))
      })
    },

    methods: {
      deleteFormItem: function (element) {
        if (this.createdRules.length <= 1) {
          this.$Message.info({ content: '至少保留一项' })
          return
        }
        this.createdRules.splice(this.createdRules.indexOf(element), 1)
      },
      saveFormItem: function (element) {
        let find = this.createdRules.findIndex(e => e.id === element.id)
        if (find >= 0) {
          this.createdRules = deepCloneJson(this.createdRules)
          this.createdRules[find] = Object.assign(
            {},
            this.createdRules[find],
            element,
          )
          this.$f.reload(this.createdRules)
        } else {
          this.$Message.error({ content: '元素未匹配' })
        }
      },
      createForm: async function () {
        let root = document.getElementById('form-created')

        if (root) {
          root.innerHTML = ''
          this.$f = formCreate.create(this.createdRules, {
            el: root,
            global: {
              '*': {
                col: {
                  span: 24,
                  labelWidth: LABEL_WIDTH,
                },
              },
            },
            onSubmit: function (formData) {
              //按钮进入提交状态
              console.log(formData)
            },
          })
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
          // console.log($f.el($f.fields()[$f.fields().length - 1]))
          // //手动重新渲染指定组件
          // console.log($f.sync($f.fields()[$f.fields().length - 1]))
        }
      },

      cloneTemplate: function (template) {
        let newItem = deepCloneJson(template)
        newItem.field = uniqueId(newItem.field) //字段名
        newItem.id = uniqueId('form-item') //id
        return newItem
      },
    },
  }
</script>

<style scoped>
    .side-bar {
        background-color: #ffffff;
    }

    /*定义滚动条高宽及背景
     高宽分别对应横竖滚动条的尺寸*/
    .form-area > ::-webkit-scrollbar {
        width: 3px;
        height: 3px;
        background-color: #F5F5F5;
    }

    /*定义滚动条轨道
     内阴影+圆角*/
    .form-area > ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 3px rgba(222, 222, 222, 0.6);
        border-radius: 3px;
        background-color: #F5F5F5;
    }

    /*定义滑块
     内阴影+圆角*/
    .form-area > ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #ccc;
    }

    .main-content {
        height: 100%;
        width: 100%;
    }

    .drop-area {
        /*height: 675px;*/
        /*width: 375px;*/
        padding: 12px 12px;
        /*border: 1px #333 dashed;*/
        overflow-y: auto;
        overflow-x: hidden;
        width: 292px;
        height: 480px;
        top: 73px;
        max-height: 480px;
        background: #fdfdfd;
        margin-top: 53px;
    }

    .template-area {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }

    .template-item {
        width: 45%;
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
        /*box-shadow: #c8ebfb 2px 2px 4px;*/
        font-weight: bolder;
    }

    .form-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 490px;
        height: 670px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA9QAAAU8BAMAAAAnPcBiAAAAFVBMVEVHcEwAAAAAAAACAgLz8/P29vb///9xo2c7AAAABXRSTlMABQsScj8feaEAAB5xSURBVHja7N3LbuTGGQXgKXgeoNhxsifzAnEAez0G7OwDWFkHGM+8/yO4L7yT0ozEUlex+R0Yhpdq/f54frJJ6sMHERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERHZU+KDx3wP86sIQw455GOqPtDAh09+aNWP/qm7z0d196kfds5Uz1U/4LH89omoXlH9WMO+fhqqn1X9ML+Ay6eh+mXVDzHsftBUv6h6/7+E+C3V1WHyLdVx75N+TnXofgPhKGk/b3xW9Z5hX378NdWTER9G9fjzPqM67vjgvVTdf+qjqu7/e031PmGHFdWXD3gO1e1/hKXquM9Jj1VfP9t4zIdXPUx7ojrscB+bqg6Xz0b1TPX537E71er+CXuc9KC6HTTVC9Wx6ofdqQ77mvREdTvoNdXVkfKM6m7Yveqwv0m3qodBt2Pux33ErKk+n31NVIc9TXpQHS6fZkX1odP+EnrVl1Ovseqwt0lf/rl+joMdqF899zHssJ9Zx7Hq6/+01/+BP/72+9P/vsokX57++O1f7VG8h727WV9Vh9uHiNXH3831ufzxqYO9L9UhjGZ9PnLfqsigXx52aGGPVYc9qb5O+vyvj/8xzZfz56fYNt1IdeGzvn531c76OubLwVtFf7u0P10b+zzuMKgOe9nLTPp1s+72152ojoPqqp31jyb9fbP+9ao69rMuu67joDrcJh1/0NPf29c/tarjoDrsQHW4nWNVld37+2fdqq5i+apjr7q7chI+muD351N768Zt1h/Ch7KHfVNdtar/pqhfU9c/taqr0lXHXnV7Xbf68LP5vSaf+y9CetWh1J3spvr2457/sX2/Mr/eVF8um3WqQ8mqQ/fjVrbv114hrXomBauOver+x/3R7F7NuvtSs+pVh3JVh+4gBPUbWVfdxfAyVcdO9XCPhfX7LUt4NXyj2aouedrtbYLW7zcu4e03moWqDt1DWaM7p6B+C+vhBqRYuOrYq7aUbVjMrvPu5hwKQ90/lNXuZJayN14JH36D5b4Y58w5xF71D47fGxaz7lp4cedb/YsARne8On5v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U0011VRTTbUELoFTrY1mtaKaaqqpploCl8CpptqsNquppppqqqnWaglcUa3VZjXVVFNNNdVUS+ASONVUm9VmNdVUU62oVhI41VSb1WY11VRTTTXVVEvgEjjVVJvVimpFNdVUS+ASONVUm9VmNdVUU0011VRL4FpNtTKrtZpqqqmmmmoJXAKnmmqz2qymmmqqqaZaSeCKaqrNaqqppppqqqmWwCVwqqk2q6mmWlGtqKZaAqeaarParKaaaqqppppqCVwCp1qrzWpFtVZTTTXVErgETjXVZrVZTTXVVFNNNdUSuKJamdVUU0011VRTLYFL4FRTbVab1VRTTbWiWkngVFNtVpvVVFNNNdVUUy2BS+BUU21WazXVimqtploCl8CpptqsNquppppqqqmmWgLXaqqVWa3VVFNNNdVUS+ASONVUm9VmNdVUU0011UoCV1RTbVZTTTXVVFNNtQQugVNNtVltVlOt1VQrqrVaAqeaarParKaaaqqppppqCVwCp1qrzWpFtVZTTTXVErgETjXVZrVZTTXVVFNNNdUSuKJamdVUU0011VRTLYFL4FRTbVab1VRTTbVWU60kcK2m2qw2q6mmmmqqqaZaApfAqabarNZqqhXVWk21BC6BU021WW1WU0011VRTTbUETjXVyqxWVFNNNdVUS+ASONVUm9VmNdVUU0011VotgSuqtdqspppqqqmmmmoJXAKnmmqz2qymWqupVlRrtQRONdVmtVlNNdVUU0011RK4BE411Wa1olpRTTXVErgETjXVZrVZTTXVVFNNNdUSuFZTrcxqraaaaqqpploCl8CpptqsNquppppqraZaSeBaTbVZbVZTTTXVVFNNtQQugVNNtVlNNdWKakU11RI41VSb1WY11VRTTTXVVEvgEjjV2mhWK6qppppqqiVwCZxqqs1qs5pqqqmmmmqtlsAV1VptVlNNNdVUU021BC6BU021WW1WU0011YpqJYFTTbVZbVZTTTXVVFNNtQQugVNNtVmtqFZUU021BC6BU021WW1WU0011VRTTbUErtVUK7Naq6mmmmqqqZbAJXCqqTarzWqqqaaaaqqVBK6optqspppqqqmmmmoJXAKnmmqzmmqqFdWKaqolcKqpNqvNaqqppppqqqmWwCVwqrXarFZUazXVVFMtgUvgVFNtVpvVVFNNNdVUUy2BK6qVWU011VRT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) no-repeat top;
        background-size: 100% 100%;
    }

    #form-created {
        width: 292px;
        height: 480px;
        background: #fdfdfd;
        /*border: 1px #333 dashed;*/
        overflow-y: auto;
        margin-top: 53px;
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
