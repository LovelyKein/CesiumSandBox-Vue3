interface nodeInterface {
  label: string;
  url: string;
  isLeaf: boolean;
  id: number;
  isFold?: boolean;
  level?: number;
  parentId: number;
}

export default {
  namespaced: true, // 开启命名空间
  state: {
    chooseNode: {} as nodeInterface, // 点击的树节点信息
  },
  actions: {},
  mutations: {
    CHANGR_NODE(state: any, nodeInfo: nodeInterface): void {
      state.chooseNode = nodeInfo;
    },
  },
  getters: {},
  modules: {},
};
