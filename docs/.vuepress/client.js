import Dataset from '@/Dataset.vue'
import DatasetInfo from '@/DatasetInfo.vue'
import DatasetItem from '@/DatasetItem.vue'
import DatasetPager from '@/DatasetPager.vue'
import DatasetSearch from '@/DatasetSearch.vue'
import DatasetShow from '@/DatasetShow.vue'
import { defineClientConfig } from '@vuepress/client'
import './styles/styles.scss'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('Dataset', Dataset)
    app.component('DatasetShow', DatasetShow)
    app.component('DatasetSearch', DatasetSearch)
    app.component('DatasetPager', DatasetPager)
    app.component('DatasetItem', DatasetItem)
    app.component('DatasetInfo', DatasetInfo)
  },
  setup() {
    // noop
  },
  rootComponents: []
})
