---
pageClass: dataset-page
---

# vue-dataset <a href="https://npm.im/vue-dataset"><img src="https://badgen.net/npm/v/vue-dataset/next" /></a> ![](https://img.badgesize.io/kouts/vue-dataset/next/dist/vue-dataset.umd.js) ![](https://img.badgesize.io/kouts/vue-dataset/next/dist/vue-dataset.umd.js.svg?compression=gzip) ![](../coverage/badge-next.svg)

A set of Vue.js 3 components to display datasets (lists) with filtering, paging, and sorting capabilities!  
Created with reusability in mind, so that one doesn't have to recreate the same functionality for lists over and over again.

> vue-dataset does not impose any structure or layout limitations on your HTML, you can use divs, tables or anything you like to present your data.

## Features

- Highly customizable DOM structure
- Custom filtering based on the row values from all or specific data keys
- "Search as" feature allows for searching using a custom search method
- Multi "column" searching, search data keys are configurable
- "Sort as" feature allows for sorting using a custom sorting method
- Multi "column" sorting, sortable data keys are configurable
- Pagination
- Global search with debounce setting
- Easy to extend with custom components


`vue-dataset` contains 6 components

| Component      | Description |
| ----------- | ----------- |
| `dataset`      | Responsible for distributing data/methods to children (wrapper/data provider)       |
| `dataset-item`   | Renders the dataset items        |
| `dataset-info`   | Renders the paging information        |
| `dataset-pager`   | Renders the paging buttons        |
| `dataset-search`   | Renders the search input field        |
| `dataset-show`   | Renders the "items per page" dropdown select        |

<h2 class="mb-4">Example using cards</h2>

<vue-example file="Example1" />