<template>
  <AppModal 
    size="lg"
    @closed="pageStore.toggleContentExportModal()" 
    :class="pageStore.contentExportModalOpen ? 'modal--is-visible' : ''"
  >
    <div class="flex justify-between">
      <div>
        <h2 class="text-md margin-bottom-xxs">Export {{ pageStore.pages.length }} page(s)</h2>
      </div>
      
      <div>
        <button @click="exportPages()" class="btn btn--primary">
          <IconExport size="xs" class="color-white"/>
          <span class="margin-left-xxs">Export to CSV</span>
        </button>
      </div>
    </div>
    
    <ul class="list">
      <PageListItem v-for="page in pageStore.pages" :page="page" :key="page.id"/>
    </ul>
  </AppModal>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import AppModal from '@/app/components/base/modals/AppModal.vue'
import ContentSkeletonLoader from '@/views/content/loaders/ContentSkeletonLoader.vue'
import PageListItem from '@/views/content/components/PageListItem.vue'
import IconExport from '@/app/components/base/icons/IconExport.vue'

const route = useRoute()
const pageStore = usePageStore()
const baseURL = import.meta.env.VITE_API_BASE_URL

function exportPages() {
  // pageStore.exportToCSV()
  window.open(`${baseURL}/${route.params.organization}/pages/export/csv`, '_blank')
}
</script>
