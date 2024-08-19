import Dataset from '@/Dataset.vue'
import DatasetInfo from '@/DatasetInfo.vue'
import DatasetItem from '@/DatasetItem.vue'
import DatasetPager from '@/DatasetPager.vue'
import DatasetSearch from '@/DatasetSearch.vue'
import DatasetShow from '@/DatasetShow.vue'
import * as index from '@/index.js'

describe('index.js exports', () => {
  it('should export Dataset', () => {
    expect(index.Dataset).toBe(Dataset)
  })

  it('should export DatasetInfo', () => {
    expect(index.DatasetInfo).toBe(DatasetInfo)
  })

  it('should export DatasetItem', () => {
    expect(index.DatasetItem).toBe(DatasetItem)
  })

  it('should export DatasetPager', () => {
    expect(index.DatasetPager).toBe(DatasetPager)
  })

  it('should export DatasetSearch', () => {
    expect(index.DatasetSearch).toBe(DatasetSearch)
  })

  it('should export DatasetShow', () => {
    expect(index.DatasetShow).toBe(DatasetShow)
  })
})
