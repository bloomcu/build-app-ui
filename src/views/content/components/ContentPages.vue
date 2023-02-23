<template>
  <ContentPage
    v-for="page in pages"
    :key="page.id"
    :page="page"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import ContentPage from '@/views/content/components/ContentPage.vue'

const pageStore = usePageStore()

let pages = computed(() => {
  return pageStore.parents.sort((a, b) => a.order - b.order );
})

function handleDragEvent(event) {
  if (event.moved) {
    console.log('moved')
    // pageStore.updateNesting({
    //   id: event.moved.element.id,
    //   parent_id: props.page.id,
    //   order: event.moved.newIndex,
    // })
  }
  
  if (event.added) {
    console.log('moved')
    // pageStore.updateNesting({
    //   id: event.added.element.id,
    //   parent_id: props.page.id,
    //   order: event.added.newIndex,
    // })
  }
}
</script>
