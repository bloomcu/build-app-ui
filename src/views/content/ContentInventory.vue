<template>
  <LayoutDefault maxWidth="none">
    <div class="flex">
      <aside class="position-relative z-index-1 width-100% padding-y-sm padding-right-md border-right" style="max-width: 280px;">
        <!-- TODO: Move to component -->
        <nav class="nested-menu margin-bottom-md">
            <div class="padding-bottom-sm">
              <span class="text-xs text-uppercase letter-spacing-lg color-primary">Status</span>
            </div>
            
            <ul class="nested-menu__list">
              <!-- All -->
              <li class="nested-menu__item">
                <a @click.prevent="unsetAll()" :class="!query['status'] && !query['trashed'] ? 'nested-menu__link--current' : ''" class="nested-menu__link" href="">
                  <span class="nested-menu__text">All</span>
                </a>
              </li>
              <!-- Statuses -->
              <li v-for="(status, index) in statuses" :key="index" class="nested-menu__item">
                <a @click.prevent="replaceAll('status', status.value)" :class="query['status'] === status.value ? 'nested-menu__link--current' : ''" class="nested-menu__link" href="">
                  <span class="nested-menu__text">{{ status.title }}</span>
                </a>
              </li>
              <!-- Archived -->
              <li class="nested-menu__item">
                <a @click.prevent="replaceAll('trashed', 'only')" :class="query['trashed'] === 'only' ? 'nested-menu__link--current' : ''" class="nested-menu__link" href="">
                  <span class="nested-menu__text">Archived</span>
                </a>
              </li>
            </ul>
        </nav>
      </aside>
      
      <main class="position-relative z-index-1 flex-grow height-100vh">
        <div class="padding-left-md">
          <ContentTopBar/>
          <ContentSkeletonLoader v-if="pageStore.isLoading" class="margin-top-sm"/>
          <ContentPages v-else/>
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
// import { useCategoryStore } from '@/domain/base/categories/store/useCategoryStore'
import useQuery from '@/app/composables/base/useQuery.js'

import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import AppNestedMenu from '@/app/components/base/nested-menu/AppNestedMenu.vue'
import ContentSkeletonLoader from '@/views/content/loaders/ContentSkeletonLoader.vue'
import ContentTopBar from '@/views/content/components/ContentTopBar.vue'
import ContentPages from '@/views/content/components/ContentPages.vue'
// import ContentCategoryModal from '@/views/content/modals/ContentCategoryModal.vue'
import ContentExportModal from '@/views/content/modals/ContentExportModal.vue'

const auth = useAuthStore()
const pageStore = usePageStore()
// const categories = useCategoryStore()
const route = useRoute()
const { query, set, unset, unsetAll, replaceAll, toggle } = useQuery()

const statuses = ref([
  {
    title: 'Needs review',
    value: 'needs-review',
  },
  {
    title: 'Looks good',
    value: 'looks-good',
  },
  {
    title: 'Not sure',
    value: 'not-sure',
  },
])

function filterStatus(status) {
  let { parameter, value } = status.query
  toggle(parameter, value)
}

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
