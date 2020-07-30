<template>
    <div id="activity-view"></div>
</template>

<script>
  export default {
    name: 'ActivityViewEditor',
    data:function(){
      return {
        //基础数据
        config:{

        }
      }
    },
    methods:{
      //初始化
      init:function () {

      },
      //添加步骤
      //type:办理人/审批人/条件
      addStepNode:function (nodeId,type) {

      },
      //添加条件
      addConditionNode:function (nodeId) {
        this.addStepNode(nodeId,'condition')
      },
      //更新节点数据
      updateNode:function (nodeId,data) {

      }
    }
  }
</script>

<style scoped>

</style>
