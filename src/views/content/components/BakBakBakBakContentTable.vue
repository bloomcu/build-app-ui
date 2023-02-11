<template>
  <div>
    
    <div 
      v-for="page in pageStore.pages"
      :key="page.id"
      class="flex flex-row gap-sm items-center border radius-lg shadow-sm padding-xs"
    >
      <!-- Checkbox -->
      <div>
        <div class="custom-checkbox int-table__checkbox">
          <input 
            @click.self="pageStore.selectPage(page.id, $event)" 
            :checked="pageStore.selected.includes(page.id)" 
            class="custom-checkbox__input" 
            type="checkbox"
          />
          <div class="custom-checkbox__control"></div>
        </div>
      </div>
      
      <!-- Title & URL -->
      <div>
        <AppInlineEditor 
          :id="page.id" 
          @updated="updateTitle" 
          class="width-fit"
        >
          {{ page.title }}
        </AppInlineEditor>
        
        <a v-if="page.url" :href="page.url" target="_blank" class="text-xs color-contrast-low width-fit">{{ page.url }}</a>
      </div>
      
      <!-- Category -->
      <div>
        <!-- TODO: Either use the AppChip, or delete it and create a chip class in app css -->
        <span @click="handleCategoryClick(page.id)" class="inline-block bg-contrast-low bg-opacity-20% radius-full padding-y-xxxs padding-x-xs text-xs ws-nowrap cursor-pointer">
          {{ page.category.title }}
        </span>
      </div>
      
      <!-- Status -->
      <div>
        <div class="btns inline-flex text-xs">
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
      </div>
      
      <!-- Archive -->
      <div>
        <button @click="destroy(page.id)" class="btn btn--sm btn--icon">
          <IconTrash size="xs" class="color-contrast-medium color-opacity-60%"/>
        </button>
      </div>
      
      <!-- Toggle -->
      <div>
        <button class="btn btn--sm btn--icon">
          <IconPlus size="xs" class="color-contrast-medium rotate-180"/>
        </button>
      </div>
    </div>
    
  </div>
</template>

<script setup>
// import Draggable from 'vuedraggable'
import { ref } from 'vue'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import AppInlineEditor from '@/app/components/base/forms/AppInlineEditor.vue'
import IconPlus from '@/app/components/base/icons/IconPlus.vue'
import IconTrash from '@/app/components/base/icons/IconTrash.vue'

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
