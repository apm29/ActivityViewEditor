<template>
    <div ref="full-container" class="full-container">
        <div class="header">
            <XTab :tabs="tabs" v-model="index" @change="onIndexChange"></XTab>
        </div>
        <div style="flex: 1;width: 100%">
            <Carousel ref="carousel" :height="height" v-model="index" arrow="never" dots="none">
                <CarouselItem>
                    <XFormBasicConfig></XFormBasicConfig>
                </CarouselItem>
                <CarouselItem>
                    <XFormDesigner></XFormDesigner>
                </CarouselItem>
                <CarouselItem>
                    <ActivityEditor ref="editor"></ActivityEditor>
                </CarouselItem>
            </Carousel>
        </div>
    </div>
</template>

<script>
  import XFormDesigner from '@/components/form/XFormDesigner'
  import ActivityEditor from '@/components/flow/ActivityEditor'
  import XTab from '@/components/display/XTab'
  import XFormBasicConfig from '@/components/form/XFormBasicConfig'

  const headerHeight = 64
  export default {
    name: 'design',
    components: { XFormBasicConfig, XTab, ActivityEditor, XFormDesigner },
    data: function () {
      return {
        tabs: [
          '基础设置',
          '表单设计',
          '流程设计',
        ],
        index: 0,
        height: 0,
      }
    },
    mounted () {
      this.handleResize()
      window.addEventListener('resize',this.handleResize)
    },
    beforeDestroy(){
      window.removeEventListener('resize',this.handleResize)
    },
    methods: {
      onIndexChange: function () {
        this.$refs['editor'].init()
      },
      handleResize:function () {
        this.height = this.$refs['full-container'].clientHeight - headerHeight
        setTimeout( ()=>{
          this.$refs['carousel'].handleResize()
        },200)
      }
    },
  }
</script>

<style scoped lang="less">
    @header-height: 64px;
    .header {
        background-color: white;
        height: @header-height;
        padding: 0 0;
    }

    .full-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
</style>
