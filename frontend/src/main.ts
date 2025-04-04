import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router.ts'
import 'vuetify'
import { createVuetify } from 'vuetify';
import 'vuetify/styles/main.css';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })

createApp(App).use(vuetify).use(router).mount('#app')
