<template>
    <div :style="{width: width , maxHeight: height, minHeight: height}">
        <div ref="container" id="container"
             :style="{width: width , maxHeight: height, minHeight: height}"
        >

        </div>
        <Modal
                v-model="dialogConfigs.showAddType"
                title="添加:">
            <Button long type="primary" @click="addStepNode(dialogConfigs.parentNode,'action')">审批步骤</Button>
            <br><br>
            <Button long type="info" @click="addStepNode(dialogConfigs.parentNode,'condition')">审批条件</Button>
            <div slot="footer">
            </div>
        </Modal>
        <Drawer title="编辑" :closable="false" v-model="dialogConfigs.showEditConditionDrawer">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <template v-slot:header>
                <Button type="error" long @click="deleteConditionBranch(dialogConfigs.editConditionData)">删除条件分支
                </Button>
            </template>
        </Drawer>
        <Drawer title="编辑" :closable="false" v-model="dialogConfigs.showEditActionDrawer">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <template v-slot:header>
                <Button type="error" long @click="deleteAction(dialogConfigs.editConditionData)">删除审批流程</Button>
            </template>
        </Drawer>
        <Button size="large" style="position: fixed;right: 30px;bottom: 30px" @click="save">SAVE</Button>
        <div id="miniMap" style="position: fixed;left: 30px;bottom: 30px"></div>
    </div>
</template>

