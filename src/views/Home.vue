<template>
  <div id="container"></div>
</template>

<script>
import G6 from "@antv/g6";

export default {
  name: "Home",
  data: function() {
    return {
      data: {
        nodes: [
          {
            id: "node1",
            label: "node1",
            x: 100,
            y: 50
          },
          {
            id: "node2",
            label: "node2",
            x: 150,
            y: 250
          }
        ],
        edges: [
          {
            source: "node1",
            target: "node2"
          }
        ],
        groups: [
          {
            id: "group1",
            title: {
              text: "Group 1",
              stroke: "#444",
              offsetX: -20,
              offsetY: 30
            }
          }
        ]
      }
    };
  },
  mounted() {
    let graph = new G6.Graph({
      container: "container",
      width: window.innerWidth,
      height: window.innerHeight,
      fitView: true,
      fitViewPadding: [20, 20, 20, 20],
      fitCenter: true,
      modes: {
        default: ["drag-canvas", "zoom-canvas"],
        edit: ["click-select"]
      },
      //各个状态下节点的样式，例如 hover、selected，3.1 版本新增
      nodeStateStyles: {},
      //各个状态下边的样式，例如 hover、selected，3.1 版本新增。
      edgeStateStyles: {},
      //各个状态下 Combo 的样式，例如 hover、selected，3.5 版本新增。
      comboStateStyles: {},
      //默认状态下节点的配置，比如 type, size, color。会被写入的 data 覆盖。
      defaultNode: {},
      //默认状态下边的配置，比如 type, size, color。会被写入的 data 覆盖。
      defaultEdge: {},
      //默认状态下 Combo 的配置，比如 type, color。会被写入的 data 覆盖。3.5 版本新增。
      defaultCombo: {},
      //布局配置项，使用 type 字段指定使用的布局方式，type 可取以下值：random, radial, mds, circular, fruchterman, force, dagre，各布局详细的配置请参考  Layout API 文档
      layout: "force",
      //是否启用 stack，即是否开启 redo & undo 功能，该配置项 V3.6 及以上版本支持。
      enabledStack: true
    });
    console.log(graph);
    graph.data(this.data);
    //设置各个边样式及其他配置，以及在各个状态下边的 KeyShape 的样式。
    //提示: 该方法必须在 render 之前调用，否则不起作用。
    graph.edge(edge => {
      return {
        id: edge.id,
        type: "cubic-horizontal",
        style: {
          stroke: "green"
        }
      };
    });
    //设置各个节点样式及其他配置，以及在各个状态下节点的 KeyShape 的样式。
    //提示: 该方法必须在 render 之前调用，否则不起作用。
    graph.node(node => {
      return {
        id: node.id,
        type: "rect",
        style: {
          fill: "blue"
        },
        stateStyles: {
          fill: "red"
        }
      };
    });
    graph.render();

    const model = {
      id: "node",
      label: "node",
      x: 150,
      y: 150,
      style: {
        fill: "blue"
      }
    };

    graph.addItem("node", model);

    // 当 type 为 'group' 时候，model 的数据结构如下：
    const modelGroup = {
      groupId: "xxx000999",
      nodes: ["node1", "node2"],
      type: "rect",
      zIndex: 0,
      title: {
        text: "Group名称"
      }
    };

    graph.addItem("group", modelGroup);
    graph.renderCustomGroup(this.data, "circle");
  }
};
</script>
<style>
body {
  background-color: antiquewhite;
}
</style>
