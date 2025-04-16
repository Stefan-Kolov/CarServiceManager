<template>
  <div class="employee-management">
    <h2>Manage Employees</h2>

    <!-- Employee Form -->
    <form @submit.prevent="handleFormSubmit" class="employee-form">
      <input v-model="newEmployee.name" placeholder="Employee Name" required />
      <button type="submit">{{ isEditing ? 'Update Employee' : 'Add Employee' }}</button>
    </form>

    <!-- Employee Table -->
    <div class="table-wrapper">
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(employee, index) in employees" :key="index">
          <td>{{ employee.name }}</td>
          <td>
            <button @click="editEmployee(employee)">Edit</button>
            <button @click="deleteEmployee(index)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
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
      selectedEmployee: null, // Holds the employee being edited
      isEditing: false, // Tracks whether we are editing an employee
    };
  },
  methods: {
    handleFormSubmit() {
      if (this.isEditing) {
        // Update the employee
        const index = this.employees.findIndex((employee) => employee.name === this.selectedEmployee.name);
        if (index !== -1) {
          this.employees[index] = { ...this.newEmployee };
        }
        this.resetForm();
      } else {
        // Add new employee
        this.$emit('addEmployee', { ...this.newEmployee });
        this.resetForm();
      }
    },
    editEmployee(employee) {
      this.selectedEmployee = employee;
      this.isEditing = true;
      this.newEmployee = { ...employee }; // Pre-fill the form with employee data
    },
    deleteEmployee(index) {
      this.employees.splice(index, 1);
    },
    resetForm() {
      this.newEmployee = { name: '' };
      this.isEditing = false;
      this.selectedEmployee = null;
    },
  },
};
</script>
