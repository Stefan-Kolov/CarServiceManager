import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        cars: [],
        employees: [],
        services: [],
    },
    mutations: {
        setCars(state, cars) {
            state.cars = cars;
        },
        setEmployees(state, employees) {
            state.employees = employees;
        },
        setServices(state, services) {
            state.services = services;
        },
    },
    actions: {
        async fetchCars({ commit }) {
            const response = await fetch('/api/cars');
            const cars = await response.json();
            commit('setCars', cars);
        },
        async fetchEmployees({ commit }) {
            const response = await fetch('/api/employees');
            const employees = await response.json();
            commit('setEmployees', employees);
        },
        async fetchServices({ commit }) {
            const response = await fetch('/api/services');
            const services = await response.json();
            commit('setServices', services);
        },
        async createCar({ commit }, car) {
            const response = await fetch('/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(car),
            });
            const newCar = await response.json();
            commit('setCars', [...this.state.cars, newCar]);
        },
        async createEmployee({ commit }, employee) {
            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee),
            });
            const newEmployee = await response.json();
            commit('setEmployees', [...this.state.employees, newEmployee]);
        },
        async createService({ commit }, service) {
            const response = await fetch('/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service),
            });
            const newService = await response.json();
            commit('setServices', [...this.state.services, newService]);
        },
    },
});
