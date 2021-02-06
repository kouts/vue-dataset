A set of Vue.js components to display datasets and lists with filtering, paging and sorting capabilities!  
It is created in order to solve the problem of recreating the same functionality for lists over and over again.

> vue-dataset does not impose any structure or layout limitations, you can use divs, tables or anything you like to present your data.

## Features

- Custom filtering based on the row values from all or specific data keys
- "Search as" feature allows for searching using a custom method
- Global search with debounce setting
- Multi "column" sorting, sortable data keys are configurable
- "Sort as" feature allows for sorting using custom sorting method
- Pagination
- Pagination Information
- Highly customizable DOM structure
- Easy to extend with custom components


`vue-dataset` contains 6 components
- `dataset` &rarr; The wrapper/data provider component
- `dataset-item` &rarr; The item row component
- `dataset-info` &rarr; Displays paging information
- `dataset-pager` &rarr; Renders the paging buttons
- `dataset-search` &rarr; Renders the search input field
- `dataset-show` &rarr; Renders number of visible results select 
## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

Documentation and examples
https://vue-dataset-demo.netlify.app/

# Development

In order to start development:

```sh
npm i
npm run watch
```