/* eslint-disable no-eval */
import { mount } from '@vue/test-utils'
import Dataset from '@/Dataset.vue'
import users from '../../example-data/users.json'
import { clone, waitNT } from '../../tests/utils.js'

let wrapperComponent, wrapperDataset, wrapperTestComponent

const TestComponent = {
  inject: ['search', 'showEntries', 'setActive', 'datasetI18n', 'rdsPages', 'rdsPage', 'rdsPagecount'],
  template: `
    <div>
      <div class="ds-pages">
        {{ dsPages }}
      </div>
      <div class="ds-page">
        {{ dsPage }}
      </div>
      <div class="ds-pagecount">
        {{ dsPagecount }}
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
    },
    dsPagecount() {
      return this.rdsPagecount()
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
    const array = eval(wrapperTestComponent.find('.ds-pages').text())
    expect(array).toEqual([1, 2, 3, '...', 500])
  })

  it('resets the active page when data changes', async () => {
    const newUsers = clone(users).slice(0, 200)
    wrapperDataset.vm.setActive(15)
    await waitNT(wrapperDataset.vm)
    await wrapperComponent.setData({ users: newUsers })
    expect(wrapperTestComponent.find('.ds-page').text()).toBe('1')
  })

  it('splits the into the corrent number of pages', async () => {
    const newUsers = clone(users).slice(0, 301)
    await wrapperComponent.setData({ users: newUsers })
    expect(wrapperTestComponent.find('.ds-pagecount').text()).toBe('31')
  })
})
