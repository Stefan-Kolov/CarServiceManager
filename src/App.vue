<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>Auto Service</h2>
      <button @click="currentView = 'cars'">Manage Cars</button>
      <button @click="currentView = 'employees'">Manage Employees</button>
      <button @click="currentView = 'services'">Manage Services</button>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <CarManagement
          v-if="currentView === 'cars'"
          :cars="cars"
          @addCar="addCar"
          @updateCar="updateCar"
          @deleteCar="deleteCar"
      />

      <EmployeeManagement
          v-if="currentView === 'employees'"
          :employees="employees"
          @addEmployee="addEmployee"
          @updateEmployee="updateEmployee"
          @deleteEmployee="deleteEmployee"
      />

      <ServiceManagement
          v-if="currentView === 'services'"
          :cars="cars"
          :employees="employees"
          :services="services"
          @addService="addService"
          @updateService="updateService"
          @deleteService="deleteService"
      />
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import CarManagement from './components/CarManagement.vue';
import EmployeeManagement from './components/EmployeeManagement.vue';
import ServiceManagement from './components/ServiceManagement.vue';

export default {
  name: 'App',
  components: {
    CarManagement,
    EmployeeManagement,
    ServiceManagement,
  },
  setup() {
    const currentView = ref('cars');

    const cars = ref([
      { brand: 'Porsche', year: 2020, engine: '4.0', model: 'GT3 RS', vin: '111' },
      { brand: 'Ferrari', year: 2021, engine: '4.8', model: '458', vin: '112' },
      { brand: 'BMW', year: 2018, engine: '4.4', model: 'M5', vin: '113' },
    ]);

    const employees = ref([
      { name: 'Stefan' },
      { name: 'Andrej' },
      { name: 'John' },
    ]);

    const services = ref([
      {
        description: 'Oil Change',
        price: 200,
        car: cars.value[0],
        employee: employees.value[0],
        date: '2025-04-01',
      },
    ]);

    const addCar = (car) => {
      cars.value.push(car);
    };

    const updateCar = (car, index) => {
      cars.value[index] = car;
    };

    const deleteCar = (index) => {
      cars.value.splice(index, 1);
    };

    const addEmployee = (employee) => {
      employees.value.push(employee);
    };

    const updateEmployee = (employee, index) => {
      employees.value[index] = employee;
    };

    const deleteEmployee = (index) => {
      employees.value.splice(index, 1);
    };

    const addService = (service) => {
      services.value.push(service);
    };

    const updateService = (service, index) => {
      services.value[index] = service;
    };

    const deleteService = (index) => {
      services.value.splice(index, 1);
    };

    return {
      currentView,
      cars,
      employees,
      services,
      addCar,
      updateCar,
      deleteCar,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      addService,
      updateService,
      deleteService,
    };
  },
};
</script>
