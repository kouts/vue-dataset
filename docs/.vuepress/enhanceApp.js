import Dataset from '../../src/Dataset.vue';
import DatasetSearch from '../../src/DatasetSearch.vue';
import DatasetShow from '../../src/DatasetShow.vue';
import DatasetPager from '../../src/DatasetPager.vue';
import DatasetDiv from '../../src/DatasetDiv.vue';
import DatasetInfo from '../../src/DatasetInfo.vue';
import './styles/styles.scss';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  if (typeof process === 'undefined') {
    // process is undefined in a browser
    Vue.component('dataset', Dataset);
    Vue.component('dataset-show', DatasetShow);
    Vue.component('dataset-search', DatasetSearch);
    Vue.component('dataset-pager', DatasetPager);
    Vue.component('dataset-div', DatasetDiv);
    Vue.component('dataset-info', DatasetInfo);
  }
};
