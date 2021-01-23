## Basic

Download the repo, extract 
- ```Dataset.min.js``` 
- ```DatasetItem.min.js```
- ```DatasetInfo.min.js```
- ```DatasetPager.min.js```
- ```DatasetSearch.min.js```
- ```DatasetShow.min.js```

out of the ```dist/umd``` folder
and insert them in your page.

``` html
<script type="text/javascript" src="Dataset.min.js"></script>
<script type="text/javascript" src="DatasetItem.min.js"></script>
<script type="text/javascript" src="DatasetInfo.min.js"></script>
<script type="text/javascript" src="DatasetPager.min.js"></script>
<script type="text/javascript" src="DatasetSearch.min.js"></script>
<script type="text/javascript" src="DatasetShow.min.js"></script>
```

## Module System

Install it via npm
```
npm i vue-dataset --save
```
Use the ```import``` statement to include `vue-dataset` components into your bundle.  
You can import each component individually 
``` js
import Dataset from 'vue-dataset/dist/es/Dataset.js';
import DatasetItem from 'vue-dataset/dist/es/DatasetItem.js';
import DatasetInfo from 'vue-dataset/dist/es/DatasetInfo.js';
import DatasetPager from 'vue-dataset/dist/es/DatasetPager.js';
import DatasetSearch from 'vue-dataset/dist/es/DatasetSearch.js';
import DatasetShow from 'vue-dataset/dist/es/DatasetShow.js';
```

or using named imports
```js
import { 
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow
} from 'vue-dataset';
```