<template>
  <!-- <div class=""> -->
  <Draggable 
    :list="pages" 
    :animation="200" 
    @change="(event) => handleDragEvent(event)" 
    group="pages" 
    item-key="id"
  >
    <template #item="{element}">
      <div class="">
        <div class="flex flex-row items-center justify-between padding-left-sm padding-y-sm">
          <!-- Left -->
          <div class="flex flex-row gap-sm items-center">  
            <!-- Toggle -->
            <button v-if="element.children.length" @click="showChildren = !showChildren" class="btn btn--sm btn--icon">
              <IconAngleLeft size="xs" :class="showChildren ? 'rotate-90' : 'rotate-270'" class="color-contrast-medium"/>
            </button>
            
            <!-- Title & URL -->
            <div>
              <AppInlineEditor :id="element.id" @updated="updateTitle" class="width-fit text-base">
                {{ element.id }} {{ element.title }}
              </AppInlineEditor>
              
              <a v-if="element.url" :href="element.url" target="_blank" class="text-xs color-contrast-low width-fit">{{ element.url }}</a>
            </div>
          </div>
          
          <!-- Right -->
          <div class="flex flex-row gap-md items-center padding-right-sm">
            <!-- Status -->
            <div v-if="!element.deleted_at" class="btns inline-flex text-xs">
              <button 
                v-for="option in [
                 {title: 'Needs review', slug: 'needs-review'},
                 {title: 'Looks good', slug: 'looks-good'},
                 {title: 'Not sure', slug: 'not-sure'},
                ]" 
                :key="option.slug"
                :class="element.status && element.status.slug === option.slug ? 'btns__btn--selected' : null"
                @click="handleStatusClick(element.id, option)"
                class="btns__btn"
              >
                {{ option.title }}
              </button>
            </div>
            
            <!-- Archive -->
            <div v-if="!element.deleted_at">
              <div v-if="element.children.length" class="btn--icon opacity-0">
                <IconTrash size="xs" class="color-contrast-medium color-opacity-60%"/>
              </div>
              <button v-else @click="destroy(element.id)" class="btn btn--sm btn--icon">
                <IconTrash size="xs" class="color-contrast-medium color-opacity-60%"/>
              </button>
            </div>
            
            <!-- Restore -->
            <div v-if="element.deleted_at">
              <button @click="restore(element.id)" class="btn btn--sm btn--icon">
                <!-- TODO: Make this an app icon -->
                <svg class="icon icon--xs fill-current color-contrast-medium color-opacity-60%" viewBox="0 0 16 16">
                  <g><path data-color="color-2" d="M2.765,9.692a1,1,0,0,0-1.9.616,7.469,7.469,0,0,0,.716,1.567,1,1,0,1,0,1.711-1.034A5.517,5.517,0,0,1,2.765,9.692Z"></path><path data-color="color-2" d="M7.91,13.5a5.455,5.455,0,0,1-2.3-.545,1,1,0,1,0-.871,1.8,7.438,7.438,0,0,0,3.141.745H7.9a1,1,0,0,0,.015-2Z"></path><path data-color="color-2" d="M14,10.7a1,1,0,0,0-1.383.294,5.568,5.568,0,0,1-1.686,1.662A1,1,0,1,0,12,14.348a7.562,7.562,0,0,0,2.3-2.265A1,1,0,0,0,14,10.7Z"></path><path d="M8,.5A7.511,7.511,0,0,0,3.923,1.713L2.436.155a.5.5,0,0,0-.849.234L.263,6.194a.5.5,0,0,0,.487.612A.486.486,0,0,0,.842,6.8L6.673,5.712a.5.5,0,0,0,.269-.837l-1.6-1.681A5.49,5.49,0,0,1,13.5,8a1,1,0,0,0,2,0A7.508,7.508,0,0,0,8,.5Z"></path></g>
                </svg>
              </button>
            </div>
            
            <!-- Checkbox -->
            <div class="custom-checkbox">
              <input 
                @click.self="pageStore.selectPage(element.id, $event)" 
                :checked="pageStore.selected.includes(element.id)" 
                class="custom-checkbox__input" 
                type="checkbox"
              />
              <div class="custom-checkbox__control"></div>
            </div>
          </div>
        </div>
        
        <div class="margin-left-sm">
          <PageParent :pages="element.children" class="border-left border-top border-bottom radius-lg radius-top-right-0 radius-bottom-right-0 margin-bottom-xs"/>
        </div>
      </div>
    </template>
    <!-- <div class="margin-left-sm">
      <Draggable 
        :list="page.children" 
        :animation="200" 
        @change="handleDragEvent" 
        group="pages" 
        item-key="id"
      >
        <template #item="{element}">
          <PageParent :page="element" class="border-left border-top border-bottom radius-lg radius-top-right-0 radius-bottom-right-0 margin-bottom-xs"/>
        </template>
      </Draggable>
    </div> -->
  </Draggable>
  <!-- </div> -->
