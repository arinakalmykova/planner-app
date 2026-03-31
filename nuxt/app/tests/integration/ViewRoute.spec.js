import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store/store";
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import ViewRoute from '@/pages/view-route/[id].vue'

const vuetify = createVuetify({ components, directives })

global.$fetch = vi.fn(() => Promise.resolve([]))
global.alert = vi.fn()

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRoute: vi.fn(),
    useRouter: vi.fn(() => ({ back: vi.fn(), push: vi.fn() }))
  }
})
import { useRoute } from 'vue-router'

const mockRouteData = {
  id: 1774868990163,
  title: 'Paris',
  description: 'Trip',
  points: [{ id: 10, title: 'Eiffel', description: 'Tower', image: null }],
  coverImage: null
}

describe('ViewRoute', () => {
  let router
  let mockUseRoute

  beforeEach(() => {
  vi.clearAllMocks();
  store.replaceState({
    routes: [mockRouteData]
  });

  router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/view-route/:id', component: ViewRoute }
    ]
  });

  mockUseRoute = vi.mocked(useRoute)
  mockUseRoute.mockReturnValue({ params: { id: '1774868990163' } });
    vi.spyOn(store, 'dispatch');
});

  // Wrapper с Vuetify
  const createWrapper = async () => {
    const wrapper = mount(ViewRoute, {
      global: {
        plugins: [store, router, vuetify],
        stubs: {
          'client-only': { template: '<div><slot /></div>' },
          AppPointDialog: true,
          'v-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>' },
          'v-container': { template: '<div><slot /></div>' },
          'v-icon': { template: '<i><slot /></i>' },
          'v-text-field': { template: '<input />' },
          'v-textarea': { template: '<textarea></textarea>' },
          VForm: true
        }
      }
    })

    await flushPromises()
    await nextTick()
    return wrapper
  }

  test('рендерит маршрут и его точки', async () => {
    const wrapper = await createWrapper()
    wrapper.vm.routeCopy = JSON.parse(JSON.stringify(mockRouteData))
    await nextTick()

    const text = wrapper.text()
    expect(text).toContain('Paris')
    expect(text).toContain('Trip')
    expect(text).toContain('Eiffel')
    expect(text).toContain('Tower')
  })

  test('сохраняет маршрут', async () => {
    const wrapper = await createWrapper()
    wrapper.vm.routeCopy = JSON.parse(JSON.stringify(mockRouteData))
    wrapper.vm.editingRoute = true
    await nextTick()

    wrapper.vm.routeCopy.title = 'Updated Paris'
    wrapper.vm.routeCopy.description = 'Updated description'
    await nextTick()

    await wrapper.vm.saveRoute()
    await flushPromises()

    expect(store.dispatch).toHaveBeenCalledWith(
      'updateRoute',
      expect.objectContaining({
        routeId: 1774868990163,
        route: expect.objectContaining({
          title: 'Updated Paris',
          description: 'Updated description'
        })
      })
    )
  })

  test('удаляет точку', async () => {
    const wrapper = await createWrapper()
    wrapper.vm.routeCopy = JSON.parse(JSON.stringify(mockRouteData))
    await nextTick()

    await wrapper.vm.deletePoint(10)
    await flushPromises()

    expect(store.dispatch).toHaveBeenCalledWith(
      'deletePoint',
      { routeId: 1774868990163, pointId: 10 }
    )
  })
})