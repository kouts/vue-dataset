/* eslint-disable no-eval */
import { mount } from '@vue/test-utils'
import Dataset from '@/Dataset.vue'
import users from '../../example-data/users.json'
import { clone, waitNT } from '../../tests/utils.js'

let wrapperComponent, wrapperDataset, wrapperTestComponent

const TestComponent = {
  inject: ['search', 'showEntries', 'setActive', 'datasetI18n', 'rdsPages', 'rdsPage'],
  template: `
    <div>
      <div class="ds-pages">
        {{ dsPages }}
      </div>
      <div class="ds-page">
        {{ dsPage }}
      </div>      
    </div>
  `,
  computed: {
    /* Setup reactive injects */
    dsPages() {
      return this.rdsPages()
    },
    dsPage() {
      return this.rdsPage()
    }
  }
}

beforeEach(function () {
  const WrapperComponent = {
    data: function () {
      return {
        users: users
      }
    },
    template: `
      <dataset :ds-data="users">
        <test-component />
      </dataset>
    `,
    components: {
      Dataset,
      TestComponent
    }
  }

  wrapperComponent = mount(WrapperComponent)
  wrapperDataset = wrapperComponent.findComponent(Dataset)
  wrapperTestComponent = wrapperComponent.findComponent(TestComponent)
})

afterEach(function () {
  wrapperComponent.destroy()
  wrapperDataset.destroy()
  wrapperTestComponent.destroy()
})

describe('Dataset', () => {
  it('renders the dataset container div', () => {
    const div = wrapperDataset.find('div')
    expect(div.exists()).toBe(true)
  })

  it('passes the injected values and renders the slot', async () => {
    const div = wrapperTestComponent.find('div')
    expect(div.exists()).toBe(true)
    const array = eval(div.find('.ds-pages').text())
    expect(array).toEqual([1, 2, 3, '...', 500])
  })

  it('resets the active page when data changes', async () => {
    const newData = clone(users).slice(0, 200)
    const div = wrapperTestComponent.find('div')
    wrapperDataset.vm.setActive(15)
    await waitNT(wrapperDataset.vm)
    await wrapperComponent.setData({ users: newData })
    expect(div.find('.ds-page').text()).toBe('1')
  })
})
