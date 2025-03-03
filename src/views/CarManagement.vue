<template>
  <div>
    <h1>Manage Cars</h1>
    <ul>
      <li v-for="car in cars" :key="car.id">
        {{ car.brand }} - {{ car.model }} ({{ car.year }})
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cars: [],
    };
  },
  mounted() {
    this.fetchCars();
  },
  methods: {
    async fetchCars() {
      try {
        const response = await axios.get('http://localhost:8080/api/cars');
        this.cars = response.data;
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    },
  },
};
</script>
