<template>
    <div class="tab-header">
        <div style="flex: 1"></div>
        <div class="tab-header-indicator">
            <div id="selected-div"></div>
        </div>
        <div
                v-for="(tab,index) of tabs"
                :key="index"
                :class="{
                  'x-tab':true,
                  'x-tab-selected':value === index
                }"
                @click="changeIndex($event,index)"
        >
            {{tab}}
        </div>
        <div style="flex: 1"></div>
        <Button style="margin-right: 16px" size="large">发布</Button>
    </div>
</template>

<script>
  export default {
    name: 'XTab',
    props: {
      tabs: {
        type: Array,
        required: true,
      },
      value: {
        type: Number,
        default: 0,
      },
    },
    model: {
      event: 'change',
      prop: 'value',
    },
    mounted(){
      this.changeIndicator(this.value)
      window.addEventListener('resize',()=>this.changeIndicator(this.value))
    },
    beforeDestroy(){
      window.removeEventListener('resize',()=>this.changeIndicator(this.value))
    },
    methods: {
      changeIndex: function (event,index) {
        this.$emit('change',index)
        this.changeIndicator(index)
      },
      changeIndicator:function (index) {
        let selected = document.getElementsByClassName('x-tab')[index]
        let indicatorDiv =document.getElementById('selected-div')
        let rect = selected.getBoundingClientRect()
        indicatorDiv.style.width = `${rect.width}px`
        indicatorDiv.style.left =`${rect.x}px`
      }
    },
  }
</script>

<style scoped>
    .x-tab {
        text-align: center;
        background-color: transparent;
        display: flex;
        align-items: center;
        padding: 12px 36px;
        color: white;
        cursor: pointer;
        font-weight: bolder;
        font-size: 17px;
        height: 100%;
        transition: 0.8s all;
        z-index: 10;
    }

    .x-tab-selected {
        /*background-color: rgba(33, 134, 239, 1);*/
        z-index: 10;
    }

    .tab-header {
        width: 100%;
        height: 100%;
        padding: 0 0;
        display: flex;
        position: relative;
        align-content: center;
        justify-content: center;
        align-items: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    #selected-div {
        height: 100%;
        position: absolute;
        width: 30px;
        background-color: rgba(33, 134, 239, 1);
        transition: 0.6s all;
    }

    .tab-header-indicator {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(57, 153, 247, 1);
    }
</style>
