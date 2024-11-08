import { defineStore, acceptHMRUpdate } from 'pinia'
import { siteApi as SiteApi } from '@/domain/base/sites/api/siteApi'

import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'
import moment from "moment-timezone"

export const useSiteStore = defineStore('siteStore', {
    state: () => ({
        sites: null,
        site: null,
        isLoading: true,
        createModalOpen: false,
    }),
    
    getters: {
      launch: (state) => state.site.launch_info,
      mountainTime: (state) => moment.tz(state.site.launch_info.launch_date, "America/Denver")
    },
    
    actions: {
        index(params) {
          const auth = useAuthStore()
          this.isLoading = true
          this.sites = null
          
          SiteApi.index(auth.organization, params)
            .then(response => {
              this.sites = response.data.data
              this.isLoading = false
            }).catch(error => {
              console.log('Error', error.response.data)
            })
        },
        
        async store(site) {
          const auth = useAuthStore()
          this.isLoading = true
          
          await SiteApi.store(auth.organization, site)
            .then(response => {
              this.sites.push(response.data.data)
            }).catch(error => {
              console.log('Error', error.response.data)
            })
        },
        
        show(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          SiteApi.show(auth.organization, id)
            .then(response => {
              this.site = response.data.data
              this.isLoading = false
            })
        },
        
        update() {
          const auth = useAuthStore()
          this.isLoading = true
          
          SiteApi.update(auth.organization, this.site.id, this.site)
            .then(response => {
              console.log('Site successfully updated')
              this.isLoading = false
            })
        },
        
        destroy(id) {
          const auth = useAuthStore()
          this.isLoading = true
          
          SiteApi.destroy(auth.organization, id)
            .then(response => {
              this.sites = this.sites.filter((site) => site.id !== id)
              this.isLoading = false
            })
        },
        
        toggleCreateModal() {
          this.createModalOpen = !this.createModalOpen
        },
    }
})

/**
 * Enable hot reload on store updates
 * https://pinia.vuejs.org/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSiteStore, import.meta.hot))
}
