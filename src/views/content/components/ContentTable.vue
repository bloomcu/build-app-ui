<template>
  <div v-if="pageStore.pages">
    <ContentPages :pages="pageStore.parents"/>
    
    <!-- <Draggable 
      :list="sorted" 
      :animation="200"
      :swap-threshold="1"
      :empty-insert-threshold="1"
      :forceFallback="true"
      :preventOnFilter="false"
      @change="handleDragEvent"
      @start="pageStore.dragging = true"
      @end="pageStore.dragging = false"
      group="pages" 
      ghost-class="ghost"
      handle=".handle"
      class="flex flex-column align-middle"
      item-key="id"
    >
      <template #item="{element}">
        <PageParent 
          :page="element" 
          class="_border _radius-md _shadow-sm _border-bottom _margin-bottom-xs"
          style="box-shadow:0px 1px 0px #e1e1e1;"
        />
      </template>
    </Draggable> -->
  </div>
</template>

<script setup>
// import Draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import { usePageStore } from '@/domain/pages/store/usePageStore'
// import PageParent from '@/views/content/components/PageParent.vue'
import ContentPages from '@/views/content/components/ContentPages.vue'

const pageStore = usePageStore()
// const isHighlighting = ref(false)

let drag = ref(true)

let sortedParents = computed(() => {
  return props.pages.sort((a, b) => a.order - b.order );
})

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

let sorted = computed(() => {
  return pageStore.pages.sort(dynamicSort('order'))
})

function recursiveUpdateOrder(page, id, order) {
  if (page.id === id) {
    page.order = order
  } else if (page.children.length) {
    page.children.forEach((child) => {
      recursiveUpdateOrder(child, id, order)
    })
  }
}

function handleDragEvent(event) {
  if (event.moved) {
    pageStore.updateNesting({
      id: event.moved.element.id,
      // parent_id: null,
      order: event.moved.newIndex,
    })
    
    pageStore.pages.forEach((page) => {
      recursiveUpdateOrder(page, event.moved.element.id, event.moved.newIndex)
    })
  }
  
  if (event.added) {
    pageStore.updateNesting({
      id: event.added.element.id,
      // parent_id: null,
      order: event.added.newIndex,
    })
    
    pageStore.pages.forEach((page) => {
      recursiveUpdateOrder(page, event.added.element.id, event.added.newIndex)
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

<style lang="scss">
.ghost {
  // opacity: 0.5;
  border: none;
  background: #ede8fe;
}
</style>
