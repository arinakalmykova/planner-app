import { mount } from "@vue/test-utils";
import RouteCard from "@/components/RouteCard.vue";
import store from "@/store/store";
import { createRouter, createWebHistory } from "vue-router";
import { describe, test, expect, vi } from 'vitest'

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe("RouterCard", () => {
  const route = { id: 1, title: "Paris", description: "Trip to Paris" };

  test("рендерит карточку маршрута", () => {
    const wrapper = mount(RouteCard, {
      props: { route },
      global: { plugins: [router, store] },
    });

    expect(wrapper.text()).toContain("Paris");
    expect(wrapper.text()).toContain("Trip to Paris");
  });

  test("клик по карточке вызывает роут", async () => {
    router.push = vi.fn();
    const wrapper = mount(RouteCard, {
      props: { route },
      global: { plugins: [router, store] },
    });
    await wrapper.trigger('click');
    expect(router.push).toHaveBeenCalledWith('/view-route/1');
  });
});
