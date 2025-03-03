<template>
  <div>
    <h1>Manage Services</h1>
    <ul>
      <li v-for="service in services" :key="service.id">
        {{ service.description }} - {{ service.price }} - {{ service.date }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      services: [],
    };
  },
  mounted() {
    this.fetchServices();
  },
  methods: {
    async fetchServices() {
      try {
        const response = await fetch('http://localhost:8080/api/services');
        const data = await response.json();
        this.services = data;
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },
  },
};
</script>
