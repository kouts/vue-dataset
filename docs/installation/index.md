## Using module bundlers

Most likely you are using a module bundler like [Webpack](https://webpack.js.org/), which makes it easy to directly include `vue-dataset` into your project.  

Install `vue-dataset@next` via npm
```
npm install vue-dataset@next --save
```

Use the ```import``` statement to include the `vue-dataset` components into your bundle.  

```js
import { 
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow
} from 'vue-dataset'
```

## Using a script tag

A `vue-dataset.umd.js` file suitable for including `vue-dataset` using a `script` tag into your page, is resides inside the `dist` folder.

``` html
<script type="text/javascript" src="vue-dataset.umd.js"></script>
```

This will expose a global `VueDataset` object that contains all the `vue-dataset` components.  
You can then register them globally e.g.

```js
Vue.component('Dataset', VueDataset.Dataset)
Vue.component('DatasetItem', VueDataset.DatasetItem)
Vue.component('DatasetInfo', VueDataset.DatasetInfo)
Vue.component('DatasetPager', VueDataset.DatasetPager)
Vue.component('DatasetSearch', VueDataset.DatasetSearch)
Vue.component('DatasetShow', VueDataset.DatasetShow)`
```
