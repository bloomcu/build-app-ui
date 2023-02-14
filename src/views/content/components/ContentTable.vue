<template>
  <div v-if="pageStore.pages">
    <Draggable 
      :list="pageStore.pages" 
      :animation="200" 
      :options="{swapThreshold: 0.1, emptyInsertThreshold: 20}"
      @change="handleDragEvent"
      group="pages" 
      item-key="id"
    >
      <template #item="{element}">
        <PageParent :page="element" class="margin-bottom-sm border radius-md shadow-sm"/>
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
