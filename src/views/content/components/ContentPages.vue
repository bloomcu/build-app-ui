<template>
  <VueDraggableNext 
    :list="pageStore.pages"  
    :group="{ name: 'pages', pull: true, put: true }"
    :animation="150"
    @change="handleDragEvent"
    @start="pageStore.dragging = true"
    @end="pageStore.dragging = false"
    handle=".draggable-handle"
    ghost-class="draggable-ghost"
    drag-class="draggable-drag"
  >
    <ContentPage
      v-for="page in pageStore.pages"
      :key="page.id"
      :page="page"
    />
  </VueDraggableNext>
</template>

<script setup>
import { ref, computed } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import ContentPage from '@/views/content/components/ContentPage.vue'

const pageStore = usePageStore()

function handleDragEvent(event) {
  let e = event.moved || event.added
  
  if (e) {
    pageStore.updateNesting({
      id: e.element.id,
      parent_id: null,
      order: e.newIndex,
    })
  }
}
</script>

<style lang="scss">
.draggable-ghost {
  border-radius: var(--radius-lg);
  border: 1px dashed alpha(var(--color-primary), 0.40);
  height: 52px;
  
  * { 
    visibility: hidden; 
  }
}

.draggable-drag { 
  opacity: 0.5;
}
</style>
