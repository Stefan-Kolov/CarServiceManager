import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import { createStore } from 'vuex'; // If using Vuex
import './assets/main.css'
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

// Use the store and router
app.use(store);
app.use(router);

app.mount('#app');
