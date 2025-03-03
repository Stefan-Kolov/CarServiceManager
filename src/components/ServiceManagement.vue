<template>
  <div>
    <h2>Manage Services</h2>
    <form @submit.prevent="addService">
      <input v-model="newService.description" placeholder="Description" />
      <input v-model="newService.price" type="number" placeholder="Price" />

      <!-- Car dropdown -->
      <select v-model="newService.car">
        <option v-for="(car, index) in cars" :key="index" :value="car">
          {{ car.model }} ({{ car.brand }})
        </option>
      </select>

      <!-- Employee dropdown -->
      <select v-model="newService.employee">
        <option v-for="(employee, index) in employees" :key="index" :value="employee">
          {{ employee.name }}
        </option>
      </select>

      <input v-model="newService.date" type="date" />
      <button type="submit">Add Service</button>
    </form>

    <ul>
      <li v-for="(service, index) in services" :key="index">
        {{ service.description }} - {{ service.price }} ({{ service.car.model }}, {{ service.employee.name }})
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ServiceManagement',
  props: ['cars', 'employees'],
  data() {
    return {
      newService: {
        description: '',
        price: '',
        car: null,
        employee: null,
        date: '',
      },
      services: [],
    };
  },
  methods: {
    addService() {
      if (this.newService.description && this.newService.price && this.newService.car && this.newService.employee && this.newService.date) {
        this.services.push({ ...this.newService });
        this.newService = { description: '', price: '', car: null, employee: null, date: '' };
      }
    },
  },
};
</script>
