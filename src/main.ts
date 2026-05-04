import { createApp } from 'vue';
import '@/style.css';
import App from '@/App.vue';
import { router } from '@/router';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { queryClient } from '@/lib/query-client.ts';

const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin, { queryClient }); // register Tanstack query
app.mount('#app');
