import { vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

// Мокаем CSS файлы
vi.mock('*.css', () => {
  return {
    default: {},
    __esModule: true,
  }
});

vi.mock('*.scss', () => {
  return {
    default: {},
    __esModule: true,
  }
});

// Мокаем Vuetify компоненты если нужно
vi.mock('vuetify', () => {
  return {
    createVuetify: vi.fn(() => ({})),
    VApp: { template: '<div><slot /></div>' },
    VBtn: { template: '<button><slot /></button>' },
    VIcon: { template: '<i><slot /></i>' },
    VTextField: { template: '<input />' },
    VTextarea: { template: '<textarea></textarea>' },
    VContainer: { template: '<div><slot /></div>' },
    VDialog: { template: '<div v-if="modelValue"><slot /></div>' },
    VCard: { template: '<div><slot /></div>' },
    VCardTitle: { template: '<div><slot /></div>' },
    VCardText: { template: '<div><slot /></div>' },
    VCardActions: { template: '<div><slot /></div>' },
    VRow: { template: '<div><slot /></div>' },
    VCol: { template: '<div><slot /></div>' },
    VFileInput: { template: '<input type="file" />' },
    VProgressCircular: { template: '<div>Loading...</div>' },
    default: {
      install: (app) => {
        app.component('VApp', { template: '<div><slot /></div>' })
        app.component('VBtn', { template: '<button><slot /></button>' })
        app.component('VIcon', { template: '<i><slot /></i>' })
        app.component('VTextField', { template: '<input />' })
        app.component('VTextarea', { template: '<textarea></textarea>' })
        app.component('VContainer', { template: '<div><slot /></div>' })
        app.component('VDialog', { template: '<div v-if="modelValue"><slot /></div>' })
        app.component('VCard', { template: '<div><slot /></div>' })
        app.component('VCardTitle', { template: '<div><slot /></div>' })
        app.component('VCardText', { template: '<div><slot /></div>' })
        app.component('VCardActions', { template: '<div><slot /></div>' })
        app.component('VRow', { template: '<div><slot /></div>' })
        app.component('VCol', { template: '<div><slot /></div>' })
        app.component('VFileInput', { template: '<input type="file" />' })
        app.component('VProgressCircular', { template: '<div>Loading...</div>' })
      }
    }
  }
});