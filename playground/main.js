import App from './App.vue'
import Default from './layouts/default/Default.vue'
import { createApp } from 'vue'
import { router } from './router'
import { store } from './store'

import Dataset from '@/Dataset.vue'
import DatasetInfo from '@/DatasetInfo.vue'
import DatasetItem from '@/DatasetItem.vue'
import DatasetPager from '@/DatasetPager.vue'
import DatasetSearch from '@/DatasetSearch.vue'
import DatasetShow from '@/DatasetShow.vue'

const app = createApp(App)

app.component('LayoutDefault', Default)

app.component('Dataset', Dataset)
app.component('DatasetInfo', DatasetInfo)
app.component('DatasetItem', DatasetItem)
app.component('DatasetPager', DatasetPager)
app.component('DatasetSearch', DatasetSearch)
app.component('DatasetShow', DatasetShow)

app.use(store)
app.use(router)
app.mount('#app')
