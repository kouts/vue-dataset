import SourceView from './SourceView.vue';

export default ({ Vue }) => {
  const options = JSON.parse(SOURCE_VIEW_OPTIONS);
  Vue.component('source-view', SourceView);
};
