import G6 from '@antv/g6'
import { uniqueId } from '@/utils'
import logo from '@/assets/logo.png'
const conditionNode = {
  register(graph,onClick) {
    G6.registerNode("conditionNode", {
      draw(cfg, group) {
        cfg = Object.assign({},{
          size:[180,40],
          label:'条件节点',
          id:uniqueId('conditionNode'),
          icon:logo,
          x:0,
          y:0
        },cfg)
        let size = cfg.size;
        let mainId = cfg.id;
        const width = parseInt(size[0]);
        const height = parseInt(size[1]);
        const offsetX = -width / 2
        const offsetY = -height / 2
        let keyShape = group.addShape("rect", {
          attrs: {
            id:mainId,
            x: offsetX,
            y: offsetY,
            width: width,
            height: height,
            stroke: "#ced4d9",
            fill: '#fff',//此处必须有fill 不然不能触发事件
            radius: 4,
            shadowColor:'#3333',
            shadowBlur:4,
            shadowOffsetX:4,
            shadowOffsetY:4,
          },
        })
        //文字
        group.addShape("text", {
          attrs: {
            id: uniqueId('label'),
            x: offsetX + width / 2,
            y: offsetY + height/ 2,
            textAlign: "center",
            textBaseline: "middle",
            text: cfg.label,
            parent: mainId,
            fill: "#565758"
          }
        });
        //下方anchorLink
        group.addShape("circle", {
          attrs: {
            id:  uniqueId('circle'),
            parent: mainId,
            x: 0,
            y: -offsetY,
            r: 5,
            fill: "#ffffff",
            stroke: '#4444',
            opacity: 1
          }
        });
        //上方anchorLink
        group.addShape("circle", {
          attrs: {
            id:  uniqueId('circle'),
            parent: mainId,
            x: 0,
            y: offsetY,
            r: 5,
            fill: "#ffffff",
            stroke: '#4444',
            opacity: 1
          }
        });
        return  keyShape;
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
        //两个锚点在顶部中心,底部中心
        return [
          [0.5,0],
          [0.5,1],
        ]
      }
    },'single-node');
    graph.on('node:click', ev => {
      //点击事件
      if(ev.item.getModel().type === 'conditionNode')
        onClick(ev)
    });
  }
};

export default conditionNode;
