import { mount } from "@vue/test-utils"
import { describe, test, expect } from "vitest"
import Home from "@/pages/index.vue"
import store from "@/store/store"
import SearchBar from "@/components/SearchBar.vue"
import RouteCard from "@/components/RouteCard.vue"

describe("Home page", () => {
  test("фильтрация маршрутов", async () => {
    // Подготовка данных
    store.state.routes = [
      { id: 1, title: "Paris", description: "Trip to Paris" },
      { id: 2, title: "London", description: "Trip to London" },
    ]

    // Монтируем компонент
    const wrapper = mount(Home, {
      global: {
        plugins: [store],
        components: { SearchBar, RouteCard },
      },
    })

    const searchBar = wrapper.findComponent(SearchBar)
    await searchBar.vm.$emit('update:modelValue', 'Paris')
    await wrapper.vm.$nextTick()

    const routeList = wrapper.findComponent({ name: 'RouteList' })
    const searchList = routeList.findAllComponents(RouteCard);
    const titles = searchList.map(c => c.props('route').title)

    expect(titles).toContain("Paris")
    expect(titles).not.toContain("London")

    expect(searchList.length).toBe(1)
  })
})