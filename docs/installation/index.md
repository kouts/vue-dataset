## Using module bundlers

Most likely you are using a module bundler like [Webpack](https://webpack.js.org/), which makes it easy to directly include `vue-dataset` into your project.  

Install `vue-dataset` via npm
```
npm install vue-dataset --save
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

<div class="mb-4"></div>

Most of the times you'd want to use the **named imports** when using a module bundler, but there are standalone versions of the components available, which you can import individually as well.

``` js
import Dataset from 'vue-dataset/dist/es/Dataset.js'
import DatasetItem from 'vue-dataset/dist/es/DatasetItem.js'
import DatasetInfo from 'vue-dataset/dist/es/DatasetInfo.js'
import DatasetPager from 'vue-dataset/dist/es/DatasetPager.js'
import DatasetSearch from 'vue-dataset/dist/es/DatasetSearch.js'
import DatasetShow from 'vue-dataset/dist/es/DatasetShow.js'
```

## Using a script tag

UMD files suitable for including `vue-dataset` using a `script` tag into your page, are located inside the `dist/umd` folder.

``` html
<script type="text/javascript" src="VueDataset.min.js"></script>
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

You can also include specific components

``` html
<script type="text/javascript" src="Dataset.min.js"></script>
<script type="text/javascript" src="DatasetItem.min.js"></script>
<script type="text/javascript" src="DatasetInfo.min.js"></script>
<script type="text/javascript" src="DatasetPager.min.js"></script>
<script type="text/javascript" src="DatasetSearch.min.js"></script>
<script type="text/javascript" src="DatasetShow.min.js"></script>
```

These can then be registered with
```js
Vue.component('Dataset', Dataset)
Vue.component('DatasetItem', DatasetItem)
Vue.component('DatasetInfo', DatasetInfo)
Vue.component('DatasetPager', DatasetPager)
Vue.component('DatasetSearch', DatasetSearch)
Vue.component('DatasetShow', DatasetShow)`
```
