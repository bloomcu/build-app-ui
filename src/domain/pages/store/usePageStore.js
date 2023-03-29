import { defineStore, acceptHMRUpdate } from 'pinia'
import { pageApi as PageApi } from '@/domain/pages/api/pageApi'
import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'

export const usePageStore = defineStore('pageStore', {
  state: () => ({
    pages: [],
    page: {},
    selected: [],
    toggled: [],
    lastSelected: null,
    contentCategoryModalOpen: false,
    contentExportModalOpen: false,
    isLoading: false,
    dragging: false, // TODO: Remove
  }),
  
  getters: {
    parents: (state) => {
      return state.pages.filter((page) => {
        return page.parent_id == null
      })
    },
    
    children: (state) => {
      return parentId => state.pages.filter((page) => {
        return page.parent_id === parentId
      })
    }
  },

  actions: {
    index(params) {
      const auth = useAuthStore()
      this.isLoading = true

      PageApi.index(auth.organization, params)
        .then(response => {
          this.pages = response.data.data
          this.isLoading = false
        }).catch(error => {
          console.log('Error', error.response.data)
        })
    },

    async store(page) {
      const auth = useAuthStore()

      await PageApi.store(auth.organization, page)
        .then(response => {
          this.pages.unshift(response.data.data)
        }).catch(error => {
          return Promise.reject(error)
        })
    },

    show(id) {
      const auth = useAuthStore()
      this.isLoading = true

      PageApi.show(auth.organization, id)
        .then(response => {
          this.page = response.data.data
          this.isLoading = false
        }).catch(error => {
          console.log('Error', error.response.data)
        })
    },
    
    async update(ids, properties) {
      const auth = useAuthStore()
      
      await PageApi.update(auth.organization, ids, properties)
        .then(response => {
          console.log(ids.length + ' page(s) updated')
          // this.selected = []
        })
        
      // TODO: Catch error and re-index pages if error
    },

    async destroy(ids) {
      const auth = useAuthStore()
      
      await PageApi.destroy(auth.organization, ids)
        .then(response => {
          console.log(ids.length + ' page(s) deleted')
          // this.pages = this.pages.filter((p) => !ids.includes(p.id)) // remove resources
        })
        
      // TODO: Catch error and re-index pages if error
      // try {
      //   const response = await PageApi.destroy(auth.organization, id)
      //   console.log('Page deleted')
      // } catch (error) {
      //   this.pages.unshift(page) // restore resource
      //   console.log('Error', error.response.data)
      // }
    },
    
    async restore(ids) {
      const auth = useAuthStore()
      
      await PageApi.restore(auth.organization, ids)
        .then(response => {
          console.log(ids.length + ' page(s) restored')
        })
    },
    
    async updateNesting({id, parent_id, order} = {}) {
      const auth = useAuthStore()
      console.log(order)
      // Update order in database
      await PageApi.updateNesting(auth.organization, id, parent_id, order)
        .then(response => {
          console.log(response.data);
          // console.log('Page nesting successfully updated')
          this.selected = []
        })
    },

    selectPage(id, event = null) {
      // Check is this page selected already
      let index = this.selected.indexOf(id)
          // if it is not selected, then select it
          index === -1 ? this.selected.push(id) : ''

      // Handle multiselect
      if (event && event.shiftKey) {
        if (this.lastSelected == null) {
          this.lastSelected = id
          return;
        }
      
        // Get array of all page id's
        let pageIds = this.pages.map((page) => page.id)
      
        // Get selection range
        let from = pageIds.indexOf(id)
        let to = pageIds.indexOf(this.lastSelected)
      
        // Setup the range of our selection
        let range = [to, from].sort()
      
        // Slice our selection from source array
        let selection = pageIds.slice(...range)
      
        // Add selection to destination array
        this.selected = [...new Set([...this.selected, ...selection])];
      
        this.lastSelected = null
      }
      
      this.lastSelected = id
    },
    
    selectAllPages() {
      this.selected.length == this.pages.length ? this.selected = [] : this.selected = this.pages.map((page) => page.id)
    },

    clearSelectedPages() {
      this.selected = []
    },
    
    toggleParent(id) {
      // Check is this page toggled already
      let index = this.toggled.indexOf(id)
          // if it is not toggled, then toggle it
          index === -1 ? this.toggled.push(id) : this.toggled.splice(index, 1)
    },
    
    toggleContentCategoryModal() {
      this.contentCategoryModalOpen = !this.contentCategoryModalOpen
    },
    
    toggleContentExportModal() {
      this.contentExportModalOpen = !this.contentExportModalOpen
    },
  }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
