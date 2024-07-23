<template>
  <template v-if="page">
    <li class="">
      <div class="flex">
        <!-- <IconArrowRight size="xxs" v-if="page.parent_id"/> -->
        <div v-if="page.parent_id" class="border-left margin-right-sm"></div>
        <div class="padding-y-xxxs">
          <p class="text-sm">{{ page.title }}</p>
          <p class="text-xs color-contrast-low">{{ page.url }}</p>
        </div>
      </div>
      
      <ul v-if="page.children && page.children.length">
        <PageListItem v-for="child in page.children" :page="child" :key="child.id"/>
      </ul>
    </li>
  </template>
</template>

<script setup>
// import Draggable from 'vuedraggable'
import { ref } from 'vue'
import IconArrowRight from '@/app/components/base/icons/IconArrowRight.vue'
// import AppInlineEditor from '@/app/components/base/forms/AppInlineEditor.vue'
// import IconAngleLeft from '@/app/components/base/icons/IconAngleLeft.vue'
// import IconTrash from '@/app/components/base/icons/IconTrash.vue'

// TODO: Remove
// import { usePageStore } from '@/domain/pages/store/usePageStore'
// const pageStore = usePageStore()

const props = defineProps({
    page: { 
      type: Object
    },
})

// let showChildren = ref(false)
</script>
