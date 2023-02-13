<template>
  <template v-if="page">
    <li>
      {{ page.title }}
      
      <ul v-if="page.children.length">
        <PageListItem v-for="child in page.children" :page="child" :key="child.id"/>
      </ul>
    </li>
  </template>
</template>

<script setup>
import Draggable from 'vuedraggable'
import { ref } from 'vue'
import AppInlineEditor from '@/app/components/base/forms/AppInlineEditor.vue'
import IconAngleLeft from '@/app/components/base/icons/IconAngleLeft.vue'
import IconTrash from '@/app/components/base/icons/IconTrash.vue'

// TODO: Remove
// import { usePageStore } from '@/domain/pages/store/usePageStore'
// const pageStore = usePageStore()

const props = defineProps({
    page: { 
      type: Object
    },
})

let showChildren = ref(false)
</script>
