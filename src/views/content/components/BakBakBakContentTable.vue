<template>
  <!-- <table class="table table--expanded width-100% text-unit-em text-sm js-table" aria-label="Table Example">
    <thead class="table__header table__header--sticky">
      <tr class="table__row">
        <th class="table__cell text-left" scope="col">
          <div class="custom-checkbox int-table__checkbox">
            <input @click="pageStore.selectAllPages()" :checked="pageStore.selected.length == pageStore.pages.length"  class="custom-checkbox__input" type="checkbox"/>
            <div class="custom-checkbox__control"></div>
          </div>
        </th>
        <th class="table__cell text-left" scope="col">Title</th>
        <th class="table__cell text-left" scope="col">Category</th>
        <th class="table__cell text-left" scope="col">Status</th>
        <th class="table__cell text-left" scope="col"></th>
      </tr>
    </thead>
  </table> -->
  
  <table class="table table--expanded width-100% border radius-lg" aria-label="Table Example">
    <thead class="table__header table__header--sticky">
      <tr class="table__row">
        <th class="table__cell text-left" scope="col">
          <div class="custom-checkbox int-table__checkbox">
            <input class="custom-checkbox__input" type="checkbox">
            <div class="custom-checkbox__control"></div>
          </div>
        </th>
        
        <th class="table__cell text-left" scope="col">
          <div contenteditable="" spellcheck="false" class="app-inline-editor width-fit">Parent</div>
        </th>
        
        <th class="table__cell text-left" scope="col">
          <span class="inline-block bg-contrast-low bg-opacity-20% radius-full padding-y-xxxs padding-x-xs text-xs ws-nowrap cursor-pointer">Homepage</span>
        </th>
        
        <th class="table__cell text-left" scope="col">
          <div class="btns inline-flex text-xs">
            <button class="btns__btn--selected btns__btn">Needs review</button>
            <button class="btns__btn">Looks good</button>
            <button class="btns__btn">Not sure</button>
          </div>
        </th>
        
        <th class="table__cell text-left" scope="col">
          <button class="btn btn--sm btn--icon float-right">
            <svg class="icon--xs icon fill-current color-contrast-medium color-opacity-60%" viewBox="0 0 16 16"><g><path d="M2,6v8c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V6H2z"></path><path d="M12,3V1c0-0.6-0.4-1-1-1H5C4.4,0,4,0.4,4,1v2H0v2h16V3H12z M10,3H6V2h4V3z"></path></g></svg>
          </button>
        </th>
      </tr>
    </thead>
    
    <tbody class="table__body">
      <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
      <!-- Child 1 -->
      <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
      <tr class="table__row">
        <td class="table__cell text-left" scope="col">
          <div class="custom-checkbox int-table__checkbox">
            <input class="custom-checkbox__input" type="checkbox">
            <div class="custom-checkbox__control"></div>
          </div>
        </td>
        
        <td class="table__cell text-left" scope="col">
          <div contenteditable="" spellcheck="false" class="app-inline-editor width-fit">Parent</div>
        </td>
        
        <td class="table__cell text-left" scope="col">
          <span class="inline-block bg-contrast-low bg-opacity-20% radius-full padding-y-xxxs padding-x-xs text-xs ws-nowrap cursor-pointer">Homepage</span>
        </td>
        
        <td class="table__cell text-left" scope="col">
          <div class="btns inline-flex text-xs">
            <button class="btns__btn--selected btns__btn">Needs review</button>
            <button class="btns__btn">Looks good</button>
            <button class="btns__btn">Not sure</button>
          </div>
        </td>
        
        <td class="table__cell text-left" scope="col">
          <button class="btn btn--sm btn--icon float-right">
            <svg class="icon--xs icon fill-current color-contrast-medium color-opacity-60%" viewBox="0 0 16 16"><g><path d="M2,6v8c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V6H2z"></path><path d="M12,3V1c0-0.6-0.4-1-1-1H5C4.4,0,4,0.4,4,1v2H0v2h16V3H12z M10,3H6V2h4V3z"></path></g></svg>
          </button>
        </td>
      </tr>
      
      <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
      <!-- Child 2 -->
      <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
      <tr class="table__row">
        <td class="table__cell text-left" scope="col">
          <div class="custom-checkbox int-table__checkbox">
            <input class="custom-checkbox__input" type="checkbox">
            <div class="custom-checkbox__control"></div>
          </div>
        </td>
        
        <td class="table__cell text-left" scope="col">
          <div contenteditable="" spellcheck="false" class="app-inline-editor width-fit">Parent</div>
        </td>
        
        <td class="table__cell text-left" scope="col">
          <span class="inline-block bg-contrast-low bg-opacity-20% radius-full padding-y-xxxs padding-x-xs text-xs ws-nowrap cursor-pointer">Homepage</span>
        </td>
        
        <td class="table__cell text-left" scope="col">
          <div class="btns inline-flex text-xs">
            <button class="btns__btn--selected btns__btn">Needs review</button>
            <button class="btns__btn">Looks good</button>
            <button class="btns__btn">Not sure</button>
          </div>
        </td>
        
        <td class="table__cell text-left" scope="col">
          <button class="btn btn--sm btn--icon float-right">
            <svg class="icon--xs icon fill-current color-contrast-medium color-opacity-60%" viewBox="0 0 16 16"><g><path d="M2,6v8c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V6H2z"></path><path d="M12,3V1c0-0.6-0.4-1-1-1H5C4.4,0,4,0.4,4,1v2H0v2h16V3H12z M10,3H6V2h4V3z"></path></g></svg>
          </button>
        </td>
      </tr>
      
      <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
      <!-- Child 3 -->
      <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
      <tr class="table__row">
        <td class="table__cell text-left" scope="col">
          <div class="custom-checkbox int-table__checkbox">
            <input class="custom-checkbox__input" type="checkbox">
            <div class="custom-checkbox__control"></div>
          </div>
        </td>
        
        <td class="table__cell text-left" scope="col">
          <div contenteditable="" spellcheck="false" class="app-inline-editor width-fit">Parent</div>
        </td>
        
        <td class="table__cell text-left" scope="col">
          <span class="inline-block bg-contrast-low bg-opacity-20% radius-full padding-y-xxxs padding-x-xs text-xs ws-nowrap cursor-pointer">Homepage</span>
        </td>
        
        <td class="table__cell text-left" scope="col">
          <div class="btns inline-flex text-xs">
            <button class="btns__btn--selected btns__btn">Needs review</button>
            <button class="btns__btn">Looks good</button>
            <button class="btns__btn">Not sure</button>
          </div>
        </td>
        
        <td class="table__cell text-left" scope="col">
          <button class="btn btn--sm btn--icon float-right">
            <svg class="icon--xs icon fill-current color-contrast-medium color-opacity-60%" viewBox="0 0 16 16"><g><path d="M2,6v8c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V6H2z"></path><path d="M12,3V1c0-0.6-0.4-1-1-1H5C4.4,0,4,0.4,4,1v2H0v2h16V3H12z M10,3H6V2h4V3z"></path></g></svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
// import Draggable from 'vuedraggable'
import { ref } from 'vue'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import AppInlineEditor from '@/app/components/base/forms/AppInlineEditor.vue'
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
