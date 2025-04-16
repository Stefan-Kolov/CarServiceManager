<template>
  <div class="car-management">
    <h2>Manage Cars</h2>

    <form @submit.prevent="handleFormSubmit" class="car-form">
      <input v-model="newCar.brand" placeholder="Brand" required />
      <input v-model="newCar.year" placeholder="Year" type="number" required />
      <input v-model="newCar.engine" placeholder="Engine" required />
      <input v-model="newCar.model" placeholder="Model" required />
      <input v-model="newCar.vin" placeholder="VIN" required />
      <button type="submit">{{ isEditing ? 'Update Car' : 'Add Car' }}</button>
    </form>

    <div class="table-wrapper">
      <table>
        <thead>
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Engine</th>
          <th>Year</th>
          <th>VIN</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(car, index) in cars" :key="index">
          <td>{{ car.brand }}</td>
          <td>{{ car.model }}</td>
          <td>{{ car.engine }}</td>
          <td>{{ car.year }}</td>
          <td>{{ car.vin }}</td>
          <td>
            <button @click="editCar(car)">Edit</button>
            <button @click="deleteCar(index)">Delete</button>
            <button @click="$emit('viewHistory', car)">View History</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarManagement',
  props: ['cars'],
  data() {
    return {
      newCar: {
        brand: '',
        year: '',
        engine: '',
        model: '',
        vin: '',
      },
      selectedCar: null,
      isEditing: false,
    };
  },
  methods: {
    handleFormSubmit() {
      if (this.isEditing) {
        const index = this.cars.findIndex((car) => car.vin === this.selectedCar.vin);
        if (index !== -1) {
          this.cars[index] = { ...this.newCar };
        }
        this.resetForm();
      } else {
        this.$emit('addCar', { ...this.newCar });
        this.resetForm();
      }
    },
    editCar(car) {
      this.selectedCar = car;
      this.isEditing = true;
      this.newCar = { ...car };
    },
    deleteCar(index) {
      this.cars.splice(index, 1);
    },
    resetForm() {
      this.newCar = { brand: '', year: '', engine: '', model: '', vin: '' };
      this.isEditing = false;
      this.selectedCar = null;
    },
  },
};
</script>
