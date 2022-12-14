<template>
  <div class="container-box">
    <div class="menu">
      <div class="header">
        <p>CesiumJs 示例中心</p>
      </div>
      <div class="tree-wrap">
        <Tree
          :treeData="menuData"
          @nodeClick="nodeClickCallback"
          :defaultExpand="defaultExpand"
          :defaultChoose="defaultChoose"
          :activeId="activeId"
        />
      </div>
    </div>
    <div class="conent-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composition API
import { reactive, onMounted, toRefs } from 'vue';
import { useStore } from 'vuex'

/** 外部依赖 **/
import menu_data, { menuInterface } from "../assets/menu_data";

/** API **/
import { getTreeListById } from '../api/modules/tree'

// Components
import Tree from '@/components/Tree.vue';

// store
const store = useStore()

/** data **/
let { menuData, activeId, defaultExpand, defaultChoose } = toRefs(reactive({
  menuData: reactive<menuInterface[]>([]), // 树结构数据
  activeId: null as number | null, // 激活的树节点 id
  defaultExpand: [1], // 默认展开的节点 id
  defaultChoose: 2, // 默认选中的节点 id
}))

/** 生命周期 **/
onMounted((): void => {
  getTreeData(0)
})

/** 方法 **/

// 获取树结构菜单数据
const getTreeData = (id: number): void => {
  // getTreeListById(id).then((res: any) => {
  //   recursionData(res.children) // 处理数据
  //   menuData.value = res.children
  // }, () => {
  //   menuData.value = []
  // })
  recursionData(menu_data)
  menuData.value = menu_data
}

// 处理树结构的递归函数
const recursionData = (data: menuInterface[]): void => {
  data.forEach((item: menuInterface | any, index: number) => {
    item.isFold = true; // 默认不展开
    if (item.parentId === 0) {
      item.level = 1;
    }
    if (item.children && item.children.length) {
      item.isLeaf = false
      item.children.forEach((child: menuInterface | any) => {
        child.level = item.level + 1;
      });
      recursionData(item.children);
    } else {
      item.isLeaf = true
    }
  });
}

// 树节点的点击回调函数
const nodeClickCallback = (node: any): void => {
  activeId.value = node.id
  store.commit('nav/CHANGR_NODE', node)
}

</script>

<style lang='scss' scoped>
.flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
}

.container-box {
  width: 100%;
  height: 100%;
  @extend .flex;

  .menu {
    width: 16%;
    height: 100vh;
    overflow: hidden;
    background-color: #fafafa;
    user-select: none;
    padding: 1.5rem 0;
    border-right: 1px solid #f3f3f3;
    box-sizing: border-box;

    .header {
      width: 100%;
      padding: 0 1.5rem;
      padding-bottom: 1.5rem;
      box-sizing: border-box;
      border-bottom: 1px solid #f3f3f3;

      p {
        width: 100%;
        font-size: 1.2rem;
        text-align: left;
        line-height: 1em;
        color: #141724;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .tree-wrap {
      margin-top: 1.5rem;
      height: calc(100% - 1.2rem - 1.5rem - 1.5rem);
    }
  }

  .conent-box {
    width: 84%;
    height: 100%;
    overflow: hidden;
  }
}
</style>