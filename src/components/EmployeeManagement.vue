<template>
  <div>
    <h2>Manage Employees</h2>
    <form @submit.prevent="addEmployee">
      <input v-model="newEmployee.name" placeholder="Employee Name" />
      <button type="submit">Add Employee</button>
    </form>

    <ul>
      <li v-for="(employee, index) in employees" :key="index">
        {{ employee.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'EmployeeManagement',
  props: ['employees'],
  data() {
    return {
      newEmployee: {
        name: '',
      },
    };
  },
  methods: {
    addEmployee() {
      this.$emit('addEmployee', { ...this.newEmployee });
      this.newEmployee = { name: '' };
    },
  },
};
</script>
