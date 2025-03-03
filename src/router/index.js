import { createRouter, createWebHistory } from 'vue-router';
import CarManagement from '@/views/CarManagement.vue';
import EmployeeManagement from '@/views/EmployeeManagement.vue';
import ServiceManagement from '@/views/ServiceManagement.vue';

const routes = [
    {
        path: '/',
        name: 'CarManagement',
        component: CarManagement,
    },
    {
        path: '/employees',
        name: 'EmployeeManagement',
        component: EmployeeManagement,
    },
    {
        path: '/services',
        name: 'ServiceManagement',
        component: ServiceManagement,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
