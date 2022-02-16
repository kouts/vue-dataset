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
const app = Vue.createApp({...})

app.component('Dataset', VueDataset.Dataset)
app.component('DatasetItem', VueDataset.DatasetItem)
app.component('DatasetInfo', VueDataset.DatasetInfo)
app.component('DatasetPager', VueDataset.DatasetPager)
app.component('DatasetSearch', VueDataset.DatasetSearch)
app.component('DatasetShow', VueDataset.DatasetShow)`
```

## Translations
It's possible to customize the texts of `vue-dataset` by extending the `Dataset` component using the following pattern.

```js
import { Dataset } from 'vue-dataset'

export default {
  ...Dataset,
  provide() {
    return {
      // Provide the translated texts here
      datasetI18n: {
        show: 'Show',
        entries: 'entries',
        previous: 'Previous',
        next: 'Next',
        showing: 'Showing',
        showingTo: 'to',
        showingOf: 'of',
        showingEntries: 'entries'
      }
    }
  }
}
```
