import G6 from "@antv/g6";
import { uniqueId } from "@/components/utils";
import logo from "@/assets/icons/close.svg";
const endNode = {
  register(graph) {
    G6.registerNode(
      "endNode",
      {
        draw(cfg, group) {
          cfg = Object.assign(
            {},
            {
              size: [180, 40],
              label: "结束节点",
              id: uniqueId("endNode"),
              icon: logo,
              x: 0,
              y: 0
            },
            cfg
          );
          let size = cfg.size;
          let mainId = cfg.id;
          const width = parseInt(size[0]);
          const height = parseInt(size[1]);
          const offsetX = -width / 2;
          const offsetY = -height / 2;
          let keyShape = group.addShape("rect", {
            attrs: {
              id: mainId,
              x: offsetX,
              y: offsetY,
              width: width,
              height: height,
              stroke: "#ced4d9",
              fill: "#fff", //此处必须有fill 不然不能触发事件
              radius: 4,
              shadowColor: "#3333",
              shadowBlur: 4,
              shadowOffsetX: 4,
              shadowOffsetY: 4
            }
          });
          //上方蓝色Rect标记
          let indicatorHeight = 10;
          group.addShape("rect", {
            attrs: {
              x: offsetX,
              y: offsetY,
              width: width,
              height: indicatorHeight,
              id: uniqueId("rect"),
              fill: "steelblue",
              parent: mainId,
              radius: [4, 4, 0, 0]
            }
          });
          //左侧icon
          let iconPaddingLeft = 5;
          let iconSize = 20;
          group.addShape("image", {
            attrs: {
              x: offsetX + iconPaddingLeft,
              y:
                offsetY +
                indicatorHeight +
                (height - indicatorHeight - iconSize) / 2,
              width: iconSize,
              height: iconSize,
              img: cfg.icon
            }
          });
          //文字
          group.addShape("text", {
            attrs: {
              id: uniqueId("label"),
              x: offsetX + width / 2,
              y: offsetY + (height + indicatorHeight) / 2,
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
              id: uniqueId("circle"),
              parent: mainId,
              x: 0,
              y: offsetY,
              r: 5,
              fill: "#ffffff",
              stroke: "#4444",
              opacity: 1
            }
          });
          return keyShape;
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
                selectStyles();
              } else {
                unSelectStyles();
              }
              break;
          }
        },
        getAnchorPoints(cfg) {
          //两个锚点都在顶部中心
          return [
            [0.5, 0],
            [0.5, 0]
          ];
        }
      },
      "single-node"
    );
  }
};

export default endNode;
