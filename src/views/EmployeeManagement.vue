<template>
  <div>
    <h1>Manage Employees</h1>
    <ul>
      <li v-for="employee in employees" :key="employee.id">
        {{ employee.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [],
    };
  },
  mounted() {
    this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await fetch('http://localhost:8080/api/employees');
        const data = await response.json();
        this.employees = data;
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },
  },
};
</script>
