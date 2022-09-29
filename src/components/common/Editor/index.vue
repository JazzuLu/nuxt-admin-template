<template>
  <client-only>
    <div v-if="editor" class="editor">
      <menu-bar class="editor__header" :editor="editor" />
      <editor-content class="editor__content" :editor="editor" />
    </div>
  </client-only>
</template>

<script setup>

import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from "@tiptap/vue-3"
import { onBeforeUnmount, onMounted, watch } from "vue"
import MenuBar from './MenuBar.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      history: false
    }),
    Highlight,
    TaskList,
    TaskItem,
    CharacterCount.configure({
      limit: 10000
    })
  ],
  onUpdate () {
    emit('update:modelValue', editor.value.getHTML())
  }
})

watch(props, (p) => {
  const value = p.modelValue
  // HTML
  const isSame = editor.value.getHTML() === value

  // JSON
  // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

  if (isSame) { return }
  editor.value.commands.setContent(value, false)
})

onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>

<style scoped lang="scss">
.editor {
  display: flex;
  flex-direction: column;
  color: #0D0D0D;
  background-color: #FFF;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;

  &__header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 1px solid #ced4da;
  }

  &__content {
    padding: 1.25rem 1rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  height: 100%;
  > * + * {
    margin-top: 0.75em;
  }

  &:focus-visible{
    outline: none!important;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  mark {
    background-color: #FAF594;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>
