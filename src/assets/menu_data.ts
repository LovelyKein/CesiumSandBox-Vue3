export declare interface menuInterface {
  label: string;
  url: string;
  children?: menuInterface[];
  isLeaf: boolean;
  id: number;
  isFold?: boolean;
  level?: number;
  parentId: number;
}

const menu_data: menuInterface[] = [
  {
    label: "地图基础",
    url: "base",
    isLeaf: false,
    id: 1,
    parentId: 0,
    children: [
      {
        label: "创建地图",
        url: "create-map",
        isLeaf: true,
        id: 2,
        parentId: 1,
      },
      {
        label: "默认视角",
        url: "default-view",
        isLeaf: true,
        id: 3,
        parentId: 1,
      },
      {
        label: "控制相机",
        url: "control-camera",
        isLeaf: true,
        id: 26,
        parentId: 1,
      },
      {
        label: "坐标/弧度",
        url: "coordinate-radian",
        isLeaf: true,
        id: 4,
        parentId: 1,
      },
    ],
  },
  {
    label: "图层",
    url: "layer",
    isLeaf: false,
    id: 5,
    parentId: 0,
    children: [
      {
        label: "瓦片图层",
        url: "tile",
        isLeaf: true,
        id: 6,
        parentId: 5,
      },
      {
        label: "地形数据",
        url: "terrain",
        isLeaf: true,
        id: 7,
        parentId: 5,
      },
    ],
  },
  {
    label: "实体",
    url: "entity",
    isLeaf: false,
    id: 8,
    parentId: 0,
    children: [
      {
        label: "3D 模型",
        url: "3d-model",
        isLeaf: true,
        id: 9,
        parentId: 8,
      },
      {
        label: "几何图形",
        url: "geometry",
        isLeaf: false,
        id: 11,
        parentId: 8,
        children: [
          {
            label: "point 点",
            url: "geometry-point",
            isLeaf: true,
            id: 29,
            parentId: 11,
          },
          {
            label: "文字标签",
            url: "text-label",
            isLeaf: true,
            id: 30,
            parentId: 11,
          },
          {
            label: "line 折线",
            url: "geometry-line",
            isLeaf: true,
            id: 31,
            parentId: 11,
          },
          {
            label: "几何面",
            url: "geometry-face",
            isLeaf: true,
            id: 32,
            parentId: 11,
          },
          {
            label: "区域挖空",
            url: "geometry-hole",
            isLeaf: true,
            id: 33,
            parentId: 11,
          },
        ],
      },
      {
        label: "实体材质",
        url: "entity-material",
        isLeaf: true,
        id: 12,
        parentId: 8,
      },
      {
        label: "三维实体",
        url: "3d-entity",
        isLeaf: true,
        id: 13,
        parentId: 8,
      },
    ],
  },
  {
    label: "Primitive",
    url: "primitive",
    isLeaf: false,
    id: 14,
    parentId: 0,
    children: [
      {
        label: "创建 primitive",
        url: "create-primitive",
        isLeaf: true,
        id: 15,
        parentId: 14,
      },
      {
        label: "合并多个实例",
        url: "combine-instance",
        isLeaf: true,
        id: 16,
        parentId: 14,
      },
      {
        label: "鼠标拾取",
        url: "mouse-pick",
        isLeaf: true,
        id: 17,
        parentId: 14,
      },
      {
        label: "3D Tiles",
        url: "Primitive",
        isLeaf: false,
        id: 17,
        parentId: 14,
        children: [
          {
            label: "OSM 建筑数据",
            url: "tile-osm",
            isLeaf: true,
            id: 34,
            parentId: 17,
          },
          {
            label: "倾斜摄影",
            url: "tile-photo",
            isLeaf: true,
            id: 35,
            parentId: 17,
          },
        ],
      },
    ],
  },
  {
    label: "DataSource",
    url: "datasource",
    isLeaf: false,
    id: 18,
    parentId: 0,
    children: [
      {
        label: "GeoJSON 数据",
        url: "geojson-data",
        isLeaf: true,
        id: 19,
        parentId: 18,
      },
      {
        label: "KML 数据",
        url: "kml-data",
        isLeaf: true,
        id: 20,
        parentId: 18,
      },
      {
        label: "CZML 数据",
        url: "czml-data",
        isLeaf: true,
        id: 21,
        parentId: 18,
      },
    ],
  },
  {
    label: "高级",
    url: "senior",
    isLeaf: false,
    id: 23,
    parentId: 0,
    children: [
      {
        label: "编写着色器",
        url: "shader",
        isLeaf: true,
        id: 24,
        parentId: 23,
      },
      {
        label: "粒子系统",
        url: "particle-system",
        isLeaf: true,
        id: 25,
        parentId: 23,
      },
    ],
  }
];
export default menu_data;
