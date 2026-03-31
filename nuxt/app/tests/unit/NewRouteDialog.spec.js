import { mount, flushPromises } from '@vue/test-utils'
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import NewRouteDialog from '@/components/NewRouteDialog.vue'

const { mockDispatch } = vi.hoisted(() => ({
  mockDispatch: vi.fn()
}))

vi.mock('@/store/store', () => ({
  default: {
    dispatch: mockDispatch,
    state: { routes: [] },
    getters: {},
    commit: vi.fn()
  }
}))

const vuetify = createVuetify({ components, directives })

describe('NewRouteDialog', () => {
  let wrapper

  beforeEach(() => {
    mockDispatch.mockClear()
    
    wrapper = mount(NewRouteDialog, {
      global: {
        plugins: [vuetify],
        stubs: {
          'client-only': { template: '<div><slot /></div>' },
          'v-icon': true,
          'v-btn': {
            template: '<button @click="$emit(\'click\')"><slot /></button>',
            props: ['color', 'small']
          },
          'v-text-field': {
            template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
            props: ['modelValue', 'label', 'required']
          },
          'v-textarea': {
            template: '<textarea :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
            props: ['modelValue', 'label', 'required']
          },
          'v-file-input': {
            template: '<input type="file" @change="$emit(\'change\', $event)" />',
            props: ['label', 'accept']
          },
          'v-card': { template: '<div><slot /></div>' },
          'v-card-title': { template: '<div><slot /></div>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-card-actions': { template: '<div><slot /></div>' },
          'v-spacer': { template: '<div></div>' },
          'v-dialog': {
            template: '<div v-if="modelValue"><slot /></div>',
            props: ['modelValue']
          }
        }
      },
      props: { modelValue: true }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test('не отправляет форму если поля пустые', async () => {
    const saveBtn = wrapper.findAll('button').filter(btn => btn.text().includes('Сохранить'))[0]
    
    if (saveBtn) {
      await saveBtn.trigger('click')
    }
    
    await flushPromises()

    expect(mockDispatch).not.toHaveBeenCalled()
  })

  test('отправляет форму и вызывает emit', async () => {
  const vm = wrapper.vm
  vm.form.title = 'Paris'
  vm.form.description = 'Trip'
  await wrapper.vm.$nextTick()

  await vm.submitForm()
  await flushPromises()

  expect(mockDispatch).toHaveBeenCalledTimes(1)
  expect(mockDispatch).toHaveBeenCalledWith('createRoute', expect.any(FormData))
  expect(wrapper.emitted('saved')).toBeTruthy()
})
})