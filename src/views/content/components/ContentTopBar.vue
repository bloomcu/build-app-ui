<template>
  <div class="content-table__top-bar flex items-center justify-between z-index-2 shadow-xs bg radius-md radius-top-left-0 radius-top-right-0 padding-y-xs padding-x-xs margin-bottom-sm">
    <!-- Left -->
    <div class="flex items-center">
      <!-- Total pages count -->
      <!-- <span class="text-sm">{{ pageStore.pages.length }} page(s)</span> -->
      
      <!-- Deselect -->
      <button v-if="pageStore.selected.length" @click="pageStore.clearSelectedPages()" class="btn btn--xs margin-right-xs">
        <span class="margin-right-xxs">{{ pageStore.selected.length }} selected</span>
        <IconClose size="xxs" class="color-primary"/>
      </button>
      
      <!-- Edit -->
      <!-- <button v-if="pageStore.selected.length" @click="pageStore.toggleContentCategoryModal()" class="flex items-center reset cursor-pointer text-sm margin-right-xs">
        <IconEdit size="xxs" class="color-primary"/>
        <span class="margin-left-xxs">Edit</span>
      </button> -->
    </div>
    
    <!-- Right -->
    <div class="flex items-center">
      <!-- Add new page -->
      <button @click="create()" class="flex items-center reset cursor-pointer text-sm margin-right-md">
        <IconPlus size="xxs" class="color-primary"/>
        <span class="margin-left-xxs">Add Page</span>
      </button>
      
      <!-- Export pages -->
      <button @click="pageStore.toggleContentExportModal()" class="flex items-center reset cursor-pointer text-sm">
        <IconExport size="xxs" class="color-primary"/>
        <span class="margin-left-xxs">Export</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { usePageStore } from '@/domain/pages/store/usePageStore'
import useQuery from '@/app/composables/base/useQuery.js'

import IconClose from '@/app/components/base/icons/IconClose.vue'
import IconEdit from '@/app/components/base/icons/IconEdit.vue'
import IconExport from '@/app/components/base/icons/IconExport.vue'
import IconPlus from '@/app/components/base/icons/IconPlus.vue'

const pageStore = usePageStore()
const { query, set, unset } = useQuery()

function create() {
  pageStore.store({title: 'New page'})
}

function filterArchived() {
  query.value['trashed'] ? unset('trashed') : set('trashed', 'only')
}
</script>

<style lang="scss">
.content-table__top-bar {
  position: sticky;
  top: 0;
  border: 1px solid var(--color-contrast-lower);
  border-top: none;
}
</style>
