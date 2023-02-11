<template>
  <div>
    <PageParent v-for="page in pageStore.pages" :key="page.id" :page="page" class="margin-bottom-sm border radius-lg shadow-sm"/>
  </div>
</template>

<script setup>
// import Draggable from 'vuedraggable'
import { ref } from 'vue'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import PageParent from '@/views/content/components/PageParent.vue'

const pageStore = usePageStore()
// const isHighlighting = ref(false)

function updateTitle(id, title) {
  pageStore.update([id], {title: title})
}

function addUrl(id, url) {
  pageStore.update([id], {url: url})
}

function destroy(id) {
  // TODO: Abstract this away
  // Add to array if not present.
  
  // Check is this page selected already
  let index = pageStore.selected.indexOf(id)
      // if it is not selected, then select it
      index === -1 ? pageStore.selected.push(id) : null
      
  pageStore.destroy(pageStore.selected)
  
  pageStore.selected = []
}

function handleCategoryClick(id) {
  // TODO: Abstract this away
  // Add to array if not present.
  let index = pageStore.selected.indexOf(id)
      index === -1 ? pageStore.selected.push(id) : null
    
  pageStore.toggleContentCategoryModal()
}

function handleStatusClick(id, statusObj) {
  if (pageStore.selected.includes(id)) {
    // Iterate selected pages and update
    // Optimize this so we only iterate over selected pages, not all pages
    // TODO: Abstract this away
    pageStore.pages.forEach((page) => {
      if (pageStore.selected.includes(page.id)) {
        page.status = statusObj
      }
    })
    
    // Update all selected pages
    pageStore.update(pageStore.selected, {
      status: statusObj.slug
    })
    
    pageStore.selected = []
  } else {
    // Update single page
    let page = pageStore.pages.find(p => p.id === id)
        page.status = statusObj
    
    pageStore.update([id], {
      status: statusObj.title
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
