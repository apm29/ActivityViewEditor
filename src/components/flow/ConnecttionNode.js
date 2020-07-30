import G6 from '@antv/g6'
import { uniqueId } from '@/utils'
import logo from '@/assets/logo.png'

const connectionNode = {
  register(graph) {
    G6.registerNode("connectionNode", {
      draw(cfg, group) {
        cfg = Object.assign({},{
          label:'connectionNode节点',
          id:uniqueId('connectionNode'),
          icon:logo,
          x:0,
          y:0
        },cfg)
        let size = 5
        const offsetX = -size / 2
        const offsetY = -size / 2
        return  group.addShape("circle", {
          attrs: {
            id: cfg.id,
            x: 0,
            y: 0,
            r: 0,
            fill: "#ffffff",
            stroke: '#4444',
            opacity: 1
          }
        });
      },
      setState(name, value, item) {
        const group = item.getContainer();
        const shape = group.get("children")[0]; // 顺序根据 draw 时确定
        const selectStyles = () => {
          shape.attr("fill", "#eee");
          shape.attr("stroke", "#eee");
          shape.attr("cursor", "point");
          shape.attr("shadowColor", "#3333");
          shape.attr("shadowBlur", 10);
          shape.attr("shadowOffsetX", 8);
          shape.attr("shadowOffsetY", 8);

        };
        const unSelectStyles = () => {
          shape.attr("fill", "#ffffff");
          shape.attr("stroke", "#ced4d9");
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
        //两个锚点都在底部中心
        return [
          [0.5,0],
          [0.5,1],
        ]
      }
    },'single-node');
  }
};

export default connectionNode;
