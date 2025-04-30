import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import { createStore } from 'vuex'; // If using Vuex
import './assets/main.css'
import * as lucideIcons from 'lucide-vue-next';


// Define your Vuex store (if applicable)
const store = createStore({
    state() {
        return {
            // your state
        };
    },
    mutations: {
        // your mutations
    },
});

const app = createApp(App);

for (const [key, component] of Object.entries(lucideIcons)) {
    app.component(key, component);
}

// Use the store and router
app.use(store);
app.use(router);

app.mount('#app');
