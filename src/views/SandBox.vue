<template>
  <div class="frame">
    <!-- 沙盒 sandbox -->
    <div class="sandbox">
      <iframe name="sandbox" id="sandbox" :srcdoc="originalCodeText" src="" frameborder="0" scrolling="no" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"
        class="iframe_body"></iframe>
    </div>
    <!-- 代码编辑 -->
    <div class="code-box">
      <CodeMirror ref="codeMirror" :originalCodeText="originalCodeText" @handleControl="handleControl" />
    </div>
  </div>
</template>

<script setup lang='ts'>
// 依赖
import axios from "axios";

// Composition API
import { ref, onMounted, watch, computed } from 'vue'
import { useStore } from 'vuex'

// Components
import CodeMirror from "@/components/CodeMirror.vue";

/** 属性 **/

/** stor **/
const store = useStore()

/** data **/
let originalCodeText = ref<string>('') // 原始
let apiCodeText = ref<string>('') // 接口获取
const codeMirror = ref<code | null>(null) // CodeMirror 的组件实例

/** 计算属性 **/
let chooseUrl = computed((): string => {
  const chooseNode = store.state.nav.chooseNode // 点击的树节点的标识路径
  if (chooseNode.isLeaf) {
    return chooseNode.url
  } else {
    return ''
  }
})

/** 监听 **/
watch(chooseUrl, (newValue): void => {
  if (newValue) {
    getPage(newValue)
  }
}, { immediate: false })

/** 生命周期 **/
onMounted((): void => {
  if (chooseUrl.value) {
    getPage(chooseUrl.value)
  }
})

/** 方法 **/
// 获取 demo 页面
const getPage = (activePath: string): void => {
  axios.get(`/pages/${activePath}.html`).then((res) => {
    const { data } = res
    apiCodeText.value = data
    originalCodeText.value = data
  }, () => {
    apiCodeText.value = ''
    originalCodeText.value = ''
  })
}
// 接收 Codemirror 组件的操作事件
const handleControl = (info: { type: string, code: string }): void => {
  const { type, code } = info
  if (type === 'run') {
    originalCodeText.value = code // 变更源代码
  } else if (type === 'reset') {
    originalCodeText.value = apiCodeText.value
  }
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
.frame {
  width: 100%;
  height: 100%;
  overflow: hidden;
  @extend .flex;
  .code-box  {
    width: 36%;
    height: 100%;
    overflow: hidden;
  }

  .sandbox {
    width: 66%;
    height: 100%;
    overflow: hidden;
    background-color: #141724;

    .iframe_body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #141724;
    }
  }
}
</style>