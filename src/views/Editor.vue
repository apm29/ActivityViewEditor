<template>
    <div>
        <div ref="container" id="container"
             style="width: 100%;height: 100%;background-color: antiquewhite"
        >

        </div>
        <Modal
                v-model="dialogConfigs.showAddType"
                :title="`添加:${!!dialogConfigs.parentNode?dialogConfigs.parentNode.getModel().id:''}`">
            <Button long type="primary" @click="addStepNode(dialogConfigs.parentNode,'action')">审批步骤</Button>
            <br><br>
            <Button long type="info" @click="addStepNode(dialogConfigs.parentNode,'condition')">审批条件</Button>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script>
  import G6, { Minimap } from '@antv/g6'
  import initiatorNode from '@/components/flow/InitiatorNode'
  import addBtnNode from '@/components/flow/AddBtnNode'
  import conditionNode from '@/components/flow/ConditionNode'
  import addConditionBtnNode from '@/components/flow/AddConditionBtnNode'
  import actionNode from '@/components/flow/ActionNode'
  import endNode from '@/components/flow/EndNode'
  import connectionNode from '@/components/flow/ConnecttionNode'
  import { uniqueId } from '@/utils'

  const miniMap = new Minimap({
    size: [200, 100],
    className: 'minimap',
  })
  export default {
    name: 'Home',
    data: function () {
      return {
        dialogConfigs: {
          showAddType: false,
          parentNode: undefined,
        },
        data: {
          nodes: [
            {
              id: '1',
              type: 'initiatorNode',
            },
            {
              id: '2',
              type: 'addBtnNode',
            },
            {
              id: '3',
              type: 'endNode',
            },

          ],
          edges: [
            {
              source: '1',
              target: '2',
            },
            {
              source: '2',
              target: '3',
            },
          ],
        },
        graph: undefined,
      }
    },
    mounted () {

      this.graph = new G6.Graph({
        container: 'container',
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
        fitView: true,
        fitViewPadding: [20, 20, 20, 20],
        fitCenter: true,
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
          edit: ['click-select'],
        },
        layout: {
          type: 'dagre',
          center: [200, 200],
          sortByCombo: true,
          rankdir: 'TB',
          ranksep: 20,
          nodesep: 120,
        },
        defaultEdge: {
          type: 'polyline',
          style: {
            stroke: 'blue',
          },
          sourceAnchor: 1,
          targetAnchor: 0,
        },
      })
      let { graph } = this
      graph.addPlugin(miniMap)
      initiatorNode.register(graph)
      addBtnNode.register(graph, this.showAdd)
      conditionNode.register(graph)
      addConditionBtnNode.register(graph, (ev) => this.addConditionNode(ev.item))
      actionNode.register(graph)
      endNode.register(graph)
      connectionNode.register(graph)

      graph.data(this.data)

      graph.render()
    },
    methods: {
      //添加步骤
      //type:办理人/审批人/条件
      addStepNode: function (node, type) {
        let { data, graph, dialogConfigs } = this
        let parentId = node.get('id')
        if (type === 'action') {
          let actionId = uniqueId('action')
          let edge = graph.find('edge', function (edge) {
            return edge.getModel().source === parentId
          })
          //添加审批动作
          graph.addItem('node', {
            id: actionId,
            type: 'actionNode',
          })
          let addId = uniqueId('addBtnNode')
          //添加新增按钮
          graph.addItem('node', {
            id: addId,
            type: 'addBtnNode',
          })
          //添加审批动作到新增按钮的边

          graph.addItem('edge', {
            source: actionId,
            target: addId,
          })
          //添加父节点(新增按钮)到审批动作的边
          graph.addItem('edge', {
            source: parentId,
            target: actionId,
          })
          //更新子节点(新增按钮)到审批动作的边
          if (edge) {
            graph.updateItem(edge.getModel().id, {
              source: addId,
              target: edge.getModel().target,
            })
          }

        } else if (type === 'condition') {
          let conditionId1 = uniqueId('conditionNode')
          let conditionId2 = uniqueId('conditionNode')
          let addConditionId = uniqueId('addConditionBtnNode')
          let connectionNodeId = uniqueId('connectionNode')
          let addId1 = uniqueId('addBtnNode')
          let addId2 = uniqueId('addBtnNode')
          let addId3 = uniqueId('addBtnNode')
          let edge = graph.find('edge', function (edge) {
            return edge.getModel().source === parentId
          })
          //添加新增条件按钮
          graph.addItem('node', {
            id: addConditionId,
            type: 'addConditionBtnNode',
          })
          graph.addItem('node', {
            id: conditionId1,
            type: 'conditionNode',
          })
          graph.addItem('node', {
            id: conditionId2,
            type: 'conditionNode',
          })
          graph.addItem('node', {
            id: addId1,
            type: 'addBtnNode',
          })
          graph.addItem('node', {
            id: addId2,
            type: 'addBtnNode',
          })
          graph.addItem('node', {
            id: connectionNodeId,
            type: 'connectionNode',
          })
          graph.addItem('node', {
            id: addId3,
            type: 'addBtnNode',
          })
          graph.addItem('edge', {
            source: parentId,
            target: addConditionId,
          })
          graph.addItem('edge', {
            source: addConditionId,
            target: conditionId1,
          })
          graph.addItem('edge', {
            source: addConditionId,
            target: conditionId2,
          })
          graph.addItem('edge', {
            source: conditionId1,
            target: addId1,
          })
          graph.addItem('edge', {
            source: conditionId2,
            target: addId2,
          })
          graph.addItem('edge', {
            source: addId1,
            target: connectionNodeId,
          })
          graph.addItem('edge', {
            source: addId2,
            target: connectionNodeId,
          })
          graph.addItem('edge', {
            source: connectionNodeId,
            target: addId3,
          })

          if (edge) {
            graph.updateItem(edge.getModel().id, {
              source: addId3,
              target: edge.getModel().target,
            })
          }
        }
        dialogConfigs.showAddType = false
        dialogConfigs.parentNode = undefined
        graph.updateLayout({})
        graph.fitView()
      },
      //添加条件
      addConditionNode: function (node) {
        let { findNearestNode, graph } = this
        let parentId = node.get('id')
        let conditionId = uniqueId('conditionNode')
        console.log(parentId)

        //找到距离parentNode边数最少的connectionNode(最短路径问题)
        let connectionNode = findNearestNode(graph, parentId)

        let edge = graph.find('edge', function (edge) {
          return edge.getModel().source === parentId
        })
        graph.addItem('node', {
          type: 'conditionNode',
          source: parentId,
          target: conditionId,
        })

        graph.updateLayout({})
        graph.fitView()
      },
      nextNodes: function (graph, parentId) {
        return graph.findAll('edge', function (edge) {
          return edge.getModel().source === parentId
        })
      },
      findNearestNode (graph, parentId) {
        let step = 0
        let allChildrenEdge = this.nextNodes(graph, parentId)
        let stepArray = Array(allChildrenEdge.length).fill(1)
        console.log(allChildrenEdge)
      },
      //显示添加对话框
      showAdd: function (ev) {
        this.dialogConfigs.parentNode = ev.item
        this.dialogConfigs.showAddType = true
      },

    },
  }
</script>
<style>
    #container {
        position: relative;
        min-height: 100vh;
        max-height: 100vh;
        width: 100%;
        height: 100%;
    }
</style>
