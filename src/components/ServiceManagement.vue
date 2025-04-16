<template>
  <div class="service-management">
    <h2>Manage Services</h2>

    <div v-if="selectedCar" class="filter-info">
      <h3>Service History for {{ selectedCar.brand }} {{ selectedCar.model }}</h3>
    </div>

    <form
        v-if="!selectedCar"
        @submit.prevent="submitService"
        class="service-form"
    >
      <input v-model="newService.description" placeholder="Description" required />
      <input v-model="newService.price" type="number" placeholder="Price" required />

      <select v-model="newService.car" required>
        <option disabled value="">Select Car</option>
        <option v-for="(car, index) in cars" :key="index" :value="car">
          {{ car.model }} ({{ car.brand }})
        </option>
      </select>

      <select v-model="newService.employee" required>
        <option disabled value="">Select Employee</option>
        <option v-for="(employee, index) in employees" :key="index" :value="employee">
          {{ employee.name }}
        </option>
      </select>

      <input v-model="newService.date" type="date" required />
      <button type="submit" class="action-button">
        {{ editMode ? 'Update Service' : 'Add Service' }}
      </button>
    </form>

    <div class="table-wrapper">
      <table>
        <thead>
        <tr>
          <th>Description</th>
          <th>Price (€)</th>
          <th>Car</th>
          <th>Employee</th>
          <th>Date</th>
          <th v-if="!selectedCar">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(service, index) in filteredServices" :key="index">
          <td>{{ service.description }}</td>
          <td>{{ service.price }}</td>
          <td>{{ service.car.brand }} {{ service.car.model }}</td>
          <td>{{ service.employee.name }}</td>
          <td>{{ service.date }}</td>
          <td v-if="!selectedCar">
            <button @click="editService(service, index)" class="action-button">Edit</button>
            <button @click="deleteService(index)" class="action-button">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceManagement',
  props: ['cars', 'employees', 'services', 'selectedCar'],
  data() {
    return {
      newService: {
        description: '',
        price: '',
        car: '',
        employee: '',
        date: '',
      },
      editMode: false,
      editIndex: -1,
    };
  },
  computed: {
    filteredServices() {
      if (this.selectedCar) {
        return this.services.filter(service => service.car.vin === this.selectedCar.vin);
      }
      return this.services;
    },
  },
  methods: {
    submitService() {
      if (
          this.newService.description &&
          this.newService.price &&
          this.newService.car &&
          this.newService.employee &&
          this.newService.date
      ) {
        if (this.editMode) {
          this.services[this.editIndex] = { ...this.newService };
          this.editMode = false;
          this.editIndex = -1;
        } else {
          this.services.push({ ...this.newService });
        }
        this.resetForm();
      }
    },
    resetForm() {
      this.newService = {
        description: '',
        price: '',
        car: '',
        employee: '',
        date: '',
      };
    },
    editService(service, index) {
      this.newService = { ...service };
      this.editMode = true;
      this.editIndex = index;
    },
    deleteService(index) {
      this.services.splice(index, 1);
    },
  },
};
</script>
