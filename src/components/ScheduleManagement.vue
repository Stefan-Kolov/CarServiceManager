<template>
  <div class="schedule-management">
    <h2>Schedule Service</h2>

    <vue3-datepicker
        v-model="selectedDate"
        format="yyyy-MM-dd"
        :disable-date="disableDates"
        placeholder="Pick a date"
    />

    <div v-if="selectedDate" class="service-form">
      <h3>Schedule a Service for {{ selectedDate }}</h3>

      <select v-model="selectedService" required>
        <option disabled value="">Select Service</option>
        <option v-for="service in services" :key="service.id" :value="service">
          {{ service.name }} - ${{ service.price }}
        </option>
      </select>

      <select v-model="selectedEmployee" required>
        <option disabled value="">Select Employee</option>
        <option v-for="employee in employees" :key="employee.name" :value="employee">
          {{ employee.name }}
        </option>
      </select>

      <button @click="scheduleService" class="action-button">Schedule Service</button>
    </div>

    <div v-if="scheduledServices.length > 0">
      <h3>Scheduled Services</h3>
      <ul>
        <li v-for="(service, index) in scheduledServices" :key="index">
          {{ service.date }} - {{ service.service.name }} - Assigned to: {{ service.employee.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue3Datepicker from 'vue3-datepicker';

export default {
  name: 'ScheduleManagement',
  components: {
    Vue3Datepicker,
  },
  data() {
    return {
      selectedDate: null,
      selectedService: null,
      selectedEmployee: null,
      services: [
        { id: 1, name: 'Oil Change', price: 50 },
        { id: 2, name: 'Tire Rotation', price: 30 },
        { id: 3, name: 'Brake Inspection', price: 70 },
      ],
      employees: [
        { name: 'Stefan' },
        { name: 'Andrej' },
        { name: 'John' },
      ],
      scheduledServices: [],
      disableDates: (date) => date < new Date(),
    };
  },
  methods: {
    scheduleService() {
      if (this.selectedDate && this.selectedService && this.selectedEmployee) {
        this.scheduledServices.push({
          date: this.selectedDate,
          service: this.selectedService,
          employee: this.selectedEmployee,
        });

        this.selectedDate = null;
        this.selectedService = null;
        this.selectedEmployee = null;
      } else {
        alert('Please fill in all fields.');
      }
    },
  },
};
</script>

<style scoped>
.schedule-management {
  padding: 20px;
}

.service-form {
  margin-top: 20px;
}

.action-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.action-button:hover {
  background-color: #45a049;
}
</style>
