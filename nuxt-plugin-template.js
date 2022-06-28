import Vue from 'vue'
import { 
  Dataset as DatasetOriginal,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow
} from 'vue-dataset'

const Dataset = {
  extends: DatasetOriginal,
  data() {
    return {
      // Provide the translated texts here
      datasetI18n: {
        show: 'Mostrar',
        entries: 'registros',
        previous: 'Anterior',
        next: 'Próximo',
        showing: 'Mostrando',
        showingTo: 'para',
        showingOf: 'de',
        showingEntries: 'registros',
      },
    }
  }
}

Vue.component('Dataset', Dataset)
Vue.component('DatasetItem', DatasetItem)
Vue.component('DatasetInfo', DatasetInfo)
Vue.component('DatasetPager', DatasetPager)
Vue.component('DatasetSearch', DatasetSearch)
Vue.component('DatasetShow', DatasetShow)