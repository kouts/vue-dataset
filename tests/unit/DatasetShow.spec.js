import DatasetShow from '@/DatasetShow.vue'
import datasetI18n from '@/i18n/en.js'
import { ref } from 'vue'
import { shallowMount } from '@vue/test-utils'

const mockShowEntries = jest.fn()

describe('DatasetShow', () => {
  const wrapper = shallowMount(DatasetShow, {
    global: {
      provide: {
        datasetI18n: ref(datasetI18n),
        showEntries: function (value) {
          mockShowEntries(value)
        }
      }
    }
  })

  it('renders a select element', () => {
    const select = wrapper.find('select.form-control')

    expect(select.exists()).toBe(true)
  })

  it('passes the correct value to the injected search method', () => {
    mockShowEntries.mockClear()
    const select = wrapper.find('select.form-control')

    select.setValue('25')
    expect(mockShowEntries.mock.calls[0][0]).toBe(25)
  })
})
