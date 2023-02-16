<template>
  <div class="">
    <div class="flex flex-row items-center justify-between _padding-left-sm _padding-y-sm" style="height: 45px;">
      <!-- Left -->
      <div class="flex flex-row gap-sm items-center">  
        <!-- Handle -->
        <button class="btn btn--sm btn--icon handle" style="cursor: grab;">
          <svg class="icon icon--xs fill-current color-contrast-medium" viewBox="0 0 24 24">
            <g><path data-color="color-2" d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path> <path d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"></path> <path d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"></path></g>
          </svg>
        </button>
        
        <!-- Toggle -->
        <button v-if="page.children.length" @click="showChildren = !showChildren" class="btn btn--sm btn--icon">
          <IconAngleLeft size="xs" :class="showChildren ? 'rotate-90' : 'rotate-270'" class="color-contrast-medium"/>
        </button>
        
        <!-- Title & URL -->
        <div>
          <AppInlineEditor :id="page.id" @updated="updateTitle" class="width-fit text-sm">
            {{ page.title }}
          </AppInlineEditor>
          
          <a v-if="page.url" :href="page.url" target="_blank" class="page-url text-xs color-contrast-low width-fit">
            {{ page.url }}
          </a>
        </div>
      </div>
      
      <!-- Right dropzone -->
      <div v-if="pageStore.dragging" class="parent-dropzone _margin-left-xxxl _margin-bottom-sm _bg-dark _radius-lg" style="height: 45px;">
        <Draggable 
          :list="page.children" 
          :animation="200"
          :swap-threshold="1"
          :empty-insert-threshold="1"
          :forceFallback="true"
          :preventOnFilter="false"
          @change="handleDragEvent" 
          @start="pageStore.dragging = true"
          @end="pageStore.dragging = false"
          group="pages" 
          ghost-class="ghost"
          handle=".handle"
          item-key="id"
          class="radius-lg"
          style="width: 750px; height: 100%; display: block; background-color: #f3f3f3; border: 1px solid #fff;" 
        >
          <template #item="{element}">
            <div :element="element"></div>
          </template>
        </Draggable>
      </div>
      
      <!-- Right Controls -->
      <div v-else class="flex flex-row gap-md items-center _padding-right-sm">
        <!-- Status -->
        <div v-if="!page.deleted_at" class="btns inline-flex text-xs">
          <button 
            v-for="option in [
             {title: 'Needs review', slug: 'needs-review'},
             {title: 'Looks good', slug: 'looks-good'},
             {title: 'Not sure', slug: 'not-sure'},
            ]" 
            :key="option.slug"
            :class="page.status && page.status.slug === option.slug ? 'btns__btn--selected' : null"
            @click="handleStatusClick(page.id, option)"
            class="btns__btn"
          >
            {{ option.title }}
          </button>
        </div>
        
        <!-- Archive -->
        <div v-if="!page.deleted_at">
          <div v-if="page.children.length" class="btn--icon opacity-0">
            <IconTrash size="xs" class="color-contrast-medium color-opacity-60%"/>
          </div>
          <button v-else @click="destroy(page.id)" class="btn btn--sm btn--icon">
            <IconTrash size="xs" class="color-contrast-medium color-opacity-60%"/>
          </button>
        </div>
        
        <!-- Restore -->
        <div v-if="page.deleted_at">
          <button @click="restore(page.id)" class="btn btn--sm btn--icon">
            <!-- TODO: Make this an app icon -->
            <svg class="icon icon--xs fill-current color-contrast-medium color-opacity-60%" viewBox="0 0 16 16">
              <g><path data-color="color-2" d="M2.765,9.692a1,1,0,0,0-1.9.616,7.469,7.469,0,0,0,.716,1.567,1,1,0,1,0,1.711-1.034A5.517,5.517,0,0,1,2.765,9.692Z"></path><path data-color="color-2" d="M7.91,13.5a5.455,5.455,0,0,1-2.3-.545,1,1,0,1,0-.871,1.8,7.438,7.438,0,0,0,3.141.745H7.9a1,1,0,0,0,.015-2Z"></path><path data-color="color-2" d="M14,10.7a1,1,0,0,0-1.383.294,5.568,5.568,0,0,1-1.686,1.662A1,1,0,1,0,12,14.348a7.562,7.562,0,0,0,2.3-2.265A1,1,0,0,0,14,10.7Z"></path><path d="M8,.5A7.511,7.511,0,0,0,3.923,1.713L2.436.155a.5.5,0,0,0-.849.234L.263,6.194a.5.5,0,0,0,.487.612A.486.486,0,0,0,.842,6.8L6.673,5.712a.5.5,0,0,0,.269-.837l-1.6-1.681A5.49,5.49,0,0,1,13.5,8a1,1,0,0,0,2,0A7.508,7.508,0,0,0,8,.5Z"></path></g>
            </svg>
          </button>
        </div>
        
        <!-- Checkbox -->
        <div class="custom-checkbox">
          <input 
            @click.self="pageStore.selectPage(page.id, $event)" 
            :checked="pageStore.selected.includes(page.id)" 
            class="custom-checkbox__input" 
            type="checkbox"
          />
          <div class="custom-checkbox__control"></div>
        </div>
      </div>
    </div>
    
    <div v-if="page.children && showChildren" class="margin-left-lg">
      <Draggable 
        :list="page.children" 
        :animation="200"
        :swap-threshold="1"
        :empty-insert-threshold="1"
        :forceFallback="true"
        :preventOnFilter="false"
        @change="handleDragEvent" 
        @start="pageStore.dragging = true"
        @end="pageStore.dragging = false"
        group="pages" 
        ghost-class="ghost"
        handle=".handle"
        item-key="id"
      >
        <template #item="{element}">
          <PageParent :page="element" class="_border-left border-top _border-bottom _radius-lg _radius-top-right-0 _radius-bottom-right-0 _margin-bottom-xs"/>
        </template>
      </Draggable>
    </div>
  </div>
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
    page: { 
      type: Object
    },
})

const showChildren = ref(false)

function recursiveUpdateTitle(page, id, title) {
  if (page.id === id) {
    page.title = title
  } else if (page.children.length) {
    page.children.forEach((child) => {
      recursiveUpdateTitle(child, id, title)
    })
  }
}

function updateTitle(id, title) {
  pageStore.update([id], {title: title})
  
  // Update all selected pages in store
  // Optimize this by reducing down to only selected
  // Optimize by flattening pages array
  pageStore.pages.forEach((page) => {
    recursiveUpdateTitle(page, id, title)
  })
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

function handleDragEvent(event) {
  if (event.moved) {
    console.log('moved')
    // console.log(event)
    
    pageStore.updateNesting({
      id: event.moved.element.id,
      parent_id: props.page.id,
      order: event.moved.newIndex,
    })
  }
  
  if (event.added) {
    console.log('added')
    // console.log(event)
    
    pageStore.updateNesting({
      id: event.added.element.id,
      parent_id: props.page.id,
      order: event.added.newIndex,
    })
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

<style lang="scss">
.ghost {
  opacity: 0.3;
  border: none;
  background: #000;
  // width: 20px;
  // height: 20px;
  // border-radius: 200px;
  
  .page-url,
  .parent-dropzone {
    display: none;
  }
}
</style>
