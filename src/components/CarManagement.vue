<template>
  <div>
    <h2>Manage Cars</h2>
    <form @submit.prevent="addCar">
      <input v-model="newCar.brand" placeholder="Brand" />
      <input v-model="newCar.year" placeholder="Year" type="number" />
      <input v-model="newCar.engine" placeholder="Engine" />
      <input v-model="newCar.model" placeholder="Model" />
      <input v-model="newCar.vin" placeholder="VIN" />

      <button type="submit">Add Car</button>
    </form>

    <ul>
      <li v-for="(car, index) in cars" :key="index">
        {{ car.brand }} {{ car.model }}
      </li>
    </ul>
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
    };
  },
  methods: {
    addCar() {
      this.$emit('addCar', { ...this.newCar });
      this.newCar = { brand: '', year: '', engine: '', model: '', vin: '' };
    },
  },
};
</script>
