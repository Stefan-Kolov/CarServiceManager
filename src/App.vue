<template>
  <div class="dashboard">
    <aside class="sidebar">
      <h2>Auto Service</h2>
      <button @click="currentView = 'cars'">
        <Car class="icon" /> Manage Cars
      </button>
      <button @click="currentView = 'employees'">
        <Users class="icon" /> Manage Employees
      </button>
      <button @click="currentView = 'services'">
        <Wrench class="icon" /> Manage Services
      </button>
      <button @click="currentView = 'schedule'">
        <CalendarCheck class="icon" /> Schedule Service
      </button>
      <button @click="currentView = 'statistics'">
        <BarChart class="icon" /> View Statistics
      </button>
      <button @click="currentView = 'parts'">
        <Package class="icon" /> Manage Parts
      </button>
    </aside>

    <main class="main-content">
      <CarManagement
          v-if="currentView === 'cars'"
          :cars="cars"
          @addCar="addCar"
          @updateCar="updateCar"
          @deleteCar="deleteCar"
          @viewHistory="handleViewHistory"
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
          :selectedCar="selectedCarForHistory"
          @addService="addService"
          @updateService="updateService"
          @deleteService="deleteService"
      />

      <ScheduleManagement
          v-if="currentView === 'schedule'"
          :cars="cars"
      />

      <StatisticsManagement
          v-if="currentView === 'statistics'"
          :services="services"
      />

      <PartsInventory
          v-if="currentView === 'parts'"
      />
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import CarManagement from './components/CarManagement.vue';
import EmployeeManagement from './components/EmployeeManagement.vue';
import ServiceManagement from './components/ServiceManagement.vue';
import ScheduleManagement from './components/ScheduleManagement.vue';
import StatisticsManagement from './components/StatisticsManagement.vue';
import PartsInventory from './components/PartsInventory.vue';
import { Car, Users, Wrench, CalendarCheck, BarChart, Package } from 'lucide-vue-next';

export default {
  name: 'App',
  components: {
    CarManagement,
    EmployeeManagement,
    ServiceManagement,
    StatisticsManagement,
    PartsInventory,
    ScheduleManagement,
  },
  setup() {
    const currentView = ref('cars');
    const selectedCarForHistory = ref(null);
    const scheduledServices = ref([]);

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
      {
        description: 'Brakes Change',
        price: 500,
        car: cars.value[1],
        employee: employees.value[1],
        date: '2025-04-01',
      },
    ]);

    const addCar = (car) => cars.value.push(car);
    const updateCar = (car, index) => cars.value[index] = car;
    const deleteCar = (index) => cars.value.splice(index, 1);

    const addEmployee = (employee) => employees.value.push(employee);
    const updateEmployee = (employee, index) => employees.value[index] = employee;
    const deleteEmployee = (index) => employees.value.splice(index, 1);

    const addService = (service) => services.value.push(service);
    const updateService = (service, index) => services.value[index] = service;
    const deleteService = (index) => services.value.splice(index, 1);



    const handleViewHistory = (car) => {
      selectedCarForHistory.value = car;
      currentView.value = 'services';
    };

    return {
      currentView,
      cars,
      employees,
      services,
      selectedCarForHistory,
      addCar,
      updateCar,
      deleteCar,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      addService,
      updateService,
      deleteService,
      handleViewHistory,
      scheduledServices
    };
  },
};
</script>
