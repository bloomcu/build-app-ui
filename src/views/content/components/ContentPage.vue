<template>
  <div>
    <div class="flex flex-row items-center justify-between _padding-left-sm" style="height: 55px;">
      <!-- Left -->
      <div class="flex flex-row gap-sm items-center">
        <!-- Handle -->
        <button class="btn btn--sm btn--icon draggable-handle" style="cursor: grab;">
          <svg class="icon icon--xs fill-current color-contrast-medium" viewBox="0 0 24 24">
            <g><path data-color="color-2" d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path> <path d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"></path> <path d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"></path></g>
          </svg>
        </button>
        
        <!-- Toggle -->
        <button v-if="page.children.length" @click="pageStore.toggleParent(page.id)" class="btn btn--sm btn--icon">
          <IconAngleLeft size="xs" :class="pageStore.toggled.includes(page.id) ? 'rotate-90' : 'rotate-270'" class="color-contrast-medium"/>
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
      <div v-if="pageStore.dragging" class="parent-dropzone" style="height: 55px;">
        <VueDraggableNext 
          :list="page.children" 
          :group="{ name: 'pages' }" 
          :swap-threshold=".5"
          :empty-insert-threshold="1"
          @change="handleDragEvent"
          ghost-class="draggable-ghost"
          drag-class="draggable-drag"
          class="radius-lg"
          style="width: 750px; display: block;  height: 55px; background-color: #f3f3f3; border: 1px solid #fff;"
        >
          
        </VueDraggableNext>
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
            @click="updateStatus(page.id, option)"
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
    
    <!-- Recursive children -->
    <div v-if="page.children.length && pageStore.toggled.includes(page.id)" class="margin-left-lg">
      <VueDraggableNext 
        :list="page.children" 
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
          v-for="child in page.children"
          :key="child.id"
          :page="child"
        />
      </VueDraggableNext>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import AppInlineEditor from '@/app/components/base/forms/AppInlineEditor.vue'
import IconAngleLeft from '@/app/components/base/icons/IconAngleLeft.vue'
import IconTrash from '@/app/components/base/icons/IconTrash.vue'

const props = defineProps({
    page: { 
      type: Object,
      required: true
    },
})

const pageStore = usePageStore()

const showChildren = ref(false)

// TODO: Move to composable
// TODO: Optimize so it does not iterate over array more than once
function findById(array, id) {
  console.log('finding...')
  let result;
  array.some(o => o.id === id && (result = o) || (result = findById(o.children, id || [])));
  return result;
}

// TODO: Move to composable
// function findByCondition(array, condition) {
//     if (array.length === 0) {
//         return [];
//     }
//     const [head, ...tail] = array;
//     if (condition(head)) {
//         return [head, ...findByCondition(tail, condition)];
//     }
//     return findByCondition(tail, condition);
// }

// TODO: Move to composable
// Update multiple attributes in object
// function setAttributes(el, attrs) {
//   for(var key in attrs) {
//     el.setAttribute(key, attrs[key]);
//   }
// }

function updateTitle(id, title) {
  let page = findById(pageStore.pages, id)
      page.title = title

  pageStore.update([id], {title: title})
}

function updateUrl(id, url) {
  let page = findById(pageStore.pages, id)
      page.url = url
  
  pageStore.update([id], {url: url})
}

function updateStatus(id, status) {
  // Select page
  pageStore.selectPage(id)
  
  // Update selected page(s) in store
  pageStore.selected.forEach(id => {
    let page = findById(pageStore.pages, id)
        page.status = status
  })

  // Update selected pages in db
  pageStore.update(pageStore.selected, {
    status: status.slug
  })
  
  // Reset selected page(s)
  pageStore.selected = []
}

function destroy(id) {
  // Select page
  pageStore.selectPage(id)
  
  // Archive selected pages in db
  pageStore.destroy(pageStore.selected)
  
  // Archive selected pages in store
  pageStore.pages = pageStore.pages.filter((p) => !pageStore.selected.includes(p.id)) // remove resources
  
  // Reset selected
  pageStore.selected = []
}

function restore(id) {
  // Select this page
  pageStore.selectPage(id)
  
  // Archive selected pages in db
  pageStore.restore(pageStore.selected)
  
  // Restore selected pages in store
  pageStore.pages = pageStore.pages.filter((p) => !pageStore.selected.includes(p.id)) // restore resources
  
  // Reset selected
  pageStore.selected = []
}

function handleDragEvent(event) {
  let e = event.moved || event.added
  
  if (e) {
    pageStore.updateNesting({
      id: e.element.id,
      parent_id: props.page.id,
      order: e.newIndex,
    })
  }
}
</script>