</template>

<script setup>
import Draggable from 'vuedraggable'
import { ref } from 'vue'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import AppInlineEditor from '@/app/components/base/forms/AppInlineEditor.vue'
import IconAngleLeft from '@/app/components/base/icons/IconAngleLeft.vue'
import IconTrash from '@/app/components/base/icons/IconTrash.vue'

const pageStore = usePageStore()

const props = defineProps({
    pages: { 
      type: Array
    },
})

let drag = ref(true)
const showChildren = ref(false)

function updateTitle(id, title) {
  pageStore.update([id], {title: title})
}

function updateUrl(id, url) {
  pageStore.update([id], {url: url})
}

function recursiveUpdateStatus(page, statusObj) {
  if (pageStore.selected.includes(page.id)) {
    page.status = statusObj
  }
  
  if (page.children.length) {
    page.children.forEach((child) => {
      recursiveUpdateStatus(child, statusObj)
    })
  }
}

function handleStatusClick(id, statusObj) {
  // TODO: Abstract this away
  
  // Check is this page selected already
  let index = pageStore.selected.indexOf(id)
      // if it is not selected, then select it
      index === -1 ? pageStore.selected.push(id) : null
  
  // Update all selected pages in store
  // Optimize this by reducing down to only selected
  // Optimize by flattening pages array
  pageStore.pages.forEach((page) => {
    recursiveUpdateStatus(page, statusObj)
  })
      
  // Update all selected pages in db
  pageStore.update(pageStore.selected, {
    status: statusObj.slug
  })
  
  // Reset selected
  pageStore.selected = []
}

function recursiveDestroy(page) {
  if (page.children.length) {
    page.children = page.children.filter((p) => !pageStore.selected.includes(p.id)) // remove resources
    
    page.children.forEach((child) => {
      recursiveDestroy(child)
    })
  }
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
  pageStore.pages.forEach((page) => {
    recursiveDestroy(page)
  })
  
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

function handleDragEvent(event, parent_id) {
  if (event.moved) {
    console.log('moved')
    console.log(event)
    console.log({
      id: event.moved.element.id,
      // parent_id: event.target.id,
      order: event.moved.newIndex,
    })
    
    // pageStore.updateNesting({
    //   id: event.moved.element.id,
    //   parent_id: parent_id,
    //   order: event.moved.newIndex,
    // })
  }
  
  if (event.added) {
    console.log('added')
    console.log(event)
    console.log({
      id: event.added.element.id,
      parent_id: event.added.element.id,
      order: event.added.newIndex,
    })
    
    // pageStore.updateNesting({
    //   id: event.added.element.id,
    //   parent_id: parent_id,
    //   order: event.added.newIndex,
    // })
  }
}

// function handleStatusClick(id, statusObj) {
//   if (pageStore.selected.includes(id)) {
//     // Iterate selected pages and update
//     // Optimize this so we only iterate over selected pages, not all pages
//     // TODO: Abstract this away
//     pageStore.pages.forEach((page) => {
//       if (pageStore.selected.includes(page.id)) {
//         page.status = statusObj
//       }
//     })
// 
//     // Update all selected pages
//     pageStore.update(pageStore.selected, {
//       status: statusObj.slug
//     })
// 
//     pageStore.selected = []
//   } else {
//     // Update single page
//     let page = pageStore.pages.find(p => p.id === id)
//         page.status = statusObj
// 
//     pageStore.update([id], {
//       status: statusObj.title
//     })
//   }
// }
</script>
