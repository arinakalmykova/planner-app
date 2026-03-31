import { mount } from '@vue/test-utils'
import SearchBar from '@/components/SearchBar.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({ components, directives })

describe('SearchBar', () => {
  test('emit при вводе текста', async () => {
    const wrapper = mount(SearchBar, {
      global: { 
        plugins: [vuetify],
        stubs: {
          'v-icon': true,
          'v-text-field': {
            template: '<input @input="$emit(\'update:modelValue\', $event.target.value)" />',
            props: ['modelValue']
          },
        }
      },
      props: { searchQuery: '' }
    })

    const input = wrapper.find('input')
    
    await input.setValue('Paris')
    
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:searchQuery')).toBeTruthy()
    expect(wrapper.emitted('update:searchQuery')[0]).toEqual(['Paris'])
  })
})