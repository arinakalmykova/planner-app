import { mount } from '@vue/test-utils'
import RouteList from '@/components/RouteList.vue'

describe('RouteList', () => {
  const routes = [
    { id: 1, title: 'Paris', description: 'Trip' },
    { id: 2, title: 'Rome', description: 'Italy' }
  ]

  test('рендерит список карточек', () => {
    const wrapper = mount(RouteList, {
      props: { routes }
    })

    const cards = wrapper.findAllComponents({ name: 'RouteCard' })
    expect(cards.length).toBe(2)
  })
})