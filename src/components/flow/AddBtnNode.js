import G6 from "@antv/g6";
import { uniqueId } from "@/components/utils";
import logo from "@/assets/logo.png";

const addBtnNode = {
  register(graph, onClick) {
    G6.registerNode(
      "addBtnNode",
      {
        draw(cfg, group) {
          cfg = Object.assign(
            {},
            {
              size: [20, 20],
              label: "addBtnNode节点",
              id: uniqueId("addBtnNode"),
              icon: logo,
              x: 0,
              y: 0
            },
            cfg
          );
          let size = cfg.size;
          let mainId = cfg.id;
          const radius = parseInt(size[0]);
          let keyShape = group.addShape("circle", {
            attrs: {
              id: mainId,
              x: 0,
              y: 0,
              r: radius,
              stroke: "#ced4d9",
              fill: "#345db4", //此处必须有fill 不然不能触发事件
              shadowColor: "#3333",
              shadowBlur: 4,
              shadowOffsetX: 4,
              shadowOffsetY: 4
            }
          });
          let crossThickness = 3;
          group.addShape("rect", {
            attrs: {
              x: -radius / 2,
              y: -crossThickness / 2,
              width: radius,
              height: crossThickness,
              id: uniqueId("rect"),
              fill: "white",
              parent: mainId
            }
          });
          group.addShape("rect", {
            attrs: {
              x: -crossThickness / 2,
              y: -radius / 2,
              width: crossThickness,
              height: radius,
              id: uniqueId("rect"),
              fill: "white",
              parent: mainId
            }
          });

          return keyShape;
        },
        setState(name, value, item) {
          const group = item.getContainer();
          const shape = group.get("children")?.[0]; // 顺序根据 draw 时确定
          const selectStyles = () => {
            shape?.attr("fill", "#6ab7ff");
            shape?.attr("stroke", "#f3f9ff");
            shape?.attr("cursor", "point");
            shape?.attr("shadowColor", "#3333");
            shape?.attr("shadowBlur", 10);
            shape?.attr("shadowOffsetX", 8);
            shape?.attr("shadowOffsetY", 8);
          };
          const unSelectStyles = () => {
            shape?.attr("fill", "#345db4");
            shape?.attr("stroke", "#ced4d9");
            shape?.attr("shadowBlur", 4);
            shape?.attr("shadowOffsetX", 4);
            shape?.attr("shadowOffsetY", 4);
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
          //两个锚点在顶部中心,底部中心
          return [
            [0.5, 0],
            [0.5, 1]
          ];
        }
      },
      "single-node"
    );
  }
};

export default addBtnNode;
