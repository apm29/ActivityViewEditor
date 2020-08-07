<template>
    <Layout style="height: 100%;width: 100%">
        <Sider class="side-bar" :width="250">
            <XComponentMenu></XComponentMenu>
        </Sider>
        <Content style="position: relative;">

            <Row class="main-content" type="flex" justify="center" align="middle">
                <Col :span="preview ? 12 : 24" class="form-area">
                    <IntroductionText icon="ios-paper-outline" justify="center">
                        表单设计
                    </IntroductionText>
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
                                    :class="{
                                        'form-item':true,
                                        'form-item-selected': editElement && (element.field === editElement.field)
                                    }"

                                    v-for="element of createdRules"
                                    :key="element.id"
                            >
                                <XFormItem
                                        :element="element"
                                        :ref="`form-item-${element.field}`"
                                        @delete-form-item="deleteFormItem"
                                        @edit-form-item="editFormItem"
                                        @change-form-item="saveFormItem"
                                >
                                </XFormItem>
                            </ul>
                        </transition-group>
                    </draggable>
                </Col>

                <Col :span="12" class="form-area" v-show="preview">
                    <IntroductionText icon="md-tablet-portrait" justify="center">
                        实际表单
                    </IntroductionText>
                    <XFormPreview
                            ref="form-preview"
                            :created-rules.sync="createdRules"
                    ></XFormPreview>
                </Col>
            </Row>
            <ButtonGroup style="position: absolute;top: 30px;right: 30px">
                <Button
                        @click="preview = !preview"
                        color="success"
                        shape="circle"
                        size="large"
                >
                    {{ preview ? '关闭预览' : '启用预览' }}
                </Button>
                <Button
                        @click="displayModel"
                        color="success"
                        shape="circle"
                        size="large"
                >
                    显示数据
                </Button>
            </ButtonGroup>
        </Content>

        <Modal v-model="display" scrollable width="65vw">
            <JSONDisplay title="数据" :value="model"></JSONDisplay>
        </Modal>
    </Layout>
</template>

<script>
  import draggable from 'vuedraggable'
  import XFormItem from '@/components/form/XFormItem'
  import TypeMixin from '@/components/form/TypedTemplateMixin'
  import IntroductionText from '@/components/form/native/IntroductionText'
  import XComponentMenu from '@/components/form/XComponentMenu'
  import JSONDisplay from '@/components/display/JSONDisplay'
  import XFormPreview from '@/components/form/XFormPreview'

  export default {
    name: 'XFormDesigner',
    components: {
      XFormPreview,
      JSONDisplay,
      XComponentMenu,
      IntroductionText,
      draggable,
      XFormItem,
    },
    mixins: [TypeMixin],
    data: function () {
      return {
        createdRules: [],
        preview: true,
        display: false,
        model: {},
        editElement: undefined,
      }
    },

    mounted () {
      this.templateList.forEach(e => {
        this.createdRules.push(this.cloneTemplate(e))
      })
    },
    methods: {
      uploadHandler: function (res, file, fileList) {
        if (res.status === '1') {
          console.info(res, file, fileList)
          file.url = res.data.filePath
          file.name = res.data.filePath
        } else {
          this.$Message.error({ content: res.text })
        }
      },
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
          this.createdRules[find] = Object.assign(
            {},
            this.createdRules[find],
            element,
          )
          this.$refs['form-preview'].updateRule(
            element.field,
            this.createdRules[find],
          )
        } else {
          this.$Message.error({ content: '元素未匹配' })
        }
      },
      editFormItem: function (item) {
        this.editElement = item
      },

      displayModel: function () {
        this.model = this.$refs['form-preview'].getModel()
        this.display = true
      },
    },
  }
</script>

<style scoped>
    .side-bar {
        background-color: #ffffff;
        transition: 0.5s all;
        height: 100%;
    }

    .hide-bar {
        width: 0;
    }

    .show-bar {
        width: 350px;
    }

    /*定义滚动条高宽及背景
                     高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar {
        width: 3px;
        height: 3px;
        background-color: #f5f5f5;
    }

    /*定义滚动条轨道
                     内阴影+圆角*/
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 3px rgba(222, 222, 222, 0.6);
        border-radius: 3px;
        background-color: #f5f5f5;
    }

    /*定义滑块
                     内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
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
        margin-top: 43px;
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
        width: 294px;
        height: 480px;
        background: #fdfdfd;
        /*border: 1px #333 dashed;*/
        overflow-y: auto;
        margin-top: 43px;
        padding: 24px 16px;
    }

    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }

    .form-item {
        cursor: move;
    }
    .form-item-selected {
        border: 1px #333 dashed;
        background-color: rgba(200, 235, 251, 0.33);
    }
</style>