<script>
  import G6 from '@antv/g6'
  import initiatorNode from '@/components/flow/InitiatorNode'
  import addBtnNode from '@/components/flow/AddBtnNode'
  import conditionNode from '@/components/flow/ConditionNode'
  import addConditionBtnNode from '@/components/flow/AddConditionBtnNode'
  import actionNode from '@/components/flow/ActionNode'
  import endNode from '@/components/flow/EndNode'
  import connectionNode from '@/components/flow/ConnecttionNode'
  import { uniqueId } from '@/utils'

  export default {
    name: 'Home',
    props: {
      height: {
        type: [String, Number],
        default: '100vh',
      },
      width: {
        type: [String, Number],
        default: '100vw',
      },
    },
    data: function () {
      return {
        dialogConfigs: {
          showAddType: false,
          parentNode: undefined,
          showEditConditionDrawer: false,
          editConditionData: undefined,
          showEditActionDrawer: false,
          editActionData: undefined,
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
      const grid = new G6.Grid()
      const miniMap = new G6.Minimap({
        container: 'miniMap',
      })
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
        enabledStack: true,
        plugins: [grid, miniMap],
        layout: {
          type: 'dagre',
          center: [200, 200],
          preventOverlap: true,
          controlPoints: true,
          rankdir: 'TB',
          ranksep: 20,
          nodesep: 90,
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
      initiatorNode.register(graph)
      addBtnNode.register(graph, this.showAdd)
      conditionNode.register(graph, this.showConditionEditDrawer)
      addConditionBtnNode.register(graph, (ev) => this.addConditionNode(ev.item))
      actionNode.register(graph, this.showActionEditDrawer)
      endNode.register(graph)
      connectionNode.register(graph)

      graph.data(this.data)

      graph.render()
    },
    methods: {
      //添加步骤
      //type:办理人/审批人/条件
      addStepNode: function (node, type) {
        let { graph, dialogConfigs } = this
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
        let { findLCANode, findLCAConnectionNode, graph, nextNodes } = this
        let parentId = node.get('id')
        let conditionId = uniqueId('conditionNode')
        let addId = uniqueId('addBtnNode')
        let connectionNode = findLCANode(nextNodes, graph, parentId, findLCAConnectionNode)
        if (connectionNode) {
          graph.addItem('node', {
            type: 'conditionNode',
            id: conditionId,
          })
          graph.addItem('node', {
            type: 'addBtnNode',
            id: addId,
          })
          graph.addItem('edge', {
            source: parentId,
            target: conditionId,
          })
          graph.addItem('edge', {
            source: conditionId,
            target: addId,
          })
          graph.updateLayout({})
          graph.fitView()
          graph.addItem('edge', {
            source: addId,
            target: connectionNode.get('id'),
          })
        }

        graph.updateLayout({})
        graph.fitView()
      },
      nextNodes: function (graph, startNodeId) {
        return graph.findAll('edge', function (edge) {
          return edge.getModel().source === startNodeId
        })
      },
      findLCANode: function (nextNodes, graph, parentId, findLCAConnectionNode) {
        //找到距离parentNode边数最少的connectionNode(最短路径问题)
        let map = new Map()
        //findNearestNode(graph, parentId, map, 0)
        let nodes = nextNodes(graph, parentId).map(e => e.get('target'))
        while (nodes.length > 1) {
          //当最短路径节点有多个时,继续往下寻找
          findLCAConnectionNode(graph, nodes, map, 0)
          nodes = Array.from(map.keys()).reduce((sum, key) => {
            if (sum.length === 0) {
              sum.push(key)
            } else {
              sum = sum.filter(e => map.get(e) <= map.get(key))
              if (sum.length === 0 || sum.every(e => map.get(e) === map.get(key))) {
                sum.push(key)
              }
            }
            return sum
          }, [])
        }
        return nodes[0]
      },
      //递归方式寻找LCA(最近共同父节点(这里是向下找共同的ConnectionNode))
      findLCAConnectionNode: function (graph, nodes, map, baseStep) {
        nodes.forEach(node => {
          let currentParent = node
          let edges = currentParent.get('edges').filter(edge => edge.get('source') === currentParent)
          let step = baseStep
          while (edges.length === 1 && edges[0].get('target').getModel().type !== 'connectionNode') {
            let target = edges[0].get('target')
            currentParent = target
            edges = target.get('edges').filter(edge => edge.get('source') === currentParent)
            step += 1
          }
          if (edges.length === 1) {
            //connectionNode
            map.set(edges[0].get('target'), step)
          } else {
            //分支
            this.findLCAConnectionNode(graph, edges.map(e => e.get('target')), map, --step)
          }
        })
      },
      //显示添加对话框
      showAdd: function (ev) {
        this.dialogConfigs.parentNode = ev.item
        this.dialogConfigs.showAddType = true
      },
      //显示条件编辑对话框
      showConditionEditDrawer: function (ev) {
        this.dialogConfigs.editConditionData = ev.item
        this.dialogConfigs.showEditConditionDrawer = true
      },
      showActionEditDrawer: function (ev) {
        this.dialogConfigs.editConditionData = ev.item
        this.dialogConfigs.showEditActionDrawer = true
      },
      deleteConditionBranch: function (node) {
        this.deleteFromNodeToLCAConnectionNode(node)
        this.dialogConfigs.editConditionData = undefined
        this.dialogConfigs.showEditConditionDrawer = false
      },
      //actionNode前后必定是addBtnNode
      deleteAction: function (actionNode) {
        let { getNextNode, getPreviousNode, graph } = this
        let nextNode = getNextNode(actionNode)
        let nextNextNode = getNextNode(nextNode)
        let previousNode = getPreviousNode(actionNode)
        let nextToNextNextEdge = nextNode.get('edges').filter(edge => edge.get('source') === nextNode)[0]
        let actionToAddEdge = actionNode.get('edges').filter(edge => edge.get('source') === actionNode)[0]
        //新增previousNode到NextNode的边
        graph.removeItem(actionToAddEdge)
        //删除node
        graph.removeItem(actionNode)
        //更新next/next到previous边
        graph.updateItem(nextToNextNextEdge.get('id'), {
          source: previousNode.get('id'),
          target: nextToNextNextEdge.get('target').get('id'),
        })
        //删除addBtn
        graph.removeItem(nextNode)

        this.dialogConfigs.editActionData = undefined
        this.dialogConfigs.showEditActionDrawer = false
        graph.updateLayout({})
        graph.fitView()
      },
      getNextNode: function (node) {
        return node.get('edges').filter(e => e.get('source') === node)[0].get('target')
      },
      getPreviousNode: function (node) {
        return node.get('edges').filter(e => e.get('target') === node)[0].get('source')
      },
      deleteFromNodeToLCAConnectionNode: function (node) {
        let { getNextNode, getPreviousNode, doDelete, findLCANode, findLCAConnectionNode, graph, nextNodes } = this
        // 1. 找条件节点
        let parentNode = node.get('edges').filter(e => e.get('target') === node)[0].get('source')
        let parentId = parentNode.get('id')
        // 2. 根据同一层条件节点找LCA
        let nodeLCA = findLCANode(nextNodes, graph, parentId, findLCAConnectionNode)
        //查询兄弟节点
        let siblingNodes = node.get('edges').filter(e => e.get('target') === node)[0].get('source').
          get('edges').
          filter(e => e.get('source') === parentNode).
          map(edge => edge.get('target'))

        if (siblingNodes.length === 2) {
          //从parentNode开始删除节点直到遇到LCA节点后的第二节点
          let nextNode = getNextNode(getNextNode(nodeLCA))
          let previousNode = getPreviousNode(parentNode)
          console.log(nextNode.get('id'))
          doDelete(parentNode, nextNode)
          //删除startNode
          parentNode.get('edges').forEach(edge => {
            graph.removeItem(edge)
          })
          graph.removeItem(parentNode)
          //连接前节点和下节点
          graph.addItem('edge', {
            source: previousNode.get('id'),
            target: nextNode.get('id'),
          })
        } else {
          //从node开始删除节点直到遇到LCA节点
          doDelete(node, nodeLCA)
          //删除startNode
          node.get('edges').forEach(edge => {
            graph.removeItem(edge)
          })
          graph.removeItem(node)
        }

        graph.updateLayout({})
        graph.fitView()
      },
      doDelete: function (startNode, stopNode) {
        let { graph, doDelete } = this

        startNode.get('edges').filter(e => e.get('source') === startNode).forEach(edge => {
          let newStartNode = edge.get('target')
          if (newStartNode !== stopNode) {
            doDelete(newStartNode, stopNode)
          }
          graph.removeItem(edge)
        })
        //删除所有无边节点并且不是结束节点的
        graph.findAll('node', (node) => node.get('edges').length === 0).
          filter(node => node.getModel().type !== 'endNode').
          forEach(node => {
            graph.removeItem(node)
          })
      },
      save: function () {
        this.$Modal.info({
          content: '已打印到控制台Console',
        })
        let graphData = this.graph.save()
        console.log(graphData)
        this.$emit('activity-graph', graphData)
      },
    },
  }
</script>
<style>
</style>
