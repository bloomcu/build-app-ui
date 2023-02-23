<template>
  <VueDraggableNext :list="pageStore.parents"  @change="handleDragEvent" :animation="150" :group="{ name: 'pages', pull: true, put: true }">
    <ContentPage
      v-for="page in pageStore.parents"
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

// let parents = computed(() => {
//   return pageStore.parents.sort((a, b) => a.order - b.order );
// })

function handleDragEvent(event) {
  let e = event.moved || event.added
  console.log('parent moved or added', e)
  
  if (e) {
    pageStore.updateNesting({
      id: e.element.id,
      parent_id: null,
      order: e.newIndex,
    })
  }
  
  // if (event.moved) {
  //   console.log('parent moved', event.moved)
  //   // pageStore.updateNesting({
  //   //   id: event.moved.element.id,
  //   //   parent_id: props.page.id,
  //   //   order: event.moved.newIndex,
  //   // })
  // }
  // 
  // if (event.added) {
  //   console.log('parent added', event.added)
  //   // pageStore.updateNesting({
  //   //   id: event.added.element.id,
  //   //   parent_id: props.page.id,
  //   //   order: event.added.newIndex,
  //   // })
  // }
}
</script>
