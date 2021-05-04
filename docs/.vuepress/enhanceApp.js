import Dataset from '../../src/Dataset.vue'
import DatasetSearch from '../../src/DatasetSearch.vue'
import DatasetShow from '../../src/DatasetShow.vue'
import DatasetPager from '../../src/DatasetPager.vue'
import DatasetItem from '../../src/DatasetItem.vue'
import DatasetInfo from '../../src/DatasetInfo.vue'
import './styles/styles.scss'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  if (typeof process === 'undefined') {
    // process is undefined in a browser
    Vue.component('Dataset', Dataset)
    Vue.component('DatasetShow', DatasetShow)
    Vue.component('DatasetSearch', DatasetSearch)
    Vue.component('DatasetPager', DatasetPager)
    Vue.component('DatasetItem', DatasetItem)
    Vue.component('DatasetInfo', DatasetInfo)
  }
}
