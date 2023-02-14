<template>
  <div v-if="pageStore.pages">
    <Draggable 
      :list="pageStore.pages" 
      :animation="200"
      @change="handleDragEvent"
      @start="pageStore.dragging = true"
      @end="pageStore.dragging = false"
      group="pages" 
      ghost-class="ghost"
      handle=".handle"
      class="flex flex-column gap-sm"
      item-key="id"
    >
      <template #item="{element}">
        <PageParent :page="element" class="border radius-md shadow-sm"/>
      </template>
    </Draggable>
  </div>
</template>

<script setup>
import Draggable from 'vuedraggable'
import { ref } from 'vue'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import PageParent from '@/views/content/components/PageParent.vue'

const pageStore = usePageStore()
// const isHighlighting = ref(false)

let drag = ref(true)

function handleDragEvent(event) {
  if (event.moved) {
    
    pageStore.updateNesting({
      id: event.moved.element.id,
      // parent_id: null,
      order: event.moved.newIndex,
    })
  }
  
  if (event.added) {
    pageStore.updateNesting({
      id: event.added.element.id,
      // parent_id: null,
      order: event.added.newIndex,
    })
  }
}

// function highlight(id) {
//   pageStore.selected.includes(id) ? isHighlighting.value = true : isHighlighting.value = false
// }
// 
// function unhighlight() {
//   isHighlighting.value = false
// }
</script>

<style lang="scss">
.ghost {
  // opacity: 0.5;
  border: none;
  background: #ede8fe;
}
</style>
