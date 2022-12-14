<template>
  <div class="code-display">
    <div class="code-control">
      <div class="control-title">
        <p>源代码编辑器</p>
      </div>
      <div class="control-box">
        <div @click="item.handler" v-for="(item, index) in controlList" :key="index" class="control-item">
          <span :class="item.icon"></span>
          <p class="label">{{ item.label }}</p>
        </div>
      </div>
    </div>
    <div class="code-mirror-box">
      <Codemirror
        v-model="editorCodeText"
        placeholder="Code made here..."
        :style="{ width: '100%', height: '100%' }"
        :autofocus="false"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @ready="handleReady"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
/** Composition API **/
import { ref, shallowRef, reactive, watch } from 'vue'

/** Components **/
import { Codemirror } from 'vue-codemirror'

/** 外部依赖 **/
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
const extensions = [javascript(), oneDark] // 语言，主题

/** API **/

/** 属性 **/
const props = defineProps({
  // 初始化的原始代码字符串
  originalCodeText: {
    type: String,
    default: '',
    required: true
  }
})

/** 自定义事件 **/
const emit = defineEmits(['handleControl'])

/** data **/
let editorCodeText = ref<string>('') // 正在编辑的字符串
const codeView = shallowRef<any>() // Codemirror 的实例
const controlList = reactive([
  {
    label: '运行',
    icon: 'iconfont icon-kaishi_yunhang',
    handler: (): void => { handleControl('run') }
  },
  {
    label: '重置',
    icon: 'iconfont icon-zhongzhi',
    handler: (): void => { handleControl('reset') }
  }
])
let editorTimer = ref<any | null>(null) // 防抖节流阀

/** 向外暴露的数据 **/
defineExpose({ editorCodeText })

/** 监听 **/
watch(() => props.originalCodeText, (newValue): void => {
  editorCodeText.value = newValue
})

/** 生命周期 **/

/** 方法 **/
const handleReady = (payload: any): void => {
  codeView.value = payload.view
}
// 源代码编辑器内容发生变化触发的回调函数
const handleChange = (code: string): void => {
  // 防抖
  if (editorTimer.value) {
    clearTimeout(editorTimer.value)
    editorTimer.value = null
  }
  editorTimer.value = setTimeout((): void => {
    editorCodeText.value = code
  }, 1500)
}
// 点击控制按钮的回调
const handleControl = (type: string): void => {
  const info: {type: string, code: string} = {
    type,
    code: ''
  }
  if (type === 'run') {
    // 通知父组件，变更源代码
    info.code = editorCodeText.value
  } else if (type === 'reset') {
    // 重置源代码
    info.code = ''
  }
  emit('handleControl', info)
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
.code-display {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  // border-left: 1px solid #f3f3f3;
  // box-sizing: border-box;
  user-select: none;
  .code-control {
    width: 100%;
    height: 3.8rem;
    @extend .flex;
    justify-content: space-between;
    padding: 0 1.5rem;
    box-sizing: border-box;
    .control-title {
      height: max-content;
      p {
        color: #606060;
        text-align: left;
        font-size: 1rem;
        line-height: 1em;
      }
    }
    .control-box {
      height: 100%;
      width: max-content;
      @extend .flex;
      justify-content: flex-end;
      .control-item {
        margin-right: 1.5rem;
        cursor: pointer;
        &:hover {
          span {
            transform: scale(1.1);
            color: #141724;
          }
        }
        &:last-child {
          margin-right: 0;
        }
        height: 100%;
        @extend .flex;
        .label {
          color: #525252;
          font-size: 0.9rem;
          line-height: 1em;
          text-align: left;
          margin-left: 0.5rem;
        }
        span {
          font-size: 0.9rem;
          line-height: 1em;
          color: #525252;
          transform-origin: center;
          transition: all 0.2s;
        }
      }
    }
  }
  .code-mirror-box {
    width: 100%;
    height: calc(100% - 3.8rem);
    background-color: #282c34;
  }
}
</style>
<style lang="scss">
// 覆盖 codemirror 的样式
.v-codemirror {
  .cm-editor {
    .cm-scroller {
      .cm-gutters {
        font-size: 12px;
        display: none;
      }
      .cm-content {
        font-size: 12px;
        background-color: #282c34;
        padding: 5px;
        box-sizing: border-box;
      }

      // 滚动条
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 4px;
        height: 4px;
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
}
</style>