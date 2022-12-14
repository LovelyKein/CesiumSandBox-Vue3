<template>
  <div class="tree-box">
    <ul class="tree-list">
      <li
        v-for="(item) in treeData"
        :key="item.id" class="tree-item"
        :class="{ child: item.isLeaf }"
      >
      <!-- 文本显示 -->
        <div
          @click.stop="controlHandler(item)" class="title"
          :style="{ paddingLeft: item.level * 1.5 + 'rem' }"
          :class="{choose: activeId === item.id && item.isLeaf}"
        >
          <p class="tree-label">{{ item.label }}</p>
          <span
            v-if="item.children && item.children.length > 0"
            class="iconfont icon-youjiantou"
            :class="{ rotate: !expandIds.find(id => id === item.id) }"
          />
        </div>
        <!-- 递归结构 -->
        <Tree
          :class="{ isFold: !expandIds.find(id => id === item.id) }"
          v-if="item.children && item.children.length > 0"
          :treeData="item.children"
          @nodeClick="recursionNodeClickCallback"
          :defaultChoose="defaultChoose"
          :defaultExpand="defaultExpand"
          :activeId="activeId"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Composition API
import { onMounted, reactive, toRefs } from 'vue';

// Components
import Tree from '@/components/Tree.vue';

/** 属性 **/
const props = defineProps({
  treeData: {
    default: (): { id: number, isLeaf: boolean, level: number, label: string, children: [] }[] => [],
    required: true
  },
  activeId: {
    type: Number,
    default: 0
  },
  defaultExpand: {
    default: (): number[] => []
  },
  defaultChoose: {
    default: (): number | null => null
  }
})

/** 自定义事件 **/
const emit = defineEmits(['nodeClick'])

/** data **/
let { expandIds, defaultChooseNode } = toRefs(reactive({
  expandIds: [] as number[], // 展开项的 id 列表
  defaultChooseNode: {} as any // 默认选中的节点
}))

/** 生命周期 **/
onMounted((): void => {
  expandIds.value.push(...props.defaultExpand) // 默认展开节点
  recursionFindNode(props.treeData, props.defaultChoose)
  if (defaultChooseNode.value.id) {
    controlHandler(defaultChooseNode.value)
  }
})

/** 方法 **/

// 传递树节点的点击事件
const controlHandler = (node: any): void => {
  const index = expandIds.value.findIndex((id) => {
    return id === node.id
  })
  if (!node.isLeaf) { // 非叶子节点
    if (index !== -1) {
      // 已展开，点击收起
      expandIds.value.splice(index, 1)
    } else if (index === -1) {
      // 已收起，点击展开
      expandIds.value.push(node.id)
    }
  }
  emit('nodeClick', node)
}
// 自调用递归事件
const recursionNodeClickCallback = (node: any): void => {
  emit('nodeClick', node)
}

// 递归序号默认选中的节点
const recursionFindNode = (data: any[], id: number): any => {
  data.forEach((item) => {
    if (item.id === id) {
      defaultChooseNode.value = { ...item }
    } else {
      if (item.children && item.children.length) {
        recursionFindNode(item.children, id)
      }
    }
  })
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

.tree-box {
  width: 100%;
  height: 100%;

  .tree-list {
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .tree-item {
      width: 100%;
      height: max-content;
      // padding-left: 1.5rem;
      box-sizing: border-box;
      cursor: pointer;
      margin-top: 0.8rem;

      &:first-child {
        margin-top: 0;
      }

      .title {
        width: 100%;
        height: 2.6rem;
        @extend .flex;
        justify-content: space-between;
        padding-right: 1.5rem;
        box-sizing: border-box;
        transition: all 0.2s;

        &:hover {
          background-color: #f0f0fb;
        }

        .tree-label {
          text-align: left;
          font-size: 1rem;
          color: #252525;
        }

        .rotate {
          transform: rotate(0deg);
        }

        span {
          color: #cfcfe5;
          font-size: 0.7rem;
          transform-origin: center;
          transition: all 0.2s;
          transform: rotate(90deg);
        }
      }

      .choose {
        background-color: #dddffa !important;
        .tree-label {
          color: #2a37f5 !important;
        }
      }

      .isFold {
        display: none;
      }
    }
    // 代表是子树
    .child {
      .title {
        .tree-label {
          color: #606060;
        }
      }
    }

    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 4px;
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 2px;
      background-color: rgba($color: #cfd0e3, $alpha: 0.4);
    }

    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      border-radius: 2px;
      background: transparent;
    }
  }
}
</style>