import ContentInventory from '@/views/content/ContentInventory.vue'
import ContentSitemap from '@/views/content/ContentSitemap.vue'

export default [
  {
    path: "/:organization/content",
    name: "content",
    component: ContentInventory,
  },
  {
    path: "/:organization/content/sitemap",
    name: "sitemap",
    component: ContentSitemap,
  },
]
