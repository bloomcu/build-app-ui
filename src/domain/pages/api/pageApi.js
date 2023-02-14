import { httpClient as HttpClient } from '@/app/api/base/httpClient'

const pageApi = {
    /**
     * List pages
     *
     * @param String organization [Organization slug]
     * @param Object params [Key/value params to query by]
     * @return promise
     */
    index(organization, params) {
        return HttpClient.get(`/${organization}/pages`, { params: params })
    },
    
    /**
     * Store a page
     *
     * @param String organization [Organization slug]
     * @param Object page [Properties to create page from]
     * @return promise
     */
    store(organization, page) {
        return HttpClient.post(`/${organization}/pages`, page)
    },
    
    /**
     * Show a page
     *
     * @param String organization [Organization slug]
     * @param Integer id [Page id]
     * @return promise
     */
    show(organization, id) {
      return HttpClient.get(`/${organization}/pages/${id}`)
    },
    
    /**
     * Update page(s)
     *
     * @param String organization [Organization slug]
     * @param Integer ids [Page ids]
     * @param Object properties [Properties to update page with]
     * @return promise
     */
    update(organization, ids, properties) {
      return HttpClient.put(`/${organization}/pages`, {
        ids: ids,
        ...properties
      })
    },
    
    /**
     * Destroy a page
     *
     * @param String organization [Organization slug]
     * @param Integer ids [Page ids]
     * @return promise
     */
    destroy(organization, ids) {
        return HttpClient.post(`/${organization}/pages/destroy`, {ids: ids})
    },
    
    /**
     * Restore a page
     *
     * @param String organization [Organization slug]
     * @param Integer ids [Page ids]
     * @return promise
     */
    restore(organization, ids) {
        return HttpClient.post(`/${organization}/pages/restore`, {ids: ids})
    },
    
    /**
     * Update page parent
     *
     * @param String organization [Organization slug]
     * @param Integer id [Page id]
     * @param Integer parent_id [Parent page id in which page was placed]
     * @param Integer order [Order in which page was placed]
     * @return promise
     */
    // updateNesting(organization, id, parent_id, order = null) {
    updateNesting(organization, id, parent_id, order) {
      return HttpClient.put(`/${organization}/pages/${id}/nesting`, {
        parent_id: parent_id,
        order: order,
      })
    },
}

export { pageApi }
