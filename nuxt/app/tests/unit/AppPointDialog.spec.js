import { mount, flushPromises } from '@vue/test-utils'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import AppPointDialog from '@/components/AppPointDialog.vue';

// Мокаем глобальный $fetch
global.$fetch = vi.fn(() => Promise.resolve({ id: 1 }))

// Создаем мок для dispatch через vi.hoisted
const { mockDispatch } = vi.hoisted(() => ({
  mockDispatch: vi.fn(() => Promise.resolve())
}))

// Мокаем store
vi.mock('@/store/store', () => ({
  default: {
    dispatch: mockDispatch,
    state: { routes: [] },
    getters: {},
    commit: vi.fn()
  }
}))

const vuetify = createVuetify({ components, directives })

describe('AppPointDialog', () => {
  let wrapper

  beforeEach(() => {
    mockDispatch.mockClear()
    global.$fetch.mockClear()
    
    wrapper = mount(AppPointDialog, {
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
      props: { modelValue: true, routeId: 1 }
    })
  })

  test('валидирует пустую форму', async () => {
    const saveBtn = wrapper.findAll('button').filter(btn => btn.text().includes('Сохранить'))[0]
    
    if (saveBtn) {
      await saveBtn.trigger('click')
    }
    
    await flushPromises()
    expect(mockDispatch).not.toHaveBeenCalled()
  })

test('создает точку маршрута', async () => {
  wrapper.vm.form.title = 'Point 1'
  wrapper.vm.form.description = 'Desc'
  await wrapper.vm.$nextTick()

  // вызываем метод напрямую
  await wrapper.vm.submit()
  await flushPromises()

  expect(mockDispatch).toHaveBeenCalledWith(
    'addPoint',
    expect.objectContaining({ routeId: 1, formData: expect.any(FormData) })
  )
  expect(wrapper.emitted('saved')).toBeTruthy()
})
})