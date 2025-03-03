<template>
  <div id="app">
    <h1>Auto Service Management</h1>

    <nav>
      <button @click="currentView = 'cars'">Manage Cars</button>
      <button @click="currentView = 'employees'">Manage Employees</button>
      <button @click="currentView = 'services'">Manage Services</button>
    </nav>

    <div v-if="currentView === 'cars'">
      <CarManagement :cars="cars" @addCar="addCar" />
    </div>

    <div v-if="currentView === 'employees'">
      <EmployeeManagement :employees="employees" @addEmployee="addEmployee" />
    </div>

    <div v-if="currentView === 'services'">
      <ServiceManagement :cars="cars" :employees="employees" />
    </div>
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

    // Preloaded data for cars and employees
    const cars = ref([
      { brand: 'Seat', year: 2009, engine: '1.4', model: 'Ibiza', vin: '111' },
      { brand: 'Seat', year: 2009, engine: '1.4', model: 'Leon', vin: '112' },
      { brand: 'BMW', year: 2018, engine: '2.0', model: 'X5', vin: '113' },
    ]);

    const employees = ref([
      { name: 'Stefan' },
      { name: 'Andrej' },
      { name: 'John' },
    ]);

    const addCar = (car) => {
      cars.value.push(car);
    };

    const addEmployee = (employee) => {
      employees.value.push(employee);
    };

    return {
      currentView,
      cars,
      employees,
      addCar,
      addEmployee,
    };
  },
};
</script>
