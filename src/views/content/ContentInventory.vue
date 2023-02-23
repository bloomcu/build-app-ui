<template>
  <LayoutDefault maxWidth="none">
    <div class="flex">
      <aside class="position-relative z-index-1 width-100% padding-y-sm padding-right-md border-right" style="max-width: 280px;">
        <!-- <AppNestedMenu v-if="statuses.status" :items="statuses.status" title="status" :selected="query['status']" @selected="filterStatus"/> -->
        <AppNestedMenu :items="statuses" title="status" :selected="query['status']" @selected="filterStatus"/>
        
        <!-- <AppNestedMenu v-if="categories.children" :items="categories.children" title="category" :selected="query['category']" @selected="filterCategory"/> -->
      </aside>
      
      <main class="position-relative z-index-1 flex-grow height-100vh">
        <div class="padding-left-md">
          <ContentTableTopBar/>
          <ContentSkeletonLoader v-if="pageStore.isLoading" class="margin-top-sm"/>
          <ContentPages v-else/>
          <!-- <ContentTable v-else/> -->
        </div>
      </main>
      
      <!-- <ContentCategoryModal/> -->
      <ContentExportModal/>
    </div>
  </LayoutDefault>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'
import { usePageStore } from '@/domain/pages/store/usePageStore'
// import { useStatusStore } from '@/domain/base/statuses/store/useStatusStore'
// import { useCategoryStore } from '@/domain/base/categories/store/useCategoryStore'
import useQuery from '@/app/composables/base/useQuery.js'

import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import AppNestedMenu from '@/app/components/base/nested-menu/AppNestedMenu.vue'
import ContentSkeletonLoader from '@/views/content/loaders/ContentSkeletonLoader.vue'
// import ContentTable from '@/views/content/components/ContentTable.vue'
import ContentTableTopBar from '@/views/content/components/ContentTableTopBar.vue'
import ContentPages from '@/views/content/components/ContentPages.vue'
// import ContentCategoryModal from '@/views/content/modals/ContentCategoryModal.vue'
import ContentExportModal from '@/views/content/modals/ContentExportModal.vue'

const auth = useAuthStore()
const pageStore = usePageStore()
// const statuses = useStatusStore()
// const categories = useCategoryStore()
const route = useRoute()
const { query, set, unset } = useQuery()

const statuses = ref([
  {
    title: "Needs review",
    slug: "needs-review",
    children:[]
  },
  {
    title: "Looks good",
    slug: "loogs-good",
    children:[]
  },
  {
    title: "Not sure",
    slug: "not-sure",
    children:[]
  }
])

function filterStatus(value) {
  value ? set('status', value) : unset('status')
}

// function filterCategory(value) {
//   value ? set('category', value) : unset('category')
// }

function indexPages() {
  pageStore.index({
    'filter[status.slug]': query.value.status,
    'filter[category.slug]': query.value.category,
    'filter[trashed]': query.value.trashed,
  })
}

watch(route, (newValue) => {
  indexPages()
}, { deep: true })

onMounted(() => {
  indexPages()
  // statuses.show('page-statuses')
  // categories.show('page-categories')
})
</script>
