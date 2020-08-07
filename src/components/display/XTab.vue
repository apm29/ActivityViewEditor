<template>
    <div class="tab-header">
        <div
                v-for="(tab,index) of tabs"
                :key="index"
                :class="{
                  tab:true,
                  'tab-selected':value === index
                }"
                @click="changeIndex(index)"
        >
            {{tab}}
        </div>
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
        default:0
      },
    },
    model:{
      event:'change',
      prop:'value'
    },
    methods:{
      changeIndex:function (index) {
        this.$emit('change',index)
      }
    }
  }
</script>

<style scoped>
    .tab{
        text-align: center;
        background-color: transparent;
        display: flex;
        align-items: center;
        padding: 12px 36px;
        color: white;
        cursor: pointer;
        font-weight: bolder;
        font-size: 18px;
    }
    .tab-selected{
        background-color: rgba(33,134,239,1);
    }

    .tab-header {
        width: 100%;
        height: 100%;
        padding: 0 0;
        display: flex;
        background-color: rgba(57,153,247,1);
        align-content: center;
        justify-content: center;
    }
</style>
