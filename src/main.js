import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createStore } from 'vuex';
import './assets/main.css'
import * as lucideIcons from 'lucide-vue-next';

const store = createStore({
    state() {
        return {

        };
    },
    mutations: {

    },
});

const app = createApp(App);

for (const [key, component] of Object.entries(lucideIcons)) {
    app.component(key, component);
}

app.use(store);
app.use(router);

app.mount('#app');
