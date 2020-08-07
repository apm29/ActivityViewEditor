<template>
    <div class="form-item-container">
        <div class="drag-handle" style="flex: 1">
            <div :id="clonedData.id" class="form-item-placeholder"></div>
        </div>
        <div class="setting-button">
            <Poptip
                    confirm
                    title="确定删除该项吗?"
                    placement="left"
                    @on-ok="doDelete"
            >
                <Icon type="md-close" size="24" color="white"/>
            </Poptip>
            <Icon
                    @click.stop="showEditDrawer"
                    type="ios-settings"
                    size="24"
                    color="white"
            />
        </div>

        <Drawer v-model="drawer" :mask-closable="false" draggable width="280" inner
                class-name=".edit-drawer">
            <Form v-model="clonedData">
                <FormItem label="字段名">
                    <Input
                            v-model="clonedData.field"
                            placeholder="输入字段名"
                            disabled
                    ></Input>
                </FormItem>
                <FormItem label="id">
                    <Input v-model="clonedData.id" placeholder="输入ID" disabled></Input>
                </FormItem>
                <FormItem label="标题" v-if="!isAlert">
                    <Input v-model="clonedData.title" placeholder="输入标题"></Input>
                </FormItem>
                <FormItem label="说明文字" v-if="hasPlaceHolder">
                    <Input
                            v-model="clonedData.props.placeholder"
                            placeholder="输入说明文字"
                    ></Input>
                </FormItem>
                <FormItem label="说明文字" v-if="isAlert">
                    <Input
                            type="textarea"
                            v-model="clonedData.value"
                            :maxlength="1000"
                            show-word-limit
                            placeholder="输入说明文字"
                    ></Input>
                </FormItem>

                <FormItem label="默认值" v-if="textDefaultValue">
                    <Input v-model="clonedData.value" placeholder="输入默认值"></Input>
                </FormItem>
                <FormItem label="默认值" v-if="numberDefaultValue">
                    <InputNumber
                            v-model="clonedData.value"
                            :min="0"
                            :max="clonedData.props.count"
                            placeholder="选择默认值"
                    >
                    </InputNumber>
                </FormItem>
                <FormItem v-if="isSelect" label="是否多选">
                    <Checkbox v-model="clonedData.props.multiple"></Checkbox>
                </FormItem>
                <FormItem v-if="hasRange" label="时间范围">
                    <Checkbox v-model="elementRange"></Checkbox>
                </FormItem>
                <FormItem label="分制" v-if="isRate">
                    <RadioGroup v-model="clonedData.props.count" @on-change="clampRateValue">
                        <Radio :label="5">5分制</Radio>
                        <Radio :label="10">10分制</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem v-if="hasOptions">
                    <label>选项</label>
                    <draggable
                            class="form"
                            :list="clonedData.options"
                            group="template"
                            tag="ul"
                            handle=".option-drag-handle"
                            v-bind="dragOptions"
                    >
                        <transition-group type="transition">
                            <template v-for="(option, index) of clonedData.options">
                                <div :key="index" class="option-container">
                                    <Input class="option-input" v-model="option.label">
                                        <template v-slot:prefix>
                                            <Icon class="option-drag-handle" type="md-menu"></Icon>
                                        </template>
                                    </Input>
                                    <Icon
                                            @click="addOption(option)"
                                            type="ios-add-circle"
                                            size="24"
                                    />
                                    <Icon
                                            @click="deleteOption(option)"
                                            type="ios-remove-circle-outline"
                                            size="24"
                                    />
                                </div>
                            </template>
                        </transition-group>
                    </draggable>
                </FormItem>
                <FormItem label="验证(是否必填)" v-if="!isAlert">
                    <Checkbox v-model="elementHasValidate"></Checkbox>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="saveNewElement">保存</Button>
                    <Button style="margin-left: 8px" @click="drawer = false">取消</Button>
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
  import formCreate from '@form-create/iview4'
  import TypeMixin from '@/components/form/TypedTemplateMixin'
  import draggable from 'vuedraggable'
  import { deepCloneJson, uniqueId } from '@/components/utils'

  export default {
    name: 'XFormItem',
    mixins: [TypeMixin],
    components: {
      draggable,
    },
    props: {
      element: {
        type: Object,
      },
    },
    data: function () {
      return {
        drawer: false,
        $f: undefined,
      }
    },
    mounted () {
      this.createItem()
    },
    watch: {
      element: {
        deep: true,
        handler: function () {
          this.createItem()
        },
      },
      drawer:{
        handler: function (val) {
          if(!val){
            this.$emit('edit-form-item', undefined)
          }
        },
      }
    },
    model: {
      event: 'change-form-item',
      prop: 'element',
    },
    computed: {
      clonedData: function () {
        return deepCloneJson(this.element)
      },
      elementHasValidate: {
        set: function (value) {
          if (value) {
            this.clonedData.validate = [
              {
                required: true,
                message: `请输入${this.clonedData.title}`,
                trigger: 'blur',
              },
            ]
          } else {
            this.clonedData.validate = [
              {
                required: false,
              },
            ]
          }
        },
        get: function () {
          return this.clonedData.validate && this.clonedData.validate.length > 0
        },
      },
      elementRange: {
        set: function (value) {
          if (value) {
            if (this.isTimePicker) {
              this.clonedData.props.type = 'timerange'
            } else if (this.isDatePicker) {
              this.clonedData.props.type = 'datetimerange'
            }
          } else {
            if (this.isTimePicker) {
              this.clonedData.props.type = 'time'
            } else if (this.isDatePicker) {
              this.clonedData.props.type = 'datetime'
            }
          }
        },
        get: function () {
          return this.isRangeDatePicker || this.isRangeTimePicker
        },
      },
    },
    methods: {
      showEditDrawer: function () {
        this.$emit('edit-form-item', this.clonedData)
        this.drawer = true
      },
      doDelete: function () {
        this.$emit('delete-form-item', this.clonedData)
      },
      saveNewElement: function () {
        this.createItem()
        this.$emit('change-form-item', this.clonedData)
        this.drawer = false
      },
      createItem: function () {
        let root = document.getElementById(this.clonedData.id)
        if (root) {
          root.innerHTML = ''
          this.$f = formCreate.create([this.clonedData], {
            el: root,
            submitBtn: false,
          })
          console.info('item recreate')
        }
      },
      deleteOption: function (option) {
        this.clonedData.options.splice(this.clonedData.options.indexOf(option), 1)
      },
      addOption: function (option) {
        let options = this.clonedData.options
        options.splice(options.indexOf(option), 0, {
          value: uniqueId('option'),
          label: `选项${options.length + 1}`,
          disabled: false,
        })
      },
      clampRateValue: function () {
        if (this.clonedData.value > this.clonedData.props.count) {
          this.clonedData.value = this.clonedData.props.count
        }
      },
    },
  }
</script>

<style scoped>
    .setting-button {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        visibility: hidden;
        background-color: steelblue;
    }

    .form-item-container:hover > .setting-button {
        visibility: visible;
        z-index: 100;
    }

    .form-item-container:hover {
        border: 1px steelblue dashed;
    }

    .form-item-container {
        display: flex;
        flex-wrap: nowrap;
        position: relative;
        border: 1px transparent dashed;
    }

    .form-item-placeholder {
        pointer-events: none;
    }

    .option-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .option-input {
        flex: 1;
        background-color: white;
        margin-bottom: 3px;
        padding-left: 3px;
        border-radius: 3px;
        box-shadow: #c8ebfb 3px 3px 6px;
    }
</style>
