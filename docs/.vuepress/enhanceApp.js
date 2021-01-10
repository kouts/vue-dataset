import Dataset from '../../src/Dataset.vue';
import DatasetSearch from '../../src/DatasetSearch.vue';
import DatasetShow from '../../src/DatasetShow.vue';
import DatasetPager from '../../src/DatasetPager.vue';
import DatasetItem from '../../src/DatasetItem.vue';
import DatasetInfo from '../../src/DatasetInfo.vue';
import SourceView from '../../src/source-view/SourceView.vue';
import './styles/styles.scss';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  if (typeof process === 'undefined') {
    // process is undefined in a browser
    Vue.component('source-view', SourceView);
    Vue.component('dataset', Dataset);
    Vue.component('dataset-show', DatasetShow);
    Vue.component('dataset-search', DatasetSearch);
    Vue.component('dataset-pager', DatasetPager);
    Vue.component('dataset-item', DatasetItem);
    Vue.component('dataset-info', DatasetInfo);
  }
};
