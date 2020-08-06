<script>
  import { deepCloneJson, uniqueId } from '@/components/utils'

  const LABEL_WIDTH = 72
  export default {
    name: 'TypedTemplateMixin',
    data: function () {
      return {
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
              { value: '1', label: '选项1', disabled: false },
              { value: '2', label: '选项2', disabled: false },
              { value: '3', label: '选项3', disabled: false },
              { value: '4', label: '选项4', disabled: false },
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
              { value: '1', label: '选项1', disabled: false },
              { value: '2', label: '选项2', disabled: false },
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
              placeholder: '请选择日期',
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
            type: 'upload',
            field: 'file',
            title: '附件',
            templateName: '附件',
            col: {
              span: 24,
              labelWidth: LABEL_WIDTH,
            },
            value: [],
            props: {
              type: 'select',
              action: 'http://axj.ciih.net/business/upload/uploadFile',
              name: 'file',
              multiple: true,
              accept: '*',
              maxSize: 4096,
              maxLength: 6,
              onSuccess: this.uploadHandler,
            },
          },
          {
            type: 'upload',
            field: 'file',
            title: '图片',
            templateName: '图片',
            col: {
              span: 24,
              labelWidth: LABEL_WIDTH,
            },
            value: [],
            props: {
              type: 'select',
              uploadType: 'image',
              action: 'http://axj.ciih.net/business/upload/uploadFile',
              name: 'file',
              multiple: true,
              accept: 'image/*',
              format: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
              maxSize: 4096,
              maxLength: 6,
              onSuccess: this.uploadHandler,
            },
          },
          {
            id: 11,
            type: 'IntroductionText',
            templateName: '说明文字',
            native: true,
            value: '这是一段说明文字',
            name: 'IntroductionText',
            props: {},
          },
        ],
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
      isSingleLineText: function () {
        let { element } = this
        return element.type === 'input' && element.props.type === 'text'
      },
      isMultipleLineText: function () {
        let { element } = this
        return element.type === 'input' && element.props.type === 'textarea'
      },
      isNumberInput: function () {
        let { element } = this
        return element.type === 'input' && element.props.type === 'number'
      },
      isRadio: function () {
        let { element } = this
        return element.type === 'radio'
      },
      isCheckbox: function () {
        let { element } = this
        return element.type === 'checkbox'
      },
      isSelect: function () {
        let { element } = this
        return element.type === 'select'
      },
      isSwitch: function () {
        let { element } = this
        return element.type === 'switch'
      },
      isDatePicker: function () {
        let { element } = this
        return element.type === 'DatePicker'
      },
      isRangeDatePicker: function () {
        let { element } = this
        return (
          element.type === 'DatePicker' && element.props.type === 'datetimerange'
        )
      },
      isTimePicker: function () {
        let { element } = this
        return element.type === 'TimePicker'
      },
      isRangeTimePicker: function () {
        let { element } = this
        return (
          element.type === 'TimePicker' && element.props.type === 'timerange'
        )
      },
      isRate: function () {
        let { element } = this
        return element.type === 'rate'
      },
      isAlert: function () {
        let { element } = this
        return element.type === 'IntroductionText'
      },
      isAttachment: function () {
        let { element } = this
        return element.type === 'upload' && element.props.uploadType !== 'image'

      },
      isImage: function () {
        let { element } = this
        return element.type === 'upload' && element.props.uploadType === 'image'
      },
      textDefaultValue: function () {
        return this.isSingleLineText || this.isMultipleLineText
      },
      numberDefaultValue: function () {
        return this.isRate
      },
      hasPlaceHolder: function () {
        return (
          !this.isCheckbox &&
          !this.isRadio &&
          !this.isSwitch &&
          !this.isRate &&
          !this.isAlert &&
          !this.isAttachment &&
          !this.isImage
        )
      },
      hasOptions: function () {
        return this.isCheckbox || this.isRadio || this.isSelect
      },
      hasRange: function () {
        return this.isTimePicker || this.isDatePicker
      },
    },
    methods: {
      cloneTemplate: function(template) {
        let newItem = deepCloneJson(template);
        newItem.field = uniqueId(newItem.field); //字段名
        newItem.id = uniqueId("form-item"); //id
        return newItem;
      },
      singleLineText: function (element) {
        return element.type === 'input' && element.props.type === 'text'
      },
      multipleLineText: function (element) {
        return element.type === 'input' && element.props.type === 'textarea'
      },
      numberInput: function (element) {
        return element.type === 'input' && element.props.type === 'number'
      },
      radio: function (element) {
        return element.type === 'radio'
      },
      checkbox: function (element) {
        return element.type === 'checkbox'
      },
      select: function (element) {
        return element.type === 'select'
      },
      switcher: function (element) {
        return element.type === 'switch'
      },
      datePicker: function (element) {
        return element.type === 'DatePicker'
      },
      rangeDatePicker: function (element) {
        return (
          element.type === 'DatePicker' && element.props.type === 'datetimerange'
        )
      },
      timePicker: function (element) {
        return element.type === 'TimePicker'
      },
      rangeTimePicker: function (element) {
        return (
          element.type === 'TimePicker' && element.props.type === 'timerange'
        )
      },
      rate: function (element) {
        return element.type === 'rate'
      },
      alert: function (element) {
        return element.type === 'IntroductionText'
      },
      attachment: function (element) {
        return element.type === 'upload' && element.props.uploadType !== 'image'

      },
      imageUpload: function (element) {
        return element.type === 'upload' && element.props.uploadType === 'image'
      },
    },
  }
</script>

<style scoped></style>
