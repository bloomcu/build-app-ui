import assets from '@/views/assets/routes/index.js'
import briefs from '@/views/briefs/routes/index.js'
import content from '@/views/content/routes/index.js'
import crawls from '@/views/crawls/routes/index.js'
import dashboard from '@/views/dashboard/routes/index.js'
import designs from '@/views/designs/routes/index.js'
import redirects from '@/views/redirects/routes/index.js'

const routes = [
  ...assets,
  ...briefs,
  ...content,
  ...crawls,
  ...dashboard,
  ...designs,
  ...redirects,
]

export default routes
