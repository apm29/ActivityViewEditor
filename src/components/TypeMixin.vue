<script>
export default {
  name: "TypeMixin",
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "template",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    isSingleLineText: function() {
      let { element } = this;
      return element.type === "input" && element.props.type === "text";
    },
    isMultipleLineText: function() {
      let { element } = this;
      return element.type === "input" && element.props.type === "textarea";
    },
    isNumberInput: function() {
      let { element } = this;
      return element.type === "input" && element.props.type === "number";
    },
    isRadio: function() {
      let { element } = this;
      return element.type === "radio";
    },
    isCheckbox: function() {
      let { element } = this;
      return element.type === "checkbox";
    },
    isSelect: function() {
      let { element } = this;
      return element.type === "select";
    },
    isSwitch: function() {
      let { element } = this;
      return element.type === "switch";
    },
    isDatePicker: function() {
      let { element } = this;
      return element.type === "DatePicker";
    },
    isRangeDatePicker: function() {
      let { element } = this;
      return (
        element.type === "DatePicker" && element.props.type === "datetimerange"
      );
    },
    isTimePicker: function() {
      let { element } = this;
      return element.type === "TimePicker";
    },
    isRangeTimePicker: function() {
      let { element } = this;
      return (
        element.type === "TimePicker" && element.props.type === "timerange"
      );
    },
    isRate: function() {
      let { element } = this;
      return element.type === "rate";
    },
    isAlert: function() {
      let { element } = this;
      return element.type === "IntroductionText";
    },
    textDefaultValue: function() {
      return this.isSingleLineText || this.isMultipleLineText;
    },
    numberDefaultValue: function() {
      return this.isRate;
    },
    hasPlaceHolder: function() {
      return (
        !this.isCheckbox &&
        !this.isRadio &&
        !this.isSwitch &&
        !this.isRate &&
        !this.isAlert
      );
    },
    hasOptions: function() {
      return this.isCheckbox || this.isRadio || this.isSelect;
    },
    hasRange: function() {
      return this.isTimePicker || this.isDatePicker;
    }
  },
  methods: {
    singleLineText: function(element) {
      return element.type === "input" && element.props.type === "text";
    },
    multipleLineText: function(element) {
      return element.type === "input" && element.props.type === "textarea";
    },
    numberInput: function(element) {
      return element.type === "input" && element.props.type === "number";
    },
    radio: function(element) {
      return element.type === "radio";
    },
    checkbox: function(element) {
      return element.type === "checkbox";
    },
    select: function(element) {
      return element.type === "select";
    },
    switcher: function(element) {
      return element.type === "switch";
    },
    datePicker: function(element) {
      return element.type === "DatePicker";
    },
    rangeDatePicker: function(element) {
      return (
        element.type === "DatePicker" && element.props.type === "datetimerange"
      );
    },
    timePicker: function(element) {
      return element.type === "TimePicker";
    },
    rangeTimePicker: function(element) {
      return (
        element.type === "TimePicker" && element.props.type === "timerange"
      );
    },
    rate: function(element) {
      return element.type === "rate";
    },
    alert: function(element) {
      return element.type === "IntroductionText";
    }
  }
};
</script>

<style scoped></style>
