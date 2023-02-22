<template>
  <ContentPage
    v-for="page in pages"
    :key="page.id"
    :page="page"
  />
</template>

<script setup>
// import Draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import ContentPage from '@/views/content/components/ContentPage.vue'
// import AppInlineEditor from '@/app/components/base/forms/AppInlineEditor.vue'
// import IconAngleLeft from '@/app/components/base/icons/IconAngleLeft.vue'
// import IconTrash from '@/app/components/base/icons/IconTrash.vue'

const pageStore = usePageStore()

const props = defineProps({
    pages: { 
      type: Array,
      required: true
    },
})

// const showChildren = ref(false)

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

let sorted = computed(() => {
  return props.page.children.sort(dynamicSort('order'))
})

function updateTitle(id, title) {
  pageStore.update([id], {title: title})
}

function updateUrl(id, url) {
  pageStore.update([id], {url: url})
}

function handleStatusClick(id, statusObj) {
  // TODO: Abstract this away
  
  // Check is this page selected already
  let index = pageStore.selected.indexOf(id)
      // if it is not selected, then select it
      index === -1 ? pageStore.selected.push(id) : null
      
  // Update all selected pages in db
  pageStore.update(pageStore.selected, {
    status: statusObj.slug
  })
  
  // Reset selected
  pageStore.selected = []
}

function destroy(id) {
  // TODO: Abstract this away
  
  // Check is this page selected already
  let index = pageStore.selected.indexOf(id)
      // if it is not selected, then select it
      index === -1 ? pageStore.selected.push(id) : null
  
  // Archive selected pages in store
  // Optimize this by reducing down to only selected
  // Optimize by flattening pages array
  pageStore.pages = pageStore.pages.filter((p) => !pageStore.selected.includes(p.id)) // remove resources
  
  // Archive selected pages in db
  pageStore.destroy(pageStore.selected)
  
  // Reset selected
  pageStore.selected = []
}

function restore(id) {
  // TODO: Abstract this away
  
  // Check is this page selected already
  let index = pageStore.selected.indexOf(id)
      // if it is not selected, then select it
      index === -1 ? pageStore.selected.push(id) : null
  
  // Restore selected pages in store
  // Optimize by flattening pages array
  pageStore.pages = pageStore.pages.filter((p) => !pageStore.selected.includes(p.id)) // restore resources
  
  // Archive selected pages in db
  pageStore.restore(pageStore.selected)
  
  // Reset selected
  pageStore.selected = []
}

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
