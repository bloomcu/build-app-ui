<template>
  <LayoutDefault maxWidth="none">
    <div class="flex">
      <aside class="position-relative z-index-1 width-100% padding-y-sm padding-right-md border-right" style="max-width: 280px;">
        <AppNestedMenu v-if="statuses.status" :items="statuses.status" title="status" :selected="query['status']" @selected="filterStatus"/>
        <AppNestedMenu v-if="categories.children" :items="categories.children" title="category" :selected="query['category']" @selected="filterCategory"/>
      </aside>
      
      <main class="position-relative z-index-1 flex-grow height-100vh">
        <div class="padding-left-md">
          <ContentSkeletonLoader v-if="pageStore.isLoading" class="margin-top-sm"/>
          <ul v-else class="list list--border">
            <PageListItem v-for="page in pageStore.pages" :page="page" :key="page.id" class="padding-top-md"/>
          </ul>
        </div>
      </main>
    </div>
  </LayoutDefault>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'
import { usePageStore } from '@/domain/pages/store/usePageStore'
import { useStatusStore } from '@/domain/base/statuses/store/useStatusStore'
import { useCategoryStore } from '@/domain/base/categories/store/useCategoryStore'
import useQuery from '@/app/composables/base/useQuery.js'

import LayoutDefault from '@/app/layouts/LayoutDefault.vue'
import AppNestedMenu from '@/app/components/base/nested-menu/AppNestedMenu.vue'
import ContentSkeletonLoader from '@/views/content/loaders/ContentSkeletonLoader.vue'
import PageListItem from '@/views/content/components/PageListItem.vue'

const auth = useAuthStore()
const pageStore = usePageStore()
const statuses = useStatusStore()
const categories = useCategoryStore()
const route = useRoute()
const { query, set, unset } = useQuery()

function indexPages() {
  pageStore.index({
    'filter[status.slug]': query.value.status,
    'filter[category.slug]': query.value.category,
    'filter[trashed]': query.value.trashed,
  })
}

function filterStatus(value) {
  value ? set('status', value) : unset('status')
}

function filterCategory(value) {
  value ? set('category', value) : unset('category')
}

watch(route, (newValue) => {
  indexPages()
}, { deep: true })

onMounted(() => {
  indexPages()
  statuses.show('page-statuses')
  categories.show('page-categories')
})
</script>
