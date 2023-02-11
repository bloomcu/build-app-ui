<template>
  <div class="">
    <div class="flex flex-row items-center justify-between padding-left-sm padding-y-sm">
      <!-- Left -->
      <div class="flex flex-row gap-sm items-center">  
        <!-- Toggle -->
        <button v-if="page.children.length" @click="showChildren = !showChildren" class="btn btn--sm btn--icon">
          <IconAngleLeft size="xs" :class="showChildren ? 'rotate-90' : 'rotate-270'" class="color-contrast-medium"/>
        </button>
        
        <!-- Title & URL -->
        <div>
          <AppInlineEditor :id="page.id" @updated="updateTitle" class="width-fit text-base">
            {{ page.title }}
          </AppInlineEditor>
          
          <a v-if="page.url" :href="page.url" target="_blank" class="text-xs color-contrast-low width-fit">{{ page.url }}</a>
        </div>
      </div>
      
      <!-- Right -->
      <div class="flex flex-row gap-md items-center padding-right-sm">
        <!-- Category -->
        <span @click="handleCategoryClick(page.id)" class="inline-block bg-contrast-low bg-opacity-20% radius-full padding-y-xxxs padding-x-xs text-xs ws-nowrap cursor-pointer">
          {{ page.category.title }}
        </span>
        
        <!-- Status -->
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
        
        <!-- Archive -->
        <button @click="destroy(page.id)" class="btn btn--sm btn--icon">
          <IconTrash size="xs" class="color-contrast-medium color-opacity-60%"/>
        </button>
        
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
    
    <!-- <div v-if="page.children.length" class="padding-left-xs margin-left-xs"> -->
    <div v-if="page.children.length && showChildren" class="margin-left-sm">
      <!-- <PageParent v-for="child in page.children" :key="child.id" :page="child" class="border-top border-left"/> -->
      <PageParent v-for="child in page.children" :key="child.id" :page="child" class="border-left border-top border-bottom radius-lg radius-top-right-0 radius-bottom-right-0 margin-bottom-xs"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppInlineEditor from '@/app/components/base/forms/AppInlineEditor.vue'
import IconAngleLeft from '@/app/components/base/icons/IconAngleLeft.vue'
import IconTrash from '@/app/components/base/icons/IconTrash.vue'

const props = defineProps({
    page: { 
      type: Object
    },
})

let showChildren = ref(false)

// TODO: Remove
import { usePageStore } from '@/domain/pages/store/usePageStore'

const pageStore = usePageStore()

function updateTitle(id, title) {
  console.log('update title', id, title)
}

function handleCategoryClick(id) {
  console.log('category click', id)
}

function handleStatusClick(id, option) {
  console.log('status click', id, option)
}

function destroy(id) {
  console.log('destroying', id)
}
</script>
