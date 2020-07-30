import G6 from '@antv/g6'
import { uniqueId } from '@/utils'
import logo from '@/assets/logo.png'

const addConditionBtnNode = {
  register (graph,onClick) {
    G6.registerNode('addConditionBtnNode', {
      draw (cfg, group) {
        cfg = Object.assign({}, {
          label: '添加条件',
          id: uniqueId('addConditionBtnNode'),
          icon: logo,
          x: 0,
          y: 0,
        }, cfg)
        let mainId = cfg.id
        const width = 60
        const height = 30
        const offsetX = -width / 2
        const offsetY = -height / 2
        let keyShape = group.addShape('circle', {
          attrs: {
            id: mainId,
            x: 0,
            y: 0,
            r: 4,
            stroke: '#ced4d9',
            fill: '#345db4',//此处必须有fill 不然不能触发事件
          },
        })
        //表面rect
        group.addShape("rect", {
          attrs: {
            x: offsetX,
            y: offsetY,
            width: width,
            height: height,
            id:  uniqueId('rect'),
            fill: 'white',
            parent: mainId,
            radius:4,
            shadowColor:'#3333',
            shadowBlur:4,
            shadowOffsetX:4,
            shadowOffsetY:4,
          }
        });
        //文字
        group.addShape("text", {
          attrs: {
            id: uniqueId('label'),
            x: offsetX + width / 2,
            y: offsetY + height / 2,
            textAlign: "center",
            textBaseline: "middle",
            text: cfg.label,
            parent: mainId,
            fill: "#565758"
          }
        });
        return keyShape
      },
      setState (name, value, item) {
        const group = item.getContainer();
        const shape = group.get("children")[1]; // 顺序根据 draw 时确定
        const selectStyles = () => {
          shape.attr("fill", "#ddd");
          shape.attr("stroke", "#ddd");
          shape.attr("cursor", "point");
          shape.attr("shadowColor", "#3333");
          shape.attr("shadowBlur", 10);
          shape.attr("shadowOffsetX", 8);
          shape.attr("shadowOffsetY", 8);
        };
        const unSelectStyles = () => {
          shape.attr("fill", "#fff");
          shape.attr("stroke", "#fff");
          shape.attr("shadowBlur", 4);
          shape.attr("shadowOffsetX", 4);
          shape.attr("shadowOffsetY", 4);
        };
        switch (name) {
          case "selected":
          case "hover":
            if (value) {
              selectStyles()
            } else {
              unSelectStyles()
            }
            break;
        }
      },
      getAnchorPoints (cfg) {
        //两个锚点在顶部中心,底部中心
        return [
          [0.5, 0],
          [0.5, 0],
        ]
      },
    }, 'single-node')
    // 点击时选中，再点击时取消
    graph.on('node:mouseenter', ev => {
      const node = ev.item;
      graph.setItemState(node, 'selected', true); // 切换选中
    });
    graph.on('node:mouseleave', ev => {
      const node = ev.item;
      graph.setItemState(node, 'selected', false); // 切换选中
    });
    graph.on('node:click', ev => {
      //点击事件
      if(ev.item._cfg.model.type === 'addConditionBtnNode')
        onClick(ev)
    });
  },
}

export default addConditionBtnNode
